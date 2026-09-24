import { useCallback, useEffect, useState } from "react";
import type { SpeedTestResult } from "../types";

const STORAGE_KEY = "vln-speed:history";
const MAX_ENTRIES = 100;

/**
 * History lives in localStorage today. It's read/written only through this
 * hook and keyed by result id, so swapping the storage layer for a backend
 * database later only means changing this file — components never touch
 * localStorage directly.
 */
export function useTestHistory() {
  const [history, setHistory] = useState<SpeedTestResult[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setHistory(JSON.parse(raw));
    } catch {
      setHistory([]);
    }
  }, []);

  const persist = useCallback((next: SpeedTestResult[]) => {
    setHistory(next);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      // storage full or unavailable — history simply won't persist this session
    }
  }, []);

  const addResult = useCallback(
    (result: SpeedTestResult) => {
      setHistory((prev) => {
        const next = [result, ...prev].slice(0, MAX_ENTRIES);
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
        } catch {
          /* ignore */
        }
        return next;
      });
    },
    []
  );

  const removeResult = useCallback(
    (id: string) => {
      persist(history.filter((r) => r.id !== id));
    },
    [history, persist]
  );

  const clearHistory = useCallback(() => persist([]), [persist]);

  return { history, addResult, removeResult, clearHistory };
}
