"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { services } from "@/lib/services";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/motion/Reveal";

/* --------------------------------------------------------------------------
 * Modern hover-reveal services list.
 * - Zero WebGL, zero scroll-pinning → smooth.
 * - Cursor-tracked preview panel with per-service gradient + large number.
 * - Magnetic title scramble, auto-select on mobile.
 * -------------------------------------------------------------------------- */

export function ServicesCinematic() {
  const [active, setActive] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent) => {
    if (!previewRef.current) return;
    const r = previewRef.current.getBoundingClientRect();
    previewRef.current.style.setProperty(
      "--mx",
      `${((e.clientX - r.left) / r.width) * 100}%`
    );
    previewRef.current.style.setProperty(
      "--my",
      `${((e.clientY - r.top) / r.height) * 100}%`
    );
  };

  const current = services[active];

  return (
    <section
      ref={rootRef}
      data-chapter="Services"
      id="services-chapter"
      className="relative border-y border-white/5 bg-black py-28 md:py-40"
      onMouseMove={onMove}
    >
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <Reveal>
          <SectionHeader
            eyebrow="What we do"
            title={
              <>
                A full-stack agency
                <br />
                for <span className="text-iris-gradient">ambitious brands.</span>
              </>
            }
            description="Seven disciplines, one integrated team."
          />
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
          {/* Left – service list */}
          <ul
            className="lg:col-span-7"
            onMouseLeave={() => setActive((v) => v)}
          >
            {services.map((s, i) => {
              const isActive = i === active;
              return (
                <li
                  key={s.slug}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  className="group relative border-b border-white/10"
                >
                  <Link
                    href={`/services/${s.slug}`}
                    data-cursor="view"
                    className="flex items-center justify-between gap-6 py-6 md:py-8"
                  >
                    <span className="flex items-baseline gap-5 md:gap-8">
                      <span className="font-mono text-[10px] tracking-[0.3em] text-gold-400/60 w-8">
                        0{i + 1}
                      </span>
                      <span
                        className={`font-display leading-none tracking-tight transition-all duration-500
                          text-[clamp(2rem,5vw,4.5rem)]
                          ${isActive ? "text-gold-gradient translate-x-3" : "text-white/80"}`}
                      >
                        {s.name}
                      </span>
                    </span>
                    <span
                      className={`hidden items-center gap-3 font-mono text-[10px] uppercase tracking-[0.3em] transition-all duration-500 md:inline-flex
                        ${isActive ? "translate-x-0 opacity-100" : "translate-x-4 opacity-0"}`}
                    >
                      <span>View</span>
                      <span aria-hidden>→</span>
                    </span>
                  </Link>
                  {/* gradient wipe line */}
                  <span
                    aria-hidden
                    className="absolute inset-x-0 bottom-[-1px] h-px origin-left scale-x-0 bg-gradient-to-r from-transparent via-gold-400 to-transparent transition-transform duration-700 group-hover:scale-x-100"
                  />
                </li>
              );
            })}
          </ul>

          {/* Right – preview panel */}
          <div
            ref={previewRef}
            className="relative h-[420px] overflow-hidden rounded-[28px] border border-white/10 bg-gradient-to-br from-white/[0.03] to-white/[0.01] backdrop-blur-sm lg:col-span-5 lg:h-[560px] lg:sticky lg:top-28"
            style={{ ["--mx" as string]: "50%", ["--my" as string]: "50%" }}
          >
            {/* cursor-tracked gradient glow */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-80 transition-colors duration-700"
              style={{
                background: `radial-gradient(400px at var(--mx) var(--my), ${current.accent}55, transparent 65%)`,
              }}
            />
            {/* iridescent grain overlay */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 mix-blend-overlay opacity-50"
              style={{
                background:
                  "conic-gradient(from 120deg at 50% 50%, rgba(242,242,239,0.18), rgba(159,122,234,0.12), rgba(61,217,245,0.12), rgba(242,242,239,0.18))",
              }}
            />
            {/* giant number */}
            <div className="pointer-events-none absolute inset-x-0 -top-6 flex justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.slug + "-num"}
                  initial={{ opacity: 0, y: 30, scale: 0.95 }}
                  animate={{ opacity: 0.12, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.95 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="font-display text-[clamp(12rem,22vw,26rem)] leading-none tracking-tighter text-white"
                >
                  0{active + 1}
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="relative z-10 flex h-full flex-col justify-between p-8 md:p-12">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/50">
                  / Discipline {active + 1} of {services.length}
                </span>
                <span
                  className="inline-block h-2 w-2 rounded-full"
                  style={{ background: current.accent, boxShadow: `0 0 12px ${current.accent}` }}
                />
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={current.slug}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="space-y-6"
                >
                  <h3 className="font-display text-3xl leading-[1.1] md:text-4xl">
                    {current.name}
                  </h3>
                  <p className="text-fg-soft max-w-md">{current.short}</p>
                  <div className="flex flex-wrap gap-2">
                    {current.deliverables.slice(0, 4).map((d) => (
                      <span
                        key={d}
                        className="rounded-full border border-white/15 bg-white/[0.03] px-3 py-1 text-xs text-white/70"
                      >
                        {d}
                      </span>
                    ))}
                  </div>
                  <Link
                    href={`/services/${current.slug}`}
                    data-cursor="view"
                    className="inline-flex items-center gap-2 border-b border-gold-400/60 pb-1 font-mono text-xs uppercase tracking-[0.3em] text-gold-200 transition-colors hover:text-gold-100"
                  >
                    <span>Explore {current.name.toLowerCase()}</span>
                    <span aria-hidden>→</span>
                  </Link>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ServicesCinematic;
