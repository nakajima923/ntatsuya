/**
 * R2 のパブリック URL や Worker 経由のベース URL を `NEXT_PUBLIC_MEDIA_BASE_URL` で差し替え可能にする。
 * ローカルでは未設定のまま `/public` 配下（例: `/media/photos/...`）をそのまま使う。
 */
export function assetUrl(path: string): string {
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }
  const base = process.env.NEXT_PUBLIC_MEDIA_BASE_URL?.replace(/\/$/, "") ?? "";
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${base}${normalized}`;
}
