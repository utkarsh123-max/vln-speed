import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Instagram, Twitter, Send, AtSign } from "lucide-react";

const SOCIALS = [
  { icon: Instagram, label: "Instagram", handle: "@vlnrise", href: "https://instagram.com/vlnrise" },
  { icon: AtSign, label: "Threads", handle: "@vlnrise", href: "https://www.threads.net/@vlnrise" },
  { icon: Twitter, label: "X", handle: "@vlnrise", href: "https://x.com/vlnrise" },
];

const PRODUCT_LINKS = [
  { to: "/", label: "Speed Test" },
  { to: "/history", label: "History" },
  { to: "/servers", label: "Servers" },
];

const USE_CASE_LINKS = [
  { to: "/gaming-internet-speed", label: "Gaming" },
  { to: "/streaming-internet-speed", label: "Streaming" },
  { to: "/video-call-speed", label: "Video Calls" },
  { to: "/troubleshooting", label: "Troubleshooting" },
];

const LEARN_LINKS = [
  { to: "/internet-speed-guide", label: "Speed Guide" },
  { to: "/how-speed-test-works", label: "How It Works" },
  { to: "/download-speed", label: "Download Speed" },
  { to: "/upload-speed", label: "Upload Speed" },
  { to: "/ping-latency", label: "Ping & Latency" },
  { to: "/faq", label: "FAQ" },
  { to: "/about", label: "About" },
];

const LEGAL_LINKS = [
  { to: "/privacy", label: "Privacy Policy" },
  { to: "/terms", label: "Terms" },
  { to: "/contact", label: "Contact" },
];

export function Footer() {
  return (
    <footer className="border-t border-border mt-24">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-12 grid grid-cols-2 sm:grid-cols-5 gap-8">
        <div className="col-span-2 sm:col-span-1">
          <span className="text-sm font-bold text-primary">
            VLN <span className="text-accent">SPEED</span>
          </span>
          <p className="text-xs text-muted mt-2 leading-relaxed">Measure Your Connection. Know Your Network.</p>
        </div>

        <FooterColumn title="Product" links={PRODUCT_LINKS} />
        <FooterColumn title="Use Cases" links={USE_CASE_LINKS} />
        <FooterColumn title="Learn" links={LEARN_LINKS} />
        <FooterColumn title="Legal" links={LEGAL_LINKS} />
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
  <span className="glow-text font-semibold">
    Contact for sites, tools, landing pages &amp; ad promotions
  </span>

  <span className="mx-1.5 text-border">·</span>

  <span className="inline-flex items-center gap-1 text-secondary">
    <Send size={11} className="text-accent" />

    Telegram{" "}
    <a
      href="https://t.me/vlnrise"
      target="_blank"
      rel="noopener noreferrer"
      className="text-primary font-medium hover:text-accent transition-colors cursor-pointer"
    >
      @vlnrise
    </a>
  </span>
</motion.p>

                    <div className="flex flex-col items-center gap-1.5">
            <span className="text-[11px] text-muted">
              © {new Date().getFullYear()} VLN Speed · All rights reserved.
            </span>
            <span className="text-[10px] text-muted/70 max-w-md text-center leading-relaxed">
              VLN Speed is an independent internet speed testing tool and is not affiliated with Ookla®,
              Speedtest®, or any internet service provider.
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, links }: { title: string; links: { to: string; label: string }[] }) {
  return (
    <div>
      <h3 className="text-[11px] tracking-[0.14em] uppercase text-muted font-semibold mb-3">{title}</h3>
      <ul className="flex flex-col gap-2">
        {links.map((l) => (
          <li key={l.to}>
            <Link to={l.to} className="text-xs text-secondary hover:text-primary transition-colors">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}