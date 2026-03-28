import Link from "next/link";

import { HomePhotoHero } from "@/components/home/HomePhotoHero";
import { HomeWorksGrid } from "@/components/home/HomeWorksGrid";

export default function HomePage() {
  return (
    <div id="top" className="w-full">
      <HomePhotoHero />

      <HomeWorksGrid />

      <div className="flex justify-center px-6 pb-24 md:pb-28">
        <Link
          href="/gallery"
          className="border border-outline-variant/25 bg-white/60 px-14 py-4 font-sans text-[10px] tracking-[0.32em] text-on-surface uppercase backdrop-blur-sm transition-colors hover:border-on-surface/25 hover:bg-on-surface/90 hover:text-surface"
        >
          View gallery
        </Link>
      </div>
    </div>
  );
}
