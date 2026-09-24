import { Router } from "express";
import { noCache } from "../middleware/noCache.js";

const router = Router();

const MAX_BYTES = 200 * 1024 * 1024; // 200MB safety cap per upload request

/**
 * Same reasoning as download.js: no per-request rate limiter, because a
 * fast/local connection naturally fires many of these in a short window.
 * The 200MB-per-request cap below is what actually prevents abuse.
 */
router.post("/upload", noCache, (req, res) => {
  const start = process.hrtime.bigint();
  let bytesReceived = 0;
  let aborted = false;

  req.on("data", (chunk) => {
    bytesReceived += chunk.length;
    if (bytesReceived > MAX_BYTES) {
      aborted = true;
      res.status(413).json({ error: "Payload too large" });
      req.destroy();
    }
  });

  req.on("end", () => {
    if (aborted) return;
    const end = process.hrtime.bigint();
    const durationMs = Number(end - start) / 1_000_000;
    const mbps = durationMs > 0 ? (bytesReceived * 8) / (durationMs / 1000) / 1_000_000 : 0;
    res.json({ bytesReceived, durationMs, mbps });
  });

  req.on("error", () => {
    if (!res.headersSent) res.status(400).json({ error: "Upload interrupted" });
  });
});

export default router;