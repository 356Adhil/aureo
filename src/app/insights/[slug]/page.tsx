import { notFound } from "next/navigation";
import Link from "next/link";
import { posts } from "@/lib/insights";
import { createMetadata } from "@/lib/seo";
import { CtaBand } from "@/components/sections/home/CtaBand";

type Params = { slug: string };

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<Params> },
) {
  const { slug } = await params;
  const p = posts.find((x) => x.slug === slug);
  if (!p) return createMetadata({ title: "Insights" });
  return createMetadata({
    title: p.title,
    description: p.excerpt,
    path: `/insights/${p.slug}`,
  });
}

export default async function InsightDetail(
  { params }: { params: Promise<Params> },
) {
  const { slug } = await params;
  const p = posts.find((x) => x.slug === slug);
  if (!p) notFound();

  return (
    <>
      <section className="relative pt-40 pb-16">
        <div className="mx-auto max-w-[820px] px-6 md:px-10">
          <Link
            href="/insights"
            data-cursor="hover"
            className="text-xs tracking-[0.3em] uppercase text-[color:var(--color-muted)] hover:text-[color:var(--color-gold-300)]"
          >
            ← All insights
          </Link>
          <div className="mt-8 flex items-center gap-3 text-xs font-mono text-[color:var(--color-muted)]">
            <span>
              {new Date(p.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
            <span>·</span>
            <span>{p.readingTime}</span>
          </div>
          <h1 className="mt-6 font-display text-[clamp(2rem,5vw,4.5rem)] leading-[1.05] tracking-tight">
            {p.title}
          </h1>
          <p className="mt-8 text-lg text-[color:var(--color-fg-soft)]">
            {p.excerpt}
          </p>
        </div>
      </section>

      <article className="relative pb-24">
        <div className="mx-auto max-w-[680px] space-y-6 px-6 text-lg leading-[1.75] text-[color:var(--color-fg-soft)] md:px-10">
          {p.body.map((b, i) => (
            <p key={i}>{b}</p>
          ))}
        </div>
      </article>

      <CtaBand />
    </>
  );
}
