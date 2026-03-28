"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { createPortal } from "react-dom";
import { useCallback, useEffect, useRef, useState } from "react";

import { site } from "@/lib/content";

const nav = [
  { href: "/gallery", label: "Gallery" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

function MenuIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden
    >
      <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="square" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden
    >
      <path d="M6 6l12 12M18 6L6 18" strokeLinecap="square" />
    </svg>
  );
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  /** 下スクロールで false、上スクロールで true（先頭付近は常に true） */
  const [headerShown, setHeaderShown] = useState(true);
  const pathname = usePathname();
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const lastScrollY = useRef(0);

  const closeMobileMenu = useCallback(() => {
    setOpen(false);
    setHeaderShown(true);
  }, []);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (open) return;
    lastScrollY.current = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      const prev = lastScrollY.current;
      lastScrollY.current = y;

      if (y < 56) {
        setHeaderShown(true);
        return;
      }
      if (y > prev) setHeaderShown(false);
      else if (y < prev) setHeaderShown(true);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMobileMenu();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, closeMobileMenu]);

  useEffect(() => {
    if (open) closeBtnRef.current?.focus();
  }, [open]);

  const revealHeader = open || headerShown;

  const drawer =
    mounted && open ? (
      <>
        <button
          type="button"
          className="mobile-drawer-backdrop fixed inset-0 z-[100] border-0 bg-black/45 p-0 backdrop-blur-[2px] md:hidden"
          aria-label="メニューを閉じる"
          onClick={closeMobileMenu}
        />
        <div
          id="mobile-nav"
          role="dialog"
          aria-modal="true"
          aria-label="サイトメニュー"
          className="mobile-drawer-panel fixed inset-y-0 left-0 z-[110] flex w-full max-w-full flex-col border-r border-outline-variant/20 bg-white/88 shadow-[12px_0_40px_rgba(45,52,53,0.1)] backdrop-blur-xl md:hidden"
        >
          <div className="flex h-[4.25rem] shrink-0 items-center justify-between border-b border-outline-variant/15 px-6">
            <span className="font-serif text-base italic tracking-wide text-zinc-500">
              Menu
            </span>
            <button
              ref={closeBtnRef}
              type="button"
              className="flex h-11 w-11 items-center justify-center rounded-md text-zinc-800 transition-colors hover:bg-zinc-100"
              onClick={closeMobileMenu}
              aria-label="閉じる"
            >
              <CloseIcon />
            </button>
          </div>
          <nav
            className="flex flex-1 flex-col gap-1 overflow-y-auto px-6 py-10"
            aria-label="モバイルナビ"
          >
            <Link
              href="/"
              className="font-serif border-b border-outline-variant/10 py-4 text-lg italic text-zinc-900 transition-colors hover:text-primary"
              onClick={closeMobileMenu}
            >
              Home
            </Link>
            {nav.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`font-serif border-b border-outline-variant/10 py-4 text-lg italic transition-colors hover:text-primary ${
                    active ? "font-medium text-zinc-900" : "text-zinc-600"
                  }`}
                  onClick={closeMobileMenu}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </>
    ) : null;

  return (
    <>
      <header
        className={`site-header-motion site-header-glass fixed top-0 right-0 left-0 z-50 border-b border-outline-variant/30 transition-transform duration-300 ease-out ${
          revealHeader ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="flex h-16 w-full items-center justify-between px-5 md:h-[4.5rem] md:px-8">
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="-ml-1 flex h-11 w-11 items-center justify-center rounded-md text-on-surface transition-colors hover:bg-zinc-500/10 md:hidden"
              aria-expanded={open}
              aria-controls="mobile-nav"
              onClick={() => setOpen((v) => !v)}
            >
              <span className="sr-only">メニューを開く</span>
              <MenuIcon />
            </button>
            <Link
              href="/"
              className="font-serif text-xl tracking-[0.14em] text-zinc-900 uppercase md:text-2xl"
            >
              {site.name}
            </Link>
          </div>

          <nav
            className="hidden items-center gap-10 md:flex"
            aria-label="主要ナビ"
          >
            {nav.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`font-serif text-base italic tracking-tight transition-opacity hover:opacity-60 ${
                    active ? "font-medium text-zinc-900" : "text-zinc-500"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="w-5 md:hidden" aria-hidden />
        </div>
      </header>
      {mounted && drawer ? createPortal(drawer, document.body) : null}
    </>
  );
}
