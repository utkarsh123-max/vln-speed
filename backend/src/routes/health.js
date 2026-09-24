import { Router } from "express";
import { lightLimiter } from "../middleware/rateLimit.js";

const router = Router();

router.get("/health", lightLimiter, (req, res) => {
  res.json({ status: "ok", time: Date.now(), uptimeSec: Math.round(process.uptime()) });
});

export default router;