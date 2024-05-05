import { useEffect, useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

function ScrollToTop() {
  const { pathname } = useLocation();

  // useLayoutEffect is preferred for scroll operations for smooth scrolling
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]); // Scroll to top whenever pathname changes

  // useEffect can be used as a fallback if useLayoutEffect causes performance issues
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null; // ScrollToTop doesn't render any UI
}

export default ScrollToTop;
