"use client";

import { useEffect } from "react";
import { play } from "@/lib/audio";

const CODE = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];

export function Konami() {
  useEffect(() => {
    let idx = 0;
    const onKey = (e: KeyboardEvent) => {
      const want = CODE[idx];
      if (e.key === want || e.key.toLowerCase() === want) {
        idx++;
        if (idx === CODE.length) {
          idx = 0;
          fire();
        }
      } else {
        idx = 0;
      }
      // Also: press "i" anywhere to toggle inverse theme
      if (e.key.toLowerCase() === "i" && !e.metaKey && !e.ctrlKey && !e.altKey) {
        const target = e.target as HTMLElement;
        if (target && ["INPUT", "TEXTAREA"].includes(target.tagName)) return;
        if (target?.isContentEditable) return;
        document.documentElement.classList.toggle("inverse");
        localStorage.setItem(
          "aureo-inverse",
          document.documentElement.classList.contains("inverse") ? "1" : "0"
        );
        play("click");
      }
    };
    window.addEventListener("keydown", onKey);
    // restore inverse on mount
    if (localStorage.getItem("aureo-inverse") === "1") {
      document.documentElement.classList.add("inverse");
    }
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return null;
}

function fire() {
  // burst of confetti from the center
  play("pop");
  // eslint-disable-next-line no-console
  console.log(
    "%cAureo ✦",
    "background:#f2f2ef;color:#000;padding:4px 10px;border-radius:4px;font-weight:bold",
    " You found it. Say hi: hello@aureodigital.in"
  );
  const host = document.createElement("div");
  host.setAttribute("aria-hidden", "true");
  host.style.cssText =
    "position:fixed;inset:0;pointer-events:none;z-index:400;overflow:hidden;";
  document.body.appendChild(host);
  const N = 140;
  const palette = ["#f2f2ef", "#d9d9d5", "#f6f6f4", "#e6d8d0", "#c6c2d0", "#c8d4db"];
  for (let i = 0; i < N; i++) {
    const s = document.createElement("span");
    const size = 4 + Math.random() * 6;
    const color = palette[Math.floor(Math.random() * palette.length)];
    const angle = Math.random() * Math.PI * 2;
    const dist = 30 + Math.random() * 70;
    s.style.cssText = `
      position:absolute;top:50%;left:50%;width:${size}px;height:${size}px;
      background:${color};border-radius:${Math.random() > 0.5 ? "50%" : "2px"};
      transform:translate(-50%,-50%);
      box-shadow:0 0 8px ${color};
    `;
    host.appendChild(s);
    s.animate(
      [
        { transform: "translate(-50%,-50%) scale(0.5)", opacity: 1 },
        {
          transform: `translate(calc(-50% + ${Math.cos(angle) * dist}vw), calc(-50% + ${Math.sin(angle) * dist}vh)) rotate(${Math.random() * 720}deg) scale(${0.6 + Math.random()})`,
          opacity: 0,
        },
      ],
      {
        duration: 1600 + Math.random() * 900,
        easing: "cubic-bezier(0.22,1,0.36,1)",
        fill: "forwards",
      }
    );
  }
  setTimeout(() => host.remove(), 2800);
}
