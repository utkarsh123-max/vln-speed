import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * React Router doesn't reset scroll position on navigation the way a
 * normal multi-page site does — without this, clicking a Footer/Navbar
 * link while scrolled down on one page leaves you scrolled down on the
 * next page too. This scrolls to the top on every route change.
 */
export function useScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [pathname]);
}