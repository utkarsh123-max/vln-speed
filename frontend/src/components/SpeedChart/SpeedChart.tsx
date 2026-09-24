import { useMemo, useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import type { ChartPoint } from "../../types";

interface SpeedChartProps {
  samples: ChartPoint[];
  height?: number;
}

const PADDING = 24;

function buildPath(points: { x: number; y: number }[]): string {
  if (points.length === 0) return "";
  return points.reduce((path, p, i) => path + `${i === 0 ? "M" : "L"}${p.x.toFixed(2)},${p.y.toFixed(2)} `, "");
}

export function SpeedChart({ samples, height = 220 }: SpeedChartProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(600);

  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new ResizeObserver((entries) => {
      const w = entries[0]?.contentRect.width;
      if (w) setWidth(w);
    });
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  const { downloadPath, uploadPath, maxY, avgDownload, avgUpload, peak } = useMemo(() => {
    const downloadPts = samples.filter((s) => s.download !== undefined);
    const uploadPts = samples.filter((s) => s.upload !== undefined);
    const allValues = samples.flatMap((s) => [s.download, s.upload]).filter((v): v is number => v !== undefined);
    const maxT = Math.max(1, ...samples.map((s) => s.t));
    const maxY = Math.max(10, ...allValues) * 1.15;

    const scaleX = (t: number) => PADDING + (t / maxT) * (width - PADDING * 2);
    const scaleY = (v: number) => height - PADDING - (v / maxY) * (height - PADDING * 2);

    const downloadPath = buildPath(downloadPts.map((p) => ({ x: scaleX(p.t), y: scaleY(p.download!) })));
    const uploadPath = buildPath(uploadPts.map((p) => ({ x: scaleX(p.t), y: scaleY(p.upload!) })));

    const avg = (arr: number[]) => (arr.length ? arr.reduce((a, b) => a + b, 0) / arr.length : 0);
    const avgDownload = avg(downloadPts.map((p) => p.download!));
    const avgUpload = avg(uploadPts.map((p) => p.upload!));
    const peak = allValues.length ? Math.max(...allValues) : 0;

    return { downloadPath, uploadPath, maxY, avgDownload, avgUpload, peak };
  }, [samples, width, height]);

  const gridLines = [0.25, 0.5, 0.75, 1];

  if (samples.length < 2) {
    return (
      <div className="flex items-center justify-center text-muted text-sm py-16 border border-dashed border-border rounded-2xl">
        Not enough data to chart yet.
      </div>
    );
  }

  return (
    <div ref={containerRef} className="w-full">
      <svg viewBox={`0 0 ${width} ${height}`} width="100%" height={height} preserveAspectRatio="none">
        {gridLines.map((g) => (
          <line
            key={g}
            x1={PADDING}
            x2={width - PADDING}
            y1={height - PADDING - g * (height - PADDING * 2)}
            y2={height - PADDING - g * (height - PADDING * 2)}
            stroke="var(--vln-border)"
            strokeWidth={1}
          />
        ))}

        <motion.path
          d={downloadPath}
          fill="none"
          stroke="var(--vln-accent)"
          strokeWidth={2.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.1, ease: "easeOut" }}
        />
        <motion.path
          d={uploadPath}
          fill="none"
          stroke="var(--vln-accent-2)"
          strokeWidth={2.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.1, ease: "easeOut", delay: 0.15 }}
        />
      </svg>

      <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-3 text-xs text-secondary">
        <Legend color="var(--vln-accent)" label={`Download · avg ${avgDownload.toFixed(1)} Mbps`} />
        <Legend color="var(--vln-accent-2)" label={`Upload · avg ${avgUpload.toFixed(1)} Mbps`} />
        <span className="text-muted">Peak {peak.toFixed(1)} Mbps</span>
        <span className="text-muted">Scale 0–{maxY.toFixed(0)} Mbps</span>
      </div>
    </div>
  );
}

function Legend({ color, label }: { color: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-2">
      <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: color }} />
      {label}
    </span>
  );
}
