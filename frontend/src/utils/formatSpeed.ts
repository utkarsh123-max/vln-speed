export function formatMbps(value: number, decimals = 2): string {
  if (!Number.isFinite(value) || value < 0) return "0.00";
  return value.toFixed(decimals);
}

export function formatMs(value: number): string {
  if (!Number.isFinite(value) || value < 0) return "0";
  return Math.round(value).toString();
}

export function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  const units = ["KB", "MB", "GB"];
  let val = bytes / 1024;
  let unitIndex = 0;
  while (val >= 1024 && unitIndex < units.length - 1) {
    val /= 1024;
    unitIndex++;
  }
  return `${val.toFixed(1)} ${units[unitIndex]}`;
}

export function formatDuration(seconds: number): string {
  return `${seconds.toFixed(1)}s`;
}
