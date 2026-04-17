export default function Loading() {
  return (
    <div className="flex min-h-[60dvh] items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-[color:var(--color-gold-400)]/30 border-t-[color:var(--color-gold-400)]" />
        <div className="text-xs tracking-[0.3em] uppercase text-[color:var(--color-muted)]">
          Loading
        </div>
      </div>
    </div>
  );
}
