"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { createPortal } from "react-dom";
import { useCallback, useEffect, useRef, useState } from "react";

const nav = [
  { href: "/gallery", label: "Gallery" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

const desktopNavLinks = [
  { href: "/", label: "Home" },
  ...nav,
] as const;

function MenuIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
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
  const [headerShown, setHeaderShown] = useState(true);
  const [fabShown, setFabShown] = useState(true);
  const pathname = usePathname();
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const lastScrollY = useRef(0);
  const fabLastScrollY = useRef(0);

  const isHome = pathname === "/";
  const revealHeader = isHome ? true : open || headerShown;

  const closeMobileMenu = useCallback(() => {
    setOpen(false);
    setHeaderShown(true);
    setFabShown(true);
  }, []);

  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  useEffect(() => {
    fabLastScrollY.current =
      typeof window !== "undefined" ? window.scrollY : 0;
    const id = requestAnimationFrame(() => setFabShown(true));
    return () => cancelAnimationFrame(id);
  }, [pathname]);

  useEffect(() => {
    if (isHome) return;
    const mq = window.matchMedia("(min-width: 1024px)");
    lastScrollY.current = window.scrollY;
    fabLastScrollY.current = window.scrollY;

    const onScroll = () => {
      if (open) return;
      const y = window.scrollY;
      if (mq.matches) {
        const prev = lastScrollY.current;
        lastScrollY.current = y;
        if (y < 56) {
          setHeaderShown(true);
          return;
        }
        if (y > prev) setHeaderShown(false);
        else if (y < prev) setHeaderShown(true);
      } else {
        const prev = fabLastScrollY.current;
        fabLastScrollY.current = y;
        if (y < 36) {
          setFabShown(true);
          return;
        }
        if (y > prev) setFabShown(false);
        else if (y < prev) setFabShown(true);
      }
    };

    const onMq = () => {
      setHeaderShown(true);
      setFabShown(true);
      lastScrollY.current = window.scrollY;
      fabLastScrollY.current = window.scrollY;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    mq.addEventListener("change", onMq);
    let innerRaf = 0;
    const outerRaf = requestAnimationFrame(() => {
      innerRaf = requestAnimationFrame(onScroll);
    });
    return () => {
      cancelAnimationFrame(outerRaf);
      cancelAnimationFrame(innerRaf);
      window.removeEventListener("scroll", onScroll);
      mq.removeEventListener("change", onMq);
    };
  }, [open, isHome]);

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

  const drawerMobileOnly = !isHome;

  const drawer =
    mounted && open ? (
      <>
        <button
          type="button"
          className={`mobile-drawer-backdrop fixed inset-0 z-[100] border-0 bg-black/45 p-0 backdrop-blur-[2px] ${drawerMobileOnly ? "lg:hidden" : ""}`}
          aria-label="メニューを閉じる"
          onClick={closeMobileMenu}
        />
        <div
          id="mobile-nav"
          role="dialog"
          aria-modal="true"
          aria-label="サイトメニュー"
          className={`mobile-drawer-panel fixed inset-y-0 left-0 z-[110] flex w-full max-w-full flex-col border-r border-outline-variant/20 bg-white/88 shadow-[12px_0_40px_rgba(45,52,53,0.1)] backdrop-blur-xl md:max-w-md ${drawerMobileOnly ? "lg:hidden" : ""}`}
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
            aria-label="サイトメニュー"
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

  const menuIconClassHome =
    "h-[22px] w-[22px] shrink-0 md:h-7 md:w-7";
  const menuIconClassSub =
    "h-[18px] w-[18px] shrink-0 md:h-5 md:w-5";

  const menuButton = (
    <button
      type="button"
      className={
        isHome
          ? "flex h-11 w-11 items-center justify-center text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.65)] transition-opacity hover:opacity-80 md:h-14 md:w-14"
          : "flex h-10 w-10 items-center justify-center text-zinc-900 transition-opacity hover:opacity-80 md:h-11 md:w-11 lg:hidden"
      }
      aria-expanded={open}
      aria-controls="mobile-nav"
      onClick={() => setOpen((v) => !v)}
    >
      <span className="sr-only">メニューを開く</span>
      <MenuIcon
        className={isHome ? menuIconClassHome : menuIconClassSub}
      />
    </button>
  );

  return (
    <>
      {isHome ? (
        <header className="pointer-events-none fixed top-0 left-0 z-50 p-4 md:p-6">
          <div className="pointer-events-auto">{menuButton}</div>
        </header>
      ) : (
        <>
          <header
            className={`site-header-motion pointer-events-none fixed top-0 left-0 z-50 p-2.5 md:p-3 lg:hidden ${
              open || fabShown ? "translate-y-0" : "-translate-y-[calc(100%+0.35rem)]"
            } transition-transform duration-300 ease-out`}
          >
            <div className="pointer-events-auto rounded-full bg-white/92 p-px shadow-[0_2px_12px_rgba(15,23,42,0.1)] ring-1 ring-zinc-900/[0.07] backdrop-blur-md md:p-0.5">
              {menuButton}
            </div>
          </header>
          <header
            className={`site-header-motion site-header-glass fixed top-0 right-0 left-0 z-50 hidden border-b border-outline-variant/30 shadow-[0_6px_20px_-8px_rgba(45,52,53,0.12)] transition-transform duration-300 ease-out lg:block ${
              revealHeader ? "translate-y-0" : "-translate-y-full"
            }`}
          >
            <div className="flex h-16 w-full items-center justify-end px-5 md:h-[4.5rem] md:px-8">
              <nav
                className="flex items-center gap-8 xl:gap-10"
                aria-label="主要ナビ"
              >
                {desktopNavLinks.map((item) => {
                  const active =
                    item.href === "/"
                      ? pathname === "/"
                      : pathname === item.href;
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
            </div>
          </header>
        </>
      )}

      {mounted && drawer ? createPortal(drawer, document.body) : null}
    </>
  );
}
