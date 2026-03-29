"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

const END_THRESHOLD_PX = 56;

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

export function HomeScrollDock() {
  const [atEnd, setAtEnd] = useState(false);

  const update = useCallback(() => {
    const el = document.documentElement;
    const y = window.scrollY;
    const vh = window.innerHeight;
    const sh = el.scrollHeight;
    setAtEnd(y + vh >= sh - END_THRESHOLD_PX);
  }, []);

  useEffect(() => {
    const raf = requestAnimationFrame(() => update());
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        update();
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [update]);

  const scrollOneScreen = () => {
    window.scrollBy({ top: window.innerHeight, behavior: "smooth" });
  };

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-40 flex justify-center bg-gradient-to-t from-black/55 via-black/25 to-transparent pb-7 pt-20 md:pb-9 md:pt-24">
      <div className="pointer-events-auto relative flex h-[4.5rem] w-full max-w-sm items-center justify-center px-6">
        <button
          type="button"
          onClick={scrollOneScreen}
          className={`absolute inset-x-6 flex flex-col items-center justify-center gap-2 rounded-full py-2 font-sans text-[10px] tracking-[0.35em] text-white/95 uppercase transition-[opacity,transform] duration-[400ms] ease-out motion-reduce:transition-none ${
            atEnd
              ? "pointer-events-none translate-y-1 scale-95 opacity-0"
              : "translate-y-0 scale-100 opacity-100 hover:opacity-85"
          }`}
        >
          <span>Scroll</span>
          <ChevronDownIcon className="animate-bounce text-white/90 motion-reduce:animate-none" />
        </button>

        <Link
          href="/gallery"
          className={`absolute inset-x-6 flex items-center justify-center border border-white/40 bg-white/15 px-10 py-3.5 font-sans text-[10px] tracking-[0.32em] text-white/95 uppercase backdrop-blur-[2px] transition-[opacity,transform] duration-[400ms] ease-out hover:border-white/55 hover:bg-white/25 motion-reduce:transition-none ${
            atEnd
              ? "translate-y-0 scale-100 opacity-100"
              : "pointer-events-none translate-y-2 scale-95 opacity-0"
          }`}
        >
          View gallery
        </Link>
      </div>
    </div>
  );
}
