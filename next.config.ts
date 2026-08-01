import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: __dirname,
  },
  async redirects() {
    return [{ source: "/company", destination: "/about", permanent: true }];
  },
};

export default nextConfig;
