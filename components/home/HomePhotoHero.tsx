"use client";

import Image from "next/image";
import Link from "next/link";

import { photos } from "@/lib/photos";
import { assetUrl } from "@/lib/assetUrls";

function ChevronDownIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

export function HomePhotoHero() {
  const scrollToWorks = () => {
    document.getElementById("home-works")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <section
      className="relative flex w-full flex-col"
      aria-label="作品モザイク"
    >
      <div className="grid h-[calc(100dvh-4rem)] w-full grid-cols-2 grid-rows-3 gap-0.5 bg-zinc-900/90 md:h-[calc(100dvh-4.5rem)] md:grid-cols-3 md:grid-rows-2 md:gap-1">
        {photos.map((photo) => (
          <Link
            key={photo.id}
            href={`/gallery/${photo.id}`}
            className="group relative min-h-0 overflow-hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            <Image
              src={assetUrl(photo.src)}
              alt={photo.alt}
              fill
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              sizes="(max-width:768px)50vw,33vw"
              priority
              unoptimized
            />
            <span className="sr-only">作品の詳細へ</span>
          </Link>
        ))}
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 flex flex-col items-center justify-end bg-gradient-to-t from-black/55 via-black/20 to-transparent pb-6 pt-24 md:pb-10 md:pt-32">
        <button
          type="button"
          onClick={scrollToWorks}
          className="pointer-events-auto flex flex-col items-center gap-2 rounded-full px-6 py-2 font-sans text-[10px] tracking-[0.35em] text-white/95 uppercase transition-opacity hover:opacity-80"
        >
          <span>Scroll</span>
          <ChevronDownIcon className="animate-bounce text-white/90 motion-reduce:animate-none" />
        </button>
      </div>
    </section>
  );
}
