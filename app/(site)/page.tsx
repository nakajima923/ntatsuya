import Link from "next/link";

import { HomeEditorialGrid } from "@/components/home/HomeEditorialGrid";

export default function HomePage() {
  return (
    <div id="top">
      <div className="mx-auto max-w-[1600px] px-5 pb-16 pt-8 md:px-6 md:pt-10">
        <HomeEditorialGrid />

        <div className="mt-28 flex justify-center md:mt-32">
          <Link
            href="/gallery"
            className="border border-outline-variant/25 bg-white/60 px-10 py-3 font-sans text-[9px] tracking-[0.28em] text-on-surface uppercase backdrop-blur-sm transition-colors hover:border-on-surface/25 hover:bg-on-surface/90 hover:text-surface"
          >
            View all works
          </Link>
        </div>
      </div>
    </div>
  );
}
