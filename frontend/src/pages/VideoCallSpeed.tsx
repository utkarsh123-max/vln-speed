import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Video, ArrowRight } from "lucide-react";
import { Seo } from "../components/Seo/Seo";
import { BackButton } from "../components/BackButton/BackButton";

const easeOut = [0.22, 1, 0.36, 1] as const;

const PLATFORM_NEEDS = [
  { label: "1-on-1 call", down: "1.5 Mbps", up: "1.5 Mbps", note: "Standard definition video call, works on most connections without issue." },
  { label: "1-on-1 HD call", down: "3-4 Mbps", up: "3-4 Mbps", note: "Sharp video on both ends — typical for Zoom, Google Meet, or Teams in HD mode." },
  { label: "Group call (5+)", down: "8-10 Mbps", up: "3-4 Mbps", note: "Download scales with the number of participants' video feeds; upload usually stays similar." },
  { label: "Screen sharing + video", down: "5-6 Mbps", up: "4-5 Mbps", note: "Sharing your screen while on camera adds extra upload demand on your end." },
];

export function VideoCallSpeed() {
  return (
    <div className="max-w-2xl mx-auto px-5 sm:px-8 pt-14 sm:pt-20 pb-16">
      <Seo
        title="Best Internet Speed for Video Calls"
        description="How much download and upload speed you need for smooth Zoom, Google Meet, and Teams calls — including group calls and screen sharing."
        canonicalPath="/video-call-speed"
      />

      <BackButton />

      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: easeOut }}
        className="text-center mb-10"
      >
        <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border bg-elevated/60 text-[11px] tracking-[0.16em] uppercase text-secondary font-semibold">
          <Video size={12} className="text-accent" />
          Video calls
        </span>
        <h1 className="mt-5 text-3xl sm:text-4xl font-extrabold tracking-tight text-gradient">
          Best Internet Speed for Video Calls
        </h1>
        <p className="mt-4 text-sm text-muted max-w-lg mx-auto leading-relaxed">
          Video calls are unique in needing good speed in <em>both</em> directions at once — here's what each
          situation actually requires.
        </p>
      </motion.div>

      <div className="flex flex-col gap-3 mb-10">
        {PLATFORM_NEEDS.map((p, i) => (
          <motion.div
            key={p.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.05 + i * 0.05, ease: easeOut }}
            className="card-premium rounded-2xl p-5 flex items-center justify-between gap-4"
          >
            <div className="min-w-0">
              <p className="text-sm font-semibold text-primary">{p.label}</p>
              <p className="text-xs text-secondary leading-relaxed mt-1">{p.note}</p>
            </div>
            <div className="flex gap-4 shrink-0 text-right">
              <div>
                <p className="text-[10px] text-muted uppercase tracking-wide">Down</p>
                <p className="text-sm font-bold text-accent">{p.down}</p>
              </div>
              <div>
                <p className="text-[10px] text-muted uppercase tracking-wide">Up</p>
                <p className="text-sm font-bold text-accent-2">{p.up}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1, ease: easeOut }}
        className="card-premium rounded-2xl p-6 sm:p-7 mb-6"
      >
        <h2 className="text-sm font-semibold text-primary mb-2">Why upload speed matters most here</h2>
        <p className="text-sm text-secondary leading-relaxed">
          Unlike streaming or browsing, a video call needs you to send data (your own video and audio) at the same
          time as receiving everyone else's. If your upload speed is weak — common on cable and DSL plans built
          for download-heavy use — the other people on the call will see your video freeze or drop to audio-only,
          even if your download speed tests perfectly fine.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.15, ease: easeOut }}
        className="card-premium rounded-2xl p-6 sm:p-7 mb-10"
      >
        <h2 className="text-sm font-semibold text-primary mb-2">If calls keep dropping or freezing</h2>
        <p className="text-sm text-secondary leading-relaxed">
          Check jitter, not just speed — a call can freeze and recover repeatedly even on a fast connection if
          ping is inconsistent. Try switching to Ethernet, closing other bandwidth-heavy apps during the call, and
          turning off your own video if only audio quality matters — video is by far the heaviest part of the
          call's bandwidth use.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="rounded-2xl border border-accent/30 bg-accent/5 p-6 flex flex-col sm:flex-row items-center gap-4 justify-between"
      >
        <p className="text-sm text-primary font-medium">Check your upload speed before your next call.</p>
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