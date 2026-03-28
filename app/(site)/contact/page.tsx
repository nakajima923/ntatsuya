import type { Metadata } from "next";

import { getGoogleFormEmbedUrl, site } from "@/lib/content";

export const metadata: Metadata = {
  title: "お問い合わせ",
  description: "Googleフォームまたはメールでお問い合わせいただけます。",
};

export default function ContactPage() {
  const formUrl = getGoogleFormEmbedUrl();

  return (
    <div className="mx-auto max-w-6xl px-6 pb-16 pt-8 md:px-8 md:pt-10">
      <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-20">
        <div className="flex flex-col justify-between lg:col-span-5">
          <div>
            <h1 className="mb-6 font-serif text-5xl tracking-tight text-on-surface italic md:text-7xl">
              Get in touch.
            </h1>
            <p className="mb-12 max-w-md font-sans text-base leading-relaxed text-on-surface-variant">
              プリント販売・撮影依頼・共同制作など、お気軽にご連絡ください。フォームまたはメールで受け付けています。
            </p>
          </div>
          <div className="space-y-10">
            <section>
              <span className="mb-2 block font-sans text-[10px] tracking-[0.28em] text-outline uppercase">
                Email
              </span>
              <a
                href={`mailto:${site.email}`}
                className="border-b border-on-surface/10 pb-1 font-serif text-2xl transition-colors hover:text-primary md:text-3xl"
              >
                {site.email}
              </a>
            </section>
          </div>
        </div>

        <div className="relative rounded-lg border border-outline-variant/25 bg-white/45 p-7 backdrop-blur-md md:p-12 lg:col-span-7">
          {formUrl ? (
            <div className="min-h-[600px] w-full overflow-hidden bg-white/90">
              <iframe
                title="お問い合わせフォーム"
                src={formUrl}
                className="h-[1200px] w-full"
              />
            </div>
          ) : (
            <div className="space-y-6">
              <p className="font-sans text-xs leading-relaxed text-on-surface-variant">
                Googleフォームを埋め込むには{" "}
                <code className="rounded bg-surface-container/80 px-1 text-[11px] backdrop-blur-sm">
                  NEXT_PUBLIC_GOOGLE_FORM_EMBED_URL
                </code>{" "}
                を{" "}
                <code className="rounded bg-surface-container/80 px-1 text-[11px] backdrop-blur-sm">
                  .env.local
                </code>{" "}
                に設定し、開発サーバーを再起動してください。
              </p>
              <pre className="overflow-x-auto rounded-md bg-surface-container/70 p-3 font-mono text-[11px] text-on-surface-variant backdrop-blur-sm">
                NEXT_PUBLIC_GOOGLE_FORM_EMBED_URL=&quot;https://docs.google.com/forms/d/e/.../viewform?embedded=true&quot;
              </pre>
              <p className="font-sans text-xs text-on-surface-variant">
                モックの下線付き入力欄をそのまま使う場合は、別途フォームサービスと API
                連携を追加する必要があります。
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
