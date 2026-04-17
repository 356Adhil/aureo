import { notFound } from "next/navigation";
import Link from "next/link";
import { workItems } from "@/lib/work";
import { createMetadata } from "@/lib/seo";
import { CtaBand } from "@/components/sections/home/CtaBand";

type Params = { slug: string };

export function generateStaticParams() {
  return workItems.map((w) => ({ slug: w.slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<Params> },
) {
  const { slug } = await params;
  const w = workItems.find((x) => x.slug === slug);
  if (!w) return createMetadata({ title: "Work" });
  return createMetadata({
    title: w.title,
    description: w.summary,
    path: `/work/${w.slug}`,
  });
}

export default async function WorkDetail(
  { params }: { params: Promise<Params> },
) {
  const { slug } = await params;
  const w = workItems.find((x) => x.slug === slug);
  if (!w) notFound();

  const idx = workItems.findIndex((x) => x.slug === slug);
  const next = workItems[(idx + 1) % workItems.length];

  return (
    <>
      <section className="relative pt-40 pb-20">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10">
          <Link
            href="/work"
            data-cursor="hover"
            className="text-xs tracking-[0.3em] uppercase text-[color:var(--color-muted)] hover:text-[color:var(--color-gold-300)]"
          >
            ← All work
          </Link>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <span className="rounded-full border border-white/15 bg-black/30 px-3 py-1 text-xs tracking-[0.25em] uppercase backdrop-blur">
              {w.status === "concept" ? "Concept" : "Live"}
            </span>
            {w.tags.map((t) => (
              <span
                key={t}
                className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs"
              >
                {t}
              </span>
            ))}
          </div>
          <h1 className="mt-6 max-w-4xl font-display text-[clamp(2.5rem,7vw,6rem)] leading-[1] tracking-tight">
            {w.title}
          </h1>
        </div>
      </section>

      <section className="relative">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10">
          <div
            className="aspect-[16/9] w-full overflow-hidden rounded-2xl border border-white/10"
            style={{
              background: `radial-gradient(1000px circle at 30% 30%, ${w.cover.to}55, transparent 60%), linear-gradient(135deg, ${w.cover.from}, ${w.cover.to}22)`,
            }}
          />
        </div>
      </section>

      <section className="relative py-24">
        <div className="mx-auto grid max-w-[1100px] gap-10 px-6 md:grid-cols-12 md:px-10">
          <div className="md:col-span-4">
            <p className="text-xs tracking-[0.3em] uppercase text-[color:var(--color-muted)]">
              Client
            </p>
            <p className="mt-2">{w.client}</p>
            <p className="mt-8 text-xs tracking-[0.3em] uppercase text-[color:var(--color-muted)]">
              Year
            </p>
            <p className="mt-2 font-mono">{w.year}</p>
          </div>
          <div className="md:col-span-8">
            <h2 className="font-display text-3xl md:text-4xl tracking-tight">
              About the project
            </h2>
            <p className="mt-6 text-lg text-[color:var(--color-fg-soft)]">
              {w.summary} A deeper case study — with process, research and
              outcomes — will land here as we ship the final work.
            </p>
          </div>
        </div>
      </section>

      <section className="relative py-24 border-t border-white/5">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 md:px-10">
          <span className="text-xs tracking-[0.3em] uppercase text-[color:var(--color-muted)]">
            Next →
          </span>
          <Link
            href={`/work/${next.slug}`}
            data-cursor="hover"
            className="font-display text-3xl md:text-5xl tracking-tight hover:text-gold-gradient"
          >
            {next.title}
          </Link>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
