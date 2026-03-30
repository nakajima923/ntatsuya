import type { Metadata } from "next";
import Link from "next/link";

import { PortfolioImage } from "@/components/portfolio/PortfolioImage";
import { photos } from "@/lib/photos";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Thumbnail grid. Each image opens a short detail view.",
};

export default function GalleryPage() {
  return (
    <div className="relative z-0 mx-auto w-full max-w-[1920px] px-6 pb-20 pt-5 md:px-8 md:pt-6 lg:px-10 xl:px-12">
      <header className="max-w-xl" aria-hidden="true">
        <h1 className="sr-only">Gallery</h1>
      </header>

      <ul className="grid w-full list-none grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 sm:gap-x-7 sm:gap-y-12 lg:mx-auto lg:grid-cols-3 lg:max-w-6xl lg:gap-x-6 lg:gap-y-12 xl:max-w-7xl 2xl:max-w-[80rem] 2xl:gap-x-8 2xl:gap-y-14">
        {photos.map((photo) => (
          <li key={photo.id} className="w-full">
            <Link
              href={`/gallery/${photo.id}`}
              className="group block w-full"
              aria-label={photo.alt}
            >
              <div className="overflow-hidden rounded-lg border border-outline-variant/40 bg-white/50 shadow-sm backdrop-blur-sm transition-transform duration-700 ease-out group-hover:scale-[1.02]">
                <PortfolioImage
                  src={photo.src}
                  alt={photo.alt}
                  aspect="3/2"
                  className="bg-surface-container"
                />
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
