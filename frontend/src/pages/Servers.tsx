import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Loader2, RefreshCw, Globe2 } from "lucide-react";
import { SERVERS } from "../config/servers";
import { measureServerLatency } from "../services/speedTest";

const easeOut = [0.22, 1, 0.36, 1] as const;

function latencyTier(ms: number | null) {
  if (ms == null) return { bars: 0, color: "var(--vln-text-muted)" };
  if (ms <= 30) return { bars: 4, color: "var(--vln-success)" };
  if (ms <= 60) return { bars: 3, color: "var(--vln-accent)" };
  if (ms <= 120) return { bars: 2, color: "var(--vln-warning)" };
  return { bars: 1, color: "var(--vln-danger)" };
}

function SignalBars({ ms }: { ms: number | null | undefined }) {
  const { bars, color } = latencyTier(ms ?? null);
  return (
    <div className="flex items-end gap-0.5 h-4" aria-hidden="true">
      {[1, 2, 3, 4].map((i) => (
        <span
          key={i}
          className="w-1 rounded-sm transition-colors duration-300"
          style={{
            height: `${i * 25}%`,
            backgroundColor: i <= bars ? color : "var(--vln-border)",
          }}
        />
      ))}
    </div>
  );
}

export function Servers() {
  const [pings, setPings] = useState<Record<string, number | null>>({});
  const [reloadKey, setReloadKey] = useState(0);
  const [refreshing, setRefreshing] = useState(false);

  const runPings = useCallback(async (cancelledRef: { current: boolean }) => {
    setRefreshing(true);
    for (const server of SERVERS) {
      try {
        const ms = await measureServerLatency(server.url);
        if (!cancelledRef.current) setPings((prev) => ({ ...prev, [server.id]: ms }));
      } catch {
        if (!cancelledRef.current) setPings((prev) => ({ ...prev, [server.id]: null }));
      }
    }
    if (!cancelledRef.current) setRefreshing(false);
  }, []);

  useEffect(() => {
    const cancelledRef = { current: false };
    runPings(cancelledRef);
    return () => {
      cancelledRef.current = true;
    };
  }, [reloadKey, runPings]);

  const sorted = [...SERVERS].sort((a, b) => {
    const pa = pings[a.id];
    const pb = pings[b.id];
    if (pa == null) return 1;
    if (pb == null) return -1;
    return pa - pb;
  });

  const bestId = sorted.find((s) => pings[s.id] != null)?.id;

  return (
    <div className="max-w-3xl mx-auto px-5 sm:px-8 pt-14 sm:pt-20 pb-16">
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: easeOut }}
        className="text-center mb-10"
      >
        <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border bg-elevated/60 text-[11px] tracking-[0.16em] uppercase text-secondary font-semibold">
          <Globe2 size={12} className="text-accent" />
          Test infrastructure
        </span>
        <h1 className="mt-5 text-3xl sm:text-4xl font-extrabold tracking-tight text-gradient">Test servers</h1>
        <p className="mt-4 text-sm text-muted max-w-lg mx-auto leading-relaxed">
          VLN Speed automatically picks the lowest-latency server for your test. Add more regions by deploying
          another instance of the backend and listing it in <code className="text-accent">VITE_SERVERS</code>.
        </p>
      </motion.div>

      <div className="flex items-center justify-between mb-3 px-1">
        <span className="text-[11px] tracking-[0.16em] uppercase text-muted font-semibold">
          {SERVERS.length} region{SERVERS.length !== 1 ? "s" : ""}
        </span>
        <button
          onClick={() => setReloadKey((k) => k + 1)}
          disabled={refreshing}
          className="flex items-center gap-1.5 text-xs text-secondary hover:text-primary transition-colors disabled:opacity-50"
        >
          <RefreshCw size={12} className={refreshing ? "animate-spin" : ""} />
          Re-check latency
        </button>
      </div>

      <ul className="flex flex-col gap-2.5">
        {sorted.map((server, i) => {
          const ms = pings[server.id];
          const isBest = server.id === bestId;
          return (
            <motion.li
              key={server.id}
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.05, ease: easeOut }}
              className={`card-premium rounded-2xl px-5 py-4 flex items-center justify-between transition-colors ${
                isBest ? "shadow-glow" : ""
              }`}
              style={isBest ? { boxShadow: "0 0 0 1px var(--vln-accent-glow)" } : undefined}
            >
              <div className="flex items-center gap-3.5">
                <span className="w-9 h-9 rounded-xl bg-accent/10 flex items-center justify-center text-accent shrink-0">
                  <MapPin size={15} />
                </span>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold text-primary">{server.name}</p>
                    {isBest && (
                      <span className="flex items-center gap-1 text-[10px] uppercase tracking-wide text-success bg-success/10 px-2 py-0.5 rounded-full">
                        <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
                        Recommended
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-muted mt-0.5">{server.region}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <SignalBars ms={ms} />
                <span className="tabular text-sm text-secondary w-14 text-right">
                  {ms === undefined ? (
                    <Loader2 size={13} className="animate-spin text-muted ml-auto" />
                  ) : ms === null ? (
                    "—"
                  ) : (
                    `${ms} ms`
                  )}
                </span>
              </div>
            </motion.li>
          );
        })}
      </ul>
    </div>
  );
}