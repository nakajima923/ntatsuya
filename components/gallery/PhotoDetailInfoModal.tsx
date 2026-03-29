"use client";

import { createPortal } from "react-dom";
import { useCallback, useEffect, useState, type ReactNode } from "react";

type Props = {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
};

const ENTER_MS = 320;
const EXIT_MS = 280;

export function PhotoDetailInfoModal({ open, onClose, children }: Props) {
  const [mounted, setMounted] = useState(false);
  const [renderOpen, setRenderOpen] = useState(false);
  const [animateIn, setAnimateIn] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  useEffect(() => {
    if (!open) {
      const raf = requestAnimationFrame(() => setAnimateIn(false));
      const t = window.setTimeout(() => setRenderOpen(false), EXIT_MS);
      return () => {
        cancelAnimationFrame(raf);
        window.clearTimeout(t);
      };
    }
    let cancelled = false;
    const rafOpen = requestAnimationFrame(() => {
      if (cancelled) return;
      setRenderOpen(true);
      requestAnimationFrame(() => {
        if (!cancelled) setAnimateIn(true);
      });
    });
    return () => {
      cancelled = true;
      cancelAnimationFrame(rafOpen);
    };
  }, [open]);

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose],
  );

  useEffect(() => {
    if (!renderOpen) return;
    window.addEventListener("keydown", onKeyDown);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prev;
    };
  }, [renderOpen, onKeyDown]);

  if (!mounted || !renderOpen) return null;

  const backdropClass = animateIn
    ? "bg-zinc-900/45 opacity-100"
    : "bg-zinc-900/45 opacity-0";
  const panelClass = animateIn
    ? "translate-y-0 scale-100 opacity-100"
    : "translate-y-6 scale-[0.98] opacity-0";

  return createPortal(
    <div
      className="fixed inset-0 z-[120] flex items-center justify-center p-5 md:p-8"
      role="dialog"
      aria-modal="true"
      aria-labelledby="photo-detail-info-title"
      style={{ transitionDuration: `${animateIn ? ENTER_MS : EXIT_MS}ms` }}
    >
      <button
        type="button"
        className={`absolute inset-0 border-0 p-0 backdrop-blur-[2px] transition-[opacity,backdrop-filter] ease-out motion-reduce:transition-none ${backdropClass}`}
        style={{ transitionDuration: `${animateIn ? ENTER_MS : EXIT_MS}ms` }}
        aria-label="オーバーレイを閉じる"
        onClick={onClose}
      />
      <div
        className={`relative z-[130] flex max-h-[min(85dvh,720px)] w-full max-w-lg flex-col overflow-hidden rounded-2xl border border-white/25 bg-white/92 shadow-[0_24px_80px_rgba(15,23,42,0.18)] backdrop-blur-xl transition-[opacity,transform] ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none ${panelClass}`}
        style={{ transitionDuration: `${animateIn ? ENTER_MS : EXIT_MS}ms` }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex shrink-0 items-center justify-between gap-3 border-b border-outline-variant/15 px-5 py-3 md:px-6 md:py-3.5">
          <h2
            id="photo-detail-info-title"
            className="font-sans text-[10px] font-medium tracking-[0.22em] text-on-surface-variant uppercase"
          >
            作品情報
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-outline-variant/20 bg-white/60 text-sm leading-none text-zinc-400 transition-colors hover:border-outline-variant/35 hover:bg-white hover:text-zinc-700"
            aria-label="閉じる"
          >
            ×
          </button>
        </div>
        <div className="min-h-0 overflow-y-auto overscroll-contain px-5 py-5 md:px-6 md:py-6">
          {children}
        </div>
      </div>
    </div>,
    document.body,
  );
}
