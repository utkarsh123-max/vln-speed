import { useCallback, useEffect, useRef, useState } from "react";
import type { ChartPoint, ServerInfo, SpeedTestResult, TestPhase } from "../types";
import { fetchHealth, fetchNetworkInfo } from "../services/api";
import { runPingTest, runDownloadTest, runUploadTest } from "../services/speedTest";
import { calculateQuality } from "../utils/calculateQuality";

/**
 * Drives the whole test lifecycle. Every number this hook exposes traces
 * back to a real measurement in services/speedTest.ts — this hook's only
 * job on top of that is state-machine bookkeeping and turning raw, jumpy
 * samples into a smoothly-animating display value for the gauge.
 */
export function useSpeedTest(server: ServerInfo) {
  const [phase, setPhase] = useState<TestPhase>("idle");
  const [displayMbps, setDisplayMbps] = useState(0);
  const [pingMs, setPingMs] = useState<number | null>(null);
  const [jitterMs, setJitterMs] = useState<number | null>(null);
  const [chartSamples, setChartSamples] = useState<ChartPoint[]>([]);
  const [result, setResult] = useState<SpeedTestResult | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const targetRef = useRef(0);
  const runningRef = useRef(false);
  const rafRef = useRef<number | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  const startSmoothing = useCallback(() => {
    if (runningRef.current) return;
    runningRef.current = true;
    const step = () => {
      if (!runningRef.current) return;
      setDisplayMbps((prev) => {
        const target = targetRef.current;
        const diff = target - prev;
        if (Math.abs(diff) < 0.03) return target;
        return prev + diff * 0.2;
      });
      rafRef.current = requestAnimationFrame(step);
    };
    rafRef.current = requestAnimationFrame(step);
  }, []);

  const stopSmoothing = useCallback(() => {
    runningRef.current = false;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = null;
  }, []);

  const reset = useCallback(() => {
    abortRef.current?.abort();
    stopSmoothing();
    setPhase("idle");
    setDisplayMbps(0);
    setPingMs(null);
    setJitterMs(null);
    setChartSamples([]);
    setResult(null);
    setErrorMessage(null);
    targetRef.current = 0;
  }, [stopSmoothing]);

  const start = useCallback(async () => {
    reset();
    const controller = new AbortController();
    abortRef.current = controller;
    const testStartTime = Date.now();

    try {
      setPhase("initializing");
      const healthy = await fetchHealth(server.url);
      if (!healthy) throw new Error("We couldn't reach the test server. Check your connection and try again.");
      const networkInfoPromise = fetchNetworkInfo();

      // --- PING & JITTER ---
      setPhase("ping");
      const ping = await runPingTest(server.url, {
        signal: controller.signal,
        onSample: (rtt) => setPingMs(Math.round(rtt)),
      });
      setPingMs(Math.round(ping.avgMs));
      setJitterMs(Math.round(ping.jitterMs));

      // --- DOWNLOAD ---
      setPhase("download");
      targetRef.current = 0;
      startSmoothing();
      const download = await runDownloadTest(server.url, {
        signal: controller.signal,
        onSample: (s) => {
          targetRef.current = s.mbps;
          setChartSamples((prev) => [...prev, { t: s.t, download: s.mbps }]);
        },
      });
      targetRef.current = download.avgMbps;

      // --- UPLOAD ---
      setPhase("upload");
      targetRef.current = 0;
      const upload = await runUploadTest(server.url, {
        signal: controller.signal,
        onSample: (s) => {
          targetRef.current = s.mbps;
          setChartSamples((prev) => [...prev, { t: s.t, upload: s.mbps }]);
        },
      });
      targetRef.current = upload.avgMbps;
      stopSmoothing();
      setDisplayMbps(upload.avgMbps);

      // --- ANALYZING ---
      setPhase("analyzing");
      const networkInfo = await networkInfoPromise;
      await new Promise((r) => setTimeout(r, 500));

      const quality = calculateQuality(download.avgMbps, upload.avgMbps, ping.avgMs, ping.jitterMs);
      const finalResult: SpeedTestResult = {
        id: crypto.randomUUID(),
        timestamp: testStartTime,
        server: { ...server, pingMs: Math.round(ping.avgMs) },
        ping,
        download,
        upload,
        quality,
        durationSec: (Date.now() - testStartTime) / 1000,
        network: networkInfo,
      };

      setResult(finalResult);
      setPhase("complete");
      return finalResult;
    } catch (err) {
      stopSmoothing();
      if (controller.signal.aborted) {
        setPhase("idle");
        return null;
      }
      setErrorMessage(err instanceof Error ? err.message : "Something interrupted the test.");
      setPhase("error");
      return null;
    }
  }, [server, reset, startSmoothing, stopSmoothing]);

  const cancel = useCallback(() => {
    abortRef.current?.abort();
    stopSmoothing();
    setPhase("idle");
  }, [stopSmoothing]);

  useEffect(
    () => () => {
      abortRef.current?.abort();
      stopSmoothing();
    },
    [stopSmoothing]
  );

  return { phase, displayMbps, pingMs, jitterMs, chartSamples, result, errorMessage, start, cancel, reset };
}
