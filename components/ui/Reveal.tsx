"use client";

import { useEffect, useRef } from "react";

/**
 * Fades and slides content in when it scrolls into view.
 * Progressive enhancement: content is fully visible in the server HTML (no-JS, crawlers,
 * reduced motion); it is only hidden once JS confirms it is still below the fold.
 */
export function Reveal({
  children,
  delay = 0,
  className = "",
  as = "div",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "li";
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // Already on screen at load: leave it visible, no animation
    if (el.getBoundingClientRect().top < window.innerHeight * 0.92) return;

    el.dataset.reveal = "pending";
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        el.style.transitionDelay = `${delay}s`;
        el.dataset.reveal = "shown";
        io.disconnect();
      },
      { rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [delay]);

  const Comp = as;
  return (
    <Comp ref={ref as React.Ref<HTMLDivElement & HTMLLIElement>} className={`reveal ${className}`}>
      {children}
    </Comp>
  );
}
