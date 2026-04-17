"use client";

import { ReactLenis, type LenisRef } from "lenis/react";
import { useEffect, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function LenisProvider({ children }: { children: ReactNode }) {
  const lenisRef = useRef<LenisRef>(null);

  useEffect(() => {
    const update = (time: number) => {
      lenisRef.current?.lenis?.raf(time * 1000);
    };
    gsap.ticker.add(update);
    // Default lag smoothing keeps motion stable under frame spikes.
    gsap.ticker.lagSmoothing(500, 33);

    const onScroll = () => ScrollTrigger.update();
    const id = setTimeout(() => {
      lenisRef.current?.lenis?.on("scroll", onScroll);
    }, 50);

    return () => {
      gsap.ticker.remove(update);
      clearTimeout(id);
    };
  }, []);

  return (
    <ReactLenis
      root
      ref={lenisRef}
      options={{
        // Duration-based easing feels more "buttery" than raw lerp: a long,
        // decelerating glide (expo-out) that never stops abruptly.
        duration: 1.25,
        easing: (t: number) => 1 - Math.pow(1 - t, 4),
        smoothWheel: true,
        wheelMultiplier: 0.9,
        touchMultiplier: 1.4,
        syncTouch: true,
        syncTouchLerp: 0.08,
      }}
    >
      {children}
    </ReactLenis>
  );
}
