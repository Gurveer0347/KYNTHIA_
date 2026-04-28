import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * On every route change, jump the page back to the top.
 * Works with Lenis if present.
 */
export default function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    if (window.__lenis) {
      window.__lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname]);
  return null;
}
