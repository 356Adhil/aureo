import Link from "next/link";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/motion/Reveal";

type Tier = {
  name: string;
  tagline: string;
  from: string;
  duration: string;
  ideal: string;
  included: string[];
  cta: string;
  emphasised?: boolean;
};

const tiers: Tier[] = [
  {
    name: "Sprint",
    tagline: "A focused intervention.",
    from: "₹6k",
    duration: "2–3 weeks",
    ideal: "Landing page, microsite, identity refresh, or a single critical flow.",
    included: [
      "Scoped discovery call",
      "Art direction + design",
      "Production build or handoff",
      "One round of revision",
    ],
    cta: "Start a Sprint",
  },
  {
    name: "Project",
    tagline: "A full build, end to end.",
    from: "₹24k",
    duration: "6–12 weeks",
    ideal: "Marketing sites, e-commerce, brand systems, product MVPs.",
    included: [
      "Research + strategy",
      "Brand / UX / UI design",
      "Full engineering + deploy",
      "CMS + analytics setup",
      "Two revision rounds",
    ],
    cta: "Scope a Project",
    emphasised: true,
  },
  {
    name: "Partnership",
    tagline: "We become your design + eng team.",
    from: "₹14k / mo",
    duration: "3-month minimum",
    ideal: "Scaling brands that need continuous craft — product, marketing, content.",
    included: [
      "Dedicated senior team",
      "Fortnightly releases",
      "Design-eng pairing",
      "Async + weekly syncs",
      "Priority response",
    ],
    cta: "Talk Partnership",
  },
];

/**
 * Engagement tiers. Lets visitors self-qualify without needing client case
 * studies or a sales call — critical pre-client credibility lever.
 */
export function ServiceTiers() {
  return (
    <section
      data-chapter="Engagement"
      id="engagement-chapter"
      className="relative bg-black py-28 md:py-36"
    >
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <Reveal>
          <SectionHeader
            eyebrow="Engagement"
            title={
              <>
                Three ways
                <br />
                <span className="text-iris-gradient">to work with us.</span>
              </>
            }
            description="Transparent pricing, scoped up-front. Every engagement starts with a free 20-min intro call."
          />
        </Reveal>

        <div className="mt-16 grid gap-5 md:grid-cols-3">
          {tiers.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.08}>
              <div
                className={`group relative flex h-full flex-col overflow-hidden rounded-2xl border p-8 transition-colors ${
                  t.emphasised
                    ? "border-[color:var(--color-gold-400)]/40 bg-gradient-to-b from-white/[0.06] to-white/[0.01]"
                    : "border-white/10 bg-white/[0.02] hover:border-white/20"
                }`}
              >
                {t.emphasised && (
                  <span className="absolute right-5 top-5 rounded-full border border-[color:var(--color-gold-400)]/40 bg-black/40 px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.3em] text-[color:var(--color-gold-200)] backdrop-blur">
                    Most popular
                  </span>
                )}

                <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-[color:var(--color-gold-300)]">
                  0{i + 1} / {t.name}
                </div>
                <h3 className="mt-4 font-display text-3xl tracking-tight">
                  {t.tagline}
                </h3>

                <div className="mt-6 flex items-baseline gap-3">
                  <span className="font-display text-4xl tracking-tight text-[color:var(--color-fg)]">
                    From {t.from}
                  </span>
                  <span className="text-xs uppercase tracking-[0.25em] text-[color:var(--color-muted)]">
                    · {t.duration}
                  </span>
                </div>

                <p className="mt-4 text-sm text-[color:var(--color-fg-soft)]">
                  {t.ideal}
                </p>

                <ul className="mt-8 flex-1 space-y-3 border-t border-white/5 pt-6 text-sm text-[color:var(--color-fg-soft)]">
                  {t.included.map((line) => (
                    <li key={line} className="flex items-start gap-3">
                      <span
                        aria-hidden
                        className="mt-[7px] h-1 w-3 shrink-0 bg-[color:var(--color-gold-400)]/80"
                      />
                      {line}
                    </li>
                  ))}
                </ul>

                <Link
                  href="/contact"
                  data-cursor="hover"
                  className={`mt-10 inline-flex items-center justify-between gap-3 rounded-full border px-5 py-3 text-sm transition-colors ${
                    t.emphasised
                      ? "border-[color:var(--color-gold-400)]/60 bg-[color:var(--color-gold-400)]/10 hover:border-[color:var(--color-gold-400)]"
                      : "border-white/15 hover:border-[color:var(--color-gold-400)]/60"
                  }`}
                >
                  <span>{t.cta}</span>
                  <span aria-hidden>→</span>
                </Link>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.3}>
          <p className="mt-10 text-center text-xs uppercase tracking-[0.3em] text-[color:var(--color-muted)]">
            Not sure which fits?{" "}
            <Link
              href="/contact"
              data-cursor="hover"
              className="underline decoration-[color:var(--color-gold-400)]/40 underline-offset-4 hover:text-[color:var(--color-gold-200)]"
            >
              Book a 20-min call →
            </Link>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
