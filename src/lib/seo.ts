import type { Metadata } from "next";

export const siteConfig = {
  name: "Aureo",
  tagline: "We craft digital experiences that feel refined.",
  description:
    "Aureo is a modern digital agency building bold brands and immersive products. Digital marketing, graphic design, video editing, web, software and app development — all in one place.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://aureodigital.in",
  ogImage: "/opengraph-image",
  twitter: "@aureodigital",
};

export function createMetadata(input: {
  title?: string;
  description?: string;
  path?: string;
} = {}): Metadata {
  const title = input.title
    ? `${input.title} — ${siteConfig.name}`
    : `${siteConfig.name} — ${siteConfig.tagline}`;
  const description = input.description ?? siteConfig.description;
  const url = input.path ? `${siteConfig.url}${input.path}` : siteConfig.url;

  return {
    metadataBase: new URL(siteConfig.url),
    title,
    description,
    applicationName: siteConfig.name,
    keywords: [
      "digital agency",
      "digital marketing",
      "graphic design",
      "video editing",
      "web design",
      "web development",
      "app development",
      "software development",
      "branding",
      "Aureo",
    ],
    authors: [{ name: siteConfig.name }],
    creator: siteConfig.name,
    openGraph: {
      type: "website",
      url,
      title,
      description,
      siteName: siteConfig.name,
      images: [{ url: siteConfig.ogImage, width: 1200, height: 630, alt: siteConfig.name }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [siteConfig.ogImage],
      creator: siteConfig.twitter,
    },
    icons: { icon: "/favicon.ico" },
  };
}
