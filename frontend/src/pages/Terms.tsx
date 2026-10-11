import { motion } from "framer-motion";
import { FileText } from "lucide-react";
import { Seo } from "../components/Seo/Seo";

const easeOut = [0.22, 1, 0.36, 1] as const;

const SECTIONS = [
  {
    title: "Acceptable use",
    body: "VLN Speed is provided for personal, non-commercial measurement of your own internet connection. Don't use automated scripts to hammer the test servers, attempt to disrupt the service, or use the tool to test connections you don't have permission to test.",
  },
  {
    title: "Service availability",
    body: "VLN Speed is provided on a best-effort basis. We don't guarantee the service will be available at all times, and test servers may occasionally be slow or temporarily unreachable due to maintenance, load, or hosting-provider issues outside our control.",
  },
  {
    title: "Accuracy limitations",
    body: "A speed test measures your connection to our test server at a specific moment, over a specific path. Results can be affected by your Wi-Fi, router, device, other active devices on your network, your ISP's network conditions, and the distance to the server. We do not guarantee that results exactly match your ISP's advertised plan speed or your real-world experience on every other website or service.",
  },
  {
    title: "Third-party network dependencies",
    body: "The test relies on your browser, your local network, your ISP, and the hosting infrastructure the test servers run on. We aren't responsible for inaccuracies or interruptions caused by any of these layers outside our direct control.",
  },
  {
    title: "Limitation of liability",
    body: "VLN Speed is provided \"as is\" without warranties of any kind. We aren't liable for any decisions made, money spent, or disputes with an ISP based on a result shown by this tool. Use the results as a helpful reference point, not as a certified measurement.",
  },
  {
    title: "Changes to the service",
    body: "We may update, change, or discontinue parts of VLN Speed at any time — including test servers, measurement methodology, or features — without prior notice. Continued use of the site after a change means you accept the updated terms.",
  },
];

export function Terms() {
  return (
    <div className="max-w-2xl mx-auto px-5 sm:px-8 pt-14 sm:pt-20 pb-16">
      <Seo
        title="Terms and Conditions"
        description="Terms and conditions for using VLN Speed's internet speed testing tool, including acceptable use, accuracy limitations, and service availability."
        canonicalPath="/terms"
      />

      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: easeOut }}
        className="text-center mb-10"
      >
        <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border bg-elevated/60 text-[11px] tracking-[0.16em] uppercase text-secondary font-semibold">
          <FileText size={12} className="text-accent" />
          Legal
        </span>
        <h1 className="mt-5 text-3xl sm:text-4xl font-extrabold tracking-tight text-gradient">Terms &amp; Conditions</h1>
        <p className="mt-4 text-sm text-muted max-w-md mx-auto leading-relaxed">
          Plain terms for using VLN Speed. Last updated October 2026.
        </p>
      </motion.div>

      <div className="flex flex-col gap-4">
        {SECTIONS.map((s, i) => (
          <motion.div
            key={s.title}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.08 + i * 0.06, ease: easeOut }}
            className="card-premium rounded-2xl p-5 sm:p-6"
          >
            <h2 className="text-sm font-semibold text-primary mb-2">{s.title}</h2>
            <p className="text-sm text-secondary leading-relaxed">{s.body}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}