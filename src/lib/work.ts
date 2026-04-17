export type WorkItem = {
  slug: string;
  title: string;
  client: string;
  year: string;
  tags: string[];
  cover: { from: string; to: string }; // gradient colors
  summary: string;
  status: "concept" | "live";
};

export const workItems: WorkItem[] = [
  {
    slug: "orbit-fintech",
    title: "Orbit — a fintech for freelancers",
    client: "Orbit (concept)",
    year: "2026",
    tags: ["Brand", "Product design", "Web"],
    cover: { from: "#1b1b1f", to: "#f2f2ef" },
    summary:
      "Identity and marketing site for a next-gen banking platform for creators.",
    status: "concept",
  },
  {
    slug: "noir-skincare",
    title: "Noir — luxury skincare e-commerce",
    client: "Noir (concept)",
    year: "2026",
    tags: ["Brand", "E-commerce", "Motion"],
    cover: { from: "#0a0a0a", to: "#e6d8d0" },
    summary:
      "A deeply editorial commerce experience with immersive product reveals.",
    status: "concept",
  },
  {
    slug: "lumen-studio-app",
    title: "Lumen — AI photo studio app",
    client: "Lumen (concept)",
    year: "2026",
    tags: ["App", "UX", "Motion"],
    cover: { from: "#0a0a0a", to: "#c8d4db" },
    summary: "On-device generative photography for iOS.",
    status: "concept",
  },
  {
    slug: "cinder-film",
    title: "Cinder — a brand film",
    client: "Cinder (concept)",
    year: "2026",
    tags: ["Video", "Direction"],
    cover: { from: "#0a0a0a", to: "#c6c2d0" },
    summary: "A 90-second brand film for an emerging fragrance house.",
    status: "concept",
  },
  {
    slug: "forge-saas",
    title: "Forge — SaaS dashboard",
    client: "Forge (concept)",
    year: "2026",
    tags: ["Product", "Web", "Software"],
    cover: { from: "#0a0a0a", to: "#9a9a97" },
    summary: "A design-led dashboard for modern DevOps teams.",
    status: "concept",
  },
  {
    slug: "mira-campaign",
    title: "Mira — launch campaign",
    client: "Mira (concept)",
    year: "2026",
    tags: ["Marketing", "Social"],
    cover: { from: "#0a0a0a", to: "#bfbfbc" },
    summary: "An integrated launch across paid, social and editorial.",
    status: "concept",
  },
];
