import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/Fit",
  assetPrefix: "/Fit/",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;