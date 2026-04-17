"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import { play } from "@/lib/audio";

/**
 * Dual curtain wipe page transition.
 * On pathname change: two bars sweep across (gold on top, iridescent hairline on bottom),
 * covering the viewport for ~300ms then retracting. Content below fades/scales.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const firstRender = useRef(true);
  const [animating, setAnimating] = useState(false);
  const prevPath = useRef(pathname);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    if (prevPath.current === pathname) return;
    prevPath.current = pathname;
    setAnimating(true);
    play("transition");
    const t = setTimeout(() => setAnimating(false), 900);
    return () => clearTimeout(t);
  }, [pathname]);

  const reduce =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  return (
    <>
      <AnimatePresence mode="wait">
        <motion.div
          key={pathname}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          {children}
        </motion.div>
      </AnimatePresence>

      {/* Curtain overlay */}
      {!reduce && (
        <AnimatePresence>
          {animating && (
            <motion.div
              key="curtain"
              aria-hidden
              className="pointer-events-none fixed inset-0 z-[200]"
            >
              {/* Gold bar sweeping down */}
              <motion.div
                initial={{ y: "-100%" }}
                animate={{ y: ["-100%", "0%", "100%"] }}
                transition={{ duration: 0.9, times: [0, 0.5, 1], ease: [0.65, 0, 0.35, 1] }}
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(180deg, #000 0%, #0a0a0a 20%, #0a0a0a 45%, #f2f2ef 55%, #d9d9d5 60%, #4d4d4b 70%, #0a0a0a 85%, #000 100%)",
                }}
              />
              {/* Iridescent hairline (slightly delayed) */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: [0, 1, 1, 0] }}
                transition={{ duration: 0.9, times: [0, 0.35, 0.55, 1], ease: "easeInOut" }}
                className="absolute inset-x-0 top-1/2 h-px origin-left"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, #e6d8d0 20%, #c6c2d0 50%, #c8d4db 80%, transparent)",
                  boxShadow: "0 0 20px rgba(200,169,255,0.6)",
                }}
              />
              {/* Corner sigil */}
              <motion.div
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: [0, 1, 1, 0], scale: [0.7, 1, 1, 1.2] }}
                transition={{ duration: 0.9, times: [0, 0.35, 0.6, 1] }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <span className="font-mono text-[10px] uppercase tracking-[0.5em] text-black/70">
                  / Aureo
                </span>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </>
  );
}
