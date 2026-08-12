"use client";

import { useEffect, useRef, useState } from "react";

const FRAME_COUNT = 48;
const LAST_FRAME = FRAME_COUNT - 1;
const PRIORITY_FRAMES = [0, 12, 24, 36, 47];
const MAX_DPR = 2;

// The donut+CERO artwork only occupies the center of each 1600×1000 frame
// (union alpha bbox across all 48 frames: x 364–1234, y 29–956). "Contain"
// fitting against the full frame leaves the subject looking small, so the
// fit is computed against this tighter virtual window instead — still pure
// containment (nothing is cropped, transparent margin is just excluded
// from the scale math) and it stays perfectly centered frame to frame.
const CONTENT_WIDTH = 1000;
const CONTENT_HEIGHT = 1000;
const CONTENT_CENTER_X = 799;
const CONTENT_CENTER_Y = 493;

function frameSrc(index: number): string {
  return `/images/bucle-donut-sequence/bucle-donut-${String(index).padStart(3, "0")}.webp`;
}

/**
 * Cinematic scroll-scrubbed hero: a ~400vh section with a sticky canvas.
 * Scroll position (read via getBoundingClientRect, never intercepted or
 * locked) maps to a 0–47 frame index, drawn "contain"-fit on every
 * requestAnimationFrame tick. React state is only touched when the
 * *displayed* frame number actually changes, so scrolling doesn't drive
 * component re-renders.
 */
export function BucleScrollSequence() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<Array<HTMLImageElement | null>>(
    Array.from({ length: FRAME_COUNT }, () => null),
  );
  const desiredIndexRef = useRef(0);
  const drawnIndexRef = useRef(-1);
  const rafPendingRef = useRef(false);
  const reducedMotionRef = useRef(false);

  const [displayFrame, setDisplayFrame] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const section = sectionRef.current;
    if (!canvas || !section) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    reducedMotionRef.current = media.matches;
    setReducedMotion(media.matches);
    function handleMotionChange(event: MediaQueryListEvent) {
      reducedMotionRef.current = event.matches;
      setReducedMotion(event.matches);
    }
    media.addEventListener("change", handleMotionChange);

    function drawFrame(index: number) {
      const img = imagesRef.current[index];
      if (!img || !img.complete || img.naturalWidth === 0) return;
      const c = canvasRef.current;
      const context = c?.getContext("2d");
      if (!c || !context) return;

      const scale = Math.min(c.width / CONTENT_WIDTH, c.height / CONTENT_HEIGHT);
      const width = img.naturalWidth * scale;
      const height = img.naturalHeight * scale;
      const x = c.width / 2 - CONTENT_CENTER_X * scale;
      const y = c.height / 2 - CONTENT_CENTER_Y * scale;

      context.clearRect(0, 0, c.width, c.height);
      context.drawImage(img, x, y, width, height);
      drawnIndexRef.current = index;
    }

    function loadImage(index: number, priority: "high" | "low") {
      if (imagesRef.current[index]) return;
      const img = new Image();
      if ("fetchPriority" in img) {
        (img as HTMLImageElement & { fetchPriority: string }).fetchPriority = priority;
      }
      img.decoding = "async";
      img.onload = () => {
        if (index === desiredIndexRef.current) drawFrame(index);
      };
      img.src = frameSrc(index);
      imagesRef.current[index] = img;
    }

    function resizeCanvas() {
      const c = canvasRef.current;
      const s = sectionRef.current;
      if (!c || !s) return;
      const stickyParent = c.parentElement;
      const cssWidth = stickyParent?.clientWidth ?? window.innerWidth;
      const cssHeight = stickyParent?.clientHeight ?? window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
      c.width = Math.round(cssWidth * dpr);
      c.height = Math.round(cssHeight * dpr);
      drawFrame(drawnIndexRef.current === -1 ? desiredIndexRef.current : drawnIndexRef.current);
    }

    function computeIndex(): number {
      const s = sectionRef.current;
      if (!s) return 0;
      const rect = s.getBoundingClientRect();
      const scrollable = rect.height - window.innerHeight;
      if (scrollable <= 0) return 0;
      const progress = Math.min(1, Math.max(0, -rect.top / scrollable));
      return Math.round(progress * LAST_FRAME);
    }

    function updateOnScroll() {
      rafPendingRef.current = false;
      if (reducedMotionRef.current) return;
      const index = computeIndex();
      desiredIndexRef.current = index;
      if (index !== drawnIndexRef.current) {
        drawFrame(index);
        setDisplayFrame((prev) => (prev === index ? prev : index));
      }
    }

    function requestUpdate() {
      if (rafPendingRef.current) return;
      rafPendingRef.current = true;
      requestAnimationFrame(updateOnScroll);
    }

    resizeCanvas();

    // Priority frames first (keyframes across the sequence), then the rest
    // progressively so the network isn't saturated at once.
    PRIORITY_FRAMES.forEach((index) => loadImage(index, "high"));
    const idleLoad = () => {
      for (let i = 0; i < FRAME_COUNT; i++) {
        if (!PRIORITY_FRAMES.includes(i)) loadImage(i, "low");
      }
    };
    const hasIdleCallback = typeof window.requestIdleCallback === "function";
    const idleId = hasIdleCallback
      ? window.requestIdleCallback(idleLoad, { timeout: 1500 })
      : window.setTimeout(idleLoad, 200);

    if (media.matches) {
      // Reduced motion: load and show only the final, settled frame. This
      // is a one-time sync tied to a media query read, not derived state.
      loadImage(LAST_FRAME, "high");
      desiredIndexRef.current = LAST_FRAME;
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setDisplayFrame(LAST_FRAME);
      const img = imagesRef.current[LAST_FRAME];
      if (img) {
        img.onload = () => drawFrame(LAST_FRAME);
        if (img.complete) drawFrame(LAST_FRAME);
      }
    } else {
      updateOnScroll();
    }

    function handleResize() {
      resizeCanvas();
      requestUpdate();
    }

    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", handleResize);

    return () => {
      media.removeEventListener("change", handleMotionChange);
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", handleResize);
      if (hasIdleCallback) {
        window.cancelIdleCallback(idleId as number);
      } else {
        window.clearTimeout(idleId as unknown as number);
      }
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-grape"
      style={{ height: reducedMotion ? "100vh" : "400vh" }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <canvas
          ref={canvasRef}
          className="h-full w-full"
          role="img"
          aria-label="Secuencia animada de marca: un donut BUCLE se abre y CERO, la mascota, emerge desde detrás."
        />

        <div className="pointer-events-none absolute inset-0 flex flex-col justify-between px-6 pt-24 pb-6 sm:px-10 sm:pt-28 sm:pb-10">
          <div className="flex items-center gap-2">
            <span
              className="h-1.5 w-1.5 rounded-full bg-lime"
              aria-hidden="true"
            />
            <span className="font-sans text-xs font-bold tracking-[0.3em] text-cream uppercase sm:text-sm">
              Bucle — Donuts + Coffee
            </span>
          </div>

          <div className="flex flex-col items-start justify-end gap-4 sm:flex-row sm:items-end sm:justify-between">
            <p className="font-display max-w-md text-2xl leading-[0.95] text-cream uppercase sm:text-4xl lg:text-5xl">
              Todo empieza
              <br />
              con una vuelta.
            </p>
            <span className="font-sans text-xs font-bold tracking-[0.2em] text-cream/80 tabular-nums sm:text-sm">
              Frame {String(displayFrame).padStart(3, "0")} /{" "}
              {String(LAST_FRAME).padStart(3, "0")}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
