import type { MetadataRoute } from "next";
import { pagesBasePath, siteOrigin } from "./site-metadata";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  const base = `${siteOrigin}${pagesBasePath}`;
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${base}/sitemap.xml`,
  };
}
