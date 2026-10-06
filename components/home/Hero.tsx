"use client";

import { useState, useEffect, useRef } from "react";

const candles = [
  {
    id: "santal",
    name: "Santal",
    tagline: "Grounding sandalwood & warm vanilla",
    image: "/images/hero-santal.jpg",
    centralImage: "/images/central-candle-santal.jpg",
  },
  {
    id: "ember",
    name: "Ember",
    tagline: "Charred birch & deep amber",
    image: "/images/hero-ember.jpg",
    centralImage: "/images/central-candle-ember.jpg",
  },
  {
    id: "fig",
    name: "Fig & Olive",
    tagline: "Fresh fig & Mediterranean olive",
    image: "/images/hero-fig-olive.jpg",
    centralImage: "/images/central-candle-fig.jpg",
  },
  {
    id: "linen",
    name: "Soft Linen",
    tagline: "Air cotton & fresh linen",
    image: "/images/hero-soft-linen.jpg",
    centralImage: "/images/central-candle-linen.jpg",
  },
];

const CANDLE_POSITIONS = [
  { x: "-10%", y: "-10%", rotate: "45deg" },
  { x: "80%", y: "20%", rotate: "45deg" },
  { x: "120%", y: "80%", rotate: "45deg" },
  { x: "30%", y: "110%", rotate: "45deg" },
];

export default function Hero() {
  const [scrollY, setScrollY] = useState(0);
  const [viewportHeight, setViewportHeight] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Set initial viewport height and listen for resize
    setViewportHeight(window.innerHeight);
    
    const handleResize = () => setViewportHeight(window.innerHeight);
    const handleScroll = () => setScrollY(window.scrollY);

    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <section
      className="relative h-[300vh] w-full bg-white overflow-hidden"
      ref={containerRef}
    >
      {/* Fixed Background: Wax Blobs */}
      <div
        className="fixed inset-0 z-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 20% 20%, #fffbe8 0%, #fff 50%, #f0e9d2 100%)," +
            "radial-gradient(circle at 80% 80%, #fff5e6 0%, #fff 50%, #ffe8c5 100%)," +
            "linear-gradient(135deg, #fff 0%, #f5f0e0 100%)",
          backgroundAttachment: "fixed",
        }}
      />

      {/* The Diagonal Track */}
      <div 
        className="fixed inset-0 flex justify-center"
        style={{ perspective: "1000px" }}
      >
        <div 
          className="relative w-full h-full"
          style={{ 
            transform: "rotateZ(-45deg)", 
            transformOrigin: "center center",
            transition: "transform 0.1s ease-out"
          }}
        >
          {candles.map((candle, index) => {
            const SPACING = 400;
            const positionY = (index * SPACING) - scrollY;
            
            // Fix: Use viewportHeight state instead of window.innerHeight to avoid SSR error
            const distFromCenter = Math.abs(positionY - (viewportHeight / 2));
            
            const blurValue = Math.min(12, distFromCenter / 100);
            const scaleValue = Math.max(0.6, 1 - (distFromCenter / 1500));
            const opacityValue = Math.max(0.3, 1 - (distFromCenter / 1000));
            const zIndex = Math.round(100 - distFromCenter / 10);

            return (
              <div
                key={candle.id}
                className="absolute left-1/2 -translate-x-1/2 transition-all duration-300 ease-out"
                style={{
                  top: `${positionY}px`,
                  transform: `translateY(-50%) scale(${scaleValue})`,
                  filter: `blur(${blurValue}px)`,
                  opacity: opacityValue,
                  zIndex: zIndex,
                  width: "200px",
                  height: "300px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <img
                  src={candle.image}
                  alt={candle.name}
                  className="w-full h-full object-contain"
                />
                {blurValue < 2 && (
                  <div className="absolute -bottom-12 text-center w-64 pointer-events-none">
                    <p className="text-black font-serif italic text-lg">{candle.tagline}</p>
                    <p className="text-black font-sans uppercase tracking-widest text-xs mt-2">{candle.name}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Instructions overlay */}
      <div className="fixed bottom-10 left-1/2 -translate-x-1/2 text-center z-50 pointer-events-none">
        <p className="text-xs uppercase tracking-[0.3em] text-gray-400 animate-bounce">
          Scroll to explore
        </p>
      </div>
    </section>
  );
}