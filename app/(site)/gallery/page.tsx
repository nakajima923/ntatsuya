import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { photos } from "@/lib/photos";
import { assetUrl } from "@/lib/assetUrls";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Thumbnail grid. Each image opens a short detail view.",
};

export default function GalleryPage() {
  return (
    <div className="mx-auto max-w-[1920px] px-6 pb-20 pt-5 md:px-8 md:pt-6 lg:px-10 xl:px-12">
      {/* アクセシビリティ確保のため、画面表示はしない見出しだけ残します */}
      <h1 className="sr-only">Gallery</h1>

      <ul className="grid list-none grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 sm:gap-x-7 sm:gap-y-12 lg:grid-cols-2 lg:gap-x-10 lg:gap-y-14 2xl:grid-cols-3 2xl:gap-x-8 2xl:gap-y-12">
        {photos.map((photo) => (
          <li key={photo.id}>
            <Link
              href={`/gallery/${photo.id}`}
              className="group block"
              aria-label={photo.alt}
            >
              <div className="overflow-hidden rounded-lg border border-outline-variant/25 bg-white/45 backdrop-blur-sm">
                <div className="relative aspect-[3/2] w-full">
                  <Image
                    src={assetUrl(photo.src)}
                    alt={photo.alt}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width:640px)100vw,(max-width:1024px)50vw,(max-width:1536px)50vw,33vw"
                    unoptimized
                  />
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
