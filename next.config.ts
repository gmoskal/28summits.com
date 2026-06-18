import type { NextConfig } from "next";

const canonicalHost = "28gor.app";
const redirectedHosts = ["www.28gor.app"] as const;
const socialImageHeaders = [
  {
    key: "Cache-Control",
    value: "public, max-age=31536000, immutable",
  },
  {
    key: "Access-Control-Allow-Origin",
    value: "*",
  },
];
const socialPageHeaders = [
  {
    key: "Cache-Control",
    value: "public, max-age=0, must-revalidate",
  },
];
const rewrittenLocales = ["en", "es", "de", "fr", "nb", "cs", "sk", "uk"] as const;
const localeParamNames = ["lang", "locale"] as const;

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    qualities: [75, 100],
  },
  async headers() {
    return [
      {
        source: "/",
        headers: socialPageHeaders,
      },
      {
        source: "/:locale(pl|en|es|de|fr|nb|cs|sk|uk)",
        headers: socialPageHeaders,
      },
      {
        source: "/og-image.png",
        headers: socialImageHeaders,
      },
      {
        source: "/og-image-:path(.*)",
        headers: socialImageHeaders,
      },
    ];
  },
  async redirects() {
    return redirectedHosts.map((host) => ({
      source: "/:path*",
      has: [{ type: "host" as const, value: host }],
      destination: `https://${canonicalHost}/:path*`,
      permanent: true,
    }));
  },
  async rewrites() {
    return {
      beforeFiles: localeParamNames.flatMap((paramName) =>
        rewrittenLocales.map((locale) => ({
          source: "/",
          has: [{ type: "query" as const, key: paramName, value: locale }],
          destination: `/${locale}`,
        })),
      ),
    };
  },
};

export default nextConfig;
