"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/motion/Reveal";

const steps = [
  {
    n: "01",
    title: "Discover",
    body: "Strategy, research and workshops to understand the brand, audience and opportunity.",
  },
  {
    n: "02",
    title: "Design",
    body: "Art direction, identity and interface explorations crafted with taste.",
  },
  {
    n: "03",
    title: "Develop",
    body: "Production-grade engineering — web, app, software and motion.",
  },
  {
    n: "04",
    title: "Deploy",
    body: "Ship fast, measure with intent, iterate without compromise.",
  },
  {
    n: "05",
    title: "Grow",
    body: "Ongoing marketing, content and product partnership.",
  },
];

export function ProcessSnapshot() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 80%", "end 20%"],
  });
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section className="relative bg-[color:var(--color-ink)] py-32">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <Reveal>
          <SectionHeader
            eyebrow="How we work"
            title={
              <>
                A process as considered
                <br />
                as <span className="text-iris-gradient">the output.</span>
              </>
            }
          />
        </Reveal>

        <div ref={ref} className="relative mt-20 grid gap-0 md:grid-cols-12">
          <div className="relative md:col-span-1">
            <div className="absolute left-4 top-0 h-full w-px bg-white/10" />
            <motion.div
              style={{ scaleY, transformOrigin: "top" }}
              className="absolute left-4 top-0 h-full w-px bg-[color:var(--color-gold-400)]"
            />
          </div>
          <div className="space-y-10 md:col-span-11">
            {steps.map((s, i) => (
              <Reveal key={s.n} delay={i * 0.06}>
                <div className="grid items-start gap-6 border-t border-white/5 pt-10 md:grid-cols-12">
                  <span className="font-mono text-xs tracking-[0.3em] text-[color:var(--color-gold-300)] md:col-span-2">
                    {s.n}
                  </span>
                  <h3 className="font-display text-3xl md:text-4xl tracking-tight md:col-span-4">
                    {s.title}
                  </h3>
                  <p className="text-[color:var(--color-fg-soft)] md:col-span-6">
                    {s.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
