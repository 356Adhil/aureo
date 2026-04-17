"use client";

import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { useRef } from "react";
import { cn } from "@/lib/cn";
import { Magnetic } from "@/components/motion/Magnetic";

type Variant = "primary" | "ghost" | "outline";

type Props = {
  children: ReactNode;
  variant?: Variant;
  className?: string;
  href?: string;
} & Omit<ComponentProps<"button">, "ref">;

const variantClass: Record<Variant, string> = {
  primary:
    "bg-gold-400 text-black hover:bg-gold-300",
  ghost:
    "bg-white/5 text-fg hover:bg-white/10 border border-white/10",
  outline:
    "bg-transparent text-fg border border-gold-400/40 hover:border-gold-400",
};

function SheenWrap({ children, variant }: { children: ReactNode; variant: Variant }) {
  const ref = useRef<HTMLSpanElement>(null);
  const onMove = (e: React.PointerEvent<HTMLSpanElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  };
  return (
    <span
      ref={ref}
      onPointerMove={onMove}
      className="relative inline-flex w-full overflow-hidden rounded-full"
    >
      {children}
      {/* sheen overlay */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            variant === "primary"
              ? "radial-gradient(120px circle at var(--mx,50%) var(--my,50%), rgba(255,255,255,0.45), transparent 60%)"
              : "radial-gradient(140px circle at var(--mx,50%) var(--my,50%), rgba(245,213,122,0.25), transparent 60%)",
          mixBlendMode: variant === "primary" ? "overlay" : "normal",
        }}
      />
    </span>
  );
}

export function Button({ children, variant = "primary", className, href, ...rest }: Props) {
  const base =
    "group relative inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium tracking-wide transition-colors duration-300";
  const classes = cn(base, variantClass[variant], className);

  const inner = (
    <SheenWrap variant={variant}>
      {href ? (
        <Link href={href} className={classes} data-cursor="hover">
          <span className="relative z-[1]">{children}</span>
        </Link>
      ) : (
        <button className={classes} data-cursor="hover" {...rest}>
          <span className="relative z-[1]">{children}</span>
        </button>
      )}
    </SheenWrap>
  );

  return <Magnetic>{inner}</Magnetic>;
}
