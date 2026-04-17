import Link from "next/link";
import { services } from "@/lib/services";
import { Logo } from "@/components/brand/Logo";
import { CoinBin } from "@/components/sections/footer/CoinBin";

export function Footer() {
  return (
    <footer className="relative mt-32 border-t border-white/5 bg-[color:var(--color-ink)]">
      <div className="mx-auto max-w-[1400px] px-6 py-20 md:px-10">
        <div className="grid gap-16 md:grid-cols-12">
          <div className="md:col-span-6">
            <Logo variant="mark" size={40} className="mb-8 opacity-80" />
            <div className="font-display text-5xl md:text-7xl text-gold-gradient leading-[0.95] tracking-tight">
              Let&apos;s make
              <br />
              something refined.
            </div>
            <Link
              href="/contact"
              data-cursor="hover"
              className="mt-10 inline-flex items-center gap-2 rounded-full bg-[color:var(--color-gold-400)] px-6 py-3 text-sm font-medium text-black transition-colors hover:bg-[color:var(--color-gold-300)]"
            >
              Start a project →
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-10 md:col-span-6 md:grid-cols-3">
            <div>
              <p className="mb-4 text-xs uppercase tracking-[0.25em] text-[color:var(--color-muted)]">
                Studio
              </p>
              <ul className="space-y-2 text-sm">
                <li><Link className="hover:text-[color:var(--color-gold-300)]" href="/about">About</Link></li>
                <li><Link className="hover:text-[color:var(--color-gold-300)]" href="/process">Process</Link></li>
                <li><Link className="hover:text-[color:var(--color-gold-300)]" href="/lab">Lab</Link></li>
                <li><Link className="hover:text-[color:var(--color-gold-300)]" href="/insights">Notes</Link></li>
                <li><Link className="hover:text-[color:var(--color-gold-300)]" href="/work">Work</Link></li>
              </ul>
            </div>
            <div>
              <p className="mb-4 text-xs uppercase tracking-[0.25em] text-[color:var(--color-muted)]">
                Services
              </p>
              <ul className="space-y-2 text-sm">
                {services.slice(0, 6).map((s) => (
                  <li key={s.slug}>
                    <Link className="hover:text-[color:var(--color-gold-300)]" href={`/services/${s.slug}`}>
                      {s.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="mb-4 text-xs uppercase tracking-[0.25em] text-[color:var(--color-muted)]">
                Connect
              </p>
              <ul className="space-y-2 text-sm">
                <li><a className="hover:text-[color:var(--color-gold-300)]" href="mailto:hello@aureo.studio">hello@aureo.studio</a></li>
                <li><a className="hover:text-[color:var(--color-gold-300)]" href="#">Instagram</a></li>
                <li><a className="hover:text-[color:var(--color-gold-300)]" href="#">LinkedIn</a></li>
                <li><a className="hover:text-[color:var(--color-gold-300)]" href="#">GitHub</a></li>
              </ul>
              <p className="mt-6 flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-[color:var(--color-muted)]">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(74,222,128,0.8)]" />
                Open for Q3 2026
              </p>
            </div>
          </div>
        </div>

        <CoinBin />

        {/* Colophon */}
        <div className="mt-20 grid gap-8 border-t border-white/5 pt-10 md:grid-cols-3">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-[color:var(--color-muted)]">
              / Colophon
            </p>
            <p className="mt-3 text-sm text-[color:var(--color-fg-soft)]">
              Built with Next.js, Tailwind and React Three Fiber. Type in
              Space Grotesk, Inter and JetBrains Mono. Hand-tuned shaders,
              Lenis-smoothed scroll, zero dark patterns.
            </p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-[color:var(--color-muted)]">
              / Location
            </p>
            <p className="mt-3 text-sm text-[color:var(--color-fg-soft)]">
              Remote-first · Based in IST (UTC+5:30). We work async with a
              shared 2-hour sync window daily.
            </p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-[color:var(--color-muted)]">
              / Principles
            </p>
            <ul className="mt-3 space-y-1 text-sm text-[color:var(--color-fg-soft)]">
              <li>· Honest timelines over optimistic ones</li>
              <li>· One senior team, no juniors billed as seniors</li>
              <li>· Performance is a design decision</li>
              <li>· Ship, learn, iterate</li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-white/5 pt-8 text-xs text-[color:var(--color-muted)] md:flex-row">
          <p>© {new Date().getFullYear()} Aureo. All rights reserved.</p>
          <p className="tracking-[0.3em] uppercase">
            Crafted with care · Press{" "}
            <kbd className="rounded bg-white/5 px-1.5 py-0.5 text-[10px]">⌘K</kbd>{" "}
            anywhere
          </p>
        </div>
      </div>

      {/* massive background wordmark */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 overflow-hidden">
        <div className="select-none text-center font-display text-[22vw] leading-none tracking-tighter text-white/[0.03]">
          AUREO
        </div>
      </div>
    </footer>
  );
}
