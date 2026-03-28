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
    <div className="mx-auto max-w-[1600px] px-5 pb-16 pt-8 md:px-6 md:pt-10">
      <header className="mb-12 max-w-xl">
        <p className="font-sans text-[9px] tracking-[0.28em] text-on-surface-variant uppercase">
          Index
        </p>
        <h1 className="mt-2 font-serif text-3xl italic tracking-tight text-on-surface md:text-4xl">
          Gallery
        </h1>
        <p className="mt-3 font-sans text-xs leading-relaxed text-on-surface-variant md:text-sm">
          Open any thumbnail for a simple detail page—place, gear, and one line
          of exposure info.
        </p>
      </header>

      <ul className="grid list-none grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
        {photos.map((photo) => (
          <li key={photo.id}>
            <Link
              href={`/gallery/${photo.id}`}
              className="group block"
              aria-label={photo.alt}
            >
              <div className="overflow-hidden rounded-md border border-outline-variant/25 bg-white/45 backdrop-blur-sm">
                <div className="relative aspect-[3/2] w-full">
                  <Image
                    src={assetUrl(photo.src)}
                    alt={photo.alt}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width:640px)100vw,(max-width:1024px)50vw,33vw"
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
