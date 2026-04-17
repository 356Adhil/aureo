import Link from "next/link";
import { createMetadata } from "@/lib/seo";
import { posts } from "@/lib/insights";
import { Reveal } from "@/components/motion/Reveal";
import { CtaBand } from "@/components/sections/home/CtaBand";

export const metadata = createMetadata({
  title: "Insights",
  description: "Notes on craft, brand and the modern web.",
  path: "/insights",
});

export default function InsightsPage() {
  return (
    <>
      <section className="relative pt-40 pb-16">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10">
          <div className="text-xs tracking-[0.3em] uppercase text-[color:var(--color-gold-300)]">
            / Insights
          </div>
          <h1 className="mt-8 max-w-5xl font-display text-[clamp(2.5rem,7vw,6.5rem)] leading-[1] tracking-tight">
            Thoughts on craft,
            <br />
            <span className="text-gold-gradient">brand & the modern web.</span>
          </h1>
        </div>
      </section>

      <section className="relative py-16">
        <div className="mx-auto max-w-[1100px] px-6 md:px-10">
          <div className="divide-y divide-white/5">
            {posts.map((p, i) => (
              <Reveal key={p.slug} delay={i * 0.05}>
                <Link
                  href={`/insights/${p.slug}`}
                  data-cursor="hover"
                  className="group grid items-center gap-6 py-10 md:grid-cols-12"
                >
                  <span className="font-mono text-xs tracking-[0.3em] text-[color:var(--color-gold-300)] md:col-span-2">
                    {new Date(p.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                    })}
                  </span>
                  <h2 className="font-display text-3xl md:text-4xl tracking-tight md:col-span-7 group-hover:text-gold-gradient">
                    {p.title}
                  </h2>
                  <span className="font-mono text-xs text-[color:var(--color-muted)] md:col-span-3 md:text-right">
                    {p.readingTime} · read →
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
