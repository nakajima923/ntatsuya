import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import {
  photos,
  getPhotoById,
  getPhotoIndex,
  photoNumberLabel,
  photoWorkBadge,
} from "@/lib/photos";
import { assetUrl } from "@/lib/assetUrls";

type Props = { params: Promise<{ id: string }> };

export function generateStaticParams() {
  return photos.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const photo = getPhotoById(id);
  if (!photo) return { title: "Not found" };
  const n = photoNumberLabel(id);
  return {
    title: `Work ${n}`,
    description: photo.notes ?? photo.alt,
  };
}

export default async function PhotoDetailPage({ params }: Props) {
  const { id } = await params;
  const photo = getPhotoById(id);
  if (!photo) notFound();

  const idx = getPhotoIndex(id);
  const prev = idx > 0 ? photos[idx - 1] : null;
  const next = idx < photos.length - 1 ? photos[idx + 1] : null;
  const badge = photoWorkBadge(photo.id);

  const gearLine = [photo.camera, photo.lens].filter(Boolean).join(" · ");

  return (
    <div className="pt-4 md:pt-6">
      <section className="relative flex min-h-[min(560px,78dvh)] flex-col items-center justify-center px-4 py-8 md:px-8 md:py-10">
        <div className="mx-auto h-full w-full max-w-6xl overflow-hidden rounded-md border border-outline-variant/25 bg-white/40 shadow-sm backdrop-blur-sm group">
          <div className="relative mx-auto h-[min(480px,52vh)] w-full max-w-6xl overflow-hidden rounded-md md:h-[min(520px,56vh)]">
            <Image
              src={assetUrl(photo.src)}
              alt={photo.alt}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="100vw"
              priority
              unoptimized
            />
          </div>
        </div>
        <div className="absolute bottom-8 right-4 border border-outline-variant/25 bg-white/70 px-3.5 py-2.5 shadow-sm backdrop-blur-md md:bottom-10 md:right-8 lg:right-16">
          <p className="font-sans text-[9px] font-medium tracking-widest text-on-surface uppercase">
            No. {badge.no}
          </p>
          {badge.indexOf ? (
            <p className="mt-0.5 font-sans text-[10px] tabular-nums tracking-tight text-on-surface-variant">
              {badge.indexOf}
            </p>
          ) : null}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-12 md:px-6 md:py-14">
        <div className="mx-auto max-w-xl rounded-md border border-outline-variant/25 bg-white/55 px-6 py-7 backdrop-blur-md md:px-8 md:py-8">
          <dl className="space-y-6">
            {photo.location ? (
              <div>
                <dt className="mb-1.5 font-sans text-[9px] tracking-widest text-outline uppercase">
                  Place
                </dt>
                <dd className="font-sans text-base text-on-surface">{photo.location}</dd>
              </div>
            ) : null}
            <div>
              <dt className="mb-1.5 font-sans text-[9px] tracking-widest text-outline uppercase">
                Gear
              </dt>
              <dd className="font-sans text-sm text-on-surface">{gearLine}</dd>
            </div>
            <div>
              <dt className="mb-1.5 font-sans text-[9px] tracking-widest text-outline uppercase">
                Exposure
              </dt>
              <dd className="font-mono text-xs text-on-surface-variant">
                {photo.exposure}
              </dd>
            </div>
            {photo.notes ? (
              <div>
                <dt className="mb-1.5 font-sans text-[9px] tracking-widest text-outline uppercase">
                  Note
                </dt>
                <dd className="font-sans text-xs leading-relaxed text-on-surface-variant">
                  {photo.notes}
                </dd>
              </div>
            ) : null}
          </dl>
        </div>
      </section>

      <section className="w-full border-t border-outline-variant/15 px-5 py-12 md:px-6">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          {prev ? (
            <Link
              href={`/gallery/${prev.id}`}
              className="group flex items-center gap-3 transition-all"
            >
              <div className="flex h-9 w-9 items-center justify-center border border-outline-variant/25 bg-white/55 text-sm text-on-surface backdrop-blur-sm transition-colors group-hover:border-outline-variant/40 group-hover:bg-primary group-hover:text-on-primary">
                <span aria-hidden>←</span>
              </div>
              <div className="hidden flex-col sm:flex">
                <span className="font-sans text-[9px] tracking-widest text-outline uppercase group-hover:text-primary">
                  Previous
                </span>
                <span className="font-serif text-base italic tabular-nums">
                  {photoNumberLabel(prev.id)}
                </span>
              </div>
            </Link>
          ) : (
            <div />
          )}

          <div className="h-px w-16 bg-outline-variant/25" aria-hidden />

          {next ? (
            <Link
              href={`/gallery/${next.id}`}
              className="group flex items-center gap-3 text-right transition-all"
            >
              <div className="hidden flex-col sm:flex">
                <span className="font-sans text-[9px] tracking-widest text-outline uppercase group-hover:text-primary">
                  Next
                </span>
                <span className="font-serif text-base italic tabular-nums">
                  {photoNumberLabel(next.id)}
                </span>
              </div>
              <div className="flex h-9 w-9 items-center justify-center border border-outline-variant/25 bg-white/55 text-sm text-on-surface backdrop-blur-sm transition-colors group-hover:border-outline-variant/40 group-hover:bg-primary group-hover:text-on-primary">
                <span aria-hidden>→</span>
              </div>
            </Link>
          ) : (
            <div />
          )}
        </div>
      </section>
    </div>
  );
}
