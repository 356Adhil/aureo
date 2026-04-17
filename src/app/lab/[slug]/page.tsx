import Link from "next/link";
import { notFound } from "next/navigation";
import { createMetadata } from "@/lib/seo";
import { experiments, getExperiment } from "@/lib/lab";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/motion/Reveal";

export function generateStaticParams() {
  return experiments.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const e = getExperiment(slug);
  if (!e) return createMetadata({ title: "Not found" });
  return createMetadata({
    title: `${e.title} — Lab`,
    description: e.summary,
    path: `/lab/${e.slug}`,
  });
}

export default async function LabDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const e = getExperiment(slug);
  if (!e) notFound();

  const idx = experiments.findIndex((x) => x.slug === e.slug);
  const next = experiments[(idx + 1) % experiments.length];

  return (
    <>
      <section className="relative pt-40 pb-10">
        <div className="mx-auto max-w-[1200px] px-6 md:px-10">
          <Reveal>
            <Link
              href="/lab"
              data-cursor="hover"
              className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-[color:var(--color-muted)] hover:text-[color:var(--color-fg)]"
            >
              ← All experiments
            </Link>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-10 font-mono text-[10px] uppercase tracking-[0.3em] text-[color:var(--color-gold-300)]">
              / {e.kind}
            </div>
            <h1 className="mt-6 font-display text-[clamp(2.5rem,7vw,6rem)] leading-[1] tracking-tight">
              {e.title}
            </h1>
            <p className="mt-8 max-w-2xl text-lg text-[color:var(--color-fg-soft)]">
              {e.summary}
            </p>
            <div className="mt-8 flex flex-wrap gap-2">
              {e.tech.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-[color:var(--color-fg-soft)]"
                >
                  {t}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="relative py-16">
        <div className="mx-auto max-w-[1200px] px-6 md:px-10">
          <Reveal>
            <div
              aria-hidden
              className="relative aspect-[16/9] w-full overflow-hidden rounded-3xl border border-white/10"
              style={{
                background: `radial-gradient(900px circle at 30% 30%, ${e.accent}44, transparent 60%), linear-gradient(135deg, #0a0a0a, ${e.accent}22)`,
              }}
            >
              <div className="absolute inset-0 grid place-items-center">
                <div className="font-display text-[clamp(3rem,12vw,12rem)] tracking-tighter text-white/10">
                  {e.title.split(" ")[0]}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="relative py-16">
        <div className="mx-auto max-w-[820px] px-6 md:px-10">
          <Reveal>
            <SectionHeader
              eyebrow="Notes"
              title={
                <>
                  Why this matters
                  <br />
                  to our work.
                </>
              }
            />
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-12 space-y-6 text-lg leading-[1.6] text-[color:var(--color-fg-soft)]">
              <p>
                Every component in the Lab starts as a question we wanted to
                answer for ourselves. We ship them in public so the craft is
                legible — and so the decisions are yours to interrogate.
              </p>
              <p>
                If you&apos;re working on something adjacent and want to use,
                fork or discuss any of this, get in touch.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="relative border-t border-white/5 py-20">
        <div className="mx-auto max-w-[1200px] px-6 md:px-10">
          <div className="flex flex-wrap items-center justify-between gap-6">
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-[color:var(--color-muted)]">
                Next experiment
              </div>
              <Link
                href={`/lab/${next.slug}`}
                data-cursor="hover"
                className="mt-3 inline-block font-display text-3xl tracking-tight hover:text-[color:var(--color-gold-200)] md:text-5xl"
              >
                {next.title} →
              </Link>
            </div>
            <Link
              href="/contact"
              data-cursor="hover"
              className="rounded-full border border-[color:var(--color-gold-400)]/40 px-6 py-3 text-sm transition-colors hover:border-[color:var(--color-gold-400)]"
            >
              Start a project →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
