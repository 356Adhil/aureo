import Link from "next/link";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/motion/Reveal";
import { posts } from "@/lib/insights";

export function InsightsPreview() {
  const latest = posts.slice(0, 3);
  return (
    <section
      data-chapter="Insights"
      id="insights-chapter"
      className="relative bg-black py-28 md:py-36"
    >
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeader
              eyebrow="Field notes"
              title={
                <>
                  What we&apos;re
                  <br />
                  <span className="text-gold-gradient">thinking about.</span>
                </>
              }
              description="Short, opinionated writing on the craft of making software feel good."
            />
            <Link
              href="/insights"
              data-cursor="hover"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 px-5 py-2.5 text-sm hover:border-[color:var(--color-gold-400)]/60"
            >
              All notes →
            </Link>
          </div>
        </Reveal>

        <div className="mt-16 grid gap-5 md:grid-cols-3">
          {latest.map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.08}>
              <Link
                href={`/insights/${p.slug}`}
                data-cursor="hover"
                className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] p-8 transition-colors hover:border-white/20"
              >
                <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.3em] text-[color:var(--color-muted)]">
                  <time dateTime={p.date}>
                    {new Date(p.date).toLocaleDateString("en-US", {
                      month: "short",
                      year: "numeric",
                    })}
                  </time>
                  <span>{p.readingTime}</span>
                </div>
                <h3 className="mt-6 font-display text-2xl leading-tight tracking-tight transition-colors md:text-3xl group-hover:text-[color:var(--color-gold-200)]">
                  {p.title}
                </h3>
                <p className="mt-4 flex-1 text-sm text-[color:var(--color-fg-soft)]">
                  {p.excerpt}
                </p>
                <span className="mt-8 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.3em] text-[color:var(--color-gold-300)]">
                  Read note <span aria-hidden>→</span>
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
