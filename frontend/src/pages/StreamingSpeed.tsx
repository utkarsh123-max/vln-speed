import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Tv, ArrowRight } from "lucide-react";
import { Seo } from "../components/Seo/Seo";
import { BackButton } from "../components/BackButton/BackButton";

const easeOut = [0.22, 1, 0.36, 1] as const;

const QUALITY_TIERS = [
  { label: "SD (480p)", value: "3-4 Mbps", note: "Standard definition — watchable on phones and small screens, noticeably soft on a TV." },
  { label: "HD (1080p)", value: "5-8 Mbps", note: "The most common streaming quality — sharp on most TVs and laptops at normal viewing distance." },
  { label: "4K Ultra HD", value: "25 Mbps", note: "Required by most major platforms for 4K playback. Needs a stable connection, not just a high peak speed." },
  { label: "4K HDR", value: "35-50 Mbps", note: "Higher bitrate HDR content needs extra headroom, especially if other devices are active on the network." },
];

export function StreamingSpeed() {
  return (
    <div className="max-w-2xl mx-auto px-5 sm:px-8 pt-14 sm:pt-20 pb-16">
      <Seo
        title="Best Internet Speed for Streaming"
        description="How much internet speed you need for Netflix, YouTube, and other streaming services at SD, HD, and 4K quality — plus why streaming buffers even on fast connections."
        canonicalPath="/streaming-internet-speed"
      />

      <BackButton />

      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: easeOut }}
        className="text-center mb-10"
      >
        <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border bg-elevated/60 text-[11px] tracking-[0.16em] uppercase text-secondary font-semibold">
          <Tv size={12} className="text-accent" />
          Streaming
        </span>
        <h1 className="mt-5 text-3xl sm:text-4xl font-extrabold tracking-tight text-gradient">
          Best Internet Speed for Streaming
        </h1>
        <p className="mt-4 text-sm text-muted max-w-lg mx-auto leading-relaxed">
          Streaming needs sustained, stable bandwidth more than peak speed — here's what each quality level
          actually requires.
        </p>
      </motion.div>

      <div className="grid sm:grid-cols-2 gap-3 mb-10">
        {QUALITY_TIERS.map((t, i) => (
          <motion.div
            key={t.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.05 + i * 0.05, ease: easeOut }}
            className="card-premium rounded-2xl p-5"
          >
            <p className="text-[11px] tracking-[0.14em] uppercase text-muted font-semibold mb-1">{t.label}</p>
            <p className="text-lg font-bold text-accent mb-2">{t.value}</p>
            <p className="text-xs text-secondary leading-relaxed">{t.note}</p>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1, ease: easeOut }}
        className="card-premium rounded-2xl p-6 sm:p-7 mb-6"
      >
        <h2 className="text-sm font-semibold text-primary mb-2">Why streaming still buffers on a fast connection</h2>
        <p className="text-sm text-secondary leading-relaxed">
          A speed test measures a short burst of maximum throughput. Streaming needs that bandwidth sustained for
          hours, shared across every other device active on your network at the same time. If a household has
          several people streaming, gaming, or video-calling simultaneously, the available bandwidth per device
          drops — which is usually the real cause of buffering, not your plan's advertised speed.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.15, ease: easeOut }}
        className="card-premium rounded-2xl p-6 sm:p-7 mb-10"
      >
        <h2 className="text-sm font-semibold text-primary mb-2">Multiple streams at once</h2>
        <p className="text-sm text-secondary leading-relaxed">
          If more than one person in your household streams at the same time, add up the requirement for each
          stream — two people watching 4K simultaneously need roughly 50 Mbps combined, not 25. Most streaming
          platforms also adapt quality automatically when bandwidth drops, so a slow connection often shows up as
          quietly reduced quality rather than an obvious error.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="rounded-2xl border border-accent/30 bg-accent/5 p-6 flex flex-col sm:flex-row items-center gap-4 justify-between"
      >
        <p className="text-sm text-primary font-medium">Check if your connection can handle 4K streaming.</p>
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