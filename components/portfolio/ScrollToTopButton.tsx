"use client";

import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

const SHOW_AFTER_PX = 400;

function ChevronUpIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M18 15l-6-6-6 6" />
    </svg>
  );
}

export function ScrollToTopButton() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (isHome) return;
    const onScroll = () => {
      setVisible(window.scrollY > SHOW_AFTER_PX);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  const goTop = useCallback(() => {
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({
      top: 0,
      behavior: prefersReduced ? "auto" : "smooth",
    });
  }, []);

  if (isHome) return null;
  if (!visible) return null;

  return (
    <button
      type="button"
      onClick={goTop}
      className="fixed bottom-6 right-5 z-40 flex h-12 w-12 items-center justify-center rounded-full border border-outline-variant/25 bg-white/80 text-zinc-800 shadow-md backdrop-blur-md transition-colors hover:border-outline-variant/40 hover:bg-white/90 md:bottom-8 md:right-8"
      aria-label="ページ上部へ戻る"
    >
      <ChevronUpIcon />
    </button>
  );
}
