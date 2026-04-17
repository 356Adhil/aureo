import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/seo";
import { services } from "@/lib/services";
import { workItems } from "@/lib/work";
import { posts } from "@/lib/insights";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;
  const routes = ["", "/about", "/services", "/work", "/process", "/team", "/insights", "/contact"];
  const staticRoutes = routes.map((r) => ({
    url: `${base}${r}`,
    lastModified: new Date(),
  }));
  const serviceRoutes = services.map((s) => ({
    url: `${base}/services/${s.slug}`,
    lastModified: new Date(),
  }));
  const workRoutes = workItems.map((w) => ({
    url: `${base}/work/${w.slug}`,
    lastModified: new Date(),
  }));
  const insightRoutes = posts.map((p) => ({
    url: `${base}/insights/${p.slug}`,
    lastModified: new Date(p.date),
  }));
  return [...staticRoutes, ...serviceRoutes, ...workRoutes, ...insightRoutes];
}
