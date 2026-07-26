import type { NextConfig } from "next";

const isPagesBuild = process.env.GITHUB_PAGES === "true";

const nextConfig: NextConfig = isPagesBuild
  ? {
      output: "export",
      basePath: process.env.PAGES_BASE_PATH ?? "/ax-engineer-roadmap",
      trailingSlash: true,
      typescript: {
        tsconfigPath: "tsconfig.pages.json",
      },
    }
  : {
      trailingSlash: true,
    };

export default nextConfig;
