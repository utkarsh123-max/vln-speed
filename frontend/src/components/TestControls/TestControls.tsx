import { motion } from "framer-motion";
import { Play, Square, RotateCcw } from "lucide-react";
import type { TestPhase } from "../../types";

interface TestControlsProps {
  phase: TestPhase;
  onStart: () => void;
  onCancel: () => void;
  onReset: () => void;
}

const ACTIVE_PHASES: TestPhase[] = ["initializing", "ping", "download", "upload", "analyzing"];

export function TestControls({ phase, onStart, onCancel, onReset }: TestControlsProps) {
  const isActive = ACTIVE_PHASES.includes(phase);
  const isComplete = phase === "complete" || phase === "error";

  if (isActive) {
    return (
      <motion.button
        onClick={onCancel}
        whileTap={{ scale: 0.94 }}
        whileHover={{ scale: 1.03 }}
        className="relative flex items-center justify-center w-24 h-24 rounded-full bg-elevated border border-border text-secondary hover:text-primary transition-colors"
        aria-label="Stop test"
      >
        <span className="absolute inset-0 rounded-full border border-accent/40 animate-pulseRing" />
        <Square size={22} fill="currentColor" />
      </motion.button>
    );
  }

  if (isComplete) {
    return (
      <motion.button
        onClick={onReset}
        whileTap={{ scale: 0.94 }}
        whileHover={{ scale: 1.03 }}
        className="flex items-center gap-2 px-6 py-3 rounded-full bg-elevated border border-border text-primary font-semibold hover:border-accent/50 transition-colors"
      >
        <RotateCcw size={16} />
        Test again
      </motion.button>
    );
  }

  return (
    <motion.button
      onClick={onStart}
      whileTap={{ scale: 0.92 }}
      whileHover="hover"
      initial="rest"
      animate="rest"
      className="group relative flex items-center justify-center w-28 h-28 rounded-full text-bg font-bold shadow-glow-lg"
      style={{ background: "linear-gradient(135deg, var(--vln-accent), var(--vln-accent-2))" }}
      aria-label="Start speed test"
    >
      {/* breathing halo, idle state */}
      <span className="absolute inset-0 rounded-full border border-accent/50 animate-pulseRing" />
      <span className="absolute -inset-2 rounded-full border border-accent/20 animate-pulseRing" style={{ animationDelay: "0.6s" }} />

      {/* rotating sheen on hover */}
      <motion.span
        variants={{ rest: { rotate: 0 }, hover: { rotate: 180 } }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="absolute inset-0 rounded-full overflow-hidden"
        aria-hidden="true"
      >
        <span
          className="absolute inset-0"
          style={{ background: "conic-gradient(from 0deg, transparent 0%, rgba(255,255,255,0.35) 12%, transparent 24%)" }}
        />
      </motion.span>

      <motion.span
        variants={{ rest: { scale: 1 }, hover: { scale: 1.06 } }}
        transition={{ duration: 0.25 }}
        className="relative flex flex-col items-center gap-1"
      >
        <Play size={22} fill="currentColor" className="ml-0.5" />
        <span className="text-[11px] tracking-[0.18em] uppercase">Start</span>
      </motion.span>
    </motion.button>
  );
}