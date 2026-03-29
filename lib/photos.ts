import type { Photo } from "@/types/photo";

/**
 * 写真メタデータ。R2 ではキー例: `media/photos/1.jpg` … `6.jpg`。
 */
export const photos: readonly Photo[] = [
  {
    id: "sample-01",
    title: "Coast",
    src: "/media/photos/1.jpg",
    width: 1800,
    height: 1200,
    alt: "Sunrise on the coast",
    captionItalic: "Switzerland",
    camera: "Sony α7 IV",
    lens: "24-70mm",
    exposure: "f/8 · 1/250s · ISO 100",
    location: "Swiss Alps",
  },
  {
    id: "sample-02",
    title: "Alley",
    src: "/media/photos/2.jpg",
    width: 1200,
    height: 1800,
    alt: "A street lamp in an alley",
    captionItalic: "Tokyo",
    camera: "Sony α7 IV",
    lens: "35mm",
    exposure: "f/1.4 · 1/125s · ISO 800",
    location: "Tokyo",
  },
  {
    id: "sample-03",
    title: "Window",
    src: "/media/photos/3.jpg",
    width: 1600,
    height: 1200,
    alt: "Still life by a window",
    camera: "Sony α7 IV",
    lens: "50mm",
    exposure: "f/2 · 1/60s · ISO 400",
    location: "Home",
  },
  {
    id: "sample-04",
    title: "Ridge",
    src: "/media/photos/4.jpg",
    width: 1200,
    height: 1500,
    alt: "Mountain ridge in mist",
    captionItalic: "Nagano",
    camera: "Sony α7 IV",
    lens: "70-200mm",
    exposure: "f/5.6 · 1/500s · ISO 200",
    location: "Northern Alps",
  },
  {
    id: "sample-05",
    title: "Station",
    src: "/media/photos/5.jpg",
    width: 1920,
    height: 1080,
    alt: "Crowd blur at night",
    captionItalic: "Tokyo",
    camera: "Sony α7 IV",
    lens: "24mm",
    exposure: "f/5.6 · 2s · ISO 100",
    location: "Tokyo",
  },
  {
    id: "sample-06",
    title: "Flower",
    src: "/media/photos/6.jpg",
    width: 1080,
    height: 1350,
    alt: "Close-up of a flower",
    camera: "Sony α7 IV",
    lens: "90mm macro",
    exposure: "f/4 · 1/320s · ISO 320",
    location: "Local garden",
  },
];

export const photoTotal = photos.length;

export function getPhotoById(id: string): Photo | undefined {
  return photos.find((p) => p.id === id);
}

export function getPhotoIndex(id: string): number {
  return photos.findIndex((p) => p.id === id);
}

/** 表示用の通し番号（001 形式） */
export function photoNumberLabel(photoId: string): string {
  const i = getPhotoIndex(photoId);
  if (i < 0) return "000";
  return String(i + 1).padStart(3, "0");
}

/**
 * オーバーレイ用。「series」は連作名ではなくテンプレの名残だったので、
 * 「何枚目か」が分かる英語表記にする。
 */
export function photoWorkBadge(photoId: string): { no: string; indexOf: string } {
  const i = getPhotoIndex(photoId);
  const no = photoNumberLabel(photoId);
  if (i < 0) return { no, indexOf: "" };
  return { no, indexOf: `${i + 1} of ${photoTotal}` };
}
