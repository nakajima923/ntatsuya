import type { R2Bucket } from "@cloudflare/workers-types";

declare global {
  interface CloudflareEnv {
    MEDIA_BUCKET: R2Bucket;
  }
}

export {};
