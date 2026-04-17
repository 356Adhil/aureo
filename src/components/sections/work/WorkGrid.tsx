"use client";

import Link from "next/link";
import { useRef } from "react";
import type { WorkItem } from "@/lib/work";
import { TiltCard } from "@/components/motion/TiltCard";
import { useQuality } from "@/lib/device";

/**
 * Work grid with per-card shader-y hover effect — CSS + SVG-based so it's
 * accessible and lightweight. Each card tracks the cursor via CSS vars and
 * applies RGB-split duotone, radial wave distortion, and iridescent bloom.
 */
export function WorkGrid({ items }: { items: WorkItem[] }) {
  const quality = useQuality();
  return (
    <div className="grid gap-5 md:grid-cols-2">
      {items.map((w, i) => (
        <WorkCard key={w.slug} item={w} index={i} lowQuality={quality === "low"} />
      ))}
    </div>
  );
}

function WorkCard({
  item,
  index,
  lowQuality,
}: {
  item: WorkItem;
  index: number;
  lowQuality: boolean;
}) {
  const ref = useRef<HTMLAnchorElement>(null);

  const onMove = (e: React.PointerEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const mx = ((e.clientX - r.left) / r.width) * 100;
    const my = ((e.clientY - r.top) / r.height) * 100;
    el.style.setProperty("--mx", `${mx}%`);
    el.style.setProperty("--my", `${my}%`);
  };

  const card = (
    <Link
      ref={ref}
      href={`/work/${item.slug}`}
      data-cursor="view"
      onPointerMove={onMove}
      className="group relative block aspect-[5/4] overflow-hidden rounded-2xl border border-white/10"
      style={{ "--mx": "50%", "--my": "50%" } as React.CSSProperties}
    >
      {/* Base gradient */}
      <div
        aria-hidden
        className="absolute inset-0 transition-transform duration-[1200ms] group-hover:scale-[1.06]"
        style={{
          background: `radial-gradient(800px circle at 30% 30%, ${item.cover.to}55, transparent 60%), linear-gradient(135deg, ${item.cover.from}, ${item.cover.to}22)`,
        }}
      />

      {/* RGB split layers appear on hover */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-0 mix-blend-screen transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `radial-gradient(circle at var(--mx) var(--my), ${item.cover.to} 0%, transparent 35%)`,
          filter: "blur(40px)",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 opacity-0 mix-blend-screen transition-opacity duration-500 group-hover:opacity-60"
        style={{
          background: `radial-gradient(circle at calc(var(--mx) + 6px) var(--my), #e6d8d0 0%, transparent 30%)`,
          filter: "blur(30px)",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 opacity-0 mix-blend-screen transition-opacity duration-500 group-hover:opacity-60"
        style={{
          background: `radial-gradient(circle at calc(var(--mx) - 6px) var(--my), #c8d4db 0%, transparent 30%)`,
          filter: "blur(30px)",
        }}
      />

      {/* Iridescent ring ripple emanating from cursor */}
      {!lowQuality && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-80"
          style={{
            background: `radial-gradient(240px circle at var(--mx) var(--my), transparent 35%, rgba(245,213,122,0.35) 45%, transparent 58%, rgba(200,169,255,0.25) 68%, transparent 80%)`,
            mixBlendMode: "plus-lighter",
          }}
        />
      )}

      {/* Grain scan lines */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.07] mix-blend-overlay"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, rgba(255,255,255,0.6) 0 1px, transparent 1px 3px)",
        }}
      />

      <div className="relative flex h-full flex-col justify-between p-8">
        <div className="flex items-center justify-between text-xs tracking-[0.25em] uppercase">
          <span className="rounded-full border border-white/15 bg-black/30 px-3 py-1 backdrop-blur">
            {item.status === "concept" ? "Concept" : "Live"}
          </span>
          <span className="font-mono text-fg-soft">
            <span className="mr-2 text-gold-300">0{index + 1}</span>
            {item.year}
          </span>
        </div>
        <div>
          <div className="mb-4 flex flex-wrap gap-1.5">
            {item.tags.map((t) => (
              <span
                key={t}
                className="rounded-full border border-white/15 bg-black/20 px-2 py-0.5 text-[10px] uppercase tracking-widest text-fg-soft backdrop-blur"
              >
                {t}
              </span>
            ))}
          </div>
          <h2 className="font-display text-3xl leading-tight tracking-tight md:text-4xl">
            {item.title}
          </h2>
          <p className="mt-3 max-w-md text-sm text-fg-soft">{item.summary}</p>
          <span className="mt-6 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-gold-200 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
            View case →
          </span>
        </div>
      </div>

      {/* subtle border glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-2xl ring-0 ring-gold-400/0 transition-all duration-500 group-hover:ring-1 group-hover:ring-gold-400/40"
      />
    </Link>
  );

  if (lowQuality) return <div className="block">{card}</div>;
  return <TiltCard className="block" max={6} sheen={false}>{card}</TiltCard>;
}
