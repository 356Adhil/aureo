import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";

/**
 * Founder note — a human moment in place of client testimonials. Voice matters
 * more than logos when you're pre-client.
 */
export function FounderNote() {
  return (
    <section className="relative border-y border-white/5 bg-[color:var(--color-ink)] py-28 md:py-36">
      <div className="mx-auto max-w-[1200px] px-6 md:px-10">
        <Reveal>
          <div className="flex items-center gap-3 text-xs tracking-[0.3em] uppercase text-[color:var(--color-gold-300)]">
            <span className="h-px w-8 bg-[color:var(--color-gold-400)]/60" />
            / A note from the founder
          </div>
        </Reveal>

        <div className="mt-14 grid gap-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <Reveal>
              <div className="relative aspect-square w-full max-w-[280px] overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.08] to-white/[0.01]">
                <div
                  aria-hidden
                  className="absolute inset-0 opacity-70"
                  style={{
                    background:
                      "radial-gradient(600px circle at 30% 20%, rgba(242,242,239,0.22), transparent 60%), radial-gradient(500px circle at 80% 90%, rgba(198,194,208,0.18), transparent 60%)",
                  }}
                />
                <div className="relative flex h-full flex-col justify-between p-6">
                  <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[color:var(--color-muted)]">
                    Adhil · Founder
                  </span>
                  <div>
                    <div className="font-display text-4xl tracking-tight text-gold-gradient">
                      A.
                    </div>
                    <div className="mt-1 text-[10px] uppercase tracking-[0.3em] text-[color:var(--color-fg-soft)]">
                      Design + engineering
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          <div className="md:col-span-8">
            <Reveal delay={0.1}>
              <div className="space-y-6 font-display text-2xl leading-[1.35] tracking-tight md:text-[28px]">
                <p>
                  Most &ldquo;digital agencies&rdquo; are decorators. They
                  arrive with a template, change the colors, ship a PDF, and
                  invoice.
                </p>
                <p className="text-[color:var(--color-fg-soft)]">
                  Aureo is the opposite. We&apos;re a small studio that treats
                  every site as a product — designed, engineered and performance-
                  tuned by the same hands. No handoff debt. No vendor sprawl.
                </p>
                <p className="text-[color:var(--color-fg-soft)]">
                  We&apos;re new, and honest about it. We&apos;d rather show
                  craft in public — shaders, interactions, writing — than hide
                  behind a logo wall that isn&apos;t ours yet.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="mt-12 flex flex-wrap items-center gap-6 border-t border-white/5 pt-8">
                <Link
                  href="/about"
                  data-cursor="hover"
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 px-5 py-3 text-sm transition-colors hover:border-[color:var(--color-gold-400)]/60"
                >
                  Read the full letter <span aria-hidden>→</span>
                </Link>
                <a
                  href="mailto:hello@aureo.studio"
                  data-cursor="hover"
                  className="font-mono text-xs uppercase tracking-[0.3em] text-[color:var(--color-gold-300)] transition-colors hover:text-[color:var(--color-gold-200)]"
                >
                  hello@aureo.studio
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
