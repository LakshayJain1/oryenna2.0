"use client";

import { useId, useLayoutEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export type WaxWaveTransitionProps = {
  /** Hero layer (rendered underneath, scrolls away with parallax). */
  hero: ReactNode;
  /** Next-section content (rendered ON TOP of the wax, background stripped). */
  nextContent: ReactNode;
  /** Base molten-wax colour — becomes the next section background. */
  waxColor?: string;
  /** Deeper wax tone for depth / back crest / lower gradient. */
  waxDeep?: string;
  /** Crest highlight colour. */
  waxHighlight?: string;
  /** Creamy light tone melting from the crest lip into the base. */
  waxLight?: string;
  /** SVG crest height in px (how tall the molten lip is). */
  waveHeight?: number;
  /** Vertical crest undulation in px. */
  amplitude?: number;
  /** 0–2 — slow viscous wobble intensity. */
  deformationIntensity?: number;
  /** Extra scroll length (vh) pinned for the transition. */
  scrollDistanceVh?: number;
  /** ScrollTrigger scrub smoothing (seconds). */
  smoothness?: number;
  /** Progress window where next-section content fades/rises in. */
  contentRevealStart?: number;
  contentRevealEnd?: number;
  className?: string;
};

const VB_W = 1440;

function buildCrest(
  t: number,
  progress: number,
  waveHeight: number,
  amplitude: number,
  deform: number,
  phaseOffset: number,
  bulge: number
) {
  // Asymmetric, slow, heavy wax: low-frequency sines + centre bulge so the
  // pool first domes at bottom-centre, then spreads into an ocean-like crest.
  const pts: Array<[number, number]> = [];
  const N = 9;
  for (let i = 0; i <= N; i++) {
    const x = (VB_W / N) * i;
    const u = x / VB_W; // 0..1
    const centre = Math.exp(-Math.pow((u - 0.5) / 0.24, 2)); // bottom-centre dome
    const y =
      waveHeight * 0.52 +
      Math.sin(u * 5.1 + t * 0.9 + phaseOffset) * amplitude * 0.55 * deform +
      Math.sin(u * 9.4 - t * 0.62 + phaseOffset * 1.7 + 1.3) *
        amplitude *
        0.3 *
        deform +
      Math.sin(u * 2.2 + t * 0.4 + phaseOffset * 0.6) * amplitude * 0.45 +
      centre * bulge * (0.55 + progress * 0.45);
    pts.push([x, y]);
  }
  // Smooth polyline -> cubic path, closed down to the wax body.
  let d = `M -20 ${waveHeight + 40} L -20 ${pts[0][1].toFixed(1)}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const [x0, y0] = pts[i];
    const [x1, y1] = pts[i + 1];
    const cx = (x0 + x1) / 2;
    d += ` C ${cx.toFixed(1)} ${y0.toFixed(1)}, ${cx.toFixed(1)} ${y1.toFixed(
      1
    )}, ${x1.toFixed(1)} ${y1.toFixed(1)}`;
  }
  d += ` L ${VB_W + 20} ${waveHeight + 40} Z`;
  // Crest stroke line (highlight follows the same lip).
  let lip = `M -20 ${pts[0][1].toFixed(1)}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const [x0, y0] = pts[i];
    const [x1, y1] = pts[i + 1];
    const cx = (x0 + x1) / 2;
    lip += ` C ${cx.toFixed(1)} ${y0.toFixed(1)}, ${cx.toFixed(1)} ${y1.toFixed(
      1
    )}, ${x1.toFixed(1)} ${y1.toFixed(1)}`;
  }
  return { d, lip };
}

