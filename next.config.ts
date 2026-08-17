import type { NextConfig } from "next";

// GITHUB_PAGES=true is set by the deploy workflow so the build knows it will
// be served from https://<user>.github.io/<repo>/ instead of a domain root.
const isGithubPages = process.env.GITHUB_PAGES === "true";
const repoName = "green-money-momentum";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  // next/image doesn't prefix `src` with basePath when images are unoptimized,
  // so we expose it as a public env var and prefix static asset paths manually.
  env: {
    NEXT_PUBLIC_BASE_PATH: isGithubPages ? `/${repoName}` : "",
  },
  ...(isGithubPages
    ? {
        basePath: `/${repoName}`,
        assetPrefix: `/${repoName}/`,
      }
    : {}),
};

export default nextConfig;
