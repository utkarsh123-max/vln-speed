import { Router } from "express";
import { noCache } from "../middleware/noCache.js";
import { lightLimiter } from "../middleware/rateLimit.js";

const router = Router();

/**
 * Deliberately the smallest possible response. The client times the full
 * round trip with performance.now() around the fetch() call; this handler's
 * job is just to reply as fast as possible so that round trip time reflects
 * network latency rather than server work.
 */
router.get("/ping", lightLimiter, noCache, (req, res) => {
  res.status(204).end();
});

export default router;