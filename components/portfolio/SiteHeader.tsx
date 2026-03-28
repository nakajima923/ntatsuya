"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const nav = [
  { href: "/gallery", label: "ギャラリー" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "お問い合わせ" },
] as const;

function MenuIcon() {
  return (
    <svg
      width="18"
      height="18"
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

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="relative z-40 border-b border-outline-variant/20 bg-white/65 backdrop-blur-md">
      <div className="relative">
        <div className="flex h-12 w-full items-center justify-between px-4 md:h-14 md:px-6">
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="text-on-surface transition-opacity hover:opacity-60 md:hidden"
              aria-expanded={open}
              aria-controls="mobile-nav"
              onClick={() => setOpen((v) => !v)}
            >
              <span className="sr-only">メニュー</span>
              <MenuIcon />
            </button>
            <Link
              href="/"
              className="font-serif text-base tracking-[0.18em] text-zinc-900 uppercase md:text-lg"
            >
              Gallery
            </Link>
          </div>

          <nav
            className="hidden items-center gap-7 md:flex"
            aria-label="主要ナビ"
          >
            {nav.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`font-serif text-xs italic tracking-tight transition-opacity hover:opacity-60 ${
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

        {open ? (
          <div
            id="mobile-nav"
            className="border-t border-outline-variant/20 bg-white/80 px-4 py-3 backdrop-blur-md md:hidden"
          >
            <nav className="flex flex-col gap-0.5" aria-label="モバイルナビ">
              <Link
                href="/"
                className="font-serif py-2.5 text-xs italic text-zinc-900"
                onClick={() => setOpen(false)}
              >
                ホーム
              </Link>
              {nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="font-serif py-2.5 text-xs italic text-zinc-600"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        ) : null}
      </div>
    </header>
  );
}
