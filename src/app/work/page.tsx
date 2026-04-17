import { createMetadata } from "@/lib/seo";
import { workItems } from "@/lib/work";
import { CtaBand } from "@/components/sections/home/CtaBand";
import { WorkGrid } from "@/components/sections/work/WorkGrid";

export const metadata = createMetadata({
  title: "Work",
  description: "Featured concepts and early projects from Aureo.",
  path: "/work",
});

export default function WorkPage() {
  return (
    <>
      <section className="relative pt-40 pb-16">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10">
          <div className="text-xs tracking-[0.3em] uppercase text-gold-300">
            / Work
          </div>
          <h1 className="mt-8 max-w-5xl font-display text-[clamp(2.5rem,7vw,6.5rem)] leading-[1] tracking-tight">
            Concepts in motion,
            <br />
            <span className="text-gold-gradient">case studies soon.</span>
          </h1>
          <p className="mt-10 max-w-2xl text-lg text-fg-soft">
            We&apos;re a new agency. These are concept pieces and explorations
            that reflect the kind of work we love to make. Real client case
            studies will live here as they ship.
          </p>
        </div>
      </section>

      <section className="relative py-16">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10">
          <WorkGrid items={workItems} />
        </div>
      </section>

      <CtaBand />
    </>
  );
}
