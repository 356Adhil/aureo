import { createMetadata } from "@/lib/seo";
import { ProcessHorizontal } from "@/components/sections/process/ProcessHorizontal";
import { CtaBand } from "@/components/sections/home/CtaBand";
import { Reveal } from "@/components/motion/Reveal";

export const metadata = createMetadata({
  title: "Process",
  description: "How we take ideas from sketch to launch.",
  path: "/process",
});

export default function ProcessPage() {
  return (
    <>
      <section className="relative pt-40 pb-20">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10">
          <div className="text-xs tracking-[0.3em] uppercase text-[color:var(--color-gold-300)]">
            / Process
          </div>
          <h1 className="mt-8 max-w-5xl font-display text-[clamp(2.5rem,7vw,6.5rem)] leading-[1] tracking-tight">
            From the first sketch
            <br />
            <span className="text-gold-gradient">to the final pixel.</span>
          </h1>
          <Reveal delay={0.2}>
            <p className="mt-10 max-w-2xl text-lg text-[color:var(--color-fg-soft)]">
              Deliberately small, opinionated and senior on every seat. Five
              phases, tight loops, no handoffs to invisible teams.
            </p>
          </Reveal>
        </div>
      </section>

      <ProcessHorizontal />

      <CtaBand />
    </>
  );
}
