"use client";

import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const GLYPHS = "АБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩ0123456789!@#$%&*+=-/\\?<>▲●◆◇◈⬡";

type Props = {
  text: string;
  as?: "span" | "div" | "h1" | "h2" | "h3" | "h4" | "p";
  className?: string;
  duration?: number;
  trigger?: "inview" | "hover" | "always";
};

export function ScrambleText({
  text,
  as: Tag = "span",
  className,
  duration = 800,
  trigger = "inview",
}: Props) {
  const [display, setDisplay] = useState(text);
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const hasRun = useRef(false);

  const run = () => {
    const start = performance.now();
    const len = text.length;
    let raf = 0;
    const tick = () => {
      const e = (performance.now() - start) / duration;
      const progress = Math.min(1, e);
      let out = "";
      for (let i = 0; i < len; i++) {
        const threshold = i / len;
        if (progress > threshold + 0.1) {
          out += text[i];
        } else if (text[i] === " ") {
          out += " ";
        } else {
          out += GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        }
      }
      setDisplay(out);
      if (progress < 1) raf = requestAnimationFrame(tick);
      else setDisplay(text);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  };

  useEffect(() => {
    if (trigger === "always") return run();
    if (trigger === "inview" && inView && !hasRun.current) {
      hasRun.current = true;
      return run();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, trigger, text]);

  const onHover = () => trigger === "hover" && run();

  return (
    <motion.span
      ref={ref as React.RefObject<HTMLSpanElement>}
      onMouseEnter={onHover}
      className={className}
    >
      <Tag>{display}</Tag>
    </motion.span>
  );
}
