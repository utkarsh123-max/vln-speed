import { Link } from "react-router-dom";
import {
  Activity,
  ArrowDownToLine,
  ArrowRight,
  ArrowUpFromLine,
  Gauge,
  Radio,
  Smartphone,
} from "lucide-react";

/* ---------- 1. "Four measurements" card (soft backdrop + inner card) ---------- */

const METRICS = [
  { icon: ArrowDownToLine, label: "Download", text: "How fast data reaches your device" },
  { icon: ArrowUpFromLine, label: "Upload", text: "How fast you can send data out" },
  { icon: Radio, label: "Ping", text: "Delay to the test server, in ms" },
  { icon: Activity, label: "Jitter", text: "How steady that delay stays" },
];

function MeasureCard() {
  return (
    <div
      className="rounded-[2rem] p-3 sm:p-5 ring-hairline"
      style={{
        background:
          "linear-gradient(135deg, color-mix(in srgb, var(--vln-accent-2) 24%, var(--vln-surface)), color-mix(in srgb, var(--vln-accent) 14%, var(--vln-surface)))",
      }}
    >
      <div className="rounded-[1.6rem] bg-elevated ring-hairline p-6 sm:p-10 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-primary leading-tight">
            Four measurements.
            <br />
            One quick test.
          </h2>
          <p className="mt-4 text-sm sm:text-base text-secondary leading-relaxed">
            Most speed tests stop at a single number. VLN Speed also reports ping and jitter, so you can tell whether
            your connection is only fast or also stable enough for calls and games.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {METRICS.map((m) => (
            <div key={m.label} className="rounded-2xl bg-bg border border-border p-4">
              <span className="w-9 h-9 rounded-lg bg-elevated ring-hairline flex items-center justify-center text-accent">
                <m.icon size={17} />
              </span>
              <p className="mt-3 text-sm font-semibold text-primary">{m.label}</p>
              <p className="mt-1 text-xs text-secondary leading-snug">{m.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------- 2. App window preview (example result) ---------- */

function AppWindow() {
  return (
    <div>
      <div className="rounded-2xl bg-elevated ring-hairline shadow-premium overflow-hidden">
        {/* browser bar */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-border">
          <span className="flex gap-1.5" aria-hidden="true">
            <span className="w-2.5 h-2.5 rounded-full bg-border" />
            <span className="w-2.5 h-2.5 rounded-full bg-border" />
            <span className="w-2.5 h-2.5 rounded-full bg-border" />
          </span>
          <span className="flex-1 min-w-0 truncate rounded-md bg-bg px-3 py-1 text-[11px] text-muted text-center">
            vln-speed.vercel.app
          </span>
        </div>

        <div className="p-5 sm:p-8 grid grid-cols-1 md:grid-cols-5 gap-6 md:gap-8 items-center">
          {/* gauge */}
          <div className="md:col-span-2">
            <svg viewBox="0 0 160 100" className="w-full max-w-[260px] mx-auto" aria-hidden="true">
              <defs>
                <linearGradient id="vln-window-arc" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="var(--vln-accent-2)" />
                  <stop offset="100%" stopColor="var(--vln-accent)" />
                </linearGradient>
              </defs>
              <path
                d="M 20 86 A 60 60 0 0 1 140 86"
                fill="none"
                stroke="var(--vln-border)"
                strokeWidth="8"
                strokeLinecap="round"
              />
              <path
                d="M 20 86 A 60 60 0 0 1 140 86"
                pathLength={100}
                fill="none"
                stroke="url(#vln-window-arc)"
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray="72 100"
              />
              <text x="80" y="66" textAnchor="middle" fontSize="26" fontWeight="800" fill="var(--vln-text-primary)">
                87.4
              </text>
              <text x="80" y="82" textAnchor="middle" fontSize="8" letterSpacing="2" fill="var(--vln-text-muted)">
                MBPS DOWNLOAD
              </text>
            </svg>
          </div>

          {/* stats + chart */}
          <div className="md:col-span-3">
            <div className="grid grid-cols-3 gap-3">
              {[
                { l: "Upload", v: "31.2", u: "Mbps" },
                { l: "Ping", v: "14", u: "ms" },
                { l: "Jitter", v: "2", u: "ms" },
              ].map((s) => (
                <div key={s.l} className="rounded-xl bg-bg border border-border px-3 py-3">
                  <p className="tabular text-lg sm:text-xl font-bold text-primary leading-none">{s.v}</p>
                  <p className="mt-1.5 text-[11px] text-muted">
                    {s.u} · {s.l}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-4 rounded-xl bg-bg border border-border p-3">
              <p className="text-[10px] uppercase tracking-widest text-muted mb-1">Speed over time</p>
              <svg viewBox="0 0 300 80" className="w-full h-20" aria-hidden="true">
                <defs>
                  <linearGradient id="vln-window-fill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--vln-accent)" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="var(--vln-accent)" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path
                  d="M0 60 C 30 40, 50 22, 80 24 S 130 20, 160 18 S 230 22, 300 16 L 300 80 L 0 80 Z"
                  fill="url(#vln-window-fill)"
                />
                <path
                  d="M0 60 C 30 40, 50 22, 80 24 S 130 20, 160 18 S 230 22, 300 16"
                  fill="none"
                  stroke="var(--vln-accent)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
                <path
                  d="M0 70 C 40 62, 70 52, 110 54 S 200 50, 300 46"
                  fill="none"
                  stroke="var(--vln-accent-2)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeDasharray="4 4"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <p className="mt-3 text-center text-xs text-muted">Example result. Your numbers will differ.</p>
    </div>
  );
}

/* ---------- 3. Two tall statement cards ---------- */

function WatermarkGauge({ color }: { color: string }) {
  return (
    <svg
      viewBox="0 0 200 200"
      className="absolute -right-10 -bottom-10 w-64 h-64 pointer-events-none"
      style={{ opacity: 0.14 }}
      aria-hidden="true"
    >
      <path d="M 30 150 A 85 85 0 1 1 170 150" fill="none" stroke={color} strokeWidth="22" strokeLinecap="round" />
      <path d="M 100 110 L 140 60" fill="none" stroke={color} strokeWidth="14" strokeLinecap="round" />
    </svg>
  );
}

function StatementCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div
        className="relative overflow-hidden rounded-3xl p-7 sm:p-9 min-h-[300px] sm:min-h-[340px] flex flex-col justify-between ring-hairline"
        style={{
          background:
            "linear-gradient(160deg, color-mix(in srgb, var(--vln-accent) 30%, var(--vln-surface)), color-mix(in srgb, var(--vln-accent-2) 22%, var(--vln-surface)))",
        }}
      >
        <WatermarkGauge color="var(--vln-accent)" />
        <h3 className="relative text-2xl sm:text-3xl font-medium leading-snug text-primary max-w-xs">
          Know what your connection actually delivers.
        </h3>
        <div className="relative flex items-center gap-3">
          <span className="w-9 h-9 rounded-full bg-elevated ring-hairline flex items-center justify-center text-accent">
            <Gauge size={17} />
          </span>
          <span className="text-sm leading-tight">
            <span className="block font-semibold text-primary">VLN Speed</span>
            <span className="block text-xs text-secondary">Download, upload, ping and jitter</span>
          </span>
        </div>
      </div>

      <div
        className="relative overflow-hidden rounded-3xl p-7 sm:p-9 min-h-[300px] sm:min-h-[340px] flex flex-col justify-between text-white"
        style={{ background: "linear-gradient(160deg, #4361ee, #3a4fd0)" }}
      >
        <WatermarkGauge color="#ffffff" />
        <h3 className="relative text-2xl sm:text-3xl font-medium leading-snug max-w-xs">
          Built for checking your speed on the go.
        </h3>
        <div className="relative flex items-center gap-3">
          <span className="w-9 h-9 rounded-full bg-white flex items-center justify-center" style={{ color: "#4361ee" }}>
            <Smartphone size={17} />
          </span>
          <span className="text-sm leading-tight">
            <span className="block font-semibold">Runs in your browser</span>
            <span className="block text-xs" style={{ opacity: 0.8 }}>
              Mobile data or Wi-Fi, no signup
            </span>
          </span>
        </div>
      </div>
    </div>
  );
}

/* ---------- 4. How much speed ---------- */

const SPEED_ROWS = [
  { activity: "Browsing, email and social media", speed: "5 Mbps" },
  { activity: "Video calls", speed: "10 Mbps" },
  { activity: "HD video streaming", speed: "8 Mbps" },
  { activity: "4K video streaming", speed: "25 Mbps" },
  { activity: "Online gaming", speed: "25 Mbps" },
  { activity: "Busy household (4+ devices)", speed: "100 Mbps" },
];

function SpeedTable() {
  return (
    <div>
      <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-primary">How much speed do you need?</h2>
      <p className="mt-2 text-sm sm:text-base text-secondary max-w-xl">
        Approximate download speed for one person or device. Needs add up when several people share a connection.
      </p>

      <div className="mt-8 card-premium rounded-2xl overflow-hidden">
        {SPEED_ROWS.map((row, i) => (
          <div
            key={row.activity}
            className={`flex items-center justify-between gap-4 px-5 sm:px-6 py-4 ${i > 0 ? "border-t border-border" : ""}`}
          >
            <span className="text-sm text-primary">{row.activity}</span>
            <span className="tabular text-sm font-semibold text-primary shrink-0">{row.speed}</span>
          </div>
        ))}
      </div>

      <Link
        to="/internet-speed-guide"
        className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:underline"
      >
        Read the full speed guide <ArrowRight size={14} />
      </Link>
    </div>
  );
}

export function HomeShowcase() {
  return (
    <section className="max-w-5xl mx-auto px-5 sm:px-8 mt-20 flex flex-col gap-14">
      <MeasureCard />
      <AppWindow />
      <StatementCards />
      <SpeedTable />
    </section>
  );
}