export default function WaxWaveTransition({
  hero,
  nextContent,
  waxColor = "#f0e6cf",
  waxDeep = "#dcc9a1",
  waxHighlight = "rgba(255,252,242,0.85)",
  waxLight = "#fffdf4",
  waveHeight = 220,
  amplitude = 42,
  deformationIntensity = 1,
  scrollDistanceVh = 170,
  smoothness = 1.1,
  contentRevealStart = 0.36,
  contentRevealEnd = 0.88,
  className = "",
}: WaxWaveTransitionProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const heroInnerRef = useRef<HTMLDivElement>(null);
  const waxBodyRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const frontRef = useRef<SVGPathElement>(null);
  const lipRef = useRef<SVGPathElement>(null);
  const progressRef = useRef(0);
  const gradId = useId().replace(/:/g, "wax");

  useLayoutEffect(() => {
    const wrap = wrapRef.current;
    const wax = waxBodyRef.current;
    const heroInner = heroInnerRef.current;
    const content = contentRef.current;
    if (!wrap || !wax || !heroInner || !content) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduceMotion) {
      // Static stacked fallback: hero, then full wax section with content.
      gsap.set(wax, { clearProps: "all" });
      gsap.set(content, { opacity: 1, y: 0 });
      progressRef.current = 1;
      return;
    }

    const ctx = gsap.context(() => {
      gsap.set(wax, {
        scaleY: 0.045,
        transformOrigin: "50% 100%",
      });
      gsap.set(heroInner, { yPercent: 0, opacity: 1 });
      gsap.set(content, { y: 90, opacity: 0 });

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: wrap,
          start: "top top",
          end: "bottom bottom",
          scrub: smoothness,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            progressRef.current = self.progress;
          },
        },
      });

      // Wax body: ONE liquid mass anchored at the bottom, swelling
      // vertically (scaleY) like a rising wave — full width throughout.
      tl.to(wax, { scaleY: 1, duration: 1 }, 0);
      // Hero drifts up + fades underneath — never covered abruptly.
      tl.to(heroInner, { yPercent: -13, opacity: 0.12, duration: 0.62 }, 0);
      // Next-section content emerges ON TOP of the wax.
      tl.to(
        content,
        { y: 0, opacity: 1, duration: contentRevealEnd - contentRevealStart },
        contentRevealStart
      );
    }, wrap);

    // Slow viscous drift — independent of scroll so the crest feels alive.
    let raf = 0;
    let t = Math.random() * 10;
    const tick = () => {
      t += 0.008; // heavy / slow
      const p = progressRef.current;
      // Crest settles as the pool fills the viewport (less bulge at the end).
      const bulge = 120 * (1 - p * 0.72) + 26;
      const amp = amplitude * (1 - p * 0.25);
      const front = buildCrest(t, p, waveHeight, amp, deformationIntensity, 0, bulge);
      if (frontRef.current) frontRef.current.setAttribute("d", front.d);
      if (lipRef.current) lipRef.current.setAttribute("d", front.lip);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const onRefresh = () => {
      progressRef.current =
        ScrollTrigger.getById(`wax-${wrap.id}`)?.progress ?? progressRef.current;
    };
    ScrollTrigger.addEventListener("refresh", onRefresh);

    return () => {
      cancelAnimationFrame(raf);
      ScrollTrigger.removeEventListener("refresh", onRefresh);
      ctx.revert();
    };
  }, [
    amplitude,
    contentRevealEnd,
    contentRevealStart,
    deformationIntensity,
    smoothness,
    waveHeight,
  ]);

  return (
    <div
      ref={wrapRef}
      className={`relative w-full ${className}`}
      style={{ height: `calc(100vh + ${scrollDistanceVh}vh)` }}
    >
      <div
        ref={stickyRef}
        className="sticky top-0 h-screen w-full overflow-hidden"
      >
        {/* LAYER 0 — hero underneath */}
        <div ref={heroInnerRef} className="absolute inset-0 z-0 will-change-transform">
          {hero}
        </div>

        {/* LAYER 1 — next section. Wax is its BACKGROUND (z-0),
            content sits above it (z-10). The whole layer rises. */}
        <section className="next-section absolute inset-0 z-10">
          {/* wax body — ONE liquid mass swelling vertically from the bottom.
              The crest is part of this mass, so the whole section grows
              as a single wave rather than sliding up under a small lip. */}
          <div ref={waxBodyRef} className="absolute inset-0 z-0 will-change-transform">
            {/* wax background */}
            <div
              className="wax-background absolute inset-0"
              style={{
                background: `linear-gradient(180deg, ${waxColor} 0%, ${waxColor} 55%, ${waxDeep} 130%)`,
                boxShadow: "0 -30px 80px -20px rgba(62,45,25,0.35)",
              }}
            >
              {/* soft viscous sheen — very subtle, no water/foam look */}
              <div
                className="absolute inset-x-0 top-0 h-[42%] pointer-events-none"
                style={{
                  background:
                    "radial-gradient(120% 90% at 50% 0%, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0.12) 34%, rgba(255,255,255,0) 62%)",
                }}
              />
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(255,255,255,0.16) 0%, rgba(255,255,255,0) 22%, rgba(90,64,32,0.10) 100%)",
                }}
              />
            </div>

            {/* single crème-wax crest — cream lip melting into the base,
                with a glossy shine tracing the crest line */}
            <svg
              className="absolute left-0 w-full pointer-events-none"
              style={{ top: -waveHeight + 2, height: waveHeight + 4 }}
              viewBox={`-20 0 ${VB_W + 40} ${waveHeight + 40}`}
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <defs>
                <linearGradient
                  id={gradId}
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="0%" stopColor={waxLight} />
                  <stop offset="26%" stopColor={waxColor} />
                  <stop offset="100%" stopColor={waxColor} />
                </linearGradient>
              </defs>
              <path ref={frontRef} fill={`url(#${gradId})`} />
              {/* glossy crest shine */}
              <path
                ref={lipRef}
                fill="none"
                stroke={waxHighlight}
                strokeWidth={5}
                strokeLinecap="round"
                opacity={0.55}
                style={{ filter: "blur(1px)" }}
              />
            </svg>
          </div>

          {/* next-section content — ALWAYS above the wax */}
          <div ref={contentRef} className="next-section-content relative z-10 h-full w-full overflow-y-auto will-change-transform">
            {/* Strip any section bg so the wax shows through as the bg.
                Manifesto / editor sections keep layout + typography. */}
            <div className="min-h-full flex flex-col justify-center [&_section]:!bg-transparent [&_section]:!shadow-none [&_section]:w-full">
              {nextContent}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
