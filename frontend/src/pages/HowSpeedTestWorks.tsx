import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Workflow, ArrowRight, Radio, ArrowDownToLine, ArrowUpFromLine, BarChart3 } from "lucide-react";
import { Seo } from "../components/Seo/Seo";
import { BackButton } from "../components/BackButton/BackButton";

const easeOut = [0.22, 1, 0.36, 1] as const;

const STEPS = [
  {
    icon: Radio,
    title: "1. Finding a server and measuring ping",
    body: "Your browser first checks that the test server is reachable, then sends a series of small round-trip requests and times how long each one takes. The average becomes your ping, and the variation between them becomes jitter.",
  },
  {
    icon: ArrowDownToLine,
    title: "2. Streaming real data down",
    body: "The server streams real bytes to your device over a short window. Your browser reads this data as it arrives and timestamps it several times a second, so the test captures how your connection performs throughout — not just a single snapshot.",
  },
  {
    icon: ArrowUpFromLine,
    title: "3. Sending real data up",
    body: "Your browser then uploads real data back to the server in chunks, tracking real upload-progress events as bytes leave your device. This measures your actual upload throughput, independent of your download result.",
  },
  {
    icon: BarChart3,
    title: "4. Calculating your result",
    body: "The samples collected during download and upload are averaged into your final Mbps numbers. Your connection quality (Excellent / Good / Fair / Slow) is then calculated from fixed, documented thresholds on download speed, upload speed, ping, and jitter together — not from a single hidden score.",
  },
];

export function HowSpeedTestWorks() {
  return (
    <div className="max-w-2xl mx-auto px-5 sm:px-8 pt-4 sm:pt-6 pb-16">
      <Seo
        title="How Internet Speed Tests Work"
        description="A step-by-step look at how VLN Speed measures your connection — from the ping phase to real data streaming and how your final result is calculated."
        canonicalPath="/how-speed-test-works"
      />

      <BackButton />

      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: easeOut }}
        className="text-center mb-10"
      >
        <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border bg-elevated/60 text-[11px] tracking-[0.16em] uppercase text-secondary font-semibold">
          <Workflow size={12} className="text-accent" />
          Under the hood
        </span>
        <h1 className="mt-5 text-3xl sm:text-4xl font-extrabold tracking-tight text-gradient">
          How Internet Speed Tests Work
        </h1>
        <p className="mt-4 text-sm text-muted max-w-lg mx-auto leading-relaxed">
          A speed test isn't a guess or an estimate — it's a real, timed transfer of data. Here's exactly what
          happens between clicking "Start" and seeing your result.
        </p>
      </motion.div>

      <div className="flex flex-col gap-3 mb-10">
        {STEPS.map((s, i) => (
          <motion.div
            key={s.title}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.05 + i * 0.07, ease: easeOut }}
            className="card-premium rounded-2xl p-5 flex gap-4"
          >
            <span className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center text-accent shrink-0">
              <s.icon size={18} />
            </span>
            <div>
              <h3 className="text-sm font-semibold text-primary mb-1.5">{s.title}</h3>
              <p className="text-sm text-secondary leading-relaxed">{s.body}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.35, ease: easeOut }}
        className="card-premium rounded-2xl p-6 sm:p-7 mb-6"
      >
        <h2 className="text-sm font-semibold text-primary mb-2">Why multiple samples matter</h2>
        <p className="text-sm text-secondary leading-relaxed">
          A single speed reading can be misleading — a brief spike or dip doesn't represent your connection well.
          By sampling throughput several times a second throughout the download and upload phases, the test
          smooths out momentary noise while still capturing real slowdowns, giving you an average that reflects
          how the connection actually behaved, not a lucky or unlucky instant.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4, ease: easeOut }}
        className="card-premium rounded-2xl p-6 sm:p-7 mb-10"
      >
        <h2 className="text-sm font-semibold text-primary mb-2">What makes this different from a fake number</h2>
        <p className="text-sm text-secondary leading-relaxed">
          Nothing in this process is simulated. The ping phase sends real network requests. The download phase
          streams real bytes from a server. The upload phase sends real bytes from your browser. If your
          connection genuinely slows down mid-test, the result reflects that — the tool has no way to fake a
          better number than what actually happened on the wire.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.45 }}
        className="rounded-2xl border border-accent/30 bg-accent/5 p-6 flex flex-col sm:flex-row items-center gap-4 justify-between"
      >
        <p className="text-sm text-primary font-medium">See it happen in real time.</p>
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:gap-2.5 transition-all shrink-0"
        >
          Run a speed test <ArrowRight size={15} />
        </Link>
      </motion.div>
    </div>
  );
}