import Link from "next/link";

export default function NotFound() {
  return (
    <section className="relative flex min-h-[80dvh] items-center">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="text-xs tracking-[0.3em] uppercase text-[color:var(--color-gold-300)]">
          / 404
        </div>
        <h1 className="mt-6 font-display text-[clamp(3rem,10vw,10rem)] leading-[0.9] tracking-tight text-gold-gradient">
          Lost in the<br />deep end.
        </h1>
        <p className="mt-8 max-w-md text-lg text-[color:var(--color-fg-soft)]">
          The page you&apos;re looking for doesn&apos;t exist — or not yet.
        </p>
        <Link
          href="/"
          className="mt-10 inline-flex items-center gap-2 rounded-full border border-[color:var(--color-gold-400)]/40 px-6 py-3 text-sm hover:border-[color:var(--color-gold-400)]"
        >
          ← Back to home
        </Link>
      </div>
    </section>
  );
}
