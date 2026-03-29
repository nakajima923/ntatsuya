import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PhotoDetailExperience } from "@/components/gallery/PhotoDetailExperience";
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
    <PhotoDetailExperience
      hero={{
        src: assetUrl(photo.src),
        alt: photo.alt,
        width: photo.width,
        height: photo.height,
        badgeNo: badge.no,
        indexOfLabel: badge.indexOf || null,
        prevId: prev?.id ?? null,
        nextId: next?.id ?? null,
      }}
    >
      <dl className="space-y-4">
        {photo.location ? (
          <div>
            <dt className="mb-1.5 font-sans text-[9px] tracking-widest text-outline uppercase">
              Place
            </dt>
            <dd className="font-sans text-sm text-on-surface">{photo.location}</dd>
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
    </PhotoDetailExperience>
  );
}
