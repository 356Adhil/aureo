"use client";

import { Command } from "cmdk";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { services } from "@/lib/services";
import { posts as insights } from "@/lib/insights";
import { useAudioEnabled, play } from "@/lib/audio";

type Action = { id: string; label: string; hint?: string; run: () => void };

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [sound, setSound] = useAudioEnabled();
  const router = useRouter();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
        play("click");
      } else if (e.key === "Escape") {
        setOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const go = (href: string) => () => {
    setOpen(false);
    router.push(href);
  };

  const actions: Action[] = [
    { id: "home", label: "Home", run: go("/") },
    { id: "about", label: "Agency — about", run: go("/about") },
    { id: "services", label: "All services", run: go("/services") },
    { id: "work", label: "Work", run: go("/work") },
    { id: "process", label: "Process", run: go("/process") },
    { id: "team", label: "Team", run: go("/team") },
    { id: "insights", label: "Insights", run: go("/insights") },
    { id: "contact", label: "Contact — start a project", hint: "⏎", run: go("/contact") },
    {
      id: "sound",
      label: sound ? "Mute sound" : "Enable sound",
      hint: "S",
      run: () => {
        setSound(!sound);
        play("click");
      },
    },
    {
      id: "theme",
      label: "Toggle inverse theme",
      hint: "I",
      run: () => {
        document.documentElement.classList.toggle("inverse");
        localStorage.setItem(
          "aureo-inverse",
          document.documentElement.classList.contains("inverse") ? "1" : "0"
        );
        play("click");
      },
    },
  ];

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[300] flex items-start justify-center bg-black/60 backdrop-blur-[6px] pt-[15vh]"
      onClick={() => setOpen(false)}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-[min(92vw,640px)] overflow-hidden rounded-2xl border border-gold-400/30 bg-ink shadow-[0_20px_80px_rgba(0,0,0,0.6),0_0_0_1px_rgba(242,242,239,0.15)_inset]"
      >
        <Command label="Aureo command menu" className="divide-y divide-white/5">
          <div className="flex items-center gap-3 px-5 py-4">
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold-300">/</span>
            <Command.Input
              placeholder="Jump anywhere, toggle anything…"
              className="flex-1 bg-transparent text-base outline-none placeholder:text-white/30"
              autoFocus
            />
            <kbd className="rounded border border-white/10 bg-white/5 px-2 py-0.5 font-mono text-[10px] text-white/50">
              ESC
            </kbd>
          </div>
          <Command.List className="max-h-[50vh] overflow-y-auto p-2">
            <Command.Empty className="p-6 text-center text-sm text-white/40">
              Nothing matches. Try "contact" or "services".
            </Command.Empty>
            <Command.Group heading="Navigation" className="px-2 pb-2 [&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:py-2 [&_[cmdk-group-heading]]:font-mono [&_[cmdk-group-heading]]:text-[10px] [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-[0.3em] [&_[cmdk-group-heading]]:text-white/40">
              {actions.slice(0, 8).map((a) => (
                <CommandItem key={a.id} value={a.label} onSelect={a.run} hint={a.hint}>
                  {a.label}
                </CommandItem>
              ))}
            </Command.Group>
            <Command.Group heading="Services" className="px-2 pb-2 [&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:py-2 [&_[cmdk-group-heading]]:font-mono [&_[cmdk-group-heading]]:text-[10px] [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-[0.3em] [&_[cmdk-group-heading]]:text-white/40">
              {services.map((s) => (
                <CommandItem
                  key={s.slug}
                  value={`service ${s.name}`}
                  onSelect={go(`/services/${s.slug}`)}
                >
                  {s.name}
                </CommandItem>
              ))}
            </Command.Group>
            <Command.Group heading="Insights" className="px-2 pb-2 [&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:py-2 [&_[cmdk-group-heading]]:font-mono [&_[cmdk-group-heading]]:text-[10px] [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-[0.3em] [&_[cmdk-group-heading]]:text-white/40">
              {insights.map((i) => (
                <CommandItem
                  key={i.slug}
                  value={`insight ${i.title}`}
                  onSelect={go(`/insights/${i.slug}`)}
                >
                  {i.title}
                </CommandItem>
              ))}
            </Command.Group>
            <Command.Group heading="Settings" className="px-2 pb-2 [&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:py-2 [&_[cmdk-group-heading]]:font-mono [&_[cmdk-group-heading]]:text-[10px] [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-[0.3em] [&_[cmdk-group-heading]]:text-white/40">
              {actions.slice(8).map((a) => (
                <CommandItem key={a.id} value={a.label} onSelect={a.run} hint={a.hint}>
                  {a.label}
                </CommandItem>
              ))}
            </Command.Group>
          </Command.List>
          <div className="flex items-center justify-between px-4 py-3 text-[10px] font-mono uppercase tracking-[0.3em] text-white/30">
            <span>Aureo · ⌘K</span>
            <span>
              <kbd className="rounded bg-white/5 px-1.5">↑↓</kbd> navigate · <kbd className="rounded bg-white/5 px-1.5">⏎</kbd> select
            </span>
          </div>
        </Command>
      </div>
    </div>
  );
}

function CommandItem({
  value,
  onSelect,
  children,
  hint,
}: {
  value: string;
  onSelect: () => void;
  children: React.ReactNode;
  hint?: string;
}) {
  return (
    <Command.Item
      value={value}
      onSelect={onSelect}
      className="flex cursor-pointer items-center justify-between rounded-lg px-3 py-2.5 text-sm text-fg-soft transition-colors data-[selected=true]:bg-gold-400/10 data-[selected=true]:text-gold-200"
    >
      <span>{children}</span>
      {hint && (
        <kbd className="rounded border border-white/10 bg-white/5 px-1.5 py-0.5 font-mono text-[10px] text-white/50">
          {hint}
        </kbd>
      )}
    </Command.Item>
  );
}
