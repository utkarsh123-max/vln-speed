import { Router } from "express";
import crypto from "node:crypto";
import { Readable } from "node:stream";
import { noCache } from "../middleware/noCache.js";

const router = Router();

const CHUNK_SIZE = 64 * 1024; // 64KB per push
const MAX_DURATION_MS = 15_000;
const MAX_BYTES = 200 * 1024 * 1024; // hard safety cap: 200MB per request

const CHUNK = crypto.randomBytes(CHUNK_SIZE);

/**
 * Streams data using a proper Node Readable stream + .pipe(), instead of a
 * manual res.write()/setImmediate() recursion. The manual version could
 * monopolize the event loop under load, which on a low-CPU free-tier
 * instance starved the platform's own health checks and caused Render to
 * kill the connection mid-transfer (~4-5s in). Readable + pipe() lets
 * Node's stream internals pace pushes and cooperate with the event loop
 * instead of hammering it in a tight loop.
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

  const stream = new Readable({
    highWaterMark: CHUNK_SIZE * 4,
    read() {
      if (Date.now() - start >= duration || bytesSent >= MAX_BYTES) {
        this.push(null);
        return;
      }
      bytesSent += CHUNK_SIZE;
      this.push(CHUNK);
    },
  });

  req.on("close", () => {
    stream.destroy();
  });

  stream.on("error", () => {
    if (!res.writableEnded) res.end();
  });

  stream.pipe(res);
});

export default router;