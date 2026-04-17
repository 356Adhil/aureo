"use client";

import { useEffect, useState } from "react";

export type Quality = "high" | "medium" | "low";

function detectQuality(): Quality {
  if (typeof window === "undefined") return "high";
  const mq = window.matchMedia;
  // coarse pointer → mobile/touch
  const coarse = mq("(pointer: coarse)").matches;
  const reduce = mq("(prefers-reduced-motion: reduce)").matches;
  // @ts-expect-error – deviceMemory is non-standard
  const memory: number | undefined = navigator.deviceMemory;
  const cores = navigator.hardwareConcurrency ?? 4;
  const narrow = window.innerWidth < 820;

  if (reduce) return "low";
  if (coarse || narrow) return "medium";
  if ((memory !== undefined && memory <= 2) || cores <= 2) return "medium";
  return "high";
}

export function useQuality(): Quality {
  const [q, setQ] = useState<Quality>("high");
  useEffect(() => {
    setQ(detectQuality());
    const onResize = () => setQ(detectQuality());
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);
  return q;
}

export function useReducedMotion(): boolean {
  const [r, setR] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const on = () => setR(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return r;
}

export function useIsTouch(): boolean {
  const [t, setT] = useState(false);
  useEffect(() => {
    setT(window.matchMedia("(pointer: coarse)").matches);
  }, []);
  return t;
}
