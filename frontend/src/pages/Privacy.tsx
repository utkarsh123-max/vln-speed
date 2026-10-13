import { motion } from "framer-motion";
import { ShieldCheck, Cookie, Database, ServerCog, Eye, Megaphone } from "lucide-react";
import { Seo } from "../components/Seo/Seo";
import { BackButton } from "../components/BackButton/BackButton";

const easeOut = [0.22, 1, 0.36, 1] as const;

const SECTIONS = [
  {
    icon: Eye,
    title: "What's measured",
    body: "During a speed test, your browser exchanges test data (random bytes with no personal content) with the VLN test server to time download and upload speed, and sends small ping requests to measure latency. This test data is never linked to your identity.",
  },
  {
    icon: Database,
    title: "History",
    body: "Your past test results are stored only in your browser's local storage on this device. They are not uploaded to or stored on our servers. Clearing your browser data, or using \"Clear all\" on the History page, removes them completely.",
  },
  {
    icon: ServerCog,
    title: "Server logs",
    body: "Like any web server, our test servers see standard connection metadata (such as IP address and request timing) needed to serve the test. This operational data is not paired with an account or used to build a profile of you.",
  },
  {
    icon: Megaphone,
    title: "Public IP and ISP lookup",
    body: "To show your ISP and approximate location, your browser queries a third-party IP-lookup service directly. That lookup does not pass through, or get logged by, VLN Speed's own servers.",
  },
];

export function Privacy() {
  return (
    <div className="max-w-2xl mx-auto px-5 sm:px-8 pt-14 sm:pt-20 pb-16">
      <Seo
        title="Privacy Policy"
        description="VLN Speed's privacy policy: what data is collected during a speed test, how cookies and advertising work on this site, and your choices."
        canonicalPath="/privacy"
      />

      <BackButton />

      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: easeOut }}
        className="text-center mb-10"
      >
        <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border bg-elevated/60 text-[11px] tracking-[0.16em] uppercase text-secondary font-semibold">
          <ShieldCheck size={12} className="text-accent" />
          Data &amp; privacy
        </span>
        <h1 className="mt-5 text-3xl sm:text-4xl font-extrabold tracking-tight text-gradient">Privacy Policy</h1>
        <p className="mt-4 text-sm text-muted max-w-md mx-auto leading-relaxed">
          A plain, honest account of what happens to your data on VLN Speed. Last updated October 2026.
        </p>
      </motion.div>

      <div className="grid sm:grid-cols-2 gap-4 mb-10">
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

      {/* AdSense / cookies disclosure — required by Google's publisher policies */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.45, ease: easeOut }}
        className="card-premium rounded-2xl p-6 sm:p-7 mb-6"
      >
        <div className="flex items-center gap-3 mb-3">
          <span className="w-9 h-9 rounded-xl bg-accent/10 flex items-center justify-center text-accent">
            <Cookie size={17} />
          </span>
          <h2 className="text-sm font-semibold text-primary">Cookies &amp; advertising</h2>
        </div>
        <div className="flex flex-col gap-3 text-sm text-secondary leading-relaxed">
          <p>
            This site may show ads served by Google and its advertising partners, including Google AdSense.
            Google and its partners use cookies — including the DoubleClick cookie — to serve ads based on your
            visits to this and other websites, in order to show you relevant advertising.
          </p>
          <p>
            You can opt out of personalized advertising by visiting{" "}
            <a
              href="https://adssettings.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:underline"
            >
              Google's Ads Settings
            </a>
            , or opt out of third-party vendor use of cookies for personalized advertising by visiting{" "}
            <a
              href="https://optout.aboutads.info"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:underline"
            >
              www.aboutads.info
            </a>
            .
          </p>
          <p>
            Third-party vendors, including Google, use cookies to serve ads based on a user's prior visits to this
            website or other websites. These cookies allow Google and its partners to serve ads based on your
            visit to our site and/or other sites on the internet. For more on how Google uses data when you use
            our site, see{" "}
            <a
              href="https://policies.google.com/technologies/partner-sites"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:underline"
            >
              How Google uses information from sites or apps that use our services
            </a>
            .
          </p>
        </div>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="text-xs text-muted text-center leading-relaxed max-w-md mx-auto"
      >
        We don't claim this setup is "100% private" — no networked service can honestly claim that. It's designed
        to collect the minimum needed to run an accurate test. If you have questions, reach out on our{" "}
        <a href="#/contact" className="text-accent hover:underline">
          Contact
        </a>{" "}
        page.
      </motion.p>
    </div>
  );
}