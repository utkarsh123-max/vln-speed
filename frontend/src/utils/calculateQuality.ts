import type { QualityLevel } from "../types";

/**
 * Single source of truth for what counts as "Excellent / Good / Fair /
 * Slow". Documented, adjustable in one place, and never hidden from the
 * user — the raw numbers are always shown alongside the label.
 */
export const QUALITY_THRESHOLDS = {
  excellent: { minDownloadMbps: 80, minUploadMbps: 20, maxPingMs: 30, maxJitterMs: 10 },
  good: { minDownloadMbps: 25, minUploadMbps: 5, maxPingMs: 60, maxJitterMs: 25 },
  fair: { minDownloadMbps: 5, minUploadMbps: 1, maxPingMs: 120, maxJitterMs: 50 },
  // anything below "fair" is classified "slow"
};

export function calculateQuality(
  downloadMbps: number,
  uploadMbps: number,
  pingMs: number,
  jitterMs: number
): QualityLevel {
  const t = QUALITY_THRESHOLDS;

  if (
    downloadMbps >= t.excellent.minDownloadMbps &&
    uploadMbps >= t.excellent.minUploadMbps &&
    pingMs <= t.excellent.maxPingMs &&
    jitterMs <= t.excellent.maxJitterMs
  ) {
    return "excellent";
  }

  if (
    downloadMbps >= t.good.minDownloadMbps &&
    uploadMbps >= t.good.minUploadMbps &&
    pingMs <= t.good.maxPingMs &&
    jitterMs <= t.good.maxJitterMs
  ) {
    return "good";
  }

  if (
    downloadMbps >= t.fair.minDownloadMbps &&
    uploadMbps >= t.fair.minUploadMbps &&
    pingMs <= t.fair.maxPingMs &&
    jitterMs <= t.fair.maxJitterMs
  ) {
    return "fair";
  }

  return "slow";
}

export const QUALITY_LABEL: Record<QualityLevel, string> = {
  excellent: "Excellent",
  good: "Good",
  fair: "Fair",
  slow: "Slow",
};

export const QUALITY_SCORE: Record<QualityLevel, number> = {
  excellent: 1,
  good: 0.72,
  fair: 0.42,
  slow: 0.18,
};
