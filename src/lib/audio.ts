"use client";

// Procedural Web Audio — no assets, tiny, always available.
// Exposes: initAudio, isAudioEnabled, setAudioEnabled, play(key), useAudioEnabled.

import { useEffect, useState } from "react";

const STORAGE_KEY = "aureo-sound-enabled";
let ctx: AudioContext | null = null;
let enabled = false;

function getCtx(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!ctx) {
    const AC =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext?: typeof AudioContext })
        .webkitAudioContext;
    if (!AC) return null;
    ctx = new AC();
  }
  return ctx;
}

function envelope(g: GainNode, now: number, attack = 0.005, decay = 0.18, peak = 0.2) {
  g.gain.cancelScheduledValues(now);
  g.gain.setValueAtTime(0.0001, now);
  g.gain.exponentialRampToValueAtTime(peak, now + attack);
  g.gain.exponentialRampToValueAtTime(0.0001, now + attack + decay);
}

function tone(freq: number, opts: { decay?: number; peak?: number; type?: OscillatorType; sweepTo?: number } = {}) {
  const c = getCtx();
  if (!c) return;
  if (c.state === "suspended") c.resume();
  const osc = c.createOscillator();
  const g = c.createGain();
  const biquad = c.createBiquadFilter();
  biquad.type = "highpass";
  biquad.frequency.value = 500;
  osc.type = opts.type ?? "sine";
  osc.frequency.setValueAtTime(freq, c.currentTime);
  if (opts.sweepTo) {
    osc.frequency.exponentialRampToValueAtTime(
      opts.sweepTo,
      c.currentTime + (opts.decay ?? 0.18)
    );
  }
  osc.connect(biquad).connect(g).connect(c.destination);
  envelope(g, c.currentTime, 0.004, opts.decay ?? 0.18, opts.peak ?? 0.15);
  osc.start();
  osc.stop(c.currentTime + (opts.decay ?? 0.18) + 0.05);
}

export type SoundKey = "hover" | "click" | "transition" | "pop";

export function play(key: SoundKey) {
  if (!enabled) return;
  switch (key) {
    case "hover":
      tone(1200, { decay: 0.08, peak: 0.05, type: "sine" });
      break;
    case "click":
      tone(800, { decay: 0.12, peak: 0.14, type: "triangle", sweepTo: 400 });
      break;
    case "transition":
      tone(440, { decay: 0.3, peak: 0.1, type: "sine", sweepTo: 880 });
      setTimeout(() => tone(660, { decay: 0.2, peak: 0.08, type: "sine" }), 80);
      break;
    case "pop":
      tone(1800, { decay: 0.06, peak: 0.12, type: "square", sweepTo: 600 });
      break;
  }
}

export function initAudio() {
  if (typeof window === "undefined") return;
  const stored = localStorage.getItem(STORAGE_KEY);
  // Default ON — users can mute via SoundToggle. Note: AudioContext cannot
  // actually play until a user gesture resumes it (see arm()); `enabled`
  // is the user-preference flag, not the hardware state.
  enabled = stored === null ? true : stored === "1";
  if (stored === null) localStorage.setItem(STORAGE_KEY, "1");
  arm();
}

// Resume the AudioContext on the first user gesture. Browsers block audio
// until then, so without this the "default on" preference would be silent.
let armed = false;
function arm() {
  if (typeof window === "undefined" || armed) return;
  const resume = () => {
    const c = getCtx();
    if (c && c.state === "suspended") c.resume();
    window.removeEventListener("pointerdown", resume);
    window.removeEventListener("keydown", resume);
    window.removeEventListener("touchstart", resume);
  };
  window.addEventListener("pointerdown", resume, { once: true });
  window.addEventListener("keydown", resume, { once: true });
  window.addEventListener("touchstart", resume, { once: true });
  armed = true;
}

export function isAudioEnabled() {
  return enabled;
}

export function setAudioEnabled(on: boolean) {
  enabled = on;
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEY, on ? "1" : "0");
    window.dispatchEvent(new Event("aureo-sound-change"));
    if (on) getCtx()?.resume();
  }
}

export function useAudioEnabled(): [boolean, (v: boolean) => void] {
  const [on, setOn] = useState(false);
  useEffect(() => {
    initAudio();
    setOn(isAudioEnabled());
    const h = () => setOn(isAudioEnabled());
    window.addEventListener("aureo-sound-change", h);
    return () => window.removeEventListener("aureo-sound-change", h);
  }, []);
  return [on, setAudioEnabled];
}
