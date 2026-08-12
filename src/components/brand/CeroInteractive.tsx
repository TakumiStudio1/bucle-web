"use client";

import { useEffect, useRef, useState } from "react";
import { Cero, type CeroPose } from "./Cero";

interface CeroInteractiveProps {
  className?: string;
  bodyColor?: string;
  eyeColor?: string;
}

/**
 * CERO with a few extra pixels of eye-tracking on desktop pointer move.
 * Keeps the base SVG untouched — this only nudges its wrapper transform,
 * so the "no mouth / no limbs" rule still lives in one place (Cero.tsx).
 */
export function CeroInteractive({
  className,
  bodyColor,
  eyeColor,
}: CeroInteractiveProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [pose, setPose] = useState<CeroPose>("normal");

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReducedMotion) return;

    function handlePointerMove(event: PointerEvent) {
      const el = wrapperRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = Math.max(-1, Math.min(1, (event.clientX - cx) / 400));
      const dy = Math.max(-1, Math.min(1, (event.clientY - cy) / 400));
      setOffset({ x: dx * 5, y: dy * 5 });
    }

    const winkTimer = window.setInterval(() => {
      setPose("wink");
      window.setTimeout(() => setPose("normal"), 260);
    }, 7000);

    window.addEventListener("pointermove", handlePointerMove, {
      passive: true,
    });
    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.clearInterval(winkTimer);
    };
  }, []);

  return (
    <div ref={wrapperRef} className={className}>
      <div
        style={{
          transform: `translate(${offset.x}px, ${offset.y}px)`,
          transition: "transform 0.2s ease-out",
        }}
      >
        <Cero pose={pose} bodyColor={bodyColor} eyeColor={eyeColor} blink />
      </div>
    </div>
  );
}
