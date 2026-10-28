import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Activity,
  ArrowDownToLine,
  ArrowRight,
  ArrowUpFromLine,
  Radio,
  Smartphone,
  Wifi,
  Zap,
} from "lucide-react";

const easeOut = [0.22, 1, 0.36, 1] as const;

/* 1. Phone mockup — an illustration of the app, clearly labelled */

function FloatingChip({
  icon: Icon,
  label,
  value,
  className,
  delay,
  reduced,
}: {
  icon: typeof Radio;
  label: string;
  value: string;
  className: string;
  delay: number;
  reduced: boolean;
}) {
  return (
    <motion.div
      animate={reduced ? undefined : { y: [0, -7, 0] }}
      transition={{ duration: 4 + delay, repeat: Infinity, ease: "easeInOut", delay }}
      className={`absolute flex items-center gap-2 rounded-2xl glass ring-hairline px-3 py-2 shadow-card ${className}`}
    >
      <span className="w-7 h-7 rounded-lg bg-elevated flex items-center justify-center text-accent">
        <Icon size={14} />
      </span>
      <span className="leading-tight">
        <span className="block text-[10px] uppercase tracking-wider text-muted">{label}</span>
        <span className="block tabular text-xs font-bold text-primary">{value}</span>
      </span>
    </motion.div>
  );
}

function PhoneMockup({ reduced }: { reduced: boolean }) {
  return (
    <div className="relative mx-auto w-full max-w-[340px] h-[440px] sm:h-[470px]">
      <div
        className="absolute inset-x-6 top-10 bottom-6 rounded-full blur-3xl opacity-60"
        style={{ background: "radial-gradient(circle, var(--vln-accent-glow), transparent 70%)" }}
        aria-hidden="true"
      />

      <div className="absolute left-1/2 -translate-x-1/2 top-2 w-[200px] sm:w-[220px] rounded-[2.2rem] p-2 bg-elevated ring-hairline shadow-premium">
        <div className="rounded-[1.7rem] overflow-hidden bg-bg border border-border">
          <div className="flex justify-center pt-2">
            <span className="w-14 h-1.5 rounded-full bg-border" />
          </div>

          <div className="px-3 pt-3 pb-4">
            <p className="text-[9px] font-bold tracking-[0.2em] text-primary text-center">
              VLN <span className="text-accent">SPEED</span>
            </p>

            <svg viewBox="0 0 120 84" className="w-full mt-2" aria-hidden="true">
              <defs>
                <linearGradient id="vln-showcase-arc" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="var(--vln-accent-2)" />
                  <stop offset="100%" stopColor="var(--vln-accent)" />
                </linearGradient>
              </defs>
              <path
                d="M 15 72 A 45 45 0 0 1 105 72"
                fill="none"
                stroke="var(--vln-border)"
                strokeWidth="6"
                strokeLinecap="round"
              />
              <path
                d="M 15 72 A 45 45 0 0 1 105 72"
                pathLength={100}
                fill="none"
                stroke="url(#vln-showcase-arc)"
                strokeWidth="6"
                strokeLinecap="round"
                strokeDasharray="68 100"
              />
              <line x1="60" y1="72" x2="80.4" y2="39.9" stroke="var(--vln-accent)" strokeWidth="2" strokeLinecap="round" />
              <circle cx="60" cy="72" r="4" fill="var(--vln-accent)" />
              <text x="60" y="58" textAnchor="middle" fontSize="15" fontWeight="800" fill="var(--vln-text-primary)">
                94.2
              </text>
              <text x="60" y="80" textAnchor="middle" fontSize="6" letterSpacing="1.5" fill="var(--vln-text-muted)">
                MBPS
              </text>
            </svg>

            <div className="grid grid-cols-3 gap-1.5 mt-2">
              {[
                { l: "Ping", v: "12 ms" },
                { l: "Jitter", v: "3 ms" },
                { l: "Upload", v: "41" },
              ].map((s) => (
                <div key={s.l} className="rounded-lg bg-elevated px-1 py-1.5 text-center">
                  <p className="tabular text-[10px] font-bold text-primary">{s.v}</p>
                  <p className="text-[8px] text-muted">{s.l}</p>
                </div>
              ))}
            </div>

            <div className="mt-3 rounded-full py-1.5 text-center text-[9px] font-bold tracking-widest text-white bg-gradient-to-r from-[#4361ee] to-[#0284c7]">
              TEST AGAIN
            </div>
          </div>
        </div>
      </div>

      <FloatingChip icon={ArrowDownToLine} label="Download" value="Real stream" className="left-0 top-16" delay={0} reduced={reduced} />
      <FloatingChip icon={ArrowUpFromLine} label="Upload" value="Real upload" className="right-0 top-[45%]" delay={0.6} reduced={reduced} />
      <FloatingChip icon={Radio} label="Latency" value="Live ping" className="left-1 bottom-10" delay={1.1} reduced={reduced} />

      <p className="absolute inset-x-0 bottom-0 text-center text-[10px] text-muted">Illustration — your result will differ</p>
    </div>
  );
}

