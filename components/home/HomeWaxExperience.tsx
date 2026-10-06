/* eslint-disable */
// @ts-nocheck
"use client";

import Hero from "@/components/home/Hero";
import WaxLoader from "@/components/home/WaxLoader";

type Props = {
  hero?: {
    eyebrow?: string;
    headline?: string;
    tagline?: string;
    subtext?: string;
    imageUrl?: string;
    imageAlt?: string;
  } | null;
};

/**
 * Client boundary for the homepage.
 * Wax wave loading animation plays on first load.
 * Hero is the ONLY section on the homepage.
 */
export default function HomeWaxExperience({ hero }: Props) {
  return (
    <>
      {/* Premium wax wave page-load animation */}
      <WaxLoader />

      {/* Full-screen immersive hero - The only section on this page */}
      <Hero />
    </>
  );
}