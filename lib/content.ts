export const site = {
  name: "ntatsuya",
  email: "hello@example.com",
  github: "https://github.com/",
  x: "https://x.com/",
  instagram: "https://www.instagram.com/",
} as const;

/** About 本文（日英・段落は行ごと。編集はここだけでよい） */
export const aboutBio = {
  nameJa: "中嶋竜也",
  sectionsJa: [
    [
      "2002.09 岡山県倉敷市出身",
      "2015.04 岡山県立岡山大安寺中等教育学校 入学",
      "2021.03 岡山県立岡山大安寺中等教育学校 卒業",
      "2021.04 島根大学 入学",
      "現在、島根大学 総合理工学部 知能情報デザイン学科 在学中",
    ],
    ["趣味は写真、読書、野鳥観察など様々。", "大学では情報を学んでいます"],
    ["主な撮影機材はEOS 70D", "稀にNikomatELを使います"],
  ],
  sectionsEn: [
    [
      "2002.09 Born in Kurashiki City, Okayama Prefecture",
      "2015.04 Entered Okayama Daianji Secondary School",
      "2021.03 Graduated from Okayama Daianji Secondary School",
      "2021.04 Entered Shimane University",
      "Currently enrolled in the Department of Intelligent Information Design,",
      "Faculty of Science and Engineering, Shimane University",
    ],
    [
      "I like photography, reading, bird watching, etc.",
      "I am studying information science at the University",
    ],
    [
      "My main photographic equipment is EOS 70D",
      "I use NikomatEL on rare occasions.",
    ],
  ],
} as const;

/**
 * Googleフォームの「送信」画面を埋め込む URL。
 * フォーム編集画面 → 送信 → `< >` 埋め込み HTML の src をコピーして `.env.local` に貼る。
 */
export function getGoogleFormEmbedUrl(): string | null {
  const url = process.env.NEXT_PUBLIC_GOOGLE_FORM_EMBED_URL;
  return url && url.length > 0 ? url : null;
}
