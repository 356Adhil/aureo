import { studioStatus } from "@/lib/status";

export function StatusPill() {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] uppercase tracking-[0.25em] text-white/60">
      <span className="relative flex h-1.5 w-1.5">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold-400 opacity-75" />
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-gold-400" />
      </span>
      <span className="hidden md:inline">{studioStatus.label}</span>
      <span className="md:hidden">{studioStatus.short}</span>
    </span>
  );
}
