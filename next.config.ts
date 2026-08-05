import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: __dirname,
  },
  experimental: {
    viewTransition: true,
  },
  async redirects() {
    return [{ source: "/company", destination: "/about", permanent: true }];
  },
  async rewrites() {
    // "index" is a reserved output basename for the root route "/" in this Next.js
    // version, so the "/index" page lives in app/deliberation-index and is rewritten
    // back to "/index" here to avoid a build-time output path collision.
    return [
      { source: "/index", destination: "/deliberation-index" },
      { source: "/index/:path*", destination: "/deliberation-index/:path*" },
    ];
  },
};

export default nextConfig;
