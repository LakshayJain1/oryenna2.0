"use client";

import {
  Children,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";

export type RevealVariant =
  | "up"
  | "down"
  | "left"
  | "right"
  | "fade"
  | "scale"
  | "none";

type RevealProps = {
  children: ReactNode;
  /** Entrance direction. Defaults to "up". */
  variant?: RevealVariant;
  /** Start delay in ms (used for staggering). */
  delay?: number;
  /** Transition duration in ms. */
  duration?: number;
  /** Travel distance in px for directional variants. */
  distance?: number;
  /** Animate only the first time it enters view. Defaults to true. */
  once?: boolean;
  /** IntersectionObserver threshold. */
  threshold?: number;
  className?: string;
  style?: CSSProperties;
};

/**
 * Appear-on-scroll wrapper. GPU-friendly (opacity + transform only),
 * one-shot by default, honours prefers-reduced-motion.
 *
 * Usage:
 *   <Reveal variant="up"><h2>Headline</h2></Reveal>
 *   <Reveal variant="up" delay={120}><p>Subtext</p></Reveal>
 */
export function Reveal({
  children,
  variant = "up",
  delay = 0,
  duration = 800,
  distance = 28,
  once = true,
  threshold = 0.15,
  className = "",
  style,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          if (once) io.disconnect();
        } else if (!once) {
          setVisible(false);
        }
      },
      { threshold, rootMargin: "0px 0px -8% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [once, threshold]);

  return (
    <div
      ref={ref}
      data-reveal={variant}
      className={`${visible ? "is-visible" : ""} ${className}`}
      style={
        {
          "--reveal-delay": `${delay}ms`,
          "--reveal-duration": `${duration}ms`,
          "--reveal-distance": `${distance}px`,
          ...style,
        } as CSSProperties
      }
    >
      {children}
    </div>
  );
}

type StaggerProps = {
  children: ReactNode;
  /** Classes for the container (e.g. your grid classes). */
  className?: string;
  /** Add "stagger-fill" so wrapped cards stretch to equal row height. */
  variant?: RevealVariant;
  /** Delay step between items in ms. */
  step?: number;
  /** Cap for the total stagger delay in ms. */
  maxDelay?: number;
  distance?: number;
  duration?: number;
  threshold?: number;
};

/**
 * Staggered appear-on-scroll for grids / lists / card rows.
 * Each child is wrapped in a Reveal with an incremental delay.
 *
 * Usage:
 *   <Stagger className="grid grid-cols-1 md:grid-cols-3 gap-gutter stagger-fill">
 *     {cards.map(...)}
 *   </Stagger>
 */
export function Stagger({
  children,
  className = "",
  variant = "up",
  step = 90,
  maxDelay = 720,
  distance = 28,
  duration = 800,
  threshold = 0.12,
}: StaggerProps) {
  const items = Children.toArray(children);
  return (
    <div className={className}>
      {items.map((child, i) => (
        <Reveal
          key={i}
          variant={variant}
          delay={Math.min(i * step, maxDelay)}
          distance={distance}
          duration={duration}
          threshold={threshold}
          className="stagger-item"
        >
          {child}
        </Reveal>
      ))}
    </div>
  );
}
