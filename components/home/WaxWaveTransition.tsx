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
  /** Deeper wax tone for depth / lower gradient. */
  waxDeep?: string;
  /** Crest shine colour. */
  waxHighlight?: string;
  /** Creamy light tone melting from the crest lip into the base. */
  waxLight?: string;
  /** SVG crest height in px (how tall the molten lip is). */
  waveHeight?: number;
  /** Vertical crest undulation in px. */
  amplitude?: number;
  /** 0–2 — slow viscous wobble intensity. */
  deformationIntensity?: number;
  /** Horizontal crest sway in px (side-to-side drift). */
  sway?: number;
  /** Vertical crest heave in px (independent liquid bob). */
  heave?: number;
  /** 0–2 — melted-wax surface texture intensity (drips, marbling, grain). */
  texture?: number;
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
const STREAKS = 5;

function buildCrest(
  t: number,
  progress: number,
  waveHeight: number,
  amplitude: number,
  deform: number,
  bulge: number
) {
  // Melted wax: layered travelling swells (they slide sideways as well as
  // bob), asymmetric lumps, and fine surface ripples over a centre dome.
  const pts: Array<[number, number]> = [];
  const N = 12;
  for (let i = 0; i <= N; i++) {
    const x = (VB_W / N) * i;
    const u = x / VB_W; // 0..1
    const centre = Math.exp(-Math.pow((u - 0.5) / 0.24, 2));
    const lopsided = Math.exp(-Math.pow((u - 0.38) / 0.4, 2)); // uneven pour
    const y =
      waveHeight * 0.52 +
      Math.sin(u * 5.1 + t * 0.9) * amplitude * 0.5 * deform +
      Math.sin(u * 8.3 - t * 1.35 + 1.3) * amplitude * 0.32 * deform + // travelling swell
      Math.sin(u * 13.7 + t * 2.1 + 4.1) * amplitude * 0.13 * deform + // fine ripples
      Math.sin(u * 2.3 - t * 0.5) * amplitude * 0.45 +
      Math.sin(u * 3.7 + t * 0.33 + 2.0) * amplitude * 0.5 * lopsided + // lumps
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
  // Crest stroke line (shine follows the same lip).
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
  waxColor = "#ecd2ab",
  waxDeep = "#d6b585",
  waxHighlight = "rgba(255,252,242,0.85)",
  waxLight = "#fffdf4",
  waveHeight = 220,
  amplitude = 42,
  deformationIntensity = 1,
  sway = 26,
  heave = 10,
  texture = 1,
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
  const crestRef = useRef<SVGSVGElement>(null);
  const frontRef = useRef<SVGPathElement>(null);
  const lipRef = useRef<SVGPathElement>(null);
  const streakRefs = useRef<Array<SVGRectElement | null>>([]);
  const progressRef = useRef(0);
  const gradId = useId().replace(/:/g, "wax");
  const grainId = useId().replace(/:/g, "grain");

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

    // Slow viscous life — independent of scroll so the melt feels alive:
    // crest bobs AND sways sideways, drips run and lengthen.
    let raf = 0;
    let t = Math.random() * 10;
    const tick = () => {
      t += 0.008; // heavy / slow
      const p = progressRef.current;
      // Crest settles as the pool fills the viewport (less bulge at the end).
      const bulge = 120 * (1 - p * 0.72) + 26;
      const amp = amplitude * (1 - p * 0.25);
      const front = buildCrest(t, p, waveHeight, amp, deformationIntensity, bulge);
      if (frontRef.current) frontRef.current.setAttribute("d", front.d);
      if (lipRef.current) lipRef.current.setAttribute("d", front.lip);
      // Lateral sway + vertical heave of the whole crest (GPU transform).
      if (crestRef.current) {
        const sx = Math.sin(t * 0.5) * sway;
        const hy = Math.sin(t * 0.72 + 1.1) * heave;
        crestRef.current.style.transform = `translate3d(${sx.toFixed(2)}px, ${hy.toFixed(2)}px, 0)`;
      }
      // Molten runs: streaks below the lip that lengthen as the pool grows.
      for (let i = 0; i < STREAKS; i++) {
        const el = streakRefs.current[i];
        if (!el) continue;
        const slot = (i + 0.6) / (STREAKS + 0.4); // spread across width
        const drift = Math.sin(t * 0.4 + i * 1.9) * 26;
        const x = slot * VB_W + drift;
        const w = 13 + ((i * 7) % 3) * 7;
        const len =
          (46 + p * 130 + Math.sin(t * 0.66 + i * 2.4) * 26) *
          (0.4 + texture * 0.6);
        const top = waveHeight * 0.78;
        el.setAttribute("x", (x - w / 2).toFixed(1));
        el.setAttribute("y", top.toFixed(1));
        el.setAttribute("width", w.toFixed(1));
        el.setAttribute("height", Math.max(8, len).toFixed(1));
        el.setAttribute("rx", (w / 2).toFixed(1));
        el.setAttribute(
          "opacity",
          ((0.16 + 0.1 * Math.sin(t * 0.5 + i)) * texture).toFixed(3)
        );
      }
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
    heave,
    smoothness,
    sway,
    texture,
    waveHeight,
  ]);

  const tex = Math.max(0, texture);

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
              {/* marbled cream folds drifting sideways — melted wax body */}
              {tex > 0 && (
                <>
                  <div
                    className="wax-marble wax-drift-a absolute -left-[10%] top-[8%] h-[46%] w-[55%] pointer-events-none"
                    style={{
                      background: `radial-gradient(closest-side, ${waxLight} 0%, rgba(255,253,244,0) 72%)`,
                      opacity: 0.5 * tex,
                    }}
                  />
                  <div
                    className="wax-marble wax-drift-b absolute left-[38%] top-[30%] h-[52%] w-[60%] pointer-events-none"
                    style={{
                      background: `radial-gradient(closest-side, ${waxDeep} 0%, rgba(220,201,161,0) 70%)`,
                      opacity: 0.42 * tex,
                    }}
                  />
                  <div
                    className="wax-marble wax-drift-c absolute left-[62%] top-[4%] h-[40%] w-[48%] pointer-events-none"
                    style={{
                      background: `radial-gradient(closest-side, ${waxLight} 0%, rgba(255,253,244,0) 72%)`,
                      opacity: 0.38 * tex,
                    }}
                  />
                  {/* slow horizontal flow bands */}
                  <div className="absolute inset-x-0 top-[16%] h-10 overflow-hidden pointer-events-none" style={{ opacity: 0.16 * tex }}>
                    <div
                      className="wax-flow h-full w-[200%]"
                      style={{
                        background:
                          "repeating-linear-gradient(100deg, rgba(255,255,255,0.55) 0px, rgba(255,255,255,0) 46px, rgba(120,90,55,0.20) 92px, rgba(255,255,255,0) 150px)",
                      }}
                    />
                  </div>
                  <div className="absolute inset-x-0 top-[52%] h-14 overflow-hidden pointer-events-none" style={{ opacity: 0.12 * tex }}>
                    <div
                      className="wax-flow-rev h-full w-[200%]"
                      style={{
                        background:
                          "repeating-linear-gradient(96deg, rgba(255,255,255,0) 0px, rgba(120,90,55,0.22) 60px, rgba(255,255,255,0.4) 120px, rgba(255,255,255,0) 190px)",
                      }}
                    />
                  </div>
                  {/* fine surface grain */}
                  <svg className="absolute inset-0 h-full w-full pointer-events-none" style={{ opacity: 0.06 * tex, mixBlendMode: "multiply" }} aria-hidden="true">
                    <defs>
                      <filter id={grainId}>
                        <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" />
                      </filter>
                    </defs>
                    <rect width="100%" height="100%" filter={`url(#${grainId})`} />
                  </svg>
                </>
              )}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(255,255,255,0.16) 0%, rgba(255,255,255,0) 22%, rgba(90,64,32,0.10) 100%)",
                }}
              />
            </div>

            {/* single crème-wax crest — cream lip melting into the base,
                swaying sideways + heaving as it rises, with molten runs
                and a glossy shine tracing the crest line */}
            <svg
              ref={crestRef}
              className="absolute left-[-3%] w-[106%] pointer-events-none will-change-transform"
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
              {/* molten runs below the lip */}
              {Array.from({ length: STREAKS }).map((_, i) => (
                <rect
                  key={i}
                  ref={(el) => {
                    streakRefs.current[i] = el;
                  }}
                  fill={i % 2 === 0 ? waxLight : waxDeep}
                  opacity={0.2 * tex}
                />
              ))}
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
