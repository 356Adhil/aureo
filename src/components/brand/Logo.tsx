import { cn } from "@/lib/cn";

type Props = {
  className?: string;
  variant?: "mark" | "wordmark" | "full";
  size?: number;
};

/**
 * Aureo wordmark — typographic mark built in SVG so it scales crisply
 * and can be recoloured via CSS. The mark (hexagon + inner A) echoes a
 * stylised aureus coin. Gradient id is instance-safe.
 */
export function Logo({ className, variant = "full", size = 28 }: Props) {
  const gid = "aureo-gold";

  const Mark = (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      aria-hidden
      className="shrink-0"
    >
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#f6f6f4" />
          <stop offset="0.35" stopColor="#f2f2ef" />
          <stop offset="0.7" stopColor="#4d4d4b" />
          <stop offset="1" stopColor="#d9d9d5" />
        </linearGradient>
      </defs>
      {/* hexagon */}
      <path
        d="M24 2.5 43.5 13v22L24 45.5 4.5 35V13L24 2.5Z"
        stroke={`url(#${gid})`}
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      {/* inner A */}
      <path
        d="M16 33 24 15l8 18M19 27h10"
        stroke={`url(#${gid})`}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  if (variant === "mark") {
    return <span className={cn("inline-flex", className)}>{Mark}</span>;
  }

  if (variant === "wordmark") {
    return (
      <span
        className={cn(
          "font-display text-xl tracking-tight text-gold-gradient",
          className,
        )}
      >
        Aureo
      </span>
    );
  }

  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      {Mark}
      <span className="font-display text-xl tracking-tight text-gold-gradient">
        Aureo
      </span>
    </span>
  );
}
