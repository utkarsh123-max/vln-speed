import { API_BASE } from "../services/api";
import type { ServerInfo } from "../types";

/**
 * A real multi-region deployment runs one instance of /backend per region
 * (Delhi, Mumbai, Singapore, ...) and lists each one's public URL here so
 * the frontend can measure real latency to every candidate and let the
 * user pick, exactly like section 12/27 of the brief describe.
 *
 * Set VITE_SERVERS as a JSON array in your .env to point at your real
 * deployed regions, e.g.:
 *   VITE_SERVERS=[{"id":"del-01","name":"Delhi","region":"India","url":"https://del.vlnspeed.com"},
 *                 {"id":"bom-01","name":"Mumbai","region":"India","url":"https://bom.vlnspeed.com"}]
 *
 * Until you deploy more than one region, this safely falls back to the
 * single backend configured via VITE_API_URL.
 */
function loadServers(): ServerInfo[] {
  const raw = import.meta.env.VITE_SERVERS as string | undefined;
  if (raw) {
    try {
      const parsed = JSON.parse(raw) as ServerInfo[];
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    } catch {
      console.warn("VITE_SERVERS is not valid JSON, falling back to the default server.");
    }
  }
  return [{ id: "default", name: "Auto", region: "Nearest available", url: API_BASE }];
}

export const SERVERS: ServerInfo[] = loadServers();
export const DEFAULT_SERVER: ServerInfo = SERVERS[0];
