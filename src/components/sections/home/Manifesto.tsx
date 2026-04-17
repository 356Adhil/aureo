"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const WORDS = [
  "We",
  "build",
  "immersive",
  "digital",
  "experiences",
  "for",
  "ambitious",
  "brands —",
  "with",
  "obsessive",
  "craft,",
  "clear",
  "strategy",
  "and",
  "the",
  "kind",
  "of",
  "motion",
  "that",
  "makes",
  "people",
  "stop",
  "scrolling.",
];

export function Manifesto() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "end 0.2"],
  });

  return (
    <section className="relative bg-black py-40">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="mb-10 text-xs tracking-[0.3em] uppercase text-[color:var(--color-gold-300)]">
          / Manifesto
        </div>
        <div
          ref={ref}
          data-weight-scroll
          className="font-display text-[clamp(1.75rem,5.5vw,5rem)] leading-[1.1] tracking-tight"
        >
          {WORDS.map((w, i) => {
            const start = i / WORDS.length;
            const end = start + 1 / WORDS.length;
            return (
              <Word
                key={`${w}-${i}`}
                range={[start, end]}
                progress={scrollYProgress}
              >
                {w}
              </Word>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Word({
  children,
  range,
  progress,
}: {
  children: string;
  range: [number, number];
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  const opacity = useTransform(progress, range, [0.15, 1]);
  return (
    <motion.span style={{ opacity }} className="mr-[0.3em] inline-block">
      {children}
    </motion.span>
  );
}
