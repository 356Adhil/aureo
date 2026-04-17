"use client";

import { motion } from "framer-motion";
import { Reveal } from "@/components/motion/Reveal";

/**
 * Positioning statement — replaces the empty "trusted by" slot for a pre-client
 * studio. Sharp voice + availability signal does more than fake logos ever will.
 */
export function Positioning() {
  return (
    <section className="relative border-y border-white/5 bg-[color:var(--color-ink)] py-28 md:py-36">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          background:
            "radial-gradient(800px circle at 20% 0%, rgba(242,242,239,0.06), transparent 60%), radial-gradient(800px circle at 80% 100%, rgba(200,212,219,0.05), transparent 60%)",
        }}
      />
      <div className="relative mx-auto max-w-[1400px] px-6 md:px-10">
        <Reveal>
          <div className="flex items-center gap-3 text-xs tracking-[0.3em] uppercase text-[color:var(--color-gold-300)]">
            <span className="h-px w-8 bg-[color:var(--color-gold-400)]/60" />
            / Positioning
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="mt-10 max-w-5xl font-display text-[clamp(2rem,5.5vw,5rem)] leading-[1.05] tracking-tight">
            A studio for brands who treat their site
            <br />
            as a <span className="text-gold-gradient">product, not a brochure.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <div className="mt-14 grid gap-8 border-t border-white/5 pt-10 md:grid-cols-3">
            <Stat label="Founded" value="2026" note="IST · remote-first" />
            <Stat label="Practice" value="Design + Engineering" note="One senior team, end-to-end" />
            <Stat label="Availability" value="Q3 2026" note="2 project slots open" live />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Stat({
  label,
  value,
  note,
  live = false,
}: {
  label: string;
  value: string;
  note: string;
  live?: boolean;
}) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-[color:var(--color-muted)]">
        {live && (
          <motion.span
            className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400"
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{ boxShadow: "0 0 8px rgba(74,222,128,0.8)" }}
          />
        )}
        {label}
      </div>
      <div className="font-display text-3xl md:text-4xl tracking-tight text-[color:var(--color-fg)]">
        {value}
      </div>
      <div className="text-sm text-[color:var(--color-fg-soft)]">{note}</div>
    </div>
  );
}
