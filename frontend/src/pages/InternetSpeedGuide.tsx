import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { BookOpen, Gauge, ArrowRight } from "lucide-react";
import { Seo } from "../components/Seo/Seo";
import { BackButton } from "../components/BackButton/BackButton";

const easeOut = [0.22, 1, 0.36, 1] as const;

const TERMS = [
  {
    term: "Mbps",
    body: "Megabits per second — the standard unit speed tests and ISPs use. 100 Mbps means 100 million bits can move in one second.",
  },
  {
    term: "Gbps",
    body: "Gigabits per second — 1,000 Mbps. Used for very fast fiber plans (1 Gbps = 1,000 Mbps).",
  },
  {
    term: "MB/s",
    body: "Megabytes per second — what file-download managers and browsers usually display. There are 8 bits in a byte, so 100 Mbps ≈ 12.5 MB/s. This is the single most common source of \"why is my download slower than my speed test?\" confusion.",
  },
  {
    term: "Download vs upload",
    body: "Download is data coming to your device (loading a page, streaming video, downloading a file). Upload is data leaving your device (sending an email attachment, uploading to cloud storage, your side of a video call).",
  },
  {
    term: "Ping / latency",
    body: "The time for a small signal to travel to a server and back, in milliseconds. Lower is better — it affects how \"instant\" things feel, like game actions or voice-call responsiveness, not raw data-transfer speed.",
  },
  {
    term: "Jitter",
    body: "How much your ping varies from one moment to the next. Consistent ping (low jitter) matters as much as low ping for calls and games — a connection that swings between 20ms and 150ms feels worse than one steady at 60ms.",
  },
  {
    term: "Packet loss",
    body: "The percentage of data packets that never arrive and have to be re-sent. Even small packet loss (1-2%) can cause stuttering in calls and games, independent of your raw speed.",
  },
];

const WIFI_NOTES = [
  {
    title: "Wi-Fi vs Ethernet",
    body: "Ethernet is a direct physical connection with no signal interference — it's the ceiling for what your connection can actually do. Wi-Fi shares the same airwaves as neighboring networks, microwaves, and other devices, so it's inherently more variable.",
  },
  {
    title: "2.4 GHz vs 5 GHz",
    body: "2.4 GHz travels further and penetrates walls better but is slower and more congested (shared with many other devices). 5 GHz is faster but has shorter range and doesn't pass through walls as well. Most modern routers broadcast both — your device picks automatically unless you've split the networks.",
  },
  {
    title: "Wi-Fi 6 and newer standards",
    body: "Newer Wi-Fi standards (Wi-Fi 6, Wi-Fi 6E, Wi-Fi 7) handle more connected devices more efficiently and support higher peak speeds, but you only benefit if both your router and your device support the same standard.",
  },
];

export function InternetSpeedGuide() {
  return (
    <div className="max-w-2xl mx-auto px-5 sm:px-8 pt-4 sm:pt-6 pb-16">
      <Seo
        title="Internet Speed Guide"
        description="A clear guide to Mbps, MB/s, download vs upload, ping, jitter, packet loss, and Wi-Fi standards — what they mean and why your speed test results look the way they do."
        canonicalPath="/internet-speed-guide"
      />

      <BackButton />

      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: easeOut }}
        className="text-center mb-10"
      >
        <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border bg-elevated/60 text-[11px] tracking-[0.16em] uppercase text-secondary font-semibold">
          <BookOpen size={12} className="text-accent" />
          Internet speed guide
        </span>
        <h1 className="mt-5 text-3xl sm:text-4xl font-extrabold tracking-tight text-gradient">
          Understanding Your Internet Speed
        </h1>
        <p className="mt-4 text-sm text-muted max-w-lg mx-auto leading-relaxed">
          The terms on a speed-test result aren't always obvious. Here's what each one actually means, in plain
          language.
        </p>
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="text-sm font-semibold text-primary mb-3"
      >
        Key terms
      </motion.h2>

      <div className="flex flex-col gap-3 mb-10">
        {TERMS.map((t, i) => (
          <motion.div
            key={t.term}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.05 + i * 0.05, ease: easeOut }}
            className="card-premium rounded-2xl p-5"
          >
            <h3 className="text-sm font-semibold text-accent mb-1.5">{t.term}</h3>
            <p className="text-sm text-secondary leading-relaxed">{t.body}</p>
          </motion.div>
        ))}
      </div>

      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="text-sm font-semibold text-primary mb-3"
      >
        Wi-Fi and network basics
      </motion.h2>

      <div className="flex flex-col gap-3 mb-10">
        {WIFI_NOTES.map((n, i) => (
          <motion.div
            key={n.title}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.05 + i * 0.05, ease: easeOut }}
            className="card-premium rounded-2xl p-5"
          >
            <h3 className="text-sm font-semibold text-primary mb-1.5">{n.title}</h3>
            <p className="text-sm text-secondary leading-relaxed">{n.body}</p>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="card-premium rounded-2xl p-6 sm:p-7 mb-10"
      >
        <h2 className="text-sm font-semibold text-primary mb-2">ISP advertised speed vs. actual speed</h2>
        <p className="text-sm text-secondary leading-relaxed">
          Your ISP advertises the maximum speed available under ideal conditions — typically a wired connection
          directly to their equipment, with nothing else on the network. Your real-world result depends on your
          router, your device's Wi-Fi hardware, how many devices are active, time-of-day network congestion, and
          the distance to whichever server you're testing against. A gap between the advertised number and your
          test result is normal; a very large, consistent gap (well under half the advertised speed, on Ethernet,
          with nothing else running) is worth raising with your ISP.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="rounded-2xl border border-accent/30 bg-accent/5 p-6 flex flex-col sm:flex-row items-center gap-4 justify-between"
      >
        <div className="flex items-center gap-3">
          <span className="w-10 h-10 rounded-xl bg-accent/15 flex items-center justify-center text-accent shrink-0">
            <Gauge size={18} />
          </span>
          <p className="text-sm text-primary font-medium">Ready to check your own numbers?</p>
        </div>
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