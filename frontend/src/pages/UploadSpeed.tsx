import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowUpFromLine, ArrowRight } from "lucide-react";
import { Seo } from "../components/Seo/Seo";
import { BackButton } from "../components/BackButton/BackButton";

const easeOut = [0.22, 1, 0.36, 1] as const;

const USE_CASES = [
  { range: "Under 5 Mbps", body: "Basic email attachments and occasional photo uploads. Video calls may struggle, especially in group settings." },
  { range: "10-20 Mbps", body: "Smooth video calls, cloud backup, and uploading photos/videos to social media without long waits." },
  { range: "25-50 Mbps", body: "Multiple simultaneous video calls, livestreaming, and fast large-file uploads (project files, raw photos/video)." },
  { range: "100+ Mbps", body: "Professional content creation — uploading 4K video, large design files, or hosting your own livestream — with no bottleneck." },
];

export function UploadSpeed() {
  return (
    <div className="max-w-2xl mx-auto px-5 sm:px-8 pt-4 sm:pt-6 pb-16">
      <Seo
        title="What Is Upload Speed?"
        description="Upload speed explained: what it measures, how many Mbps you need for video calls, cloud backup, and livestreaming, and why it matters as much as download speed."
        canonicalPath="/upload-speed"
      />

      <BackButton />

      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: easeOut }}
        className="text-center mb-10"
      >
        <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border bg-elevated/60 text-[11px] tracking-[0.16em] uppercase text-secondary font-semibold">
          <ArrowUpFromLine size={12} className="text-accent" />
          Upload speed
        </span>
        <h1 className="mt-5 text-3xl sm:text-4xl font-extrabold tracking-tight text-gradient">
          What Is Upload Speed?
        </h1>
        <p className="mt-4 text-sm text-muted max-w-lg mx-auto leading-relaxed">
          Upload speed is how fast data travels from your device to the internet — it's what determines how
          quickly a video call sends your video, a file uploads, or a livestream reaches your viewers.
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
          A speed test sends real data from your device to a server and times how many megabits leave per second.
          VLN Speed measures this directly by uploading actual bytes and tracking real upload-progress events from
          the browser — not an estimate based on your download result.
        </p>
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="text-sm font-semibold text-primary mb-3"
      >
        How much upload speed do you need?
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
        <h2 className="text-sm font-semibold text-primary mb-2">Why upload matters more than people think</h2>
        <p className="text-sm text-secondary leading-relaxed">
          Remote work, video calls, cloud backup, and content creation have made upload speed far more important
          than it used to be. A connection with fast download but weak upload can still feel broken on a video
          call — your side of the call is limited by your upload speed, not your download speed. If calls freeze
          or your video looks blurry to others while your download speed tests fine, upload is usually the
          bottleneck.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="rounded-2xl border border-accent/30 bg-accent/5 p-6 flex flex-col sm:flex-row items-center gap-4 justify-between"
      >
        <p className="text-sm text-primary font-medium">Check your actual upload speed right now.</p>
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