import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Instagram, Twitter, Send, AtSign } from "lucide-react";

const SOCIALS = [
  { icon: Instagram, label: "Instagram", handle: "@vlnrise", href: "https://instagram.com/vlnrise" },
  { icon: AtSign, label: "Threads", handle: "@vlnrise", href: "https://www.threads.net/@vlnrise" },
  { icon: Twitter, label: "X", handle: "@vlnrise", href: "https://x.com/vlnrise" },
];

export function Footer() {
  return (
    <footer className="border-t border-border mt-24">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
        <div>
          <span className="text-sm font-bold text-primary">
            VLN <span className="text-accent">SPEED</span>
          </span>
          <p className="text-xs text-muted mt-1">Measure Your Connection. Know Your Network.</p>
        </div>
        <nav className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-secondary">
          <Link to="/" className="hover:text-primary transition-colors">Test</Link>
          <Link to="/history" className="hover:text-primary transition-colors">History</Link>
          <Link to="/servers" className="hover:text-primary transition-colors">Servers</Link>
          <Link to="/privacy" className="hover:text-primary transition-colors">Privacy</Link>
          <Link to="/about" className="hover:text-primary transition-colors">About</Link>
        </nav>
        <span className="text-xs text-muted">© {new Date().getFullYear()} VLN</span>
      </div>

      {/* Social + contact strip */}
      <div className="border-t border-border">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-8 flex flex-col items-center gap-5">
          <div className="flex items-center gap-3">
            {SOCIALS.map((s, i) => (
              <motion.a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${s.label} — ${s.handle}`}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                whileHover={{ y: -3, scale: 1.05 }}
                className="group flex items-center gap-2 px-3.5 py-2 rounded-full border border-border bg-elevated/60 text-secondary hover:text-accent hover:border-accent/40 transition-colors"
              >
                <s.icon size={14} />
                <span className="text-xs font-medium hidden sm:inline">{s.handle}</span>
              </motion.a>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-[11px] sm:text-xs text-center text-muted tracking-wide"
          >
            <span className="glow-text font-semibold">Contact for sites, tools, landing pages &amp; ad promotions</span>
            <span className="mx-1.5 text-border">·</span>
            <span className="inline-flex items-center gap-1 text-secondary">
              <Send size={11} className="text-accent" />
              Telegram <span className="text-primary font-medium">@vlnrise</span>
            </span>
          </motion.p>
        </div>
      </div>
    </footer>
  );
}