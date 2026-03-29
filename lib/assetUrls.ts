/**
 * メディアの URL を組み立てる。
 * - 未設定: 同一オリジンの `/media/...`（非公開 R2 は `app/media/[...path]/route.ts` が `MEDIA_BUCKET` から配信）
 * - 設定時: 公開 URL ベース（例: r2.dev）の先にパスを付ける
 */
export function assetUrl(path: string): string {
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }
  const base = process.env.NEXT_PUBLIC_MEDIA_BASE_URL?.replace(/\/$/, "") ?? "";
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${base}${normalized}`;
}
