"use client";

import Hero from "@/components/home/Hero";
import Manifesto from "@/components/home/Manifesto";
import WaxWaveTransition from "@/components/home/WaxWaveTransition";

type Metric = { value: string; label: string; description: string };

type Props = {
  hero?: {
    eyebrow?: string;
    headline?: string;
    tagline?: string;
    subtext?: string;
    backgroundImageUrl?: string;
    imageAlt?: string;
  } | null;
  manifesto?: {
    eyebrow?: string;
    headline?: string;
    quote?: string;
    metrics?: Metric[];
  } | null;
};

/**
 * Client boundary for the homepage scroll theatre.
 * Hero + Manifesto render with their built-in copy inside the wax
 * transition; pass hero/manifesto props to override any of it.
 */
export default function HomeWaxExperience({ hero, manifesto }: Props) {
  return (
    <WaxWaveTransition
      hero={
        <Hero
          eyebrow={hero?.eyebrow}
          headline={hero?.headline}
          tagline={hero?.tagline}
          subtext={hero?.subtext}
          imageUrl={hero?.backgroundImageUrl}
          imageAlt={hero?.imageAlt}
        />
      }
      nextContent={
        <Manifesto
          eyebrow={manifesto?.eyebrow}
          headline={manifesto?.headline}
          quote={manifesto?.quote}
          metrics={manifesto?.metrics}
        />
      }
      // Tunables — warm candle wax that harmonises with ORYENNA surfaces.
      waxColor="#f0e6cf"
      waxDeep="#d9c6a0"
      waveHeight={220}
      amplitude={42}
      deformationIntensity={1}
      scrollDistanceVh={170}
      smoothness={1.1}
    />
  );
}
