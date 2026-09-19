import type { NextConfig } from "next";
import { siteBasePath } from "./lib/site-paths";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  ...(siteBasePath ? { basePath: siteBasePath } : {}),
};

export default nextConfig;
