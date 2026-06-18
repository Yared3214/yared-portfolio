import type { NextConfig } from "next";

/**
 * Next 15 rejects cross-origin dev asset requests unless the host is allowed.
 * Cloud preview hostnames change between sessions, so they are passed in at
 * runtime instead of being committed to this file:
 *   NEXT_ALLOWED_DEV_ORIGINS="abc.style.dev,localhost:3000" npm run dev
 */
const allowedDevOrigins = (process.env.NEXT_ALLOWED_DEV_ORIGINS ?? "")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  devIndicators: false,
  ...(allowedDevOrigins.length ? { allowedDevOrigins } : {}),
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
