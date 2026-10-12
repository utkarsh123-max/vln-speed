import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Wrench, ArrowRight, CheckCircle2 } from "lucide-react";
import { Seo } from "../components/Seo/Seo";

const easeOut = [0.22, 1, 0.36, 1] as const;

const STEPS = [
  {
    title: "Restart your router and modem",
    body: "Unplug both for 30 seconds, then plug the modem back in first and wait for it to fully reconnect before powering the router. This clears temporary glitches and is the single most effective fix for slow or dropped connections.",
  },
  {
    title: "Test on Ethernet, not Wi-Fi",
    body: "Connect your device directly to the router with a cable and run the test again. If speed jumps significantly, the problem is your Wi-Fi — not your internet plan.",
  },
  {
    title: "Check what else is using your network",
    body: "Pause downloads, close streaming apps on other devices, and disconnect devices you don't need active. A single 4K stream or large download elsewhere on the network can noticeably affect your result.",
  },
  {
    title: "Move closer to your router, or reduce obstacles",
    body: "Walls, floors, metal objects, and distance all weaken Wi-Fi signal. Testing in the same room as the router rules out signal strength as the cause.",
  },
  {
    title: "Check for interference from other networks",
    body: "In crowded apartment buildings, many Wi-Fi networks compete for the same channels. Most modern routers auto-select the best channel, but if yours doesn't, switching to the 5 GHz band can help.",
  },
  {
    title: "Test at a different time of day",
    body: "ISP networks get more congested during peak hours (typically evenings). If speed is consistently fine in the morning but drops at night, it may be network congestion on your ISP's end rather than your own setup.",
  },
  {
    title: "Turn off any active VPN",
    body: "A VPN adds an extra hop and encryption overhead, which reduces both speed and increases latency. Disconnect it before testing if you want to see your raw connection speed.",
  },
  {
    title: "Contact your ISP with evidence",
    body: "If speed stays well below your plan's advertised rate on Ethernet, with nothing else running, at different times of day — save a few test results and contact your ISP. Consistent, documented results are more useful to them than a single complaint.",
  },
];

export function Troubleshooting() {
  return (
    <div className="max-w-2xl mx-auto px-5 sm:px-8 pt-14 sm:pt-20 pb-16">
      <Seo
        title="Internet Speed Troubleshooting Guide"
        description="Step-by-step checklist to fix slow internet speed — from restarting your router to testing on Ethernet and checking for network congestion."
        canonicalPath="/troubleshooting"
      />

      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: easeOut }}
        className="text-center mb-10"
      >
        <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border bg-elevated/60 text-[11px] tracking-[0.16em] uppercase text-secondary font-semibold">
          <Wrench size={12} className="text-accent" />
          Troubleshooting
        </span>
        <h1 className="mt-5 text-3xl sm:text-4xl font-extrabold tracking-tight text-gradient">
          Why Is My Internet Slow?
        </h1>
        <p className="mt-4 text-sm text-muted max-w-lg mx-auto leading-relaxed">
          Work through these in order — most slow-connection problems are solved in the first three steps.
        </p>
      </motion.div>

      <div className="flex flex-col gap-3">
        {STEPS.map((s, i) => (
          <motion.div
            key={s.title}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.05 + i * 0.05, ease: easeOut }}
            className="card-premium rounded-2xl p-5 flex gap-4"
          >
            <span className="w-7 h-7 rounded-full bg-accent/10 text-accent flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
              {i + 1}
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
        transition={{ duration: 0.5, delay: 0.1 }}
        className="rounded-2xl border border-success/30 bg-success/5 p-6 flex items-start gap-3 mt-8"
      >
        <CheckCircle2 size={18} className="text-success shrink-0 mt-0.5" />
        <p className="text-sm text-secondary leading-relaxed">
          Run a test before and after each step — that's the only way to know which one actually fixed it, rather
          than guessing.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="rounded-2xl border border-accent/30 bg-accent/5 p-6 flex flex-col sm:flex-row items-center gap-4 justify-between mt-4"
      >
        <p className="text-sm text-primary font-medium">Ready to test your connection?</p>
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