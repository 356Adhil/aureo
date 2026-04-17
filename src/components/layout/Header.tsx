"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/cn";
import { Logo } from "@/components/brand/Logo";
import { StatusPill } from "@/components/ui/StatusPill";
import { SoundToggle } from "@/components/ui/SoundToggle";

const nav = [
  { href: "/work", label: "Work" },
  { href: "/services", label: "Services" },
  { href: "/lab", label: "Lab" },
  { href: "/about", label: "Studio" },
  { href: "/insights", label: "Notes" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          scrolled
            ? "backdrop-blur-xl bg-black/40 border-b border-white/5"
            : "bg-transparent"
        )}
      >
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-4 md:px-10">
          <Link
            href="/"
            data-cursor="hover"
            className="group relative flex items-center gap-2"
            aria-label="Aureo — home"
          >
            <Logo size={26} />
            <span className="hidden text-[10px] tracking-[0.3em] uppercase text-muted sm:inline">
              / agency
            </span>
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            {nav.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                data-cursor="hover"
                className="group relative text-sm text-fg-soft transition-colors hover:text-fg"
              >
                {n.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-gold-400 transition-all duration-500 group-hover:w-full" />
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <span className="hidden lg:inline">
              <StatusPill />
            </span>
            <span className="hidden md:inline">
              <SoundToggle />
            </span>
            <button
              type="button"
              aria-label="Open command menu"
              data-cursor="hover"
              onClick={() =>
                window.dispatchEvent(
                  new KeyboardEvent("keydown", { key: "k", metaKey: true })
                )
              }
              className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.3em] text-white/60 hover:border-gold-400/50 hover:text-gold-200 md:inline-flex"
            >
              <span>Search</span>
              <kbd className="rounded bg-white/10 px-1">⌘K</kbd>
            </button>
            <Link
              href="/contact"
              data-cursor="hover"
              className="hidden rounded-full border border-gold-400/40 px-4 py-2 text-sm transition-colors hover:border-gold-400 md:inline-flex"
            >
              Start a project →
            </Link>
            <button
              aria-label="Menu"
              onClick={() => setOpen((v) => !v)}
              className="md:hidden rounded-full border border-white/10 p-2"
            >
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/95 backdrop-blur-xl md:hidden"
          >
            <div className="flex h-full flex-col items-center justify-center gap-6">
              {nav.map((n, i) => (
                <motion.div
                  key={n.href}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.05 * i }}
                >
                  <Link
                    href={n.href}
                    onClick={() => setOpen(false)}
                    className="font-display text-4xl text-gold-gradient"
                  >
                    {n.label}
                  </Link>
                </motion.div>
              ))}
              <div className="mt-8 flex items-center gap-3">
                <StatusPill />
                <SoundToggle />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
