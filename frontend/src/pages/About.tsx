
import { motion } from "framer-motion";
import { Radio, ArrowLeftRight, ShieldCheck, Sparkles, Check } from "lucide-react";

const easeOut = [0.22, 1, 0.36, 1] as const;

const STEPS = [
  {
    icon: Radio,
    title: "Ping & jitter",
    body: "A series of real round trips to the test server times your latency, and the variance between them becomes jitter.",
  },
  {
    icon: ArrowLeftRight,
    title: "Download & upload",
    body: "Multiple parallel transfers run over a short window. Throughput is sampled several times a second — not once at the end.",
  },
  {
    icon: ShieldCheck,
    title: "Quality score",
    body: "Excellent / Good / Fair / Slow comes from fixed, documented thresholds on all four numbers — never a hidden formula.",
  },
];

const PRINCIPLES = [
  "Every number on the result screen traces back to a real network transfer",
  "No setInterval-generated numbers pretending to be a measurement",
  "Download and upload run in parallel streams, sampled ~5× per second",
  "Quality thresholds are fixed in one file and never hidden from you",
];

export function About() {
  return (
    <div className="relative">
      <div className="max-w-2xl mx-auto px-5 sm:px-8 pt-14 sm:pt-20 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: easeOut }}
          className="text-center"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border bg-elevated/60 text-[11px] tracking-[0.16em] uppercase text-secondary font-semibold">
            <Sparkles size={12} className="text-accent" />
            How it works
          </span>
          <h1 className="mt-5 text-3xl sm:text-4xl font-extrabold tracking-tight text-gradient">About VLN Speed</h1>
          <p className="mt-4 text-sm sm:text-base text-secondary leading-relaxed max-w-xl mx-auto">
            VLN Speed measures your connection the direct way: real ping requests, real bytes streamed down, real
            bytes uploaded back — timed as they happen. Nothing on the result screen is simulated.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-3 gap-4 mt-12">
          {STEPS.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.08, ease: easeOut }}
              whileHover={{ y: -3 }}
              className="card-premium rounded-2xl p-5 flex flex-col gap-3"
            >
              <span className="w-9 h-9 rounded-xl bg-accent/10 flex items-center justify-center text-accent">
                <step.icon size={17} />
              </span>
              <h3 className="text-sm font-semibold text-primary">{step.title}</h3>
              <p className="text-xs text-secondary leading-relaxed">{step.body}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4, ease: easeOut }}
          className="card-premium rounded-2xl p-6 sm:p-7 mt-6"
        >
          <h3 className="text-[11px] tracking-[0.2em] uppercase text-muted font-semibold mb-4">Our commitment</h3>
          <ul className="flex flex-col gap-3">
            {PRINCIPLES.map((p, i) => (
              <motion.li
                key={p}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.5 + i * 0.06, ease: easeOut }}
                className="flex items-start gap-3 text-sm text-secondary"
              >
                <span className="mt-0.5 w-4 h-4 rounded-full bg-success/15 text-success flex items-center justify-center shrink-0">
                  <Check size={10} strokeWidth={3} />
                </span>
                {p}
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>
    </div>
  );
}