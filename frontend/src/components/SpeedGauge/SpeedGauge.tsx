import { useEffect, useId, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { formatMbps } from "../../utils/formatSpeed";

interface SpeedGaugeProps {
  value: number;
  phaseLabel: string;
  size?: number;
  reducedMotion?: boolean;
}

const SWEEP_DEG = 270;
const START_DEG = 135;
const RADIUS = 128;
const CENTER = 160;

/**
 * Rounds up to a clean scale ceiling so the gauge always has
 * readable and predictable tick values.
 */
function niceCeil(n: number): number {
  const steps = [10, 25, 50, 100, 150, 250, 500, 750, 1000, 1500, 2000, 5000];

  for (const s of steps) {
    if (n <= s * 0.92) return s;
  }

  return Math.ceil(n / 1000) * 1000;
}

function polarPoint(radius: number, angleDeg: number) {
  const rad = (angleDeg * Math.PI) / 180;

  return {
    x: CENTER + radius * Math.cos(rad),
    y: CENTER + radius * Math.sin(rad),
  };
}

export function SpeedGauge({
  value,
  phaseLabel,
  size = 340,
  reducedMotion = false,
}: SpeedGaugeProps) {
  const [maxScale, setMaxScale] = useState(100);
  const peakRef = useRef(0);

  /*
   * Generate unique SVG IDs.
   *
   * Without this, rendering multiple SpeedGauge components on the same
   * page can cause gradients/filters to reference the wrong SVG element.
   */
  const rawId = useId();
  const uniqueId = rawId.replace(/[^a-zA-Z0-9_-]/g, "");

  const gradientId = `vln-arc-gradient-${uniqueId}`;
  const glowId = `vln-glow-${uniqueId}`;
  const glowSoftId = `vln-glow-soft-${uniqueId}`;
  const discId = `vln-disc-gradient-${uniqueId}`;

  /*
   * Keep the scale adaptive during a test.
   * The scale only increases during the current session so the gauge
   * doesn't constantly jump between ranges while the speed fluctuates.
   */
  useEffect(() => {
    if (!Number.isFinite(value) || value <= peakRef.current) {
      return;
    }

    peakRef.current = value;

    setMaxScale((prev) => {
      const suggested = niceCeil(value * 1.2);
      return suggested > prev ? suggested : prev;
    });
  }, [value]);

  /*
   * Reset the adaptive scale when a fresh test starts.
   */
  useEffect(() => {
    if (value < 0.5 && peakRef.current > 5) {
      peakRef.current = 0;
      setMaxScale(100);
    }
  }, [value]);

  const circumference = 2 * Math.PI * RADIUS;
  const arcLength = circumference * (SWEEP_DEG / 360);

  const fraction = Math.min(Math.max(value / maxScale, 0), 1);

  const activeArcOffset = arcLength - arcLength * fraction;

  /*
   * Major ticks.
   */
  const ticks = useMemo(() => {
    const majorCount = 9;

    return Array.from({ length: majorCount }, (_, i) => {
      const angle = START_DEG + (SWEEP_DEG * i) / (majorCount - 1);

      const labelValue = Math.round((maxScale * i) / (majorCount - 1));

      const outer = polarPoint(RADIUS + 14, angle);
      const inner = polarPoint(RADIUS + 4, angle);
      const labelPos = polarPoint(RADIUS + 30, angle);

      return {
        angle,
        outer,
        inner,
        labelValue,
        labelPos,
      };
    });
  }, [maxScale]);

  /*
   * Minor ticks.
   */
  const minorTicks = useMemo(() => {
    const minorCount = 45;

    return Array.from({ length: minorCount }, (_, i) => {
      const angle = START_DEG + (SWEEP_DEG * i) / (minorCount - 1);

      const outer = polarPoint(RADIUS + 10, angle);
      const inner = polarPoint(RADIUS + 4, angle);

      return {
        angle,
        outer,
        inner,
      };
    });
  }, []);

  /*
   * Indicator position.
   *
   * This intentionally remains derived from the current measured value,
   * while Framer Motion handles the visual interpolation.
   */
  const indicatorPoint = useMemo(
    () => polarPoint(RADIUS - 2, START_DEG + SWEEP_DEG * fraction),
    [fraction]
  );

  const formattedValue = formatMbps(value, value >= 100 ? 1 : 2);
  const isActive = value > 0.5;

  return (
    <div className="relative select-none flex items-center justify-center" style={{ width: size, height: size }}>
      {/* decorative outer instrument rings — pure HUD ornament, counter-rotating */}
      <div
        className={`absolute rounded-full border border-dashed border-border/70 ${reducedMotion ? "" : "animate-spinSlow"}`}
        style={{ width: size * 1.14, height: size * 1.14 }}
        aria-hidden="true"
      />
      <div
        className={`absolute rounded-full border border-border/40 ${reducedMotion ? "" : "animate-spinSlowReverse"}`}
        style={{ width: size * 1.24, height: size * 1.24 }}
        aria-hidden="true"
      />
      {/* soft ambient halo that blooms while a measurement is active */}
      <div
        className="absolute rounded-full transition-opacity duration-700"
        style={{
          width: size * 0.9,
          height: size * 0.9,
          background: "radial-gradient(circle, var(--vln-accent-glow) 0%, transparent 70%)",
          opacity: isActive ? 0.9 : 0.25,
          filter: "blur(6px)",
        }}
        aria-hidden="true"
      />

      <svg
        viewBox="0 0 320 320"
        width={size}
        height={size}
        role="img"
        aria-label={`${phaseLabel}: ${formattedValue} megabits per second`}
        className="relative"
      >
        <defs>
          <filter id={glowId} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <filter id={glowSoftId} x="-80%" y="-80%" width="260%" height="260%">
            <feGaussianBlur stdDeviation="14" />
          </filter>

          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--vln-accent-2)" />
            <stop offset="100%" stopColor="var(--vln-accent)" />
          </linearGradient>

          <radialGradient id={discId} cx="50%" cy="35%" r="70%">
            <stop offset="0%" stopColor="var(--vln-elevated)" />
            <stop offset="100%" stopColor="var(--vln-surface)" />
          </radialGradient>
        </defs>

        {/* glass instrument face behind everything */}
        <circle cx={CENTER} cy={CENTER} r={RADIUS - 20} fill={`url(#${discId})`} stroke="var(--vln-border)" strokeWidth={1} />

        {/* soft bloom duplicate of the progress arc, sits under the crisp one */}
        <motion.circle
          cx={CENTER}
          cy={CENTER}
          r={RADIUS}
          fill="none"
          stroke="var(--vln-accent)"
          strokeWidth={10}
          strokeLinecap="round"
          filter={`url(#${glowSoftId})`}
          opacity={0.55}
          strokeDasharray={`${arcLength} ${circumference}`}
          transform={`rotate(${START_DEG} ${CENTER} ${CENTER})`}
          initial={false}
          animate={{ strokeDashoffset: activeArcOffset }}
          transition={reducedMotion ? { duration: 0 } : { type: "spring", stiffness: 90, damping: 20 }}
        />

        {/* Background track */}
        <circle
          cx={CENTER}
          cy={CENTER}
          r={RADIUS}
          fill="none"
          stroke="var(--vln-border)"
          strokeWidth={3}
          strokeLinecap="round"
          strokeDasharray={`${arcLength} ${circumference}`}
          transform={`rotate(${START_DEG} ${CENTER} ${CENTER})`}
        />

        {/* Minor ticks */}
        {minorTicks.map((tick, i) => (
          <line
            key={`minor-${i}`}
            x1={tick.inner.x}
            y1={tick.inner.y}
            x2={tick.outer.x}
            y2={tick.outer.y}
            stroke="var(--vln-text-muted)"
            strokeWidth={1}
            opacity={0.4}
          />
        ))}

        {/* Major ticks + labels */}
        {ticks.map((tick, i) => (
          <g key={`major-${i}`}>
            <line
              x1={tick.inner.x}
              y1={tick.inner.y}
              x2={tick.outer.x}
              y2={tick.outer.y}
              stroke="var(--vln-text-secondary)"
              strokeWidth={2}
            />

            <text
              x={tick.labelPos.x}
              y={tick.labelPos.y}
              fontSize={9}
              fill="var(--vln-text-muted)"
              textAnchor="middle"
              dominantBaseline="middle"
              className="font-mono tabular"
            >
              {tick.labelValue}
            </text>
          </g>
        ))}

        {/* Active progress arc */}
        <motion.circle
          cx={CENTER}
          cy={CENTER}
          r={RADIUS}
          fill="none"
          stroke={`url(#${gradientId})`}
          strokeWidth={5}
          strokeLinecap="round"
          filter={`url(#${glowId})`}
          strokeDasharray={`${arcLength} ${circumference}`}
          transform={`rotate(${START_DEG} ${CENTER} ${CENTER})`}
          initial={false}
          animate={{ strokeDashoffset: activeArcOffset }}
          transition={reducedMotion ? { duration: 0 } : { type: "spring", stiffness: 90, damping: 20 }}
        />

        {/* Position indicator */}
        {value > 0 && (
          <motion.circle
            r={5}
            fill="var(--vln-accent)"
            filter={`url(#${glowId})`}
            initial={{ cx: indicatorPoint.x, cy: indicatorPoint.y }}
            animate={{ cx: indicatorPoint.x, cy: indicatorPoint.y }}
            transition={reducedMotion ? { duration: 0 } : { type: "spring", stiffness: 90, damping: 20 }}
          />
        )}
      </svg>

      {/* Center readout */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        <span className="flex items-center gap-1.5 text-[11px] tracking-[0.2em] uppercase text-muted font-medium mb-1.5">
          {isActive && <span className="w-1.5 h-1.5 rounded-full bg-accent shadow-glow animate-pulse" />}
          {phaseLabel}
        </span>

        <span
          className="tabular font-extrabold leading-none text-gradient"
          style={{ fontSize: size * 0.17, letterSpacing: "-0.02em" }}
        >
          {formattedValue}
        </span>

        <span className="text-[11px] tracking-[0.3em] uppercase text-secondary mt-2 font-semibold">Mbps</span>
      </div>
    </div>
  );
}