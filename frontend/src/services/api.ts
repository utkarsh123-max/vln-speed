import type { NetworkInfo, ServerInfo } from "../types";

/**
 * Base URL of the measurement backend (server/index.js). Set
 * VITE_API_URL in your .env when deploying — e.g.
 * VITE_API_URL=https://vln-speed-api.onrender.com
 */
export const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:4000";

export async function fetchHealth(baseUrl: string = API_BASE): Promise<boolean> {
  try {
    const res = await fetch(`${baseUrl}/api/health`, { cache: "no-store" });
    return res.ok;
  } catch {
    return false;
  }
}

export async function fetchServerInfo(baseUrl: string = API_BASE): Promise<Pick<ServerInfo, "id" | "name" | "region">> {
  const res = await fetch(`${baseUrl}/api/server`, { cache: "no-store" });
  if (!res.ok) throw new Error("Could not reach test server");
  return res.json();
}

/**
 * Public IP / ISP lookup. Done directly from the browser against a
 * CORS-enabled public API rather than through our own backend, so no
 * IP address ever needs to touch or be logged by VLN's own servers.
 * Fails soft — the rest of the app works fine without it.
 */
export async function fetchNetworkInfo(): Promise<NetworkInfo> {
  try {
    const res = await fetch("https://ipapi.co/json/", { cache: "no-store" });
    if (!res.ok) throw new Error("lookup failed");
    const data = await res.json();
    return {
      publicIp: data.ip ?? null,
      isp: data.org ?? null,
      city: data.city ?? null,
      country: data.country_name ?? null,
      connectionType: detectConnectionType(),
    };
  } catch {
    return {
      publicIp: null,
      isp: null,
      city: null,
      country: null,
      connectionType: detectConnectionType(),
    };
  }
}

function detectConnectionType(): string | null {
  const nav = navigator as Navigator & {
    connection?: { effectiveType?: string; type?: string };
  };
  const conn = nav.connection;
  if (!conn) return null;
  return conn.type || conn.effectiveType || null;
}
