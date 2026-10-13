import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Gamepad2, ArrowRight } from "lucide-react";
import { Seo } from "../components/Seo/Seo";
import { BackButton } from "../components/BackButton/BackButton";

const easeOut = [0.22, 1, 0.36, 1] as const;

const REQUIREMENTS = [
  { label: "Download speed", value: "15-25 Mbps", note: "Most online games need surprisingly little bandwidth — the game itself sends small data packets, not video." },
  { label: "Upload speed", value: "3-5 Mbps", note: "Needed to send your actions back to the game server quickly and reliably." },
  { label: "Ping / latency", value: "Under 50ms ideal", note: "The single most important number for competitive gaming — directly affects how responsive the game feels." },
  { label: "Jitter", value: "Under 10ms ideal", note: "Inconsistent ping causes rubber-banding and unpredictable hit registration, even if average ping looks fine." },
];

const TIPS = [
  "Connect via Ethernet instead of Wi-Fi when possible — it removes wireless interference as a variable entirely.",
  "Close bandwidth-heavy background apps (cloud backups, downloads, streaming on other devices) before a competitive session.",
  "Choose game servers physically closer to you when the option exists — distance is the biggest driver of ping.",
  "If your router supports QoS (Quality of Service), prioritizing gaming traffic can reduce lag spikes caused by other devices on the network.",
];

export function GamingSpeed() {
  return (
    <div className="max-w-2xl mx-auto px-5 sm:px-8 pt-14 sm:pt-20 pb-16">
      <Seo
        title="Best Internet Speed for Gaming"
        description="What internet speed, ping, and jitter you actually need for online gaming — and why low latency matters more than high download speed."
        canonicalPath="/gaming-internet-speed"
      />

      <BackButton />

      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: easeOut }}
        className="text-center mb-10"
      >
        <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border bg-elevated/60 text-[11px] tracking-[0.16em] uppercase text-secondary font-semibold">
          <Gamepad2 size={12} className="text-accent" />
          Gaming
        </span>
        <h1 className="mt-5 text-3xl sm:text-4xl font-extrabold tracking-tight text-gradient">
          Best Internet Speed for Gaming
        </h1>
        <p className="mt-4 text-sm text-muted max-w-lg mx-auto leading-relaxed">
          Gaming is one of the few activities where raw speed matters less than consistency. Here's what actually
          affects your experience, and what to check first.
        </p>
      </motion.div>

      <div className="grid sm:grid-cols-2 gap-3 mb-10">
        {REQUIREMENTS.map((r, i) => (
          <motion.div
            key={r.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.05 + i * 0.05, ease: easeOut }}
            className="card-premium rounded-2xl p-5"
          >
            <p className="text-[11px] tracking-[0.14em] uppercase text-muted font-semibold mb-1">{r.label}</p>
            <p className="text-lg font-bold text-accent mb-2">{r.value}</p>
            <p className="text-xs text-secondary leading-relaxed">{r.note}</p>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1, ease: easeOut }}
        className="card-premium rounded-2xl p-6 sm:p-7 mb-6"
      >
        <h2 className="text-sm font-semibold text-primary mb-2">Why ping beats bandwidth for gaming</h2>
        <p className="text-sm text-secondary leading-relaxed">
          A game sends your inputs to a server and waits for a response to update what you see — that round trip
          is the ping. A 1 Gbps connection with 120ms ping will feel worse in a fast-paced game than a 25 Mbps
          connection with 20ms ping, because the game is bottlenecked by how quickly actions register, not how
          much data could theoretically move.
        </p>
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="text-sm font-semibold text-primary mb-3"
      >
        Tips to reduce lag
      </motion.h2>

      <ul className="flex flex-col gap-2.5 mb-10">
        {TIPS.map((tip, i) => (
          <motion.li
            key={tip}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.05 + i * 0.05, ease: easeOut }}
            className="card-premium rounded-xl px-4 py-3 text-sm text-secondary leading-relaxed"
          >
            {tip}
          </motion.li>
        ))}
      </ul>

      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="rounded-2xl border border-accent/30 bg-accent/5 p-6 flex flex-col sm:flex-row items-center gap-4 justify-between"
      >
        <p className="text-sm text-primary font-medium">Check your ping and speed before your next match.</p>
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