import type { NextConfig } from "next";

const pagesBasePath = process.env.PAGES_BASE_PATH || "";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: false,
  assetPrefix: pagesBasePath || undefined,
};

export default nextConfig;
