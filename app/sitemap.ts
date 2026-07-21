import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";
import { SERVICES } from "@/lib/services";
import { ARTICLES } from "@/lib/journal";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    "",
    "/services",
    "/sound-chakras",
    "/the-clearing",
    "/memberships",
    "/events",
    "/soulful-journey",
    "/about",
    "/reviews",
    "/review",
    "/faq",
    "/gift-cards",
    "/corporate-wellness",
    "/shop",
    "/journal",
    "/contact",
  ].map((p) => ({
    url: `${SITE.url}${p}`,
    changeFrequency: "weekly" as const,
    priority: p === "" ? 1 : 0.7,
  }));

  const servicePages = SERVICES.map((s) => ({
    url: `${SITE.url}/services/${s.slug}`,
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  const articlePages = ARTICLES.map((a) => ({
    url: `${SITE.url}/journal/${a.slug}`,
    lastModified: a.date,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [...staticPages, ...servicePages, ...articlePages];
}
