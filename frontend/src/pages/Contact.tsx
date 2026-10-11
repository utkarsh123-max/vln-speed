import { motion } from "framer-motion";
import { Mail, Send, MessageCircle } from "lucide-react";
import { Seo } from "../components/Seo/Seo";

const easeOut = [0.22, 1, 0.36, 1] as const;

const CHANNELS = [
  {
    icon: Mail,
    label: "Email",
    value: "vlngaming7380@gmail.com",
    href: "mailto:vlngaming7380@gmail.com",
    note: "Best for bug reports, feedback, or questions about a result.",
  },
  {
    icon: Send,
    label: "Telegram",
    value: "@vlnrise",
    href: "https://t.me/vlnrise",
    note: "Fastest way to reach us directly.",
  },
];

export function Contact() {
  return (
    <div className="max-w-2xl mx-auto px-5 sm:px-8 pt-14 sm:pt-20 pb-16">
      <Seo
        title="Contact VLN Speed"
        description="Get in touch with VLN Speed for feedback, bug reports, or questions about your speed test results."
        canonicalPath="/contact"
      />

      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: easeOut }}
        className="text-center mb-10"
      >
        <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border bg-elevated/60 text-[11px] tracking-[0.16em] uppercase text-secondary font-semibold">
          <MessageCircle size={12} className="text-accent" />
          Get in touch
        </span>
        <h1 className="mt-5 text-3xl sm:text-4xl font-extrabold tracking-tight text-gradient">Contact</h1>
        <p className="mt-4 text-sm text-muted max-w-md mx-auto leading-relaxed">
          Found a bug, have feedback, or a question about a result? Reach out directly — a real person reads
          these, not a ticketing system.
        </p>
      </motion.div>

      <div className="flex flex-col gap-3">
        {CHANNELS.map((c, i) => (
          <motion.a
            key={c.label}
            href={c.href}
            target={c.href.startsWith("http") ? "_blank" : undefined}
            rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 + i * 0.08, ease: easeOut }}
            whileHover={{ y: -2 }}
            className="card-premium rounded-2xl p-5 flex items-center gap-4 hover:border-accent/40 transition-colors"
          >
            <span className="w-11 h-11 rounded-xl bg-accent/10 flex items-center justify-center text-accent shrink-0">
              <c.icon size={19} />
            </span>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-primary">{c.label}</p>
              <p className="text-sm text-accent">{c.value}</p>
              <p className="text-xs text-muted mt-0.5">{c.note}</p>
            </div>
          </motion.a>
        ))}
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="text-xs text-muted text-center mt-8 leading-relaxed"
      >
        VLN Speed is an independently run tool, not a large company — replies may take a day or two.
      </motion.p>
    </div>
  );
}