/* 2. Bento cards */

function ChartArt() {
  return (
    <svg viewBox="0 0 200 70" className="w-full h-16" aria-hidden="true">
      <defs>
        <linearGradient id="vln-bento-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--vln-accent)" stopOpacity="0.35" />
          <stop offset="100%" stopColor="var(--vln-accent)" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d="M0 55 C 25 50, 40 20, 65 28 S 105 55, 130 30 S 175 8, 200 14 L 200 70 L 0 70 Z" fill="url(#vln-bento-fill)" />
      <path
        d="M0 55 C 25 50, 40 20, 65 28 S 105 55, 130 30 S 175 8, 200 14"
        fill="none"
        stroke="var(--vln-accent)"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <circle cx="200" cy="14" r="4" fill="var(--vln-accent)" />
    </svg>
  );
}

function PhoneArt() {
  return (
    <div className="flex items-end gap-3" aria-hidden="true">
      <div className="w-12 h-20 rounded-xl border-2 p-1.5 flex flex-col justify-end gap-1" style={{ borderColor: "var(--vln-text-secondary)" }}>
        <span className="h-1.5 rounded bg-accent w-full" />
        <span className="h-1.5 rounded bg-accent w-2/3 opacity-60" />
        <span className="h-1.5 rounded bg-accent w-1/3 opacity-30" />
      </div>
      <div className="flex items-end gap-1 pb-1">
        {[10, 18, 26, 34].map((h) => (
          <span key={h} className="w-2 rounded-sm bg-accent" style={{ height: h }} />
        ))}
      </div>
    </div>
  );
}

