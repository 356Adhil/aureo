"use client";

import Link from "next/link";
import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { services } from "@/lib/services";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/motion/Reveal";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function ServicesPinned() {
  const root = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!root.current || !track.current) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const ctx = gsap.context(() => {
      const distance = () =>
        (track.current?.scrollWidth ?? 0) - (root.current?.clientWidth ?? 0);

      gsap.to(track.current, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: () => `+=${distance()}`,
          scrub: 0.8,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section className="relative bg-black py-32">
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
            description="Seven disciplines, one integrated team. We ship campaigns, identities, films, sites, software and apps — often for the same client, always with a single voice."
          />
        </Reveal>
      </div>

      <div ref={root} className="relative mt-24 overflow-hidden">
        <div
          ref={track}
          className="flex gap-6 px-6 will-change-transform md:px-10"
        >
          {services.map((s, i) => (
            <Link
              key={s.slug}
              href={`/services/${s.slug}`}
              data-cursor="hover"
              className="group relative h-[70vh] w-[min(80vw,520px)] shrink-0 overflow-hidden rounded-2xl border border-white/10 bg-[color:var(--color-ink-2)] p-8 transition-colors hover:border-[color:var(--color-gold-400)]/50"
            >
              <div
                aria-hidden
                className="absolute inset-0 opacity-40 transition-opacity duration-700 group-hover:opacity-80"
                style={{
                  background: `radial-gradient(600px circle at 100% 0%, ${s.accent}30, transparent 60%)`,
                }}
              />
              <div className="relative flex h-full flex-col justify-between">
                <div className="flex items-start justify-between">
                  <span className="font-mono text-xs tracking-widest text-[color:var(--color-muted)]">
                    0{i + 1}
                  </span>
                  <span className="inline-flex items-center gap-2 text-xs tracking-[0.3em] uppercase text-[color:var(--color-gold-300)]">
                    Explore →
                  </span>
                </div>

                <div>
                  <h3 className="font-display text-4xl md:text-5xl leading-tight tracking-tight">
                    {s.name}
                  </h3>
                  <p className="mt-4 max-w-sm text-[color:var(--color-fg-soft)]">
                    {s.short}
                  </p>

                  <ul className="mt-8 flex flex-wrap gap-2">
                    {s.deliverables.slice(0, 4).map((d) => (
                      <li
                        key={d}
                        className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-[color:var(--color-fg-soft)]"
                      >
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Link>
          ))}

          <div className="flex h-[70vh] w-[min(70vw,420px)] shrink-0 items-center justify-center rounded-2xl border border-dashed border-white/10 p-8 text-center">
            <p className="font-display text-2xl text-[color:var(--color-fg-soft)]">
              and whatever else
              <br />
              your brand needs
              <br />
              <span className="text-gold-gradient">— just ask.</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
