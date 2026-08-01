import type { MetadataRoute } from "next";
import { pagesBasePath, siteOrigin } from "./site-metadata";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = `${siteOrigin}${pagesBasePath}`;
  return [
    {
      url: `${base}/`,
      lastModified: new Date("2026-08-01"),
      changeFrequency: "weekly",
      priority: 1,
      alternates: {
        languages: {
          ko: `${base}/`,
          en: `${base}/en/`,
        },
      },
    },
    {
      url: `${base}/en/`,
      lastModified: new Date("2026-08-01"),
      changeFrequency: "weekly",
      priority: 0.9,
      alternates: {
        languages: {
          ko: `${base}/`,
          en: `${base}/en/`,
        },
      },
    },
  ];
}
