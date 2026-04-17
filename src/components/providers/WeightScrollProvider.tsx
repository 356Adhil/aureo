"use client";

import { useEffect } from "react";

/**
 * Drives `--weight` CSS variable on `[data-weight-scroll]` elements based on
 * scroll velocity, enabling variable-font weight shifts while the user scrolls.
 */
export function WeightScrollProvider() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let lastY = window.scrollY;
    let lastT = performance.now();
    let raf = 0;
    let currentWeight = 500;
    let nodes: HTMLElement[] = [];
    let idleFrames = 0;

    const refresh = () => {
      nodes = Array.from(
        document.querySelectorAll<HTMLElement>("[data-weight-scroll]")
      );
    };
    refresh();
    const mo = new MutationObserver(refresh);
    mo.observe(document.body, { subtree: true, childList: true });

    const tick = () => {
      const now = performance.now();
      const dy = window.scrollY - lastY;
      const dt = Math.max(1, now - lastT);
      const velocity = Math.min(3, Math.abs(dy) / dt); // px per ms clamped
      const target = 400 + velocity * 200; // 400..1000
      const prev = currentWeight;
      currentWeight += (target - currentWeight) * 0.15;
      // decay back to 500 when idle
      currentWeight += (500 - currentWeight) * 0.04;

      // Only touch the DOM when the rounded weight actually changes — avoids
      // triggering layout / style recalcs every single frame on idle scroll.
      if (Math.round(currentWeight) !== Math.round(prev)) {
        const w = currentWeight.toFixed(0);
        for (const el of nodes) el.style.setProperty("--weight", w);
        idleFrames = 0;
      } else {
        idleFrames++;
      }

      lastY = window.scrollY;
      lastT = now;
      // Pause the loop after ~2s of no change; resume on scroll/resize.
      if (idleFrames < 120) raf = requestAnimationFrame(tick);
      else raf = 0;
    };

    const kick = () => {
      if (!raf) {
        idleFrames = 0;
        lastT = performance.now();
        lastY = window.scrollY;
        raf = requestAnimationFrame(tick);
      }
    };
    window.addEventListener("scroll", kick, { passive: true });
    window.addEventListener("resize", kick);

    raf = requestAnimationFrame(tick);
    return () => {
      mo.disconnect();
      window.removeEventListener("scroll", kick);
      window.removeEventListener("resize", kick);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return null;
}
