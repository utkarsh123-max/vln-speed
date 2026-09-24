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

function buildAreaPath(points: { x: number; y: number }[], baselineY: number): string {
  if (points.length === 0) return "";
  const line = buildPath(points);
  const last = points[points.length - 1];
  const first = points[0];
  return `${line} L${last.x.toFixed(2)},${baselineY} L${first.x.toFixed(2)},${baselineY} Z`;
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

  const {
    downloadPath,
    uploadPath,
    downloadAreaPath,
    uploadAreaPath,
    maxY,
    avgDownload,
    avgUpload,
    avgDownloadY,
    avgUploadY,
    peak,
    baselineY,
  } = useMemo(() => {
    const downloadPts = samples.filter((s) => s.download !== undefined);
    const uploadPts = samples.filter((s) => s.upload !== undefined);
    const allValues = samples.flatMap((s) => [s.download, s.upload]).filter((v): v is number => v !== undefined);
    const maxT = Math.max(1, ...samples.map((s) => s.t));
    const maxY = Math.max(10, ...allValues) * 1.15;

    const scaleX = (t: number) => PADDING + (t / maxT) * (width - PADDING * 2);
    const scaleY = (v: number) => height - PADDING - (v / maxY) * (height - PADDING * 2);
    const baselineY = height - PADDING;

    const downloadPath = buildPath(downloadPts.map((p) => ({ x: scaleX(p.t), y: scaleY(p.download!) })));
    const uploadPath = buildPath(uploadPts.map((p) => ({ x: scaleX(p.t), y: scaleY(p.upload!) })));

    const downloadAreaPath = buildAreaPath(downloadPts.map((p) => ({ x: scaleX(p.t), y: scaleY(p.download!) })), baselineY);
    const uploadAreaPath = buildAreaPath(uploadPts.map((p) => ({ x: scaleX(p.t), y: scaleY(p.upload!) })), baselineY);

    const avg = (arr: number[]) => (arr.length ? arr.reduce((a, b) => a + b, 0) / arr.length : 0);
    const avgDownload = avg(downloadPts.map((p) => p.download!));
    const avgUpload = avg(uploadPts.map((p) => p.upload!));
    const peak = allValues.length ? Math.max(...allValues) : 0;

    return {
      downloadPath,
      uploadPath,
      downloadAreaPath,
      uploadAreaPath,
      maxY,
      avgDownload,
      avgUpload,
      avgDownloadY: scaleY(avgDownload),
      avgUploadY: scaleY(avgUpload),
      peak,
      baselineY,
    };
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
        <defs>
          <linearGradient id="chart-download-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--vln-accent)" stopOpacity="0.22" />
            <stop offset="100%" stopColor="var(--vln-accent)" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="chart-upload-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--vln-accent-2)" stopOpacity="0.18" />
            <stop offset="100%" stopColor="var(--vln-accent-2)" stopOpacity="0" />
          </linearGradient>
        </defs>

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

        {/* soft area fills under each curve */}
        <motion.path
          d={downloadAreaPath}
          fill="url(#chart-download-fill)"
          stroke="none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        />
        <motion.path
          d={uploadAreaPath}
          fill="url(#chart-upload-fill)"
          stroke="none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        />

        {/* mean / average dashed reference lines */}
        <motion.line
          x1={PADDING}
          x2={width - PADDING}
          y1={avgDownloadY}
          y2={avgDownloadY}
          stroke="var(--vln-accent)"
          strokeWidth={1.25}
          strokeDasharray="5 4"
          opacity={0.55}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.55 }}
          transition={{ duration: 0.6, delay: 1.1 }}
        />
        <motion.line
          x1={PADDING}
          x2={width - PADDING}
          y1={avgUploadY}
          y2={avgUploadY}
          stroke="var(--vln-accent-2)"
          strokeWidth={1.25}
          strokeDasharray="5 4"
          opacity={0.5}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ duration: 0.6, delay: 1.2 }}
        />
        <motion.text
          x={width - PADDING - 4}
          y={avgDownloadY - 6}
          textAnchor="end"
          fontSize={9.5}
          fill="var(--vln-accent)"
          className="font-mono tabular"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.9 }}
          transition={{ duration: 0.5, delay: 1.3 }}
        >
          avg {avgDownload.toFixed(1)}
        </motion.text>
        <motion.text
          x={width - PADDING - 4}
          y={avgUploadY - 6}
          textAnchor="end"
          fontSize={9.5}
          fill="var(--vln-accent-2)"
          className="font-mono tabular"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.9 }}
          transition={{ duration: 0.5, delay: 1.4 }}
        >
          avg {avgUpload.toFixed(1)}
        </motion.text>

        {/* the live curves */}
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