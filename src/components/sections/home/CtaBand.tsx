import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";

export function CtaBand() {
  return (
    <section className="relative overflow-hidden bg-black py-32">
      <div
        aria-hidden
        className="absolute inset-0 opacity-60"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, rgba(242,242,239,0.2) 0%, transparent 60%)",
        }}
      />
      <div className="relative mx-auto max-w-[1400px] px-6 text-center md:px-10">
        <Reveal>
          <p className="text-xs tracking-[0.3em] uppercase text-[color:var(--color-gold-300)]">
            / Have a project in mind?
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="mt-6 font-display text-[clamp(3rem,10vw,10rem)] leading-[0.9] tracking-tighter text-gold-gradient">
            Let&apos;s talk.
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <Link
            href="/contact"
            data-cursor="hover"
            className="mt-12 inline-flex items-center gap-3 rounded-full border border-[color:var(--color-gold-400)]/40 bg-white/[0.03] px-8 py-4 text-sm tracking-wide backdrop-blur transition-colors hover:border-[color:var(--color-gold-400)]"
          >
            Start a project
            <span aria-hidden>→</span>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
