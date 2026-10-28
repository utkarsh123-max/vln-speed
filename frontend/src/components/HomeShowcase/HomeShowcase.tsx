import { Link } from "react-router-dom";
import { ArrowRight, Gauge, Radio, Smartphone, Zap } from "lucide-react";

const FEATURES = [
  {
    icon: Gauge,
    title: "Measured, not estimated",
    text: "Download and upload speeds come from real data transferred between your device and our test server.",
  },
  {
    icon: Radio,
    title: "Latency and jitter",
    text: "Ping and jitter show how responsive your connection is, which matters for video calls and gaming.",
  },
  {
    icon: Smartphone,
    title: "Works on your phone",
    text: "The test runs in your browser on mobile data or Wi-Fi. There is nothing to install.",
  },
  {
    icon: Zap,
    title: "No signup",
    text: "Open the page and start the test. No account or email address is required.",
  },
];

const SPEED_ROWS = [
  { activity: "Browsing, email and social media", speed: "5 Mbps" },
  { activity: "Video calls", speed: "10 Mbps" },
  { activity: "HD video streaming", speed: "8 Mbps" },
  { activity: "4K video streaming", speed: "25 Mbps" },
  { activity: "Online gaming", speed: "25 Mbps" },
  { activity: "Busy household (4+ devices)", speed: "100 Mbps" },
];

export function HomeShowcase() {
  const scrollToTest = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <section className="max-w-5xl mx-auto px-5 sm:px-8 mt-20 flex flex-col gap-14">
      {/* Why VLN Speed */}
      <div>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-primary">Why use VLN Speed</h2>
        <p className="mt-2 text-sm sm:text-base text-secondary max-w-xl">
          A simple speed test that shows more than one number.
        </p>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {FEATURES.map((f) => (
            <div key={f.title} className="card-premium rounded-2xl p-5 sm:p-6 flex gap-4">
              <span className="shrink-0 w-10 h-10 rounded-xl bg-elevated ring-hairline flex items-center justify-center text-accent">
                <f.icon size={18} />
              </span>
              <div>
                <h3 className="text-base font-semibold text-primary">{f.title}</h3>
                <p className="mt-1 text-sm text-secondary leading-relaxed">{f.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* How much speed */}
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

      {/* CTA */}
      <div className="card-premium rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-primary">Ready to check your connection?</h2>
          <p className="mt-1 text-sm text-secondary">The test takes under a minute.</p>
        </div>
        <button
          type="button"
          onClick={scrollToTest}
          className="shrink-0 inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold text-white bg-[#4361ee] hover:bg-[#3651d4] transition-colors"
        >
          Run a speed test <ArrowRight size={16} />
        </button>
      </div>
    </section>
  );
}