/**
 * Jitter is the mean absolute deviation between consecutive latency
 * samples — a measure of how *inconsistent* the connection's response
 * time is, which matters more than raw ping for calls, gaming, etc.
 */
export function calculateJitter(samplesMs: number[]): number {
  if (samplesMs.length < 2) return 0;

  let totalDelta = 0;
  for (let i = 1; i < samplesMs.length; i++) {
    totalDelta += Math.abs(samplesMs[i] - samplesMs[i - 1]);
  }
  return totalDelta / (samplesMs.length - 1);
}

export function calculateAverage(samples: number[]): number {
  if (samples.length === 0) return 0;
  return samples.reduce((sum, v) => sum + v, 0) / samples.length;
}

export function calculateMin(samples: number[]): number {
  if (samples.length === 0) return 0;
  return Math.min(...samples);
}
