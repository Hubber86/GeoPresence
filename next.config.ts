import type { NextConfig }
from "next";

const nextConfig: NextConfig = {

  serverExternalPackages: [
    "tesseract.js",
  ],

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
