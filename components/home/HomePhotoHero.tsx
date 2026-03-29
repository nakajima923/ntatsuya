"use client";

import Image from "next/image";
import Link from "next/link";

import { photos } from "@/lib/photos";
import { assetUrl } from "@/lib/assetUrls";

/** トップの全画面を埋める枚数 */
const HOME_FULLSCREEN = photos.slice(0, 3);

export function HomePhotoHero() {
  return (
    <>
      {HOME_FULLSCREEN.map((photo, index) => {
        const id = `home-full-${index + 1}`;
        const isFirst = index === 0;

        return (
          <section
            key={photo.id}
            id={id}
            className="relative h-[100dvh] min-h-[100dvh] w-full scroll-mt-0"
            aria-label={isFirst ? "トップビジュアル" : undefined}
          >
            <Link
              href={`/gallery/${photo.id}`}
              className="absolute inset-0 z-0 block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-white"
              aria-label={`${photo.alt}の詳細へ`}
            >
              <Image
                src={assetUrl(photo.src)}
                alt=""
                fill
                className="object-cover"
                sizes="100vw"
                priority={index === 0}
                unoptimized
              />
            </Link>
          </section>
        );
      })}
    </>
  );
}
