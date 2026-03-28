import Image from "next/image";
import Link from "next/link";

import { homeEditorialBlocks } from "@/lib/homeEditorial";
import type { ImageLayout } from "@/lib/homeEditorial";
import { photos, photoNumberLabel } from "@/lib/photos";
import { assetUrl } from "@/lib/assetUrls";
import type { Photo } from "@/types/photo";

function CameraGlyph({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M9 4L7.17 6H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-3.17L15 4H9zm3 15c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-2c1.65 0 3-1.35 3-3s-1.35-3-3-3-3 1.35-3 3 1.35 3 3 3z" />
    </svg>
  );
}

function BlockFooter({
  photo,
  variant,
  indexLabel,
}: {
  photo: Photo;
  variant: "split" | "simple" | "splitIcon";
  indexLabel: string;
}) {
  const italic = photo.captionItalic;

  if (variant === "simple") {
    return (
      <div className="mt-4">
        <p className="font-sans text-[9px] tracking-widest text-outline uppercase">
          {indexLabel}
        </p>
      </div>
    );
  }

  if (variant === "split") {
    return (
      <div className="mt-4 flex items-baseline justify-between gap-4">
        <p className="font-sans text-[9px] tracking-widest text-outline uppercase">
          {indexLabel}
        </p>
        {italic ? (
          <p className="font-serif text-xs italic text-on-surface-variant">
            {italic}
          </p>
        ) : null}
      </div>
    );
  }

  return (
    <div className="mt-4 flex items-center justify-between">
      <p className="font-sans text-[9px] tracking-widest text-outline uppercase">
        {indexLabel}
      </p>
      <CameraGlyph className="text-outline" />
    </div>
  );
}

function EditorialImage({
  layout,
  url,
  alt,
}: {
  layout: ImageLayout;
  url: string;
  alt: string;
}) {
  const zoom =
    "transition-transform duration-700 ease-out group-hover:scale-105";

  if (layout === "natural") {
    return (
      <Image
        src={url}
        alt={alt}
        width={1600}
        height={1067}
        className={`h-auto w-full ${zoom}`}
        unoptimized
      />
    );
  }

  if (layout === "hero530") {
    return (
      <div className="relative h-[min(420px,52vh)] w-full md:h-[min(460px,55vh)]">
        <Image
          src={url}
          alt={alt}
          fill
          className={`object-cover ${zoom}`}
          sizes="100vw"
          unoptimized
        />
      </div>
    );
  }

  const aspect =
    layout === "4/5"
      ? "aspect-[4/5]"
      : layout === "square"
        ? "aspect-square"
        : layout === "16/10"
          ? "aspect-[16/10]"
          : "aspect-[3/4]";

  return (
    <div className={`relative w-full ${aspect}`}>
      <Image
        src={url}
        alt={alt}
        fill
        className={`object-cover ${zoom}`}
        sizes="(max-width:768px)100vw,66vw"
        unoptimized
      />
    </div>
  );
}

export function HomeEditorialGrid() {
  return (
    <div className="grid grid-cols-1 items-start gap-y-16 md:grid-cols-12 md:gap-y-28">
      {homeEditorialBlocks.map((block) => {
        const photo = photos.find((p) => p.id === block.photoId);
        if (!photo) return null;
        const url = assetUrl(photo.src);
        const indexLabel = photoNumberLabel(photo.id);

        return (
          <div
            key={block.photoId}
            className={`col-span-1 group cursor-crosshair ${block.gridClass}`}
          >
            <Link href={`/gallery/${photo.id}`} className="block">
              <div className="overflow-hidden rounded-md border border-outline-variant/25 bg-white/45 backdrop-blur-sm">
                <EditorialImage layout={block.imageLayout} url={url} alt={photo.alt} />
              </div>
              <BlockFooter
                photo={photo}
                variant={block.footer}
                indexLabel={indexLabel}
              />
            </Link>
          </div>
        );
      })}
    </div>
  );
}
