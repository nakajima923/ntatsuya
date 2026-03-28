import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { site } from "@/lib/content";
import { photos } from "@/lib/photos";
import { assetUrl } from "@/lib/assetUrls";

export const metadata: Metadata = {
  title: "About",
  description: "プロフィールと活動について。",
};

const recognition = [
  {
    year: "2023",
    title: "ポートフォリオ選考（仮）",
    body: "街と自然の境界をテーマにしたシリーズが紹介されました。",
  },
  {
    year: "2021",
    title: "フォトウォーク展示（仮）",
    body: "地域ギャラリーでのグループ展に参加。",
  },
] as const;

export default function AboutPage() {
  const portrait = photos[0];

  return (
    <div className="mx-auto max-w-6xl px-5 pb-16 pt-8 md:px-6 md:pt-10">
      <section className="grid grid-cols-1 items-start gap-10 md:grid-cols-12 md:gap-12">
        <div className="md:col-span-7 lg:col-span-6">
          <div className="relative aspect-[4/5] overflow-hidden rounded-md border border-outline-variant/25 bg-white/40 backdrop-blur-sm group">
            <Image
              src={assetUrl(portrait.src)}
              alt={portrait.alt}
              fill
              className="object-cover brightness-95 transition-transform duration-1000 group-hover:scale-105"
              sizes="(max-width:768px)100vw,40vw"
              priority
              unoptimized
            />
          </div>
        </div>
        <div className="flex flex-col pt-0 md:col-span-5 md:pt-6 lg:col-span-6">
          <span className="mb-2 font-sans text-[9px] tracking-[0.28em] text-on-surface-variant uppercase">
            The Vision
          </span>
          <h1 className="mb-5 font-serif text-4xl leading-none tracking-tighter text-on-surface italic md:text-6xl">
            {site.name}
          </h1>
          <div className="max-w-md">
            {site.aboutParagraphs.map((p) => (
              <p
                key={p}
                className="mb-5 font-sans text-sm leading-relaxed text-on-surface-variant md:text-base"
              >
                {p}
              </p>
            ))}
            <div className="flex flex-col gap-1">
              <span className="font-sans text-[9px] tracking-widest text-outline-variant uppercase">
                Email
              </span>
              <a
                href={`mailto:${site.email}`}
                className="inline-block w-fit border-b border-outline-variant/20 pb-0.5 font-sans text-lg transition-colors hover:border-primary"
              >
                {site.email}
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-24 grid grid-cols-1 gap-8 md:grid-cols-12 md:mt-28">
        <div className="md:col-span-4">
          <h2 className="mb-8 font-serif text-2xl italic md:text-3xl">
            Selected
            <br />
            Recognition
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:col-span-8 md:gap-x-12">
          {recognition.map((item) => (
            <div key={item.title} className="space-y-2">
              <span className="font-sans text-[9px] tracking-widest text-outline-variant">
                {item.year}
              </span>
              <h3 className="font-sans text-base font-medium">{item.title}</h3>
              <p className="font-sans text-xs leading-relaxed text-on-surface-variant">
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-24 text-center md:mt-28">
        <h2 className="mb-5 font-serif text-2xl italic md:text-3xl">
          展示・撮影のご相談はお問い合わせから
        </h2>
        <p className="mx-auto mb-8 max-w-lg font-sans text-sm text-on-surface-variant">
          プリント販売や編集案件など、内容をお聞かせください。
        </p>
        <Link
          href="/contact"
          className="inline-block border border-outline-variant/25 bg-white/60 px-9 py-3 font-sans text-[10px] tracking-[0.28em] text-on-surface uppercase backdrop-blur-sm transition-colors hover:bg-on-surface/90 hover:text-surface"
        >
          お問い合わせ
        </Link>
      </section>
    </div>
  );
}
