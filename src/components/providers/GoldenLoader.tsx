"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const KEY = "aureo-loader-seen";

export function InkLoader() {
  const [active, setActive] = useState(false);
  const [pct, setPct] = useState(0);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    if (sessionStorage.getItem(KEY)) return;
    setActive(true);
    sessionStorage.setItem(KEY, "1");
    // block scroll while loading
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";

    const start = performance.now();
    const dur = 1700;
    let raf = 0;
    const tick = () => {
      const e = (performance.now() - start) / dur;
      const v = Math.min(1, e);
      setPct(Math.round(v * 100));
      if (v < 1) raf = requestAnimationFrame(tick);
      else {
        setTimeout(() => {
          setActive(false);
          document.documentElement.style.overflow = prev;
        }, 350);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      document.documentElement.style.overflow = prev;
    };
  }, []);

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          aria-hidden
          className="fixed inset-0 z-[500] flex flex-col items-center justify-center overflow-hidden bg-black"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {/* Liquid gold fill (SVG with turbulence-distorted clip) */}
          <svg
            className="absolute inset-0 h-full w-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="aureo-liquid" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#f6f6f4" />
                <stop offset="50%" stopColor="#f2f2ef" />
                <stop offset="100%" stopColor="#4d4d4b" />
              </linearGradient>
              <filter id="aureo-turb">
                <feTurbulence type="fractalNoise" baseFrequency="0.02 0.06" numOctaves="2" seed="3">
                  <animate
                    attributeName="baseFrequency"
                    dur="3s"
                    values="0.02 0.06; 0.03 0.08; 0.02 0.06"
                    repeatCount="indefinite"
                  />
                </feTurbulence>
                <feDisplacementMap in="SourceGraphic" scale="4" />
              </filter>
            </defs>
            <g filter="url(#aureo-turb)">
              <motion.rect
                x="0"
                width="100"
                fill="url(#aureo-liquid)"
                initial={{ y: 100, height: 0 }}
                animate={{ y: 100 - pct, height: pct }}
                transition={{ type: "tween", ease: "linear" }}
              />
            </g>
          </svg>

          {/* Counter + mark */}
          <div className="relative z-10 flex flex-col items-center gap-8 mix-blend-difference">
            <motion.svg
              width="80"
              height="80"
              viewBox="0 0 48 48"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
            >
              <polygon
                points="24,6 40,16 40,32 24,42 8,32 8,16"
                fill="none"
                stroke="#fff"
                strokeWidth="1.5"
              />
              <path
                d="M14 32 L24 14 L34 32 M18 26 L30 26"
                fill="none"
                stroke="#fff"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </motion.svg>
            <div className="font-mono text-[11px] uppercase tracking-[0.5em] text-white">
              {pct.toString().padStart(3, "0")}
            </div>
          </div>

          {/* Top and bottom hairlines */}
          <div className="absolute top-10 left-1/2 -translate-x-1/2 font-mono text-[10px] uppercase tracking-[0.5em] text-white/60">
            Aureo — loading
          </div>
          <div className="absolute bottom-10 font-mono text-[10px] uppercase tracking-[0.5em] text-white/40">
            Est. 2026 · Digital agency
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
