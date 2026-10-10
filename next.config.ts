import type { NextConfig } from "next";

const staticExport = process.env.SITES_STATIC_EXPORT === "1";
const config: NextConfig = {
  // Permit development assets and hot reload through mobile preview tunnels.
  allowedDevOrigins: ["*.devtunnels.ms", "*.trycloudflare.com", "*.loca.lt", "192.168.10.140"],
  ...(staticExport ? { output: "export", images: { unoptimized: true } } : {}),
  poweredByHeader: false,
  trailingSlash: false,
  async headers() {
    if (staticExport) return [];
    return [{ source: "/:path*", headers: [
      { key: "X-Content-Type-Options", value: "nosniff" },
      { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
      ...(process.env.NODE_ENV === "production" ? [{ key: "Strict-Transport-Security", value: "max-age=31536000" }] : []),
    ] }];
  },
};
export default config;
