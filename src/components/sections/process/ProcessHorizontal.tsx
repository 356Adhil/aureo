"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const steps = [
  {
    n: "01",
    title: "Discover",
    lead: "We listen, research and frame the opportunity.",
    body: "Kickoff workshops, audience and competitor research, stakeholder interviews and a tight strategic brief. By the end of week one, we agree what success looks like and how we'll measure it.",
    accent: "#bfbfbc",
  },
  {
    n: "02",
    title: "Design",
    lead: "Art direction, identity and interface, crafted with taste.",
    body: "Concept explorations in parallel, not in series. We move fast through low-fi, commit hard to a direction and only then polish. Design reviews are short, specific and ruthless.",
    accent: "#e6d8d0",
  },
  {
    n: "03",
    title: "Develop",
    lead: "Production-grade engineering — web, app, software and motion.",
    body: "Built on Next.js, React Native, Node and modern tooling. We pair design and engineering from day one, so the final build stays faithful to the design and plays nicely with the real CMS, real data and real edge cases.",
    accent: "#9a9a97",
  },
  {
    n: "04",
    title: "Deploy",
    lead: "Ship fast, measure with intent, iterate without compromise.",
    body: "CI/CD, preview environments, Core Web Vitals monitoring and a launch checklist we actually follow. Launch day is quiet on purpose — because the work was done already.",
    accent: "#c6c2d0",
  },
  {
    n: "05",
    title: "Grow",
    lead: "Partnership doesn't end at launch.",
    body: "Ongoing marketing, content, product iteration and support — as much or as little as you need. Retainers are flexible, outcomes-focused and honest about what's moving the number.",
    accent: "#c8d4db",
  },
];

export function ProcessHorizontal() {
  const root = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const progress = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!root.current || !track.current) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      if (reduce) return;
      const getDistance = () =>
        (track.current?.scrollWidth ?? 0) - (root.current?.clientWidth ?? 0);

      const tween = gsap.to(track.current, {
        x: () => -getDistance(),
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: () => `+=${getDistance()}`,
          scrub: 0.8,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (progress.current) {
              progress.current.style.transform = `scaleX(${self.progress})`;
            }
          },
        },
      });

      return () => {
        tween.scrollTrigger?.kill();
      };
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      className="relative h-[100dvh] overflow-hidden bg-black"
    >
      {/* top meta bar */}
      <div className="absolute top-0 left-0 right-0 z-10 border-b border-white/5 bg-black/60 backdrop-blur">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-5 md:px-10">
          <span className="text-xs tracking-[0.3em] uppercase text-[color:var(--color-gold-300)]">
            / Process
          </span>
          <span className="hidden text-xs tracking-[0.3em] uppercase text-[color:var(--color-muted)] md:inline">
            Scroll to advance
          </span>
        </div>
        <div className="h-px w-full bg-white/5">
          <div
            ref={progress}
            className="h-px w-full origin-left bg-[color:var(--color-gold-400)]"
            style={{ transform: "scaleX(0)" }}
          />
        </div>
      </div>

      <div
        ref={track}
        className="flex h-full items-center gap-10 pt-24 pl-6 pr-[20vw] will-change-transform md:gap-16 md:pl-20"
      >
        {steps.map((s, i) => (
          <article
            key={s.n}
            className="relative flex h-[70vh] w-[min(90vw,820px)] shrink-0 flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-[color:var(--color-ink-2)] p-10 md:p-14"
          >
            <div
              aria-hidden
              className="absolute inset-0 opacity-40"
              style={{
                background: `radial-gradient(700px circle at 100% 0%, ${s.accent}33, transparent 55%)`,
              }}
            />
            <div className="relative flex items-start justify-between">
              <span className="font-mono text-xs tracking-[0.3em] text-[color:var(--color-gold-300)]">
                STEP {s.n}
              </span>
              <span className="font-mono text-xs tracking-[0.3em] text-[color:var(--color-muted)]">
                {String(i + 1).padStart(2, "0")} / {String(steps.length).padStart(2, "0")}
              </span>
            </div>
            <div className="relative">
              <h3 className="font-display text-[clamp(3rem,7vw,6rem)] leading-[0.95] tracking-tight text-gold-gradient">
                {s.title}
              </h3>
              <p className="mt-6 max-w-xl font-display text-xl md:text-2xl leading-[1.3] tracking-tight text-[color:var(--color-fg)]">
                {s.lead}
              </p>
              <p className="mt-6 max-w-xl text-[color:var(--color-fg-soft)]">
                {s.body}
              </p>
            </div>
          </article>
        ))}

        <div className="flex h-[70vh] w-[min(80vw,520px)] shrink-0 items-center justify-center rounded-2xl border border-dashed border-white/10 p-10 text-center">
          <p className="font-display text-3xl tracking-tight">
            Five steps.
            <br />
            <span className="text-gold-gradient">One partnership.</span>
          </p>
        </div>
      </div>
    </section>
  );
}
