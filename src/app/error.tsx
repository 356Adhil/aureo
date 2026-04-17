"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="relative flex min-h-[80dvh] items-center">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="text-xs tracking-[0.3em] uppercase text-[color:var(--color-gold-300)]">
          / Error
        </div>
        <h1 className="mt-6 font-display text-[clamp(2.5rem,8vw,7rem)] leading-[0.95] tracking-tight text-gold-gradient">
          Something flickered.
        </h1>
        <p className="mt-8 max-w-md text-lg text-[color:var(--color-fg-soft)]">
          An unexpected error occurred. You can try again, or head home.
        </p>
        <div className="mt-10 flex gap-3">
          <button
            onClick={reset}
            className="inline-flex items-center gap-2 rounded-full bg-[color:var(--color-gold-400)] px-6 py-3 text-sm font-medium text-black hover:bg-[color:var(--color-gold-300)]"
          >
            Try again
          </button>
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-white/10 px-6 py-3 text-sm hover:border-[color:var(--color-gold-400)]/60"
          >
            Home
          </Link>
        </div>
      </div>
    </section>
  );
}
