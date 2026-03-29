import { getCloudflareContext } from "@opennextjs/cloudflare";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const CACHE_CONTROL = "public, max-age=31536000, immutable";

function contentTypeForKey(key: string): string {
  const lower = key.toLowerCase();
  if (lower.endsWith(".jpg") || lower.endsWith(".jpeg")) return "image/jpeg";
  if (lower.endsWith(".png")) return "image/png";
  if (lower.endsWith(".webp")) return "image/webp";
  if (lower.endsWith(".gif")) return "image/gif";
  if (lower.endsWith(".svg")) return "image/svg+xml";
  if (lower.endsWith(".avif")) return "image/avif";
  return "application/octet-stream";
}

function objectKeyFromSegments(segments: string[] | undefined): string | null {
  if (!segments?.length) return null;
  if (segments.some((s) => s === "" || s.includes(".."))) return null;
  return `media/${segments.join("/")}`;
}

export async function GET(
  _request: Request,
  ctx: { params: Promise<{ path?: string[] }> },
) {
  const { path: segments } = await ctx.params;
  const objectKey = objectKeyFromSegments(segments);
  if (!objectKey) {
    return new NextResponse("Not Found", { status: 404 });
  }

  const { env } = await getCloudflareContext({ async: true });
  const bucket = env.MEDIA_BUCKET;
  if (!bucket) {
    return new NextResponse("Media bucket not configured", { status: 503 });
  }

  const obj = await bucket.get(objectKey);
  if (!obj) {
    return new NextResponse("Not Found", { status: 404 });
  }

  const headers = new Headers();
  const ct = obj.httpMetadata?.contentType ?? contentTypeForKey(objectKey);
  headers.set("Content-Type", ct);
  if (obj.httpEtag) headers.set("ETag", obj.httpEtag);
  headers.set("Cache-Control", CACHE_CONTROL);

  // Workers の ReadableStream と DOM の BodyInit の型が食い違うため
  return new NextResponse(obj.body as unknown as BodyInit, {
    status: 200,
    headers,
  });
}

export async function HEAD(
  _request: Request,
  ctx: { params: Promise<{ path?: string[] }> },
) {
  const { path: segments } = await ctx.params;
  const objectKey = objectKeyFromSegments(segments);
  if (!objectKey) {
    return new NextResponse(null, { status: 404 });
  }

  const { env } = await getCloudflareContext({ async: true });
  const bucket = env.MEDIA_BUCKET;
  if (!bucket) {
    return new NextResponse(null, { status: 503 });
  }

  const obj = await bucket.head(objectKey);
  if (!obj) {
    return new NextResponse(null, { status: 404 });
  }

  const headers = new Headers();
  const ct = obj.httpMetadata?.contentType ?? contentTypeForKey(objectKey);
  headers.set("Content-Type", ct);
  if (obj.httpEtag) headers.set("ETag", obj.httpEtag);
  headers.set("Cache-Control", CACHE_CONTROL);

  return new NextResponse(null, { status: 200, headers });
}
