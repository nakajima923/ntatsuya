# ntatsuya

Next.js（App Router）+ Tailwind CSS + OpenNext（Cloudflare）の**写真ポートフォリオ**です。ギャラリー（拡大表示＋撮影メモ）、About、Googleフォームのお問い合わせがあります。

## 開発

```bash
npm install
npm run dev
```

ブラウザで `http://localhost:3000` を開きます。ローカルでは通常の Next.js 開発サーバー（Node）が動きます。

## Cloudflare 向けプレビュー（workerd）

本番に近いランタイムで確認する場合は、ビルド後に Wrangler でプレビューします。

```bash
npm run preview
```

初回は Cloudflare へのログインが求められることがあります。

## デプロイ

ローカルやワンショットなら次でビルド＋デプロイまで一括でよい。

```bash
npm run deploy
```

### Cloudflare Workers（ビルドとデプロイが分かれている場合）

`next build` だけでは `.open-next/` ができず、`npx wrangler deploy` が

`Could not find compiled Open Next config` で止まる。**ビルド段階で OpenNext のビルドが必須**。

| 段階 | コマンド例 |
|------|------------|
| ビルド | `npm run build:cloudflare`（中で `next build` も走る） |
| デプロイ | `npx wrangler deploy` または `npx opennextjs-cloudflare deploy` |

`npm run build` と `build:cloudflare` を両方指定すると `next build` が二重になるので、**ビルドは `build:cloudflare` のみ**にするのがおすすめ。

## メディア URL

`NEXT_PUBLIC_MEDIA_BASE_URL` でアセットのオリジンを差し替え可能です。詳しくは `.env.example` を参照してください。
