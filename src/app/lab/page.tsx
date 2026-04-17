import Link from "next/link";
import { createMetadata } from "@/lib/seo";
import { experiments } from "@/lib/lab";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/motion/Reveal";
import { CtaBand } from "@/components/sections/home/CtaBand";

export const metadata = createMetadata({
  title: "Lab",
  description:
    "In-house experiments, shaders, interactions and typographic tricks. Craft proof in public.",
  path: "/lab",
});

export default function LabPage() {
  return (
    <>
      <section className="relative pt-40 pb-20">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10">
          <Reveal>
            <SectionHeader
              eyebrow="Lab"
              title={
                <>
                  Experiments,
                  <br />
                  <span className="text-iris-gradient">built in public.</span>
                </>
              }
              description="The components, shaders and interactions we build for ourselves first. Each one sharpens the craft we bring to client work."
            />
          </Reveal>
        </div>
      </section>

      <section className="relative">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10">
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {experiments.map((e, i) => (
              <Reveal key={e.slug} delay={(i % 3) * 0.05}>
                <Link
                  href={`/lab/${e.slug}`}
                  data-cursor="hover"
                  className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] p-8 transition-colors hover:border-white/20"
                >
                  <div
                    aria-hidden
                    className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full opacity-40 blur-3xl transition-opacity duration-700 group-hover:opacity-70"
                    style={{ background: e.accent }}
                  />
                  <div className="relative">
                    <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.3em]">
                      <span className="text-[color:var(--color-muted)]">{e.kind}</span>
                      <span className="text-[color:var(--color-gold-300)]">
                        0{i + 1}
                      </span>
                    </div>
                    <h2 className="mt-6 font-display text-2xl leading-tight tracking-tight md:text-3xl">
                      {e.title}
                    </h2>
                    <p className="mt-4 text-sm text-[color:var(--color-fg-soft)]">
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

      <div className="mt-32">
        <CtaBand />
      </div>
    </>
  );
}
