/**
 * Speed-test traffic must never be served from a cache (browser, CDN, or
 * intermediate proxy) or every measurement after the first would be
 * meaningless. This sets headers that are safe across all common setups.
 */
export function noCache(req, res, next) {
  res.set({
    "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0",
    Pragma: "no-cache",
    Expires: "0",
    "Surrogate-Control": "no-store",
  });
  next();
}
