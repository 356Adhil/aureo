import { notFound } from "next/navigation";
import Link from "next/link";
import { services } from "@/lib/services";
import { createMetadata } from "@/lib/seo";
import { Reveal } from "@/components/motion/Reveal";
import { CtaBand } from "@/components/sections/home/CtaBand";

type Params = { slug: string };

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<Params> },
) {
  const { slug } = await params;
  const s = services.find((x) => x.slug === slug);
  if (!s) return createMetadata({ title: "Services" });
  return createMetadata({
    title: s.name,
    description: s.description,
    path: `/services/${s.slug}`,
  });
}

export default async function ServiceDetail(
  { params }: { params: Promise<Params> },
) {
  const { slug } = await params;
  const s = services.find((x) => x.slug === slug);
  if (!s) notFound();

  const idx = services.findIndex((x) => x.slug === slug);
  const next = services[(idx + 1) % services.length];

  return (
    <>
      <section
        className="relative pt-40 pb-24"
        style={{
          background: `radial-gradient(1200px circle at 80% 0%, ${s.accent}22, transparent 60%)`,
        }}
      >
        <div className="mx-auto max-w-[1400px] px-6 md:px-10">
          <Link
            href="/services"
            data-cursor="hover"
            className="text-xs tracking-[0.3em] uppercase text-[color:var(--color-muted)] hover:text-[color:var(--color-gold-300)]"
          >
            ← All services
          </Link>
          <h1 className="mt-8 font-display text-[clamp(3rem,9vw,8.5rem)] leading-[0.95] tracking-tight text-gold-gradient">
            {s.name}
          </h1>
          <p className="mt-8 max-w-2xl text-lg md:text-xl text-[color:var(--color-fg-soft)]">
            {s.description}
          </p>
        </div>
      </section>

      <section className="relative py-24">
        <div className="mx-auto max-w-[900px] px-6 md:px-10">
          <Reveal>
            <p className="font-display text-[clamp(1.5rem,3vw,2.5rem)] leading-[1.25] tracking-tight text-[color:var(--color-fg)]">
              {s.intro}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="relative py-12">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10">
          <div className="grid gap-px bg-white/10 md:grid-cols-2">
            {s.sections.map((sec, i) => (
              <Reveal key={sec.heading} delay={i * 0.05}>
                <div className="h-full bg-black p-8 md:p-12">
                  <span className="font-mono text-xs tracking-[0.3em] text-[color:var(--color-gold-300)]">
                    0{i + 1}
                  </span>
                  <h3 className="mt-6 font-display text-2xl md:text-3xl tracking-tight">
                    {sec.heading}
                  </h3>
                  <p className="mt-4 text-[color:var(--color-fg-soft)]">
                    {sec.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-24">
        <div className="mx-auto grid max-w-[1400px] gap-16 px-6 md:grid-cols-12 md:px-10">
          <Reveal className="md:col-span-4">
            <h2 className="font-display text-2xl md:text-3xl tracking-tight">
              Outcomes
            </h2>
            <ul className="mt-8 space-y-3">
              {s.outcomes.map((o) => (
                <li
                  key={o}
                  className="flex items-start gap-3 border-b border-white/5 py-3 text-sm"
                >
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[color:var(--color-gold-400)]" />
                  {o}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal className="md:col-span-4">
            <h2 className="font-display text-2xl md:text-3xl tracking-tight">
              Deliverables
            </h2>
            <ul className="mt-8 space-y-3">
              {s.deliverables.map((d) => (
                <li
                  key={d}
                  className="flex items-start gap-3 border-b border-white/5 py-3 text-sm"
                >
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[color:var(--color-gold-400)]" />
                  {d}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal className="md:col-span-4">
            <h2 className="font-display text-2xl md:text-3xl tracking-tight">
              Tools & stack
            </h2>
            <div className="mt-8 flex flex-wrap gap-2">
              {s.tools.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-[color:var(--color-fg-soft)]"
                >
                  {t}
                </span>
              ))}
            </div>
            <p className="mt-10 text-sm text-[color:var(--color-muted)]">
              {s.engagement}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="relative py-24 border-t border-white/5">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 md:px-10">
          <span className="text-xs tracking-[0.3em] uppercase text-[color:var(--color-muted)]">
            Next →
          </span>
          <Link
            href={`/services/${next.slug}`}
            data-cursor="hover"
            className="font-display text-3xl md:text-5xl tracking-tight hover:text-gold-gradient"
          >
            {next.name}
          </Link>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
