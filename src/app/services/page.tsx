import Link from "next/link";
import { createMetadata } from "@/lib/seo";
import { services } from "@/lib/services";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/motion/Reveal";
import { CtaBand } from "@/components/sections/home/CtaBand";

export const metadata = createMetadata({
  title: "Services",
  description:
    "Digital marketing, graphic design, video editing, web design and development, software and app development — all under one agency.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <section className="relative pt-40 pb-20">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10">
          <div className="text-xs tracking-[0.3em] uppercase text-[color:var(--color-gold-300)]">
            / Services
          </div>
          <h1 className="mt-8 max-w-5xl font-display text-[clamp(2.5rem,7vw,6.5rem)] leading-[1] tracking-tight">
            Everything your brand needs,
            <br />
            <span className="text-gold-gradient">under one roof.</span>
          </h1>
          <p className="mt-10 max-w-2xl text-lg text-[color:var(--color-fg-soft)]">
            Seven disciplines that feed each other. Engage us for one — or let
            us run the whole thing.
          </p>
        </div>
      </section>

      <section className="relative">
        {services.map((s, i) => (
          <div
            key={s.slug}
            className="relative overflow-hidden border-t border-white/5"
          >
            <div
              aria-hidden
              className="absolute inset-0 opacity-30"
              style={{
                background: `radial-gradient(900px circle at ${i % 2 ? "80%" : "20%"} 30%, ${s.accent}33, transparent 55%)`,
              }}
            />
            <Reveal>
              <Link
                href={`/services/${s.slug}`}
                data-cursor="hover"
                className="relative mx-auto grid max-w-[1400px] grid-cols-1 items-end gap-8 px-6 py-24 md:grid-cols-12 md:px-10"
              >
                <span className="font-mono text-xs tracking-[0.3em] text-[color:var(--color-gold-300)] md:col-span-1">
                  0{i + 1}
                </span>
                <div className="md:col-span-6">
                  <h2 className="font-display text-5xl md:text-7xl leading-[0.95] tracking-tight">
                    {s.name}
                  </h2>
                  <p className="mt-6 max-w-md text-[color:var(--color-fg-soft)]">
                    {s.description}
                  </p>
                </div>
                <div className="md:col-span-5">
                  <ul className="space-y-2 text-sm">
                    {s.deliverables.map((d) => (
                      <li
                        key={d}
                        className="flex items-center gap-3 border-b border-white/5 py-2"
                      >
                        <span className="h-1 w-1 rounded-full bg-[color:var(--color-gold-400)]" />
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
              </Link>
            </Reveal>
          </div>
        ))}
      </section>

      <CtaBand />
    </>
  );
}
