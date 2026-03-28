export const site = {
  name: "ntatsuya",
  /** About 用の本文（段落ごと） */
  aboutParagraphs: [
    "カメラはフルサイズのミラーレスをメインに、街歩きと旅先で撮影しています。",
    "構図より先に「その場の空気」を残すことを意識しています。展示や撮影依頼も気軽にご相談ください。",
  ] as const,
  email: "hello@example.com",
  github: "https://github.com/",
  x: "https://x.com/",
  /** SNS など任意で差し替え */
  instagram: "https://www.instagram.com/",
} as const;

/**
 * Googleフォームの「送信」画面を埋め込む URL。
 * フォーム編集画面 → 送信 → `< >` 埋め込み HTML の src をコピーして `.env.local` に貼る。
 */
export function getGoogleFormEmbedUrl(): string | null {
  const url = process.env.NEXT_PUBLIC_GOOGLE_FORM_EMBED_URL;
  return url && url.length > 0 ? url : null;
}
