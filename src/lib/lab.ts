export type Experiment = {
  slug: string;
  title: string;
  kind: string;
  summary: string;
  tech: string[];
  accent: string;
};

/**
 * Lab — in-house experiments and components. Pre-client credibility builder:
 * demonstrates craft by shipping the building blocks in public.
 */
export const experiments: Experiment[] = [
  {
    slug: "ink-orb",
    title: "Liquid Ink Orb",
    kind: "WebGL · Shader",
    summary:
      "GPU-only icosahedron with simplex-noise displacement, fresnel rim and a single lambert. The hero piece of this very site.",
    tech: ["GLSL", "react-three-fiber", "Simplex noise"],
    accent: "#bfbfbc",
  },
  {
    slug: "cursor-precision",
    title: "Precision Cursor",
    kind: "Interaction",
    summary:
      "A squircle that morphs per context, a crisp difference-blended dot, and a single expanding ripple on click.",
    tech: ["Framer Motion", "Pointer events", "mix-blend-mode"],
    accent: "#c8d4db",
  },
  {
    slug: "page-curtain",
    title: "Page Curtain",
    kind: "Transition",
    summary:
      "A dual-wipe page transition with a fine iridescent seam. 900ms first time, 450ms thereafter — cinematic without becoming friction.",
    tech: ["Framer Motion", "App Router"],
    accent: "#c6c2d0",
  },
  {
    slug: "aurora-backdrop",
    title: "Aurora Backdrop",
    kind: "WebGL · Ambient",
    summary:
      "A low-power shader plane: value-noise flow field, mouse-reactive glow, OLED-safe floor. DPR-capped for battery.",
    tech: ["GLSL", "FBM", "DPR throttling"],
    accent: "#e6d8d0",
  },
  {
    slug: "weight-scroll",
    title: "Variable Weight Scroll",
    kind: "Typography",
    summary:
      "Scroll velocity drives font-weight 400→1000 in real time, with idle-frame suspension to stay battery-kind.",
    tech: ["Variable fonts", "rAF", "MutationObserver"],
    accent: "#9a9a97",
  },
  {
    slug: "command-palette",
    title: "Command Palette",
    kind: "UX",
    summary:
      "⌘K surface for navigation, theme, sound and reduced-motion. Keyboard-first, scoped by verb.",
    tech: ["cmdk", "Keyboard events"],
    accent: "#bfbfbc",
  },
];

export function getExperiment(slug: string) {
  return experiments.find((e) => e.slug === slug);
}
