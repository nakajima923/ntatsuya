import Image from "next/image";
import Link from "next/link";

import { photos, photoNumberLabel } from "@/lib/photos";
import { assetUrl } from "@/lib/assetUrls";

export function HomeWorksGrid() {
  return (
    <section
      id="home-works"
      className="mx-auto w-full max-w-6xl px-6 py-16 md:px-8 md:py-24"
      aria-labelledby="home-works-heading"
    >
      <div className="mb-10 md:mb-14">
        <p className="font-sans text-[10px] tracking-[0.28em] text-on-surface-variant uppercase">
          Selection
        </p>
        <h2
          id="home-works-heading"
          className="mt-2 font-serif text-3xl italic tracking-tight text-on-surface md:text-4xl"
        >
          More frames
        </h2>
      </div>

      <ul className="grid list-none grid-cols-2 gap-4 md:grid-cols-3 md:gap-6">
        {photos.map((photo) => (
          <li key={photo.id}>
            <Link
              href={`/gallery/${photo.id}`}
              className="group block"
              aria-label={photo.alt}
            >
              <div className="overflow-hidden rounded-lg border border-outline-variant/25 bg-white/40 backdrop-blur-sm">
                <div className="relative aspect-[4/3] w-full">
                  <Image
                    src={assetUrl(photo.src)}
                    alt={photo.alt}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width:768px)50vw,33vw"
                    unoptimized
                  />
                </div>
              </div>
              <p className="mt-3 font-sans text-[10px] tracking-widest text-outline uppercase">
                {photoNumberLabel(photo.id)}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
