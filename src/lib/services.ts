export type ServiceSection = {
  heading: string;
  body: string;
};

export type Service = {
  slug: string;
  name: string;
  short: string;
  description: string;
  deliverables: string[];
  tools: string[];
  accent: string;
  intro: string;
  sections: ServiceSection[];
  outcomes: string[];
  engagement: string;
};

export const services: Service[] = [
  {
    slug: "digital-marketing",
    name: "Digital Marketing",
    short: "Performance campaigns that compound.",
    description:
      "Strategy, paid media, SEO and content systems engineered to grow attention into revenue. We measure the metrics that matter and iterate relentlessly.",
    intro:
      "Most brands treat marketing as a tap you turn on. We treat it as a flywheel — a system of strategy, creative and measurement that gets smarter with every campaign.",
    sections: [
      { heading: "Strategy first", body: "We start with a clear go-to-market: positioning, audience, channels and the metrics that actually matter. The plan is tight, ambitious and testable." },
      { heading: "Creative that earns attention", body: "Ads people don't scroll past. We pair sharp strategy with distinctive creative across paid social, search and display — built to perform across Meta, Google, LinkedIn and TikTok." },
      { heading: "SEO & content that lasts", body: "Technical SEO, editorial content and programmatic pages that compound traffic for months, not weeks. We write for humans and ship for Google." },
      { heading: "Measurement without fog", body: "GA4, server-side events and honest dashboards. We track what drives revenue and quietly kill what doesn't." },
    ],
    outcomes: [
      "Clearer positioning & messaging",
      "Paid campaigns that scale profitably",
      "Organic traffic that compounds",
      "Dashboards you actually read",
    ],
    deliverables: [
      "Go-to-market strategy",
      "Paid media (Meta, Google, LinkedIn)",
      "SEO & content strategy",
      "Email & lifecycle",
      "Analytics & attribution",
    ],
    tools: ["GA4", "Meta Ads", "Google Ads", "Ahrefs", "Klaviyo", "Mixpanel"],
    engagement: "Typical engagement: 3–6 month retainer, kickoff sprint in the first two weeks.",
    accent: "#bfbfbc",
  },
  {
    slug: "graphic-design",
    name: "Graphic Design",
    short: "Identities with weight and intention.",
    description:
      "Brand systems, visual language, print and social design — crafted with typographic care and meticulous detail.",
    intro:
      "Design isn't decoration. It's the visual argument for why a brand matters. We build identities that hold their weight across every surface — from a favicon to a billboard.",
    sections: [
      { heading: "Identity systems", body: "Wordmarks, logo systems, colour, typography, grid and motion — delivered as a living system, not a static PDF." },
      { heading: "Editorial & social", body: "Design templates and campaign kits that let in-house teams ship on-brand work fast, without re-inventing every post." },
      { heading: "Packaging & print", body: "Tactile, considered packaging and print with specced production files and a point of view on materials." },
      { heading: "Decks that sell", body: "Pitch, investor and sales decks designed to move people — and readable at the back of the room." },
    ],
    outcomes: [
      "A brand that feels unmistakably yours",
      "A system your team can run with",
      "Faster, sharper creative output",
    ],
    deliverables: [
      "Brand identity & guidelines",
      "Logo & wordmark",
      "Editorial & social design",
      "Packaging & print",
      "Pitch decks",
    ],
    tools: ["Figma", "Illustrator", "Photoshop", "InDesign"],
    engagement: "Typical engagement: 4–8 weeks for a full identity, 2–3 weeks for a focused deliverable.",
    accent: "#e6d8d0",
  },
  {
    slug: "video-editing",
    name: "Video Editing",
    short: "Motion that makes people stop scrolling.",
    description:
      "From shortform to cinematic edits — colour, sound and pacing tuned for the platform it lives on.",
    intro:
      "Video is the highest-leverage format in modern marketing. We cut, colour and score it so it lands — whether it's a 12-second reel or a 3-minute brand film.",
    sections: [
      { heading: "Shortform & social", body: "Hook-first edits built for Reels, Shorts and TikTok — vertical-native, platform-aware, tested against analytics." },
      { heading: "Brand films", body: "Longer-form storytelling with direction, interview craft, colour and sound design that makes the subject feel inevitable." },
      { heading: "Product & explainer", body: "Clear, confident videos that show the thing working and explain it without condescension." },
      { heading: "Motion graphics", body: "Typography in motion, UI animations, 2D and 3D motion — all tuned to the brand's visual system." },
    ],
    outcomes: [
      "Content calendars that don't break mid-quarter",
      "Hero films that anchor a launch",
      "A consistent motion language across channels",
    ],
    deliverables: [
      "Shortform & reels",
      "Brand films",
      "Product videos",
      "Motion graphics",
      "Colour & sound",
    ],
    tools: ["Premiere", "After Effects", "DaVinci Resolve", "Cinema 4D"],
    engagement: "Typical engagement: per-project or monthly content partnership.",
    accent: "#c6c2d0",
  },
  {
    slug: "web-design",
    name: "Web Design",
    short: "Interfaces that feel alive.",
    description:
      "Bespoke web experiences with considered motion, clear hierarchy and interactions that invite exploration.",
    intro:
      "A website is the first product experience most of your customers will ever have. We design sites that feel alive — built around clear hierarchy, considered motion and details that reward a second look.",
    sections: [
      { heading: "Art direction", body: "We pick a point of view and push it. Typography, grid, colour and motion principles defined upfront, applied consistently." },
      { heading: "UX without the mush", body: "Flows mapped to real jobs-to-be-done. We strip the unneeded and sharpen what's left." },
      { heading: "Design systems", body: "Components in Figma that map one-to-one with components in the codebase. Design and engineering stay in lockstep." },
      { heading: "Prototyping", body: "We prototype the scary parts — transitions, 3D, complex interactions — before we commit engineering time." },
    ],
    outcomes: [
      "A site that reflects the brand's ambition",
      "A system that scales across pages",
      "Fewer surprises in engineering handoff",
    ],
    deliverables: ["Art direction", "Design systems", "UX flows", "Interactive prototypes"],
    tools: ["Figma", "Rive", "Lottie", "Framer"],
    engagement: "Typical engagement: 4–10 weeks depending on scope.",
    accent: "#c8d4db",
  },
  {
    slug: "web-development",
    name: "Web Development",
    short: "Blazing-fast, search-friendly, beautifully built.",
    description:
      "Production-grade Next.js, headless CMS and e-commerce. Accessible, performant and easy to evolve.",
    intro:
      "We ship websites that are genuinely fast, genuinely accessible and genuinely maintainable. No frameworks for the sake of frameworks — just the right tools, well used.",
    sections: [
      { heading: "Marketing sites", body: "Next.js App Router, Tailwind, a headless CMS where it earns its place. Built for speed, SEO and easy editing." },
      { heading: "E-commerce", body: "Shopify Hydrogen or headless commerce on Next.js — with real product motion, fast checkout and analytics built in." },
      { heading: "Performance & SEO", body: "Core Web Vitals on every deploy. Image, font and script budgets enforced. Structured data where it counts." },
      { heading: "Handover that sticks", body: "Clean codebases, clear READMEs, CI/CD and optional retainers — your team can take the wheel whenever they're ready." },
    ],
    outcomes: [
      "Top-tier Core Web Vitals",
      "An editor experience your team will actually use",
      "A codebase that welcomes the next engineer",
    ],
    deliverables: [
      "Marketing sites",
      "E-commerce",
      "Headless CMS",
      "CMS integrations",
      "Performance & SEO",
    ],
    tools: ["Next.js", "TypeScript", "Tailwind", "Sanity", "Shopify", "Vercel"],
    engagement: "Typical engagement: 6–12 weeks for a full build, plus optional retainer.",
    accent: "#9a9a97",
  },
  {
    slug: "software-development",
    name: "Software Development",
    short: "Products engineered to scale.",
    description:
      "Full-stack platforms, dashboards and internal tools built with modern stacks and rigorous engineering practice.",
    intro:
      "SaaS platforms, internal tools and custom software — built with the rigour of a product team and the pace of an agency.",
    sections: [
      { heading: "SaaS & platforms", body: "Multi-tenant apps with auth, billing, dashboards and admin. Opinionated stacks that scale from MVP to Series A." },
      { heading: "Dashboards & internal tools", body: "Ops, analytics and back-office tools that save your team real hours — not another dashboard to ignore." },
      { heading: "APIs & integrations", body: "Clean, documented APIs and third-party integrations with retries, observability and sensible error boundaries." },
      { heading: "DevOps & cloud", body: "CI/CD, infrastructure as code and sane cloud architecture on AWS or Vercel. Scale when you need to." },
    ],
    outcomes: [
      "An MVP customers actually want to use",
      "Engineering your next hire won't hate",
      "Infrastructure that doesn't fall over",
    ],
    deliverables: ["SaaS platforms", "Dashboards", "APIs & integrations", "DevOps & cloud"],
    tools: ["Node.js", "Postgres", "AWS", "Docker", "tRPC"],
    engagement: "Typical engagement: discovery sprint, then an iterative build with clear fortnightly releases.",
    accent: "#d9d9d5",
  },
  {
    slug: "app-development",
    name: "App Development",
    short: "Mobile experiences with craft.",
    description:
      "Cross-platform iOS and Android apps with native-feeling motion, offline-first flows and clean architecture.",
    intro:
      "Apps that feel native — because details like haptics, transitions and offline behaviour aren't an afterthought.",
    sections: [
      { heading: "Cross-platform with React Native", body: "Expo + TypeScript for teams that want iOS and Android without doubling the build. Native modules where they earn it." },
      { heading: "Native where it matters", body: "Swift or Kotlin modules for camera, AR, Bluetooth or anything that demands the metal." },
      { heading: "Motion & feel", body: "Frame-correct transitions, haptics and gesture design that make the app feel considered the first time you open it." },
      { heading: "Release, measure, iterate", body: "TestFlight, Play Console, EAS, crash reporting and analytics — set up before the first beta." },
    ],
    outcomes: [
      "An app your users reach for",
      "A clean release pipeline",
      "A codebase built to evolve",
    ],
    deliverables: ["iOS & Android apps", "React Native", "Native modules", "Release & analytics"],
    tools: ["React Native", "Expo", "Swift", "Kotlin"],
    engagement: "Typical engagement: 8–16 weeks for a v1, plus release and growth support.",
    accent: "#f2f2ef",
  },
];
