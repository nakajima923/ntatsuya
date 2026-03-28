"use client";

import { useCallback, useEffect, useState } from "react";

const SHOW_AFTER_PX = 400;

function ChevronUpIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="18"
      height="18"
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
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > SHOW_AFTER_PX);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const goTop = useCallback(() => {
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({
      top: 0,
      behavior: prefersReduced ? "auto" : "smooth",
    });
  }, []);

  if (!visible) return null;

  return (
    <button
      type="button"
      onClick={goTop}
      className="fixed bottom-5 right-4 z-40 flex h-11 w-11 items-center justify-center rounded-full border border-outline-variant/25 bg-white/70 text-zinc-800 shadow-sm backdrop-blur-md transition-colors hover:border-outline-variant/40 hover:bg-white/85 md:bottom-6 md:right-6"
      aria-label="ページ上部へ戻る"
    >
      <ChevronUpIcon />
    </button>
  );
}
