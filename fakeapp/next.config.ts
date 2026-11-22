import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Genera una carpeta autosuficiente para la imagen Docker de produccion.
  output: "standalone",
  // Permite abrir el modo desarrollo por https://localhost (proxy con TLS 1.3).
  allowedDevOrigins: ["localhost"],
  // Reenvia /api/* a la API de FakeApp Radar (evita problemas de CORS en desarrollo).
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${process.env.API_URL ?? "http://127.0.0.1:8000"}/:path*`,
      },
    ];
  },
  /* config options here */
  experimental: {
    agentFeedback: true,
  },
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
