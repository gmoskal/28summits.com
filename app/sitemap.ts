import type { MetadataRoute } from "next";
import { siteConfig } from "./_lib/site-content";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["", "/privacy", "/support", "/terms"].map((path) => ({
    url: `${siteConfig.siteUrl}${path}`,
    lastModified: new Date("2026-05-11"),
  }));
}
