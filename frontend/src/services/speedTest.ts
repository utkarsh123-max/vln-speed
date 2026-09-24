import type { PingSummary, ThroughputSample, ThroughputSummary } from "../types";
import { calculateAverage, calculateJitter } from "../utils/calculateJitter";

/**
 * ---------------------------------------------------------------------
 * IMPORTANT: everything in this file performs REAL network I/O.
 * There is no Math.random() standing in for a measurement anywhere here —
 * random bytes are only ever used as upload *payload* (data that has to
 * exist to be sent somewhere), never as a fake result.
 * ---------------------------------------------------------------------
 */

// ---- shared throughput sampler --------------------------------------

function sampleThroughput(
  getTotalBytes: () => number,
  testStart: number,
  intervalMs: number,
  onSample?: (s: ThroughputSample) => void
) {
  let lastBytes = 0;
  let lastTime = testStart;
  const samples: ThroughputSample[] = [];

  const id = window.setInterval(() => {
    const now = performance.now();
    const bytes = getTotalBytes();
    const deltaBytes = bytes - lastBytes;
    const deltaTimeSec = (now - lastTime) / 1000;
    const mbps = deltaTimeSec > 0 ? (deltaBytes * 8) / deltaTimeSec / 1_000_000 : 0;

    const sample: ThroughputSample = { t: now - testStart, mbps };
    samples.push(sample);
    onSample?.(sample);

    lastBytes = bytes;
    lastTime = now;
  }, intervalMs);

  return {
    stop: () => window.clearInterval(id),
    samples,
  };
}

function summarize(samples: ThroughputSample[], totalBytes: number, elapsedSec: number): ThroughputSummary {
  const mbpsValues = samples.map((s) => s.mbps).filter((v) => v > 0);
  const avgMbps = elapsedSec > 0 ? (totalBytes * 8) / elapsedSec / 1_000_000 : 0;
  return {
    avgMbps,
    peakMbps: mbpsValues.length ? Math.max(...mbpsValues) : avgMbps,
    minMbps: mbpsValues.length ? Math.min(...mbpsValues) : avgMbps,
    samples,
  };
}

// ---- ping / jitter -----------------------------------------------------

export async function runPingTest(
  baseUrl: string,
  opts: { count?: number; onSample?: (rttMs: number) => void; signal?: AbortSignal } = {}
): Promise<PingSummary> {
  const count = opts.count ?? 14;
  const samples: number[] = [];

  for (let i = 0; i < count; i++) {
    if (opts.signal?.aborted) break;
    const start = performance.now();
    try {
      await fetch(`${baseUrl}/api/ping?_=${Date.now()}_${i}`, {
        cache: "no-store",
        signal: opts.signal,
      });
      const rtt = performance.now() - start;
      samples.push(rtt);
      opts.onSample?.(rtt);
    } catch {
      // dropped sample — doesn't count toward the average, mirrors real packet loss
    }
    await new Promise((r) => setTimeout(r, 50));
  }

  if (samples.length === 0) {
    throw new Error("No response from test server");
  }

  return {
    minMs: Math.min(...samples),
    avgMs: calculateAverage(samples),
    jitterMs: calculateJitter(samples),
    samples,
  };
}

/** Quick 3-sample ping used only for the server selector list, not the main test. */
export async function measureServerLatency(baseUrl: string): Promise<number> {
  const summary = await runPingTest(baseUrl, { count: 3 });
  return Math.round(summary.avgMs);
}

// ---- download ------------------------------------------------------------

