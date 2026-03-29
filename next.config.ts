import type { NextConfig } from "next";
import type { RemotePattern } from "next/dist/shared/lib/image-config";
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

/** R2 の r2.dev URL と、ビルド時に与えたメディアオリジンを next/image で許可する */
function mediaRemotePatterns(): RemotePattern[] {
  const fromEnv = (() => {
    const raw = process.env.NEXT_PUBLIC_MEDIA_BASE_URL?.trim();
    if (!raw) return [] as RemotePattern[];
    try {
      const u = new URL(raw);
      if (u.protocol !== "http:" && u.protocol !== "https:") return [];
      const pattern: RemotePattern = {
        protocol: u.protocol === "https:" ? "https" : "http",
        hostname: u.hostname,
        pathname: "/**",
      };
      if (u.port) pattern.port = u.port;
      return [pattern];
    } catch {
      return [];
    }
  })();

  const r2Dev: RemotePattern = {
    protocol: "https",
    hostname: "*.r2.dev",
    pathname: "/**",
  };

  return [...fromEnv, r2Dev];
}

const nextConfig: NextConfig = {
  // Cloudflare では Vercel の Image Optimization は使わない。将来 Cloudflare Images と連携する場合はここを差し替える。
  images: {
    unoptimized: true,
    remotePatterns: mediaRemotePatterns(),
  },
};

export default nextConfig;

initOpenNextCloudflareForDev();
