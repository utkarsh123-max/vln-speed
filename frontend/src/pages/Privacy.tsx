import { motion } from "framer-motion";
import { Activity, Eye, Database, ServerCog, ShieldCheck } from "lucide-react";

const easeOut = [0.22, 1, 0.36, 1] as const;

const SECTIONS = [
  {
    icon: Activity,
    title: "What's measured",
    body: "During a test, your browser exchanges test data (random bytes with no personal content) with the VLN test server to time download and upload speed, and sends small ping requests to measure latency.",
  },
  {
    icon: Eye,
    title: "Public IP and ISP",
    body: "To show your ISP and approximate location, your browser queries a third-party IP-lookup service directly. That lookup does not pass through, or get logged by, VLN's own servers.",
  },
  {
    icon: Database,
    title: "History",
    body: "Your past results are stored only in your browser's local storage on this device. They are not uploaded anywhere, and clearing your browser data or using \"Clear all\" on the History page removes them.",
  },
  {
    icon: ServerCog,
    title: "Server logs",
    body: "Like any web server, the VLN test servers see standard connection metadata (such as IP address and request timing) needed to serve the test. This operational data is not paired with an account or used for tracking.",
  },
];

export function Privacy() {
  return (
    <div className="max-w-2xl mx-auto px-5 sm:px-8 pt-14 sm:pt-20 pb-16">
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: easeOut }}
        className="text-center mb-10"
      >
        <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border bg-elevated/60 text-[11px] tracking-[0.16em] uppercase text-secondary font-semibold">
          <ShieldCheck size={12} className="text-accent" />
          Data & privacy
        </span>
        <h1 className="mt-5 text-3xl sm:text-4xl font-extrabold tracking-tight text-gradient">Privacy</h1>
        <p className="mt-4 text-sm text-muted max-w-md mx-auto leading-relaxed">
          A plain, honest account of what happens to your data during a test — no legal boilerplate.
        </p>
      </motion.div>

      <div className="grid sm:grid-cols-2 gap-4">
        {SECTIONS.map((s, i) => (
          <motion.div
            key={s.title}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 + i * 0.08, ease: easeOut }}
            whileHover={{ y: -3 }}
            className="card-premium rounded-2xl p-5 flex flex-col gap-3"
          >
            <span className="w-9 h-9 rounded-xl bg-accent/10 flex items-center justify-center text-accent">
              <s.icon size={17} />
            </span>
            <h3 className="text-sm font-semibold text-primary">{s.title}</h3>
            <p className="text-xs text-secondary leading-relaxed">{s.body}</p>
          </motion.div>
        ))}
      </div>

      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5, ease: easeOut }}
        className="text-xs text-muted text-center mt-8 leading-relaxed max-w-md mx-auto"
      >
        We don't claim this setup is "100% private" — no networked service can honestly claim that. It's designed
        to collect the minimum needed to run an accurate test.
      </motion.p>
    </div>
  );
}