function StartArt({ reduced }: { reduced: boolean }) {
  return (
    <div className="relative w-16 h-16" aria-hidden="true">
      <motion.span
        animate={reduced ? undefined : { scale: [1, 1.6], opacity: [0.5, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
        className="absolute inset-0 rounded-full bg-white/40"
      />
      <span className="absolute inset-0 rounded-full bg-white/90 flex items-center justify-center">
        <span className="ml-1 w-0 h-0 border-y-[9px] border-y-transparent border-l-[15px] border-l-[#4361ee]" />
      </span>
    </div>
  );
}

function BentoCards({ reduced }: { reduced: boolean }) {
  const cardMotion = (i: number) => ({
    initial: reduced ? false : { opacity: 0, y: 18 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-60px" },
    transition: { duration: 0.5, delay: i * 0.08, ease: easeOut },
  });

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <motion.div
        {...cardMotion(0)}
        className="relative overflow-hidden rounded-3xl p-6 min-h-[220px] flex flex-col justify-between ring-hairline"
        style={{
          background:
            "linear-gradient(150deg, color-mix(in srgb, var(--vln-accent) 22%, var(--vln-surface)), color-mix(in srgb, var(--vln-accent-2) 16%, var(--vln-surface)))",
        }}
      >
        <h3 className="text-xl sm:text-2xl font-bold leading-snug text-primary">
          Real measurements,
          <br />
          not a random number.
        </h3>
        <div>
          <ChartArt />
          <p className="mt-3 flex items-center gap-2 text-xs text-secondary">
            <Activity size={14} className="text-accent" /> Live speed graph during every test
          </p>
        </div>
      </motion.div>

      <motion.div
        {...cardMotion(1)}
        className="relative overflow-hidden rounded-3xl p-6 min-h-[220px] flex flex-col justify-between text-white"
        style={{ background: "linear-gradient(150deg, #4361ee, #3a0ca3)" }}
      >
        <h3 className="text-xl sm:text-2xl font-bold leading-snug">
          One tap.
          <br />
          No signup needed.
        </h3>
        <div className="flex items-end justify-between">
          <p className="flex items-center gap-2 text-xs text-white/80">
            <Zap size={14} /> Opens and runs in seconds
          </p>
          <StartArt reduced={reduced} />
        </div>
      </motion.div>

      <motion.div
        {...cardMotion(2)}
        className="relative overflow-hidden rounded-3xl p-6 min-h-[220px] flex flex-col justify-between card-premium"
      >
        <h3 className="text-xl sm:text-2xl font-bold leading-snug text-primary">
          Built for your phone first.
        </h3>
        <div className="flex items-end justify-between">
          <p className="flex items-center gap-2 text-xs text-secondary">
            <Smartphone size={14} className="text-accent" /> Works on mobile data and Wi-Fi
          </p>
          <PhoneArt />
        </div>
      </motion.div>

      <motion.div
        {...cardMotion(3)}
        className="relative overflow-hidden rounded-3xl p-6 min-h-[220px] flex flex-col justify-between card-premium"
      >
        <h3 className="text-xl sm:text-2xl font-bold leading-snug text-primary">
          More than just Mbps.
        </h3>
        <div>
          <div className="grid grid-cols-2 gap-2">
            {[
              { icon: ArrowDownToLine, l: "Download" },
              { icon: ArrowUpFromLine, l: "Upload" },
              { icon: Radio, l: "Ping" },
              { icon: Activity, l: "Jitter" },
            ].map((m) => (
              <span key={m.l} className="flex items-center gap-2 rounded-xl bg-elevated ring-hairline px-3 py-2 text-xs font-semibold text-primary">
                <m.icon size={14} className="text-accent" />
                {m.l}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

/* 3. "What does your speed mean?" */

const SPEED_ROWS = [
  { label: "Browsing & email", mbps: 5, width: 8 },
  { label: "Video calls", mbps: 10, width: 16 },
  { label: "HD streaming", mbps: 15, width: 26 },
  { label: "4K streaming", mbps: 25, width: 42 },
  { label: "Online gaming (ping matters more)", mbps: 25, width: 42 },
  { label: "Busy household", mbps: 100, width: 100 },
];

function SpeedScale({ reduced }: { reduced: boolean }) {
  return (
    <div className="card-premium rounded-3xl p-6 sm:p-8">
      <div className="flex items-center gap-2 mb-1">
        <Wifi size={16} className="text-accent" />
        <h3 className="text-lg sm:text-xl font-bold text-primary">What does your speed mean?</h3>
      </div>
      <p className="text-xs sm:text-sm text-secondary mb-6">
        Rough minimums per activity. Real needs vary with how many devices share the connection.
      </p>

      <div className="flex flex-col gap-4">
        {SPEED_ROWS.map((row, i) => (
          <div key={row.label}>
            <div className="flex items-baseline justify-between gap-3 mb-1.5">
              <span className="text-xs sm:text-sm text-primary font-medium">{row.label}</span>
              <span className="tabular text-xs text-muted shrink-0">{row.mbps}+ Mbps</span>
            </div>
            <div className="h-2 rounded-full bg-elevated overflow-hidden">
              <motion.div
                initial={reduced ? false : { width: 0 }}
                whileInView={{ width: `${row.width}%` }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.07, ease: easeOut }}
                className="h-full rounded-full bg-gradient-to-r from-[#4361ee] to-[#4cc9f0]"
                style={reduced ? { width: `${row.width}%` } : undefined}
              />
            </div>
          </div>
        ))}
      </div>

      <Link
        to="/internet-speed-guide"
        className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:underline"
      >
        Read the full speed guide <ArrowRight size={14} />
      </Link>
    </div>
  );
}

/* Section */

export function HomeShowcase() {
  const reduced = useReducedMotion() ?? false;

  return (
    <section className="max-w-5xl mx-auto px-5 sm:px-8 mt-20 flex flex-col gap-16">
      <motion.div
        initial={reduced ? false : { opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: easeOut }}
        className="rounded-[2rem] ring-hairline overflow-hidden px-5 py-10 sm:px-10 sm:py-14 grid grid-cols-1 md:grid-cols-2 gap-10 items-center"
        style={{
          background:
            "linear-gradient(135deg, color-mix(in srgb, var(--vln-accent-2) 26%, var(--vln-surface)), color-mix(in srgb, var(--vln-accent) 14%, var(--vln-surface)))",
        }}
      >
        <div className="text-center md:text-left">
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-primary leading-tight">
            Check your internet speed
            <br />
            <span className="text-gradient">right from your phone.</span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-secondary max-w-md mx-auto md:mx-0">
            Download, upload, ping and jitter in a single test. Run it on mobile data or Wi-Fi and see exactly what your
            connection delivers.
          </p>
          <a
            href="#top"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="mt-6 inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-bold text-white bg-gradient-to-r from-[#4361ee] to-[#0284c7] shadow-glow hover:-translate-y-0.5 transition-transform"
          >
            Start the test <ArrowRight size={16} />
          </a>
        </div>

        <PhoneMockup reduced={reduced} />
      </motion.div>

      <BentoCards reduced={reduced} />

      <SpeedScale reduced={reduced} />
    </section>
  );
}