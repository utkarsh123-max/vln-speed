import { motion } from "framer-motion";
import { Radio, ArrowLeftRight, ShieldCheck, Sparkles, Check, Target } from "lucide-react";
import { Seo } from "../components/Seo/Seo";
import { BackButton } from "../components/BackButton/BackButton";

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
      <Seo
        title="About VLN Speed"
        description="VLN Speed is a free internet speed test that measures real download, upload, ping and jitter — no fake numbers, no hidden formulas. Learn how it works."
        canonicalPath="/about"
      />

      <BackButton />

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
            VLN Speed is a free tool for measuring your internet connection's real performance — download, upload,
            ping and jitter — using actual data transferred over the network, not simulated numbers.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.08, ease: easeOut }}
          className="card-premium rounded-2xl p-6 sm:p-7 mt-10 flex flex-col gap-3"
        >
          <span className="w-9 h-9 rounded-xl bg-accent/10 flex items-center justify-center text-accent">
            <Target size={17} />
          </span>
          <h2 className="text-base font-semibold text-primary">Why we built this</h2>
          <p className="text-sm text-secondary leading-relaxed">
            Most people only find out their internet is underperforming when a video call drops or a download
            crawls. ISPs advertise a headline speed, but what you actually get depends on your Wi-Fi, your router,
            how many devices are active, and the distance to the server you're testing against. VLN Speed exists so
            you can check the real number in a few seconds, understand what it means for what you're trying to do,
            and have evidence if you ever need to raise it with your provider.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-3 gap-4 mt-6">
          {STEPS.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.14 + i * 0.08, ease: easeOut }}
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

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="text-xs text-muted text-center mt-8 leading-relaxed max-w-md mx-auto"
        >
          We don't claim to be the "most accurate" or "most trusted" speed test — those are claims we can't back
          with evidence. What we can promise is that every number you see came from a real transfer, measured the
          same transparent way every time.
        </motion.p>
      </div>
    </div>
  );
}