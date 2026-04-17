"use client";

import dynamic from "next/dynamic";

export const AuroraBackdrop = dynamic(
  () => import("@/components/three/AuroraBackdrop").then((m) => m.AuroraBackdrop),
  { ssr: false }
);
