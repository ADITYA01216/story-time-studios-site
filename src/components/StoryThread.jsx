// src/components/StoryThread.jsx
// The signature SVG "story thread" bookmark ribbon that runs down the page.
// Draws itself in based on scroll progress.
import { useEffect, useRef } from "react";

export default function StoryThread() {
  const pathRef = useRef(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced || !pathRef.current) return;

    const path = pathRef.current;
    const length = path.getTotalLength();
    path.style.strokeDasharray = length;
    path.style.strokeDashoffset = length;

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.min(scrollTop / docHeight, 1);
      path.style.strokeDashoffset = length * (1 - progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed left-1/2 top-0 bottom-0 -translate-x-1/2 w-0 pointer-events-none z-0 hidden lg:block"
      style={{ width: "2px", height: "100vh" }}
    >
      <svg
        width="24"
        height="100%"
        viewBox="0 0 24 800"
        preserveAspectRatio="none"
        className="absolute inset-0"
        style={{ width: "24px", left: "-11px", height: "100vh", position: "fixed", top: 0 }}
      >
        <path
          ref={pathRef}
          d="M12 0 C8 100, 16 200, 12 300 C8 400, 16 500, 12 600 C8 700, 16 780, 12 800"
          stroke="#7C3AED"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          opacity="0.3"
          className="story-thread"
        />
      </svg>
    </div>
  );
}
