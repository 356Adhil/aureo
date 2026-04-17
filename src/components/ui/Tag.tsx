import { cn } from "@/lib/cn";
import type { ReactNode } from "react";

export function Tag({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs tracking-wide text-[color:var(--color-fg-soft)]",
        className,
      )}
    >
      {children}
    </span>
  );
}
