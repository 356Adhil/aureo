import { MarqueeRow } from "@/components/motion/MarqueeRow";
import { services } from "@/lib/services";

export function ServicesMarquee() {
  const items = [...services, ...services];
  return (
    <section className="relative border-y border-white/5 bg-[color:var(--color-ink)] py-10">
      <MarqueeRow>
        {items.map((s, i) => (
          <span
            key={`${s.slug}-${i}`}
            className="inline-flex items-center gap-8 font-display text-4xl md:text-6xl tracking-tight text-[color:var(--color-fg)]"
          >
            <span>{s.name}</span>
            <span className="text-[color:var(--color-gold-400)]">✦</span>
          </span>
        ))}
      </MarqueeRow>
    </section>
  );
}
