import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HelpCircle, ChevronDown } from "lucide-react";
import { Seo, JsonLd } from "../components/Seo/Seo";
import { BackButton } from "../components/BackButton/BackButton";

const easeOut = [0.22, 1, 0.36, 1] as const;

const FAQS = [
  {
    q: "What is an internet speed test?",
    a: "A speed test measures how fast data travels between your device and a test server. It checks download speed (data coming to you), upload speed (data you send out), and ping/latency (how quickly a signal round-trips). VLN Speed does this by actually transferring real data and timing it — not by estimating.",
  },
  {
    q: "How accurate are internet speed tests?",
    a: "Reasonably accurate for the moment they run, but they measure one connection, over one path, at one point in time. Your Wi-Fi signal, router, other devices on the network, and the server's distance all affect the number. Running the test 2-3 times at different times of day gives a more reliable picture than a single result.",
  },
  {
    q: "What does Mbps mean?",
    a: "Mbps stands for megabits per second — a unit of data transfer speed. It's different from MB/s (megabytes per second); there are 8 bits in a byte, so 100 Mbps is about 12.5 MB/s. File download managers and browsers usually show MB/s, which is why your download speed looks slower than your speed-test result even when both are correct.",
  },
  {
    q: "What is a good ping for gaming or calls?",
    a: "Under 30ms is excellent, 30-60ms is good for most games and calls, 60-120ms is noticeable but usually workable, and above 120ms starts to feel sluggish in real-time applications. Fast-paced competitive games benefit most from low ping; a video call can tolerate a bit more.",
  },
  {
    q: "Why does my speed change every time I test?",
    a: "Your ISP's network load varies by time of day, your home Wi-Fi conditions change (interference, distance from router), other devices on your network compete for bandwidth, and the test server itself may be busier at different times. Some variation between tests is completely normal.",
  },
  {
    q: "Does Wi-Fi affect speed test results?",
    a: "Yes, significantly. Wi-Fi signal strength, distance from the router, wall interference, and the number of devices connected can all reduce your measured speed well below what your ISP delivers to your router. For the most accurate baseline reading, connect your device directly to the router with an Ethernet cable.",
  },
  {
    q: "Should I use Ethernet instead of Wi-Fi for testing?",
    a: "If you want to know your connection's true maximum, yes. Ethernet removes Wi-Fi as a variable. If you want to know what you actually experience day-to-day on your phone or laptop over Wi-Fi, testing over Wi-Fi is more representative of real use.",
  },
  {
    q: "Why is my upload speed slower than download?",
    a: "Most home internet plans (especially cable and DSL) are designed asymmetrically — they allocate more capacity to download than upload, because most home use (browsing, streaming, downloads) is download-heavy. Fiber connections often have symmetric or near-symmetric speeds.",
  },
  {
    q: "Does using a VPN affect my speed test result?",
    a: "Yes. A VPN routes your traffic through an additional server, usually adding latency and sometimes reducing throughput due to encryption overhead and the VPN server's own capacity. If you want to measure your raw connection, turn off the VPN before testing.",
  },
  {
    q: "How many times should I run a speed test?",
    a: "Running it 2-3 times, ideally at different times of day (e.g., once in the evening when network use is high), gives a more reliable sense of your typical speed than a single test.",
  },
  {
    q: "Can other devices on my network affect my test result?",
    a: "Yes. If someone else on your network is streaming 4K video, downloading a large file, or on a video call while you run the test, your available bandwidth will be lower than your plan's maximum.",
  },
  {
    q: "Why is my ISP's advertised speed different from my test result?",
    a: "ISPs advertise the maximum speed available under ideal conditions on a wired connection directly to their equipment. Real-world results are affected by Wi-Fi, device capability, network congestion, and distance to the test server — so some gap between advertised and measured speed is expected.",
  },
  {
    q: "What is jitter and why does it matter?",
    a: "Jitter is the variation in ping over time — how consistent your latency is, not just how low. Low jitter means a stable connection; high jitter causes stuttering in video calls and games even if your average ping looks fine.",
  },
  {
    q: "Why is my phone faster or slower than my laptop on the same Wi-Fi?",
    a: "Different devices have different Wi-Fi hardware (antenna quality, supported Wi-Fi standards like Wi-Fi 5 vs Wi-Fi 6). A newer phone may outperform an older laptop on the exact same network, and vice versa.",
  },
  {
    q: "What should I do before running a speed test?",
    a: "Pause large downloads and uploads, close streaming apps and tabs, disconnect devices you don't need active, and if possible, connect via Ethernet. This isolates your connection as the only thing being measured.",
  },
  {
    q: "Does the server location affect my results?",
    a: "Yes. A server physically closer to you generally gives lower ping and can show higher throughput, since data travels a shorter physical distance with fewer network hops. VLN Speed measures latency to find a low-latency server automatically.",
  },
  {
    q: "Is VLN Speed free to use?",
    a: "Yes, VLN Speed is free with no account or sign-up required.",
  },
  {
    q: "Does VLN Speed store my test results?",
    a: "Your test history is stored only in your browser's local storage on your own device — it isn't uploaded to or stored on our servers. Clearing your browser data removes it.",
  },
];

export function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <div className="max-w-2xl mx-auto px-5 sm:px-8 pt-4 sm:pt-6 pb-16">
      <Seo
        title="Frequently Asked Questions"
        description="Answers to common questions about internet speed tests: accuracy, Mbps vs MB/s, ping, Wi-Fi vs Ethernet, VPNs, and why your speed changes."
        canonicalPath="/faq"
      />

      <BackButton />
      <JsonLd id="faq-page" data={schema} />

      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: easeOut }}
        className="text-center mb-10"
      >
        <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border bg-elevated/60 text-[11px] tracking-[0.16em] uppercase text-secondary font-semibold">
          <HelpCircle size={12} className="text-accent" />
          Frequently asked
        </span>
        <h1 className="mt-5 text-3xl sm:text-4xl font-extrabold tracking-tight text-gradient">FAQ</h1>
        <p className="mt-4 text-sm text-muted max-w-md mx-auto leading-relaxed">
          Straight answers about speed tests, accuracy, and what your numbers actually mean.
        </p>
      </motion.div>

      <div className="flex flex-col gap-2.5">
        {FAQS.map((item, i) => {
          const isOpen = openIndex === i;
          return (
            <motion.div
              key={item.q}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: Math.min(i * 0.03, 0.4), ease: easeOut }}
              className="card-premium rounded-2xl overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : i)}
                className="w-full flex items-center justify-between gap-3 px-5 py-4 text-left"
                aria-expanded={isOpen}
              >
                <span className="text-sm font-medium text-primary">{item.q}</span>
                <motion.span animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.25 }} className="text-muted shrink-0">
                  <ChevronDown size={16} />
                </motion.span>
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: easeOut }}
                    className="overflow-hidden"
                  >
                    <p className="px-5 pb-4 text-sm text-secondary leading-relaxed">{item.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}