import { Router } from "express";
import crypto from "node:crypto";
import { noCache } from "../middleware/noCache.js";

const router = Router();

const CHUNK_SIZE = 64 * 1024; // 64KB per write
const MAX_DURATION_MS = 15_000;
const MAX_BYTES = 200 * 1024 * 1024; // hard safety cap: 200MB per request

const CHUNK = crypto.randomBytes(CHUNK_SIZE);

/**
 * No request-count rate limiter here on purpose: a fast connection (or
 * localhost loopback) legitimately opens many chunked reads in a single
 * test, and counting that as "abuse" breaks real tests. Safety instead
 * comes from the duration cap and byte cap below, which bound any single
 * request regardless of how many run concurrently.
 */
router.get("/download", noCache, (req, res) => {
  const requestedDuration = Number(req.query.duration) || 8000;
  const duration = Math.min(Math.max(requestedDuration, 500), MAX_DURATION_MS);

  res.writeHead(200, {
    "Content-Type": "application/octet-stream",
    "Content-Disposition": "inline",
    "X-Accel-Buffering": "no",
  });

  const start = Date.now();
  let bytesSent = 0;
  let closed = false;

  req.on("close", () => {
    closed = true;
  });

  function pump() {
    if (closed) return;
    if (Date.now() - start >= duration || bytesSent >= MAX_BYTES) {
      res.end();
      return;
    }

    const canContinue = res.write(CHUNK);
    bytesSent += CHUNK_SIZE;

    if (canContinue) {
      setImmediate(pump);
    } else {
      res.once("drain", pump);
    }
  }

  pump();
});

export default router;