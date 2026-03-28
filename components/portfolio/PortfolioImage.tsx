import Image from "next/image";

import { assetUrl } from "@/lib/assetUrls";

type Aspect = "video" | "square" | "3/2" | "4/5" | "16/10" | "3/4";

type PortfolioImageProps = {
  src: string;
  alt: string;
  aspect?: Aspect;
  className?: string;
  priority?: boolean;
};

const aspectClass: Record<Aspect, string> = {
  video: "aspect-video",
  square: "aspect-square",
  "3/2": "aspect-[3/2]",
  "4/5": "aspect-[4/5]",
  "16/10": "aspect-[16/10]",
  "3/4": "aspect-[3/4]",
};

/** モック準拠: 角丸なし・surface-container プレースホルダ */
export function PortfolioImage({
  src,
  alt,
  aspect = "3/2",
  className = "",
  priority = false,
}: PortfolioImageProps) {
  const url = assetUrl(src);

  return (
    <div
      className={`relative w-full overflow-hidden bg-surface-container ${aspectClass[aspect]} ${className}`}
    >
      <Image
        src={url}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
        className="object-cover"
        unoptimized
        priority={priority}
      />
    </div>
  );
}
