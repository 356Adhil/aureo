import { createMetadata } from "@/lib/seo";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/motion/Reveal";
import { SplitText } from "@/components/motion/SplitText";
import { CtaBand } from "@/components/sections/home/CtaBand";

export const metadata = createMetadata({
  title: "Agency",
  description:
    "Aureo is a modern digital agency — a small team of designers, engineers and marketers obsessed with craft.",
  path: "/about",
});

const values = [
  {
    t: "Craft is the strategy",
    d: "We believe how a thing is made is inseparable from what it means. Details are the message.",
  },
  {
    t: "Small team, senior work",
    d: "No handoffs to juniors. The people you meet are the people who do the work.",
  },
  {
    t: "Design & engineering, one loop",
    d: "Our designers code. Our engineers design. Good work comes from the overlap.",
  },
  {
    t: "Partnership > projects",
    d: "We'd rather work deeply with a few than shallowly with many.",
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="relative pt-40 pb-24">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10">
          <div className="text-xs tracking-[0.3em] uppercase text-[color:var(--color-gold-300)]">
            / Agency
          </div>
          <SplitText
            as="h1"
            text="A modern agency for brands that refuse to blend in."
            className="mt-8 max-w-5xl font-display text-[clamp(2.5rem,7vw,6.5rem)] leading-[1] tracking-tight text-gold-gradient"
          />
          <Reveal delay={0.2}>
            <p className="mt-10 max-w-2xl text-lg text-[color:var(--color-fg-soft)]">
              Aureo is a new digital agency based on a simple idea: the best
              work happens when marketing, design and engineering share one
              vocabulary. We build brands, products and campaigns end-to-end —
              with taste, tempo and evidence.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="relative py-24">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10">
          <Reveal>
            <SectionHeader
              eyebrow="What we value"
              title={<>The principles we work by.</>}
            />
          </Reveal>
          <div className="mt-16 grid gap-px bg-white/10 md:grid-cols-2">
            {values.map((v, i) => (
              <Reveal key={v.t} delay={i * 0.05}>
                <div className="h-full bg-black p-8 md:p-12">
                  <span className="font-mono text-xs tracking-[0.3em] text-[color:var(--color-gold-300)]">
                    0{i + 1}
                  </span>
                  <h3 className="mt-6 font-display text-2xl md:text-3xl tracking-tight">
                    {v.t}
                  </h3>
                  <p className="mt-4 text-[color:var(--color-fg-soft)]">{v.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-32">
        <div className="mx-auto max-w-[1100px] px-6 md:px-10">
          <Reveal>
            <p className="font-display text-[clamp(1.75rem,4.5vw,3.5rem)] leading-[1.2] tracking-tight">
              <span className="text-[color:var(--color-muted)]">
                A note from the founders —
              </span>
              <br />
              we started Aureo because we kept seeing brilliant companies
              settle for forgettable digital work. We&apos;re here to change
              that, one <span className="text-gold-gradient">refined</span>{" "}
              detail at a time.
            </p>
          </Reveal>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
