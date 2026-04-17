"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { SplitText } from "@/components/motion/SplitText";
import { ScrambleText } from "@/components/motion/ScrambleText";
import { Button } from "@/components/ui/Button";
import { GridLines } from "@/components/ui/GridLines";

const HeroScene = dynamic(() => import("@/components/three/HeroScene"), {
  ssr: false,
  loading: () => (
    <div
      className="absolute inset-0"
      style={{
        background:
          "radial-gradient(ellipse at 50% 50%, rgba(242,242,239,0.25) 0%, rgba(0,0,0,0) 55%)",
      }}
    />
  ),
});

export function HomeHero() {
  return (
    <section className="relative h-[100dvh] min-h-[720px] w-full overflow-hidden">
      {/* 3D background */}
      <div className="absolute inset-0">
        <HeroScene />
      </div>

      <GridLines />

      {/* Vignette */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 60%, rgba(0,0,0,0) 30%, rgba(0,0,0,0.7) 80%)",
        }}
      />

      <div className="relative z-10 mx-auto flex h-full max-w-[1400px] flex-col justify-between px-6 pt-32 pb-12 md:px-10">
        <div className="flex items-center justify-between text-xs tracking-[0.3em] uppercase text-[color:var(--color-gold-300)]">
          <motion.span
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <ScrambleText
              text="/ Est. 2026 — Digital studio · IST"
              trigger="always"
              duration={1400}
            />
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="hidden md:inline-flex items-center gap-2"
          >
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(74,222,128,0.8)]" />
            Open for Q3 2026 · 2 slots
          </motion.span>
        </div>

        <div className="max-w-5xl">
          <SplitText
            as="h1"
            by="word"
            text="We craft digital experiences that feel refined."
            className="font-display text-[clamp(2.5rem,8vw,8.5rem)] leading-[0.95] tracking-tight text-gold-gradient"
          />
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 max-w-xl text-base md:text-lg text-[color:var(--color-fg-soft)]"
          >
            Aureo is a modern agency for brands that refuse to blend in.
            Marketing, design, video, web, software and apps — crafted with
            obsessive attention to detail.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.9 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <Button href="/contact">Start a project</Button>
            <Button href="/work" variant="outline">
              See the work
            </Button>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 1 }}
          className="flex items-center justify-between text-xs tracking-[0.3em] uppercase text-[color:var(--color-muted)]"
        >
          <span className="inline-flex items-center gap-2">
            <span className="h-1 w-1 animate-pulse rounded-full bg-[color:var(--color-gold-400)]" />
            Scroll to explore
          </span>
          <span className="hidden md:inline">Immersive · Modern · Minimal</span>
        </motion.div>
      </div>
    </section>
  );
}
