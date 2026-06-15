import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,

  images: {
    unoptimized: false,
  },

  experimental: {
    optimizePackageImports: [
      "lucide-react",
    ],
  },
};

export default nextConfig;
