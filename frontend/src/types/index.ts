export type TestPhase =
  | "idle"
  | "initializing"
  | "ping"
  | "download"
  | "upload"
  | "analyzing"
  | "complete"
  | "error";

export interface ServerInfo {
  id: string;
  name: string;
  region: string;
  url: string;
  pingMs?: number;
}

export interface PingSummary {
  minMs: number;
  avgMs: number;
  jitterMs: number;
  samples: number[];
}

export interface ThroughputSample {
  /** elapsed ms since the phase started */
  t: number;
  /** instantaneous throughput in Mbps at this sample point */
  mbps: number;
}

export interface ThroughputSummary {
  avgMbps: number;
  peakMbps: number;
  minMbps: number;
  samples: ThroughputSample[];
}

export type QualityLevel = "excellent" | "good" | "fair" | "slow";

export interface NetworkInfo {
  publicIp: string | null;
  isp: string | null;
  city: string | null;
  country: string | null;
  connectionType: string | null;
}

export interface ChartPoint {
  t: number;
  download?: number;
  upload?: number;
}

export interface SpeedTestResult {
  id: string;
  timestamp: number;
  server: ServerInfo;
  ping: PingSummary;
  download: ThroughputSummary;
  upload: ThroughputSummary;
  quality: QualityLevel;
  durationSec: number;
  network: NetworkInfo;
}
