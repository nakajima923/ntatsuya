export type Photo = {
  id: string;
  /** 内部・メタデータ用（画面には出さない想定） */
  title: string;
  /** `/public` 配下 or フル URL（`assetUrl` 経由）。R2 では例: `media/photos/xxx.jpg` をベース URL に連結 */
  src: string;
  alt: string;
  /** 機材（短めの表記推奨） */
  camera: string;
  lens?: string;
  /** 一行の露出まとめ */
  exposure: string;
  /** 詳細で任意のひとこと（なくてもよい） */
  notes?: string;
  /** グリッド脚注のイタリック（短い補足のみ） */
  captionItalic?: string;
  location?: string;
};
