"use client";

import { useEffect, useState } from "react";

type Chapter = { id: string; label: string };

export function ScrollRail() {
  const [progress, setProgress] = useState(0);
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const collect = () => {
      const nodes = Array.from(
        document.querySelectorAll<HTMLElement>("[data-chapter]")
      );
      const seen = new Set<string>();
      const next: Chapter[] = [];
      for (const n of nodes) {
        const id = n.id || n.dataset.chapter || "";
        if (!id || seen.has(id)) continue;
        seen.add(id);
        next.push({ id, label: n.dataset.chapter || "" });
      }
      setChapters(next);
      return nodes;
    };

    let nodes = collect();
    const mo = new MutationObserver(() => (nodes = collect()));
    mo.observe(document.body, { subtree: true, childList: true });

    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? window.scrollY / max : 0);

      let current: string | null = null;
      const mid = window.innerHeight * 0.4;
      for (const n of nodes) {
        const r = n.getBoundingClientRect();
        if (r.top <= mid) current = n.id || n.dataset.chapter || null;
      }
      setActiveId(current);
    };
    // rAF-throttle so state updates line up with Lenis/paint frames instead
    // of firing multiple times per frame on high-rate wheel events.
    let ticking = false;
    const onScrollThrottled = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        onScroll();
        ticking = false;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScrollThrottled, { passive: true });
    window.addEventListener("resize", onScrollThrottled);
    return () => {
      mo.disconnect();
      window.removeEventListener("scroll", onScrollThrottled);
      window.removeEventListener("resize", onScrollThrottled);
    };
  }, []);

  if (chapters.length === 0) return null;

  return (
    <div
      aria-hidden
      className="fixed right-4 top-1/2 z-40 hidden -translate-y-1/2 md:block"
    >
      {/* Track */}
      <div className="relative flex h-[52vh] w-3 flex-col items-center">
        <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-white/10" />
        <div
          className="absolute left-1/2 top-0 w-px -translate-x-1/2 bg-gold-400"
          style={{ height: `${Math.round(progress * 100)}%` }}
        />
        {/* Chapter dots */}
        <div className="relative flex h-full flex-col justify-between">
          {chapters.map((c) => {
            const active = activeId === c.id;
            return (
              <button
                key={c.id || c.label}
                data-cursor="view"
                onClick={() => {
                  const el = document.getElementById(c.id);
                  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
                className="group relative flex items-center pointer-events-auto"
                aria-label={`Jump to ${c.label}`}
              >
                <span
                  className={`h-1.5 w-1.5 rounded-full transition-all ${
                    active
                      ? "scale-[2] bg-gold-400 shadow-[0_0_12px_rgba(242,242,239,0.8)]"
                      : "bg-white/30 group-hover:bg-gold-300"
                  }`}
                />
                <span className="absolute right-6 whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.3em] text-gold-200 opacity-0 transition-opacity group-hover:opacity-100">
                  {c.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
      {/* percent */}
      <div className="mt-4 text-center font-mono text-[10px] tracking-[0.3em] text-white/30">
        {Math.round(progress * 100).toString().padStart(2, "0")}
      </div>
    </div>
  );
}
