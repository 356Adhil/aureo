"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/cn";

type Props = {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  stagger?: number;
  delay?: number;
  by?: "char" | "word";
};

export function SplitText({
  text,
  className,
  as: Tag = "h2",
  stagger = 0.03,
  delay = 0,
  by = "word",
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const parts = by === "word" ? text.split(" ") : Array.from(text);

  return (
    <Tag className={cn("relative", className)}>
      <span ref={ref} className="inline-block">
        {parts.map((p, i) => (
          <span
            key={i}
            className="inline-block overflow-hidden align-baseline"
            style={{ lineHeight: 1.05 }}
          >
            <motion.span
              className="inline-block"
              initial={{ y: "110%" }}
              animate={inView ? { y: "0%" } : { y: "110%" }}
              transition={{
                duration: 0.9,
                ease: [0.22, 1, 0.36, 1],
                delay: delay + i * stagger,
              }}
            >
              {p}
              {by === "word" && i < parts.length - 1 ? "\u00A0" : ""}
            </motion.span>
          </span>
        ))}
      </span>
    </Tag>
  );
}