export async function runDownloadTest(
  baseUrl: string,
  opts: {
    durationMs?: number;
    parallelStreams?: number;
    onSample?: (s: ThroughputSample) => void;
    signal?: AbortSignal;
  } = {}
): Promise<ThroughputSummary> {
  const durationMs = opts.durationMs ?? 8000;
  // Single stream by default: on constrained hosting (free tiers) a second
  // concurrent long-lived stream can get cut by the platform, and since we
  // no longer let one failing stream kill the whole test (see below), a
  // single reliable stream beats two streams where one silently dies.
  const streamCount = opts.parallelStreams ?? 1;

  let totalBytes = 0;
  const testStart = performance.now();
  const controller = new AbortController();
  const externalAbort = () => controller.abort();
  opts.signal?.addEventListener("abort", externalAbort);
  const safetyTimer = window.setTimeout(() => controller.abort(), durationMs + 4000);

  const sampler = sampleThroughput(() => totalBytes, testStart, 200, opts.onSample);

  const readStream = async (index: number) => {
    const res = await fetch(`${baseUrl}/api/download?duration=${durationMs}&s=${index}_${Date.now()}`, {
      cache: "no-store",
      signal: controller.signal,
    });
    if (!res.ok || !res.body) throw new Error(`Download stream ${index} failed`);
    const reader = res.body.getReader();
    // eslint-disable-next-line no-constant-condition
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      if (value) totalBytes += value.byteLength;
    }
  };

  // Promise.allSettled instead of Promise.all: if one parallel stream gets
  // cut early (platform limits, a flaky hop, etc.) the test still reports
  // whatever real throughput the surviving streams measured, instead of
  // discarding a mostly-successful test over one dropped connection.
  const results = await Promise.allSettled(Array.from({ length: streamCount }, (_, i) => readStream(i)));
  window.clearTimeout(safetyTimer);
  opts.signal?.removeEventListener("abort", externalAbort);
  sampler.stop();

  const allFailed = results.every((r) => r.status === "rejected");
  if (allFailed && totalBytes === 0) {
    const firstFailure = results.find((r): r is PromiseRejectedResult => r.status === "rejected");
    throw firstFailure?.reason instanceof Error ? firstFailure.reason : new Error("Download test failed");
  }

  const elapsedSec = (performance.now() - testStart) / 1000;
  return summarize(sampler.samples, totalBytes, elapsedSec);
}

// ---- upload ------------------------------------------------------------

/** crypto.getRandomValues caps out at 65536 bytes per call, so fill in chunks. */
function createRandomPayload(sizeBytes: number): Blob {
  const buffer = new Uint8Array(sizeBytes);
  const maxChunk = 65536;
  for (let offset = 0; offset < sizeBytes; offset += maxChunk) {
    const end = Math.min(offset + maxChunk, sizeBytes);
    crypto.getRandomValues(buffer.subarray(offset, end));
  }
  return new Blob([buffer]);
}

function xhrUpload(
  baseUrl: string,
  payload: Blob,
  onProgress: (loadedBytes: number) => void
): { promise: Promise<void>; abort: () => void } {
  const xhr = new XMLHttpRequest();
  const promise = new Promise<void>((resolve, reject) => {
    xhr.open("POST", `${baseUrl}/api/upload`);
    xhr.upload.onprogress = (e) => {
      if (e.lengthComputable) onProgress(e.loaded);
    };
    xhr.onload = () => (xhr.status >= 200 && xhr.status < 300 ? resolve() : reject(new Error("Upload rejected")));
    xhr.onerror = () => reject(new Error("Upload failed"));
    xhr.onabort = () => reject(new Error("Upload aborted"));
    xhr.send(payload);
  });
  return { promise, abort: () => xhr.abort() };
}

export async function runUploadTest(
  baseUrl: string,
  opts: {
    durationMs?: number;
    parallelStreams?: number;
    chunkSizeBytes?: number;
    onSample?: (s: ThroughputSample) => void;
    signal?: AbortSignal;
  } = {}
): Promise<ThroughputSummary> {
  const durationMs = opts.durationMs ?? 7000;
  const workerCount = opts.parallelStreams ?? 1;
  const chunkSize = opts.chunkSizeBytes ?? 4 * 1024 * 1024;
  const payload = createRandomPayload(chunkSize);

  const workerBytes = new Array(workerCount).fill(0);
  const testStart = performance.now();
  let globalStop = false;

  const onAbort = () => {
    globalStop = true;
  };
  opts.signal?.addEventListener("abort", onAbort);

  const sampler = sampleThroughput(
    () => workerBytes.reduce((a, b) => a + b, 0),
    testStart,
    200,
    opts.onSample
  );

  const runWorker = async (idx: number) => {
    let completedBytes = 0;
    while (!globalStop && performance.now() - testStart < durationMs) {
      const { promise } = xhrUpload(baseUrl, payload, (loaded) => {
        workerBytes[idx] = completedBytes + loaded;
      });
      try {
        await promise;
        completedBytes += chunkSize;
        workerBytes[idx] = completedBytes;
      } catch {
        // this worker alone stops; other parallel workers (if any) keep going
        break;
      }
    }
  };

  const durationTimer = window.setTimeout(() => {
    globalStop = true;
  }, durationMs);

  await Promise.allSettled(Array.from({ length: workerCount }, (_, i) => runWorker(i)));
  window.clearTimeout(durationTimer);
  opts.signal?.removeEventListener("abort", onAbort);
  sampler.stop();

  const totalBytes = workerBytes.reduce((a: number, b: number) => a + b, 0);
  if (totalBytes === 0) {
    throw new Error("Upload test failed — no data could be sent.");
  }

  const elapsedSec = (performance.now() - testStart) / 1000;
  return summarize(sampler.samples, totalBytes, elapsedSec);
}