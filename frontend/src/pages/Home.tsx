import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Activity,
  Gauge as GaugeIcon,
  Radio,
  ArrowDownToLine,
  ArrowUpFromLine,
  Sparkles,
} from "lucide-react";
import { SpeedGauge } from "../components/SpeedGauge/SpeedGauge";
import { SpeedChart } from "../components/SpeedChart/SpeedChart";
import { MetricCard } from "../components/MetricCard/MetricCard";
import { TestControls } from "../components/TestControls/TestControls";
import { NetworkInfo } from "../components/NetworkInfo/NetworkInfo";
import { ResultCard } from "../components/ResultCard/ResultCard";
import { ServerSelector } from "../components/ServerSelector/ServerSelector";
import { useSpeedTest } from "../hooks/useSpeedTest";
import { useTestHistory } from "../hooks/useTestHistory";
import { DEFAULT_SERVER } from "../config/servers";
import type { ServerInfo } from "../types";
import { formatMbps } from "../utils/formatSpeed";

const PHASE_LABEL: Record<string, string> = {
  idle: "Ready",
  initializing: "Finding server",
  ping: "Ping",
  download: "Download",
  upload: "Upload",
  analyzing: "Analyzing",
  complete: "Complete",
  error: "Error",
};

const PHASE_STATUS: Record<string, string> = {
  initializing: "Finding the optimal test server…",
  ping: "Checking latency…",
  download: "Measuring download throughput…",
  upload: "Measuring upload throughput…",
  analyzing: "Analyzing connection quality…",
};

const easeOut = [0.22, 1, 0.36, 1] as const;

