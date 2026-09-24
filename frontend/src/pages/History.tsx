import { useState } from "react";
import { motion } from "framer-motion";
import { Trash2, ArrowDownToLine, ArrowUpFromLine, Radio, GaugeCircle } from "lucide-react";
import { useTestHistory } from "../hooks/useTestHistory";
import { formatMbps } from "../utils/formatSpeed";
import { QUALITY_LABEL } from "../utils/calculateQuality";
import type { SpeedTestResult } from "../types";

export function History() {
  const { history, removeResult, clearHistory } = useTestHistory();
  const [compareIds, setCompareIds] = useState<string[]>([]);

  const toggleCompare = (id: string) => {
    setCompareIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : prev.length < 2 ? [...prev, id] : [prev[1], id]));
  };

  const compareItems = history.filter((h) => compareIds.includes(h.id));

  return (
    <div className="max-w-3xl mx-auto px-5 sm:px-8 py-14">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-primary">Test history</h1>
        {history.length > 0 && (
          <button onClick={clearHistory} className="text-xs text-muted hover:text-danger transition-colors">
            Clear all
          </button>
        )}
      </div>

      {history.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border py-20 text-center">
          <p className="text-primary font-semibold">No tests yet</p>
          <p className="text-sm text-muted mt-2">Run your first speed test to start building your history.</p>
        </div>
      ) : (
        <>
          {compareItems.length === 2 && (
            <div className="grid grid-cols-2 gap-4 mb-8">
              {compareItems.map((item) => (
                <CompareCard key={item.id} item={item} />
              ))}
            </div>
          )}

          <ul className="flex flex-col gap-3">
            {history.map((item) => (
              <motion.li
                key={item.id}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className={`rounded-2xl border p-5 flex flex-col sm:flex-row sm:items-center gap-4 ${
                  compareIds.includes(item.id) ? "border-accent/50 bg-accent/5" : "border-border bg-surface"
                }`}
              >
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-primary font-medium">
                    {new Date(item.timestamp).toLocaleDateString(undefined, { day: "2-digit", month: "short", year: "numeric" })}
                  </p>
                  <p className="text-xs text-muted">
                    {item.server.name} server · {QUALITY_LABEL[item.quality]}
                  </p>
                </div>

                <div className="flex items-center gap-5 text-sm">
                  <Stat icon={ArrowDownToLine} value={`${formatMbps(item.download.avgMbps, 1)}`} />
                  <Stat icon={ArrowUpFromLine} value={`${formatMbps(item.upload.avgMbps, 1)}`} />
                  <Stat icon={Radio} value={`${Math.round(item.ping.avgMs)} ms`} />
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => toggleCompare(item.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs border transition-colors ${
                      compareIds.includes(item.id) ? "border-accent text-accent" : "border-border text-muted hover:text-primary"
                    }`}
                  >
                    Compare
                  </button>
                  <button
                    onClick={() => removeResult(item.id)}
                    aria-label="Delete result"
                    className="w-8 h-8 flex items-center justify-center rounded-lg text-muted hover:text-danger transition-colors"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </motion.li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

function Stat({ icon: Icon, value }: { icon: typeof Radio; value: string }) {
  return (
    <span className="flex items-center gap-1.5 tabular text-secondary">
      <Icon size={13} className="text-muted" />
      {value}
    </span>
  );
}

function CompareCard({ item }: { item: SpeedTestResult }) {
  return (
    <div className="rounded-2xl border border-border bg-surface p-5">
      <div className="flex items-center gap-2 mb-3 text-muted">
        <GaugeCircle size={14} />
        <span className="text-xs">{new Date(item.timestamp).toLocaleString()}</span>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <div className="tabular text-xl font-bold text-primary">{formatMbps(item.download.avgMbps, 1)}</div>
          <div className="text-[10px] text-muted">Mbps down</div>
        </div>
        <div>
          <div className="tabular text-xl font-bold text-primary">{formatMbps(item.upload.avgMbps, 1)}</div>
          <div className="text-[10px] text-muted">Mbps up</div>
        </div>
        <div>
          <div className="tabular text-lg font-semibold text-secondary">{Math.round(item.ping.avgMs)} ms</div>
          <div className="text-[10px] text-muted">Ping</div>
        </div>
        <div>
          <div className="tabular text-lg font-semibold text-secondary">{Math.round(item.ping.jitterMs)} ms</div>
          <div className="text-[10px] text-muted">Jitter</div>
        </div>
      </div>
    </div>
  );
}
