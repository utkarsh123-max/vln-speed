import { Router } from "express";
import { lightLimiter } from "../middleware/rateLimit.js";

const router = Router();

/**
 * Describes THIS running instance. In a real multi-region deployment you'd
 * run one of these processes per region (e.g. del-01, bom-01, sin-01...) and
 * the frontend's server list would point at each one's public URL. The
 * frontend measures real latency to each candidate by timing GET /ping.
 */
router.get("/server", lightLimiter, (req, res) => {
  res.json({
    id: process.env.SERVER_ID || "local-01",
    name: process.env.SERVER_NAME || "Local",
    region: process.env.SERVER_REGION || "Development",
  });
});

export default router;