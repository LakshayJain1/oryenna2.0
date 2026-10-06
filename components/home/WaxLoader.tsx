"use client";

import { useEffect, useRef, useState } from "react";

/**
 * WaxLoader — premium page-entry animation.
 *
 * Phase 1 "brand"  (0 – 600ms)
 *   ORYENNA lettermark rises on the warm parchment background.
 *
 * Phase 2 "iris"   (600ms – 1 300ms)
 *   A circular hole opens from the exact screen center and expands outward
 *   with a slightly organic / wavy edge (SVG feTurbulence displacement),
 *   progressively revealing the website underneath.
 *
 * Phase 3 "done"   → component unmounts entirely.
 */
export default function WaxLoader() {
  const [phase, setPhase] = useState<"brand" | "iris" | "done">("brand");
  const circleRef = useRef<SVGCircleElement>(null);
  const rafRef = useRef(0);
  const startRef = useRef<number | null>(null);
  // We read actual viewport once on client
  const [vp, setVp] = useState({ w: 1440, h: 900 });

  useEffect(() => {
    setVp({ w: window.innerWidth, h: window.innerHeight });
  }, []);

  /* After 600ms brand → trigger iris */
  useEffect(() => {
    const id = setTimeout(() => setPhase("iris"), 600);
    return () => clearTimeout(id);
  }, []);

  /* Animate the expanding iris hole */
  useEffect(() => {
    if (phase !== "iris") return;

    const DURATION = 700; // ms — fast, premium
    // Radius must reach the far corner from center
    const maxR =
      Math.sqrt(
        Math.pow(vp.w / 2, 2) + Math.pow(vp.h / 2, 2)
      ) + 40; // +40 safety

    const tick = (now: number) => {
      if (!startRef.current) startRef.current = now;
      const elapsed = now - startRef.current;
      const raw = Math.min(elapsed / DURATION, 1);

      // Ease out cubic — fast open, smooth settle at edges
      const ease = 1 - Math.pow(1 - raw, 3);
      const r = maxR * ease;

      if (circleRef.current) {
        circleRef.current.setAttribute("r", r.toFixed(1));
      }

      if (raw < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        // Fully open → unmount
        setTimeout(() => setPhase("done"), 40);
      }
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [phase, vp.w, vp.h]);

  if (phase === "done") return null;

  const cx = vp.w / 2;
  const cy = vp.h / 2;

  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        pointerEvents: "none",
      }}
    >
      {/* SVG overlay with a growing hole punched from the center.
          SVG mask: white = show overlay, black circle = transparent hole */}
      <svg
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
        }}
        viewBox={`0 0 ${vp.w} ${vp.h}`}
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          {/* Slight organic distortion on the iris edge — wax texture feel */}
          <filter id="wl-organic" x="-10%" y="-10%" width="120%" height="120%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.012"
              numOctaves="3"
              seed="4"
              result="noise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale={phase === "iris" ? "18" : "0"}
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>

          {/* The mask: full-white rect minus growing black circle = hole */}
          <mask id="wl-iris-mask">
            <rect width={vp.w} height={vp.h} fill="white" />
            <circle
              ref={circleRef}
              cx={cx}
              cy={cy}
              r="0"
              fill="black"
              filter="url(#wl-organic)"
            />
          </mask>

          {/* Warm parchment gradient */}
          <linearGradient id="wl-bg-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#f5ede0" />
            <stop offset="45%" stopColor="#ede3d4" />
            <stop offset="100%" stopColor="#e8dcc8" />
          </linearGradient>
        </defs>

        {/* Warm overlay — the iris cuts a hole through this */}
        <rect
          width={vp.w}
          height={vp.h}
          fill="url(#wl-bg-grad)"
          mask="url(#wl-iris-mask)"
        />

        {/* Subtle glowing ring at the iris edge */}
        {phase === "iris" && (
          <circle
            ref={null}
            cx={cx}
            cy={cy}
            r="0"
            fill="none"
            stroke="rgba(255,250,240,0.6)"
            strokeWidth="8"
            filter="url(#wl-organic)"
            style={{ opacity: 0.7 }}
          />
        )}
      </svg>

      {/* Brand lettermark — lives above the SVG, fades when iris starts */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 8,
          opacity: phase === "brand" ? 1 : 0,
          transform: phase === "brand" ? "translateY(0)" : "translateY(-16px)",
          transition:
            "opacity 280ms ease, transform 320ms cubic-bezier(0.22,0.61,0.21,1)",
          pointerEvents: "none",
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-garamond), serif",
            fontSize: "clamp(26px, 4vw, 44px)",
            fontWeight: 400,
            letterSpacing: "0.35em",
            color: "var(--color-ink)",
            animation: "wax-loader-brand 500ms cubic-bezier(0.22,0.61,0.21,1) both",
            margin: 0,
          }}
        >
          ORYENNA
        </p>
        <p
          style={{
            fontFamily: "var(--font-dm-sans), sans-serif",
            fontSize: 10,
            fontWeight: 500,
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            color: "var(--color-on-surface-variant)",
            animation:
              "wax-loader-brand 500ms cubic-bezier(0.22,0.61,0.21,1) 100ms both",
            margin: 0,
          }}
        >
          — Scented Candles —
        </p>
      </div>
    </div>
  );
}
