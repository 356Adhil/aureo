import Link from "next/link";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/motion/Reveal";
import { experiments } from "@/lib/lab";

/**
 * Lab preview — surfaces in-house experiments. Craft proof when the portfolio
 * is still filling in.
 */
export function LabPreview() {
  const featured = experiments.slice(0, 4);
  return (
    <section
      data-chapter="Lab"
      id="lab-chapter"
      className="relative bg-[color:var(--color-ink)] py-28 md:py-36"
    >
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeader
              eyebrow="Lab"
              title={
                <>
                  Experiments, in public.
                  <br />
                  <span className="text-iris-gradient">Components, in prose.</span>
                </>
              }
              description="Shaders, interactions and typographic tricks we build for ourselves first. Some end up here. All of them sharpen the blade."
            />
            <Link
              href="/lab"
              data-cursor="hover"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 px-5 py-2.5 text-sm hover:border-[color:var(--color-gold-400)]/60"
            >
              Open the lab →
            </Link>
          </div>
        </Reveal>

        <div className="mt-16 grid gap-5 md:grid-cols-2">
          {featured.map((e, i) => (
            <Reveal key={e.slug} delay={i * 0.06}>
              <Link
                href={`/lab/${e.slug}`}
                data-cursor="hover"
                className="group relative block overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] p-8 transition-colors hover:border-white/20"
              >
                <div
                  aria-hidden
                  className="pointer-events-none absolute -right-20 -top-20 h-60 w-60 rounded-full opacity-40 blur-3xl transition-opacity duration-700 group-hover:opacity-70"
                  style={{ background: e.accent }}
                />
                <div className="relative">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[color:var(--color-muted)]">
                      {e.kind}
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[color:var(--color-gold-300)]">
                      0{i + 1}
                    </span>
                  </div>
                  <h3 className="mt-6 font-display text-3xl tracking-tight md:text-4xl">
                    {e.title}
                  </h3>
                  <p className="mt-4 max-w-md text-sm text-[color:var(--color-fg-soft)]">
                    {e.summary}
                  </p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {e.tech.map((t) => (
                      <span
                        key={t}
                        className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-[color:var(--color-fg-soft)]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
