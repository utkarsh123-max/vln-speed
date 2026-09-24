import { useState } from "react";
import { motion } from "framer-motion";
import { Copy, Share2, Download, Check } from "lucide-react";
import type { SpeedTestResult } from "../../types";
import { QUALITY_LABEL, QUALITY_SCORE } from "../../utils/calculateQuality";
import { formatMbps } from "../../utils/formatSpeed";

interface ResultCardProps {
  result: SpeedTestResult;
}

const QUALITY_COLOR: Record<string, string> = {
  excellent: "var(--vln-success)",
  good: "var(--vln-accent)",
  fair: "var(--vln-warning)",
  slow: "var(--vln-danger)",
};

function QualityIndicator({ quality }: { quality: SpeedTestResult["quality"] }) {
  const score = QUALITY_SCORE[quality];
  const segments = 20;
  const filled = Math.round(score * segments);
  const color = QUALITY_COLOR[quality];

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <span className="text-[11px] tracking-[0.2em] uppercase text-muted font-semibold">Connection quality</span>
        <span className="text-sm font-semibold" style={{ color }}>
          {QUALITY_LABEL[quality]}
        </span>
      </div>
      <div className="flex gap-1">
        {Array.from({ length: segments }, (_, i) => (
          <motion.span
            key={i}
            initial={{ scaleY: 0.3, opacity: 0.3 }}
            animate={{ scaleY: 1, opacity: i < filled ? 1 : 0.25 }}
            transition={{ delay: i * 0.02, duration: 0.25 }}
            className="h-3 flex-1 rounded-sm origin-bottom"
            style={{ backgroundColor: i < filled ? color : "var(--vln-border)" }}
          />
        ))}
      </div>
    </div>
  );
}

export function ResultCard({ result }: ResultCardProps) {
  const [copied, setCopied] = useState(false);

  const shareText = `VLN Speed — ${formatMbps(result.download.avgMbps)} Mbps down / ${formatMbps(
    result.upload.avgMbps
  )} Mbps up / ${Math.round(result.ping.avgMs)} ms ping · ${QUALITY_LABEL[result.quality]} connection`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareText);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard unavailable — silently ignore */
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title: "VLN Speed result", text: shareText });
      } catch {
        /* user cancelled share sheet — no-op */
      }
    } else {
      handleCopy();
    }
  };

  const handleDownloadImage = () => {
    const canvas = document.createElement("canvas");
    const scale = 2;
    canvas.width = 640 * scale;
    canvas.height = 360 * scale;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.scale(scale, scale);

    // background
    const grad = ctx.createLinearGradient(0, 0, 640, 360);
    grad.addColorStop(0, "#07090D");
    grad.addColorStop(1, "#0D1117");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 640, 360);

    ctx.strokeStyle = "rgba(255,255,255,0.08)";
    ctx.lineWidth = 1;
    ctx.strokeRect(0.5, 0.5, 639, 359);

    ctx.fillStyle = "#4CC9F0";
    ctx.font = "700 20px Inter, sans-serif";
    ctx.fillText("VLN SPEED", 40, 56);

    ctx.fillStyle = "#F5F7FA";
    ctx.font = "800 52px Inter, sans-serif";
    ctx.fillText(formatMbps(result.download.avgMbps), 40, 140);
    ctx.fillStyle = "#8C96A5";
    ctx.font = "600 13px Inter, sans-serif";
    ctx.fillText("DOWNLOAD (MBPS)", 40, 160);

    ctx.fillStyle = "#F5F7FA";
    ctx.font = "800 36px Inter, sans-serif";
    ctx.fillText(formatMbps(result.upload.avgMbps), 340, 128);
    ctx.fillStyle = "#8C96A5";
    ctx.font = "600 12px Inter, sans-serif";
    ctx.fillText("UPLOAD (MBPS)", 340, 148);

    ctx.fillStyle = "#F5F7FA";
    ctx.font = "800 36px Inter, sans-serif";
    ctx.fillText(`${Math.round(result.ping.avgMs)}`, 340, 200);
    ctx.fillStyle = "#8C96A5";
    ctx.font = "600 12px Inter, sans-serif";
    ctx.fillText("PING (MS)", 340, 220);

    ctx.fillStyle = QUALITY_COLOR[result.quality];
    ctx.font = "700 18px Inter, sans-serif";
    ctx.fillText(`${QUALITY_LABEL[result.quality]} connection`, 40, 260);

    ctx.fillStyle = "#56606F";
    ctx.font = "500 13px Inter, sans-serif";
    ctx.fillText("vlnspeed.com", 40, 320);

    const link = document.createElement("a");
    link.download = `vln-speed-result-${result.id.slice(0, 8)}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  return (
    <div className="relative card-premium rounded-3xl p-6 sm:p-8 flex flex-col gap-6 overflow-hidden animate-fadeUp">
      <span
        className="absolute inset-x-0 top-0 h-1"
        style={{ background: `linear-gradient(90deg, transparent, ${QUALITY_COLOR[result.quality]}, transparent)` }}
        aria-hidden="true"
      />
      <div>
        <span className="text-[11px] tracking-[0.24em] uppercase text-accent font-semibold">Test complete</span>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-4">
          <ResultStat label="Download" value={formatMbps(result.download.avgMbps)} unit="Mbps" primary />
          <ResultStat label="Upload" value={formatMbps(result.upload.avgMbps)} unit="Mbps" primary />
          <ResultStat label="Ping" value={`${Math.round(result.ping.avgMs)}`} unit="ms" />
          <ResultStat label="Jitter" value={`${Math.round(result.ping.jitterMs)}`} unit="ms" />
        </div>
      </div>

      <QualityIndicator quality={result.quality} />

      <div className="flex flex-wrap gap-3 pt-2 border-t border-border">
        <ActionButton icon={copied ? Check : Copy} label={copied ? "Copied" : "Copy result"} onClick={handleCopy} />
        <ActionButton icon={Share2} label="Share" onClick={handleShare} />
        <ActionButton icon={Download} label="Download image" onClick={handleDownloadImage} />
      </div>
    </div>
  );
}

function ResultStat({ label, value, unit, primary }: { label: string; value: string; unit: string; primary?: boolean }) {
  return (
    <div>
      <div className={`tabular font-bold text-primary leading-none ${primary ? "text-3xl sm:text-4xl" : "text-2xl"}`}>{value}</div>
      <div className="text-xs text-muted mt-1.5">
        {unit} <span className="text-muted/70">·</span> {label}
      </div>
    </div>
  );
}

function ActionButton({ icon: Icon, label, onClick }: { icon: typeof Copy; label: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 px-4 py-2 rounded-xl border border-border text-sm text-secondary hover:text-primary hover:border-accent/40 hover:bg-elevated hover:-translate-y-0.5 transition-all duration-200"
    >
      <Icon size={14} />
      {label}
    </button>
  );
}