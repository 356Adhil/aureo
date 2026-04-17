import { createMetadata } from "@/lib/seo";
import { team } from "@/lib/team";
import { Reveal } from "@/components/motion/Reveal";
import { CtaBand } from "@/components/sections/home/CtaBand";

export const metadata = createMetadata({
  title: "Team",
  description: "The founding team behind Aureo.",
  path: "/team",
});

export default function TeamPage() {
  return (
    <>
      <section className="relative pt-40 pb-20">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10">
          <div className="text-xs tracking-[0.3em] uppercase text-[color:var(--color-gold-300)]">
            / Team
          </div>
          <h1 className="mt-8 max-w-5xl font-display text-[clamp(2.5rem,7vw,6.5rem)] leading-[1] tracking-tight">
            A small team,
            <br />
            <span className="text-gold-gradient">senior on every seat.</span>
          </h1>
          <p className="mt-10 max-w-2xl text-lg text-[color:var(--color-fg-soft)]">
            Aureo is just getting started. We&apos;re a founding team of
            makers who care about craft more than headcount.
          </p>
        </div>
      </section>

      <section className="relative py-24">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10">
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {team.map((m, i) => (
              <Reveal key={m.name} delay={i * 0.05}>
                <div className="group relative aspect-[3/4] overflow-hidden rounded-2xl border border-white/10 bg-[color:var(--color-ink-2)] p-6">
                  <div
                    aria-hidden
                    className="absolute inset-0 opacity-40"
                    style={{
                      background:
                        "radial-gradient(500px circle at 50% 20%, rgba(242,242,239,0.25), transparent 60%)",
                    }}
                  />
                  <div className="relative flex h-full flex-col justify-between">
                    <span className="font-mono text-xs tracking-[0.3em] text-[color:var(--color-gold-300)]">
                      0{i + 1}
                    </span>
                    <div>
                      <h3 className="font-display text-2xl md:text-3xl tracking-tight">
                        {m.name}
                      </h3>
                      <p className="mt-2 text-xs tracking-[0.25em] uppercase text-[color:var(--color-fg-soft)]">
                        {m.role}
                      </p>
                      <p className="mt-4 text-sm text-[color:var(--color-fg-soft)]">
                        {m.bio}
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
