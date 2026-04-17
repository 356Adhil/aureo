import { cn } from "@/lib/cn";
import type { ReactNode } from "react";

type Props = {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  className?: string;
  align?: "left" | "center";
};

export function SectionHeader({ eyebrow, title, description, className, align = "left" }: Props) {
  return (
    <div
      className={cn(
        "flex flex-col gap-6",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      {eyebrow && (
        <div className="flex items-center gap-3 text-xs tracking-[0.3em] uppercase text-[color:var(--color-gold-300)]">
          <span className="h-px w-8 bg-[color:var(--color-gold-400)]/60" />
          {eyebrow}
        </div>
      )}
      <h2 className="font-display text-4xl sm:text-5xl md:text-6xl leading-[1.02] tracking-tight">
        {title}
      </h2>
      {description && (
        <p className="max-w-xl text-base md:text-lg text-[color:var(--color-fg-soft)]">
          {description}
        </p>
      )}
    </div>
  );
}
