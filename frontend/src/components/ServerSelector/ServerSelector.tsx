import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, MapPin, X, Loader2 } from "lucide-react";
import type { ServerInfo } from "../../types";
import { SERVERS } from "../../config/servers";
import { measureServerLatency } from "../../services/speedTest";

interface ServerSelectorProps {
  selected: ServerInfo;
  onSelect: (server: ServerInfo) => void;
  disabled?: boolean;
}

export function ServerSelector({ selected, onSelect, disabled }: ServerSelectorProps) {
  const [open, setOpen] = useState(false);
  const [pings, setPings] = useState<Record<string, number | null>>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!open) return;
    let cancelled = false;
    setLoading(true);
    (async () => {
      const results: Record<string, number | null> = {};
      for (const server of SERVERS) {
        try {
          results[server.id] = await measureServerLatency(server.url);
        } catch {
          results[server.id] = null;
        }
        if (!cancelled) setPings({ ...results });
      }
      if (!cancelled) setLoading(false);
    })();
    return () => {
      cancelled = true;
    };
  }, [open]);

  const recommended = Object.entries(pings)
    .filter(([, v]) => v !== null)
    .sort((a, b) => (a[1] as number) - (b[1] as number))[0]?.[0];

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(true)}
        disabled={disabled}
        className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl border border-border bg-surface hover:border-accent/40 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <MapPin size={14} className="text-accent" />
        <span className="text-sm text-primary font-medium">{selected.name}</span>
        <span className="text-xs text-muted">{selected.region}</span>
        <ChevronDown size={14} className="text-muted" />
      </button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />
            <motion.div
              className="fixed left-1/2 top-1/2 z-50 w-[92vw] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-border bg-elevated p-5 shadow-2xl"
              initial={{ opacity: 0, scale: 0.96, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 8 }}
              transition={{ duration: 0.18 }}
              role="dialog"
              aria-modal="true"
              aria-label="Select test server"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm tracking-[0.14em] uppercase text-muted font-semibold">Search servers</h2>
                <button onClick={() => setOpen(false)} className="text-muted hover:text-primary transition-colors" aria-label="Close">
                  <X size={18} />
                </button>
              </div>

              <ul className="flex flex-col gap-1 max-h-[60vh] overflow-y-auto">
                {SERVERS.map((server) => {
                  const ping = pings[server.id];
                  const isRecommended = server.id === recommended;
                  const isSelected = server.id === selected.id;
                  return (
                    <li key={server.id}>
                      <button
                        onClick={() => {
                          onSelect(server);
                          setOpen(false);
                        }}
                        className={`w-full flex items-center justify-between gap-3 px-3 py-3 rounded-xl text-left transition-colors ${
                          isSelected ? "bg-accent/10 border border-accent/30" : "hover:bg-surface border border-transparent"
                        }`}
                      >
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium text-primary">{server.name}</span>
                            {isRecommended && (
                              <span className="text-[10px] uppercase tracking-wide text-success bg-success/10 px-1.5 py-0.5 rounded">
                                Recommended
                              </span>
                            )}
                          </div>
                          <span className="text-xs text-muted">{server.region}</span>
                        </div>
                        <span className="tabular text-sm text-secondary flex items-center gap-1.5">
                          {ping === undefined && loading ? (
                            <Loader2 size={13} className="animate-spin text-muted" />
                          ) : ping === null ? (
                            "—"
                          ) : (
                            `${ping} ms`
                          )}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