export function Home() {
  const [server, setServer] = useState<ServerInfo>(DEFAULT_SERVER);
  const [reducedMotion, setReducedMotion] = useState(false);

  const { phase, displayMbps, pingMs, jitterMs, chartSamples, result, errorMessage, start, cancel, reset } =
    useSpeedTest(server);

  const { addResult } = useTestHistory();

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);

    const listener = () => setReducedMotion(mq.matches);
    mq.addEventListener("change", listener);

    return () => mq.removeEventListener("change", listener);
  }, []);

  useEffect(() => {
    if (result) addResult(result);
  }, [result, addResult]);

  const gaugeValue = phase === "ping" ? 0 : displayMbps;
  const gaugePhaseLabel = PHASE_LABEL[phase] ?? "Ready";
  const isIdle = phase === "idle";
  const isRunning = ["initializing", "ping", "download", "upload", "analyzing"].includes(phase);

  const liveTelemetry = useMemo(
    () => [
      { label: "Latency", value: pingMs !== null ? `${pingMs} ms` : "—" },
      { label: "Jitter", value: jitterMs !== null ? `${jitterMs} ms` : "—" },
      { label: "Throughput", value: `${formatMbps(displayMbps, 0)} Mbps` },
    ],
    [pingMs, jitterMs, displayMbps]
  );

  return (
    <div className="relative isolate min-h-screen overflow-hidden">
      <AmbientBackground reducedMotion={reducedMotion} />

      {/* Header */}
      <motion.section
        initial={reducedMotion ? false : { opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: easeOut }}
        className="max-w-3xl mx-auto px-5 sm:px-8 pt-14 sm:pt-20 text-center"
      >
        <motion.div
          initial={reducedMotion ? false : { opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.05, ease: easeOut }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border bg-elevated/60 backdrop-blur-md text-[10px] font-semibold uppercase tracking-[0.2em] text-muted shadow-sm"
        >
          <Sparkles size={12} className="text-accent" />
          Network Intelligence
        </motion.div>

        <motion.h1
          initial={reducedMotion ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.12, ease: easeOut }}
          className="mt-5 text-3xl sm:text-4xl font-extrabold tracking-tight text-gradient"
        >
          VLN Speed
        </motion.h1>

        <motion.p
          initial={reducedMotion ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.2, ease: easeOut }}
          className="mt-3 text-secondary text-base sm:text-lg"
        >
          Measure Your Connection. Know Your Network.
        </motion.p>

        <motion.p
          initial={reducedMotion ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.27, ease: easeOut }}
          className="mt-2 text-sm text-muted max-w-md mx-auto"
        >
          Test your internet connection with real-time latency, download and upload measurements.
        </motion.p>
      </motion.section>

      {/* Server */}
      <motion.section
        initial={reducedMotion ? false : { opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.32, ease: easeOut }}
        className="max-w-3xl mx-auto px-5 sm:px-8 mt-8 flex items-center justify-center gap-3"
      >
        <motion.div whileHover={reducedMotion ? undefined : { y: -2 }} transition={{ duration: 0.2 }}>
          <ServerSelector selected={server} onSelect={setServer} disabled={isRunning} />
        </motion.div>
      </motion.section>

      {/* Main Test Area */}
      <section className="max-w-3xl mx-auto px-5 sm:px-8 mt-10 flex flex-col items-center">
        <motion.div
          layout
          className="relative"
          animate={reducedMotion ? undefined : isRunning ? { scale: [1, 1.008, 1] } : { scale: 1 }}
          transition={isRunning ? { duration: 3.2, repeat: Infinity, ease: "easeInOut" } : { duration: 0.3 }}
        >
          {/* SpeedGauge already renders its own active halo/rings — no extra aura layered here */}
          <div className="relative">
            <SpeedGauge value={gaugeValue} phaseLabel={gaugePhaseLabel} reducedMotion={reducedMotion} size={320} />

            <div className="absolute inset-x-0 -bottom-2 flex justify-center">
              <TestControls phase={phase} onStart={start} onCancel={cancel} onReset={reset} />
            </div>
          </div>
        </motion.div>

        {/* Phase status */}
        <div className="h-16 mt-8 flex items-center justify-center">
          <AnimatePresence mode="wait">
            {isRunning && (
              <motion.div
                key={phase}
                initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 8, filter: "blur(4px)" }}
                animate={reducedMotion ? { opacity: 1 } : { opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: -8, filter: "blur(4px)" }}
                transition={{ duration: 0.3, ease: easeOut }}
                className="flex items-center gap-2 text-sm text-secondary tracking-wide"
              >
                <motion.span
                  animate={reducedMotion ? undefined : { opacity: [0.35, 1, 0.35] }}
                  transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
                  className="w-1.5 h-1.5 rounded-full bg-accent"
                />
                {PHASE_STATUS[phase]}
              </motion.div>
            )}

            {phase === "error" && (
              <motion.div
                key="error"
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="text-center"
              >
                <p className="text-sm font-semibold text-danger">Server unavailable</p>
                <p className="text-xs text-muted mt-1 max-w-xs">{errorMessage}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Live telemetry */}
        <AnimatePresence initial={false}>
          {isRunning && (
            <motion.div
              initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.35, ease: easeOut }}
              className="w-full max-w-sm rounded-2xl glass ring-hairline px-5 py-3 -mt-4 mb-6 shadow-card"
            >
              <div className="flex items-center justify-center gap-2 mb-2">
                <motion.span
                  animate={reducedMotion ? undefined : { scale: [1, 1.25, 1], opacity: [0.6, 1, 0.6] }}
                  transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                  className="w-1.5 h-1.5 rounded-full bg-accent"
                />
                <p className="text-[10px] tracking-[0.2em] uppercase text-muted">Live telemetry</p>
              </div>

              <div className="grid grid-cols-3 gap-2 text-center">
                {liveTelemetry.map((t, index) => (
                  <motion.div
                    key={t.label}
                    initial={reducedMotion ? false : { opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <div className="tabular text-sm font-semibold text-primary">{t.value}</div>
                    <div className="text-[10px] text-muted mt-0.5">{t.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Metrics */}
        {(isIdle || isRunning) && (
          <motion.div layout className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full mt-2">
            {[
              { icon: Radio, label: "Ping", value: pingMs !== null ? `${pingMs}` : "—", unit: "ms", accent: false },
              { icon: Activity, label: "Jitter", value: jitterMs !== null ? `${jitterMs}` : "—", unit: "ms", accent: false },
              {
                icon: ArrowDownToLine,
                label: "Download",
                value: phase === "download" ? formatMbps(displayMbps, 1) : "—",
                unit: "Mbps",
                accent: phase === "download",
              },
              {
                icon: ArrowUpFromLine,
                label: "Upload",
                value: phase === "upload" ? formatMbps(displayMbps, 1) : "—",
                unit: "Mbps",
                accent: phase === "upload",
              },
            ].map((metric, index) => (
              <motion.div
                key={metric.label}
                initial={reducedMotion ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.08 + index * 0.05, ease: easeOut }}
                whileHover={reducedMotion ? undefined : { y: -3 }}
                className="will-change-transform"
              >
                <MetricCard icon={metric.icon} label={metric.label} value={metric.value} unit={metric.unit} accent={metric.accent} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </section>

      {/* Results */}
      <AnimatePresence>
        {result && phase === "complete" && (
          <motion.section
            initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: easeOut }}
            className="max-w-3xl mx-auto px-5 sm:px-8 mt-14 flex flex-col gap-6 pb-16"
          >
            <motion.div
              initial={reducedMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.08 }}
            >
              <ResultCard result={result} />
            </motion.div>

            <motion.div
              initial={reducedMotion ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.16 }}
              className="card-premium rounded-3xl p-6 sm:p-8"
            >
              <h3 className="text-[11px] tracking-[0.2em] uppercase text-muted font-semibold mb-4 flex items-center gap-2">
                <GaugeIcon size={13} />
                Speed over time
              </h3>

              <SpeedChart samples={chartSamples} />
            </motion.div>

            <motion.div
              initial={reducedMotion ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.24 }}
            >
              <NetworkInfo network={result.network} server={result.server} durationSec={result.durationSec} />
            </motion.div>
          </motion.section>
        )}
      </AnimatePresence>
    </div>
  );
}

function AmbientBackground({ reducedMotion }: { reducedMotion: boolean }) {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <motion.div
        animate={reducedMotion ? undefined : { scale: [1, 1.04, 1], opacity: [0.08, 0.12, 0.08] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[900px] rounded-full opacity-[0.10]"
        style={{ background: "radial-gradient(circle, var(--vln-accent) 0%, transparent 65%)" }}
      />

      <motion.div
        animate={reducedMotion ? undefined : { x: ["-2%", "2%", "-2%"], opacity: [0.02, 0.04, 0.02] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -bottom-72 right-[-15%] w-[700px] h-[700px] rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, var(--vln-accent-2) 0%, transparent 68%)" }}
      />

      <svg className="absolute inset-0 w-full h-full opacity-[0.03]" aria-hidden="true">
        <defs>
          <pattern id="vln-grid" width="42" height="42" patternUnits="userSpaceOnUse">
            <path d="M 42 0 L 0 0 0 42" fill="none" stroke="currentColor" strokeWidth="1" />
          </pattern>
        </defs>

        <rect width="100%" height="100%" fill="url(#vln-grid)" className="text-primary" />
      </svg>

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,var(--vln-bg)_85%)] opacity-40" />
    </div>
  );
}