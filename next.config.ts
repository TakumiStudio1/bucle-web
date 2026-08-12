import type { NextConfig } from "next";

const isGithubPages = process.env.DEPLOY_TARGET === "github-pages";
const repoName = process.env.NEXT_PUBLIC_BASE_PATH ?? "/bucle-web";

const nextConfig: NextConfig = {
  ...(isGithubPages
    ? {
        output: "export",
        trailingSlash: true,
        basePath: repoName,
        assetPrefix: repoName,
        images: { unoptimized: true },
      }
    : {}),
};

export default nextConfig;
