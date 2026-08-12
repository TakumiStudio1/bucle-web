"use client";

import { useEffect, useState } from "react";

/**
 * Entrance animation for the hero: the lime loop drops in, then CERO pops
 * up from the hole with a bounce. Pure CSS keyframes (see globals.css) so
 * it plays once on mount and collapses to its end state automatically
 * under prefers-reduced-motion via the global stylesheet rule.
 */
export function HeroDonutReveal({ className }: { className?: string }) {
  const [blink, setBlink] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReducedMotion) return;

    const startBlink = window.setTimeout(() => setBlink(true), 1200);
    return () => window.clearTimeout(startBlink);
  }, []);

  return (
    <div className={`relative aspect-square w-full ${className ?? ""}`}>
      <svg viewBox="0 0 400 400" className="h-full w-full" aria-hidden="true">
        <ellipse
          className="hero-reveal-orbit"
          cx="200"
          cy="205"
          rx="188"
          ry="80"
          fill="none"
          stroke="var(--color-strawberry)"
          strokeWidth="2.5"
          transform="rotate(-8 200 205)"
        />

        <g className="hero-reveal-donut">
          <path
            fillRule="evenodd"
            d="M200 28 A172 172 0 1 1 199.9 28 Z M200 108 A92 92 0 1 0 200.1 108 Z"
            fill="var(--color-lime)"
          />
          <circle
            cx="200"
            cy="200"
            r="172"
            fill="none"
            stroke="var(--color-cocoa)"
            strokeOpacity="0.08"
            strokeWidth="2"
          />
        </g>

        <g className="hero-reveal-cero">
          <circle cx="200" cy="200" r="86" fill="var(--color-cocoa)" />
          <g
            style={
              blink
                ? {
                    transformOrigin: "200px 204px",
                    animation: "blink 4.5s ease-in-out infinite",
                  }
                : undefined
            }
          >
            <ellipse cx="172" cy="204" rx="15" ry="19" fill="var(--color-cream)" />
            <ellipse cx="228" cy="204" rx="15" ry="19" fill="var(--color-cream)" />
          </g>
        </g>
      </svg>
    </div>
  );
}
