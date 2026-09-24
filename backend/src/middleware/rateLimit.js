import rateLimit from "express-rate-limit";

/**
 * Lightweight limiter for cheap, frequent calls (ping, health, server info).
 */
export const lightLimiter = rateLimit({
  windowMs: 60 * 1000,
  limit: 200,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Too many requests. Please slow down." },
});

/**
 * Stricter limiter for expensive calls (download / upload transfer tests).
 * A single real test already fires ~15-25 of these (parallel download
 * streams + looping upload chunks), so this has to be generous enough
 * to survive two back-to-back tests, not just one.
 */
export const heavyLimiter = rateLimit({
  windowMs: 60 * 1000,
  limit: 80,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Too many test requests. Please wait a moment before testing again." },
});