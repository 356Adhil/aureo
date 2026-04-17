import Link from "next/link";
import { workItems } from "@/lib/work";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/motion/Reveal";

export function FeaturedConcepts() {
  return (
    <section className="relative bg-black py-32">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeader
              eyebrow="Featured concepts"
              title={
                <>
                  A preview of the work
                  <br />
                  <span className="text-gold-gradient">taking shape.</span>
                </>
              }
              description="We're a new agency — these are concept pieces and in-progress explorations. Real case studies land here soon."
            />
            <Link
              href="/work"
              data-cursor="hover"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 px-5 py-2.5 text-sm hover:border-[color:var(--color-gold-400)]/60"
            >
              All work →
            </Link>
          </div>
        </Reveal>

        <div className="mt-16 grid gap-5 md:grid-cols-6">
          {workItems.map((w, i) => {
            const span =
              i % 5 === 0
                ? "md:col-span-4"
                : i % 5 === 1
                ? "md:col-span-2"
                : i % 5 === 2
                ? "md:col-span-3"
                : i % 5 === 3
                ? "md:col-span-3"
                : "md:col-span-6";
            return (
              <Reveal key={w.slug} className={span} delay={i * 0.05}>
                <Link
                  href={`/work/${w.slug}`}
                  data-cursor="hover"
                  className="group relative block aspect-[16/11] overflow-hidden rounded-2xl border border-white/10"
                >
                  <div
                    aria-hidden
                    className="absolute inset-0 transition-transform duration-[1200ms] group-hover:scale-[1.04]"
                    style={{
                      background: `radial-gradient(800px circle at 30% 30%, ${w.cover.to}44, transparent 60%), linear-gradient(135deg, ${w.cover.from}, ${w.cover.to}22)`,
                    }}
                  />
                  <div className="absolute inset-0 bg-black/20 transition-colors group-hover:bg-black/10" />

                  <div className="relative flex h-full flex-col justify-between p-6 md:p-8">
                    <div className="flex items-center justify-between">
                      <span className="rounded-full border border-white/15 bg-black/30 px-3 py-1 text-xs tracking-[0.25em] uppercase backdrop-blur">
                        {w.status === "concept" ? "Concept" : "Live"}
                      </span>
                      <span className="font-mono text-xs text-[color:var(--color-fg-soft)]">
                        {w.year}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-display text-2xl md:text-3xl tracking-tight">
                        {w.title}
                      </h3>
                      <p className="mt-2 max-w-md text-sm text-[color:var(--color-fg-soft)]">
                        {w.summary}
                      </p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {w.tags.map((t) => (
                          <span
                            key={t}
                            className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-[color:var(--color-fg-soft)]"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
