import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowDownToLine, ArrowRight } from "lucide-react";
import { Seo } from "../components/Seo/Seo";
import { BackButton } from "../components/BackButton/BackButton";

const easeOut = [0.22, 1, 0.36, 1] as const;

const USE_CASES = [
  { range: "Under 10 Mbps", body: "Basic browsing, email, and standard-definition video. Struggles with HD streaming or multiple devices at once." },
  { range: "25-50 Mbps", body: "Comfortable HD streaming, video calls, and browsing for a household with a few devices active at the same time." },
  { range: "100-300 Mbps", body: "Smooth 4K streaming, fast large file downloads, and several devices in heavy use simultaneously without competing for bandwidth." },
  { range: "500+ Mbps", body: "Multiple 4K streams, large file transfers, and bandwidth-heavy work (video editing uploads, big game downloads) all at once with room to spare." },
];

export function DownloadSpeed() {
  return (
    <div className="max-w-2xl mx-auto px-5 sm:px-8 pt-14 sm:pt-20 pb-16">
      <Seo
        title="What Is Download Speed?"
        description="Download speed explained: what it measures, how many Mbps you actually need for streaming, gaming, and video calls, and why it's usually higher than upload speed."
        canonicalPath="/download-speed"
      />

      <BackButton />

      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: easeOut }}
        className="text-center mb-10"
      >
        <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border bg-elevated/60 text-[11px] tracking-[0.16em] uppercase text-secondary font-semibold">
          <ArrowDownToLine size={12} className="text-accent" />
          Download speed
        </span>
        <h1 className="mt-5 text-3xl sm:text-4xl font-extrabold tracking-tight text-gradient">
          What Is Download Speed?
        </h1>
        <p className="mt-4 text-sm text-muted max-w-lg mx-auto leading-relaxed">
          Download speed is how fast data travels from the internet to your device — it's what determines how
          quickly a page loads, a video buffers, or a file finishes downloading.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.08, ease: easeOut }}
        className="card-premium rounded-2xl p-6 sm:p-7 mb-6"
      >
        <h2 className="text-sm font-semibold text-primary mb-2">How it's measured</h2>
        <p className="text-sm text-secondary leading-relaxed">
          A speed test opens one or more connections to a server and streams real data back to your device,
          timing how many megabits arrive per second. VLN Speed does this with actual network transfers — not an
          estimate — and samples throughput multiple times a second so the result reflects how your connection
          behaves over the whole test, not just a single instant.
        </p>
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="text-sm font-semibold text-primary mb-3"
      >
        How much download speed do you need?
      </motion.h2>

      <div className="flex flex-col gap-3 mb-10">
        {USE_CASES.map((u, i) => (
          <motion.div
            key={u.range}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.05 + i * 0.05, ease: easeOut }}
            className="card-premium rounded-2xl p-5"
          >
            <h3 className="text-sm font-semibold text-accent mb-1.5">{u.range}</h3>
            <p className="text-sm text-secondary leading-relaxed">{u.body}</p>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="card-premium rounded-2xl p-6 sm:p-7 mb-10"
      >
        <h2 className="text-sm font-semibold text-primary mb-2">Why download is usually faster than upload</h2>
        <p className="text-sm text-secondary leading-relaxed">
          Most home internet plans (especially cable and DSL) are built asymmetrically — more capacity is
          allocated to download than upload, because most home use (browsing, streaming, downloading) is
          download-heavy. Fiber connections often break from this pattern and offer symmetric or near-symmetric
          speeds in both directions.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="rounded-2xl border border-accent/30 bg-accent/5 p-6 flex flex-col sm:flex-row items-center gap-4 justify-between"
      >
        <p className="text-sm text-primary font-medium">Check your actual download speed right now.</p>
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