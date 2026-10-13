import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Radio, ArrowRight } from "lucide-react";
import { Seo } from "../components/Seo/Seo";
import { BackButton } from "../components/BackButton/BackButton";

const easeOut = [0.22, 1, 0.36, 1] as const;

const RANGES = [
  { range: "Under 20ms", label: "Excellent", body: "Feels instant. Ideal for competitive gaming and professional video production tools." },
  { range: "20-50ms", label: "Very good", body: "Smooth for gaming, calls, and anything real-time. Most fiber and good cable connections land here." },
  { range: "50-100ms", label: "Good", body: "Fine for calls and casual gaming. Fast-paced competitive games may feel slightly less responsive." },
  { range: "100-150ms", label: "Noticeable", body: "Calls and games start to feel laggy. Usually caused by distance to server, satellite internet, or network congestion." },
  { range: "150ms+", label: "High", body: "Clearly noticeable delay in calls and games. Browsing and streaming are usually still fine since they aren't as time-sensitive." },
];

export function PingLatency() {
  return (
    <div className="max-w-2xl mx-auto px-5 sm:px-8 pt-14 sm:pt-20 pb-16">
      <Seo
        title="What Is Ping / Latency?"
        description="Ping and latency explained: what good ping looks like for gaming and calls, why it's different from download speed, and what causes high ping."
        canonicalPath="/ping-latency"
      />

      <BackButton />

      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: easeOut }}
        className="text-center mb-10"
      >
        <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border bg-elevated/60 text-[11px] tracking-[0.16em] uppercase text-secondary font-semibold">
          <Radio size={12} className="text-accent" />
          Ping &amp; latency
        </span>
        <h1 className="mt-5 text-3xl sm:text-4xl font-extrabold tracking-tight text-gradient">
          What Is Ping / Latency?
        </h1>
        <p className="mt-4 text-sm text-muted max-w-lg mx-auto leading-relaxed">
          Ping is the time it takes a small signal to travel from your device to a server and back, measured in
          milliseconds (ms). It's not about how much data moves — it's about how quickly a round trip happens.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.08, ease: easeOut }}
        className="card-premium rounded-2xl p-6 sm:p-7 mb-6"
      >
        <h2 className="text-sm font-semibold text-primary mb-2">Why ping matters even with fast download speed</h2>
        <p className="text-sm text-secondary leading-relaxed">
          Download speed measures how much data arrives; ping measures how fast a signal responds. You can have a
          500 Mbps connection and still feel lag in a game if ping is high — the game action depends on quick
          round trips, not raw throughput. This is why satellite internet, despite often having decent download
          speeds, feels laggy in real-time applications — the physical distance to the satellite adds latency no
          amount of bandwidth can fix.
        </p>
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="text-sm font-semibold text-primary mb-3"
      >
        What counts as good ping?
      </motion.h2>

      <div className="flex flex-col gap-3 mb-10">
        {RANGES.map((r, i) => (
          <motion.div
            key={r.range}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.05 + i * 0.05, ease: easeOut }}
            className="card-premium rounded-2xl p-5 flex items-start gap-4"
          >
            <div className="shrink-0">
              <span className="text-sm font-semibold text-accent">{r.range}</span>
              <p className="text-[11px] text-muted uppercase tracking-wide mt-0.5">{r.label}</p>
            </div>
            <p className="text-sm text-secondary leading-relaxed">{r.body}</p>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="card-premium rounded-2xl p-6 sm:p-7 mb-10"
      >
        <h2 className="text-sm font-semibold text-primary mb-2">What causes high ping?</h2>
        <p className="text-sm text-secondary leading-relaxed">
          The biggest factor is physical distance — a server across the world will always have higher latency than
          one in your city, no matter how fast your connection is. Beyond distance: Wi-Fi interference, an
          overloaded router, network congestion during peak hours, and the type of connection (satellite tends to
          have the highest latency, fiber the lowest) all play a role.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="rounded-2xl border border-accent/30 bg-accent/5 p-6 flex flex-col sm:flex-row items-center gap-4 justify-between"
      >
        <p className="text-sm text-primary font-medium">Check your actual ping right now.</p>
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