import type { NextConfig } from "next";

const canonicalHost = "28gor.app";
const redirectedHosts = ["www.28gor.app"] as const;

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async redirects() {
    return redirectedHosts.map((host) => ({
      source: "/:path*",
      has: [{ type: "host" as const, value: host }],
      destination: `https://${canonicalHost}/:path*`,
      permanent: true,
    }));
  },
};

export default nextConfig;
