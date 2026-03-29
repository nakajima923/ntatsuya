"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef } from "react";

type Props = {
  src: string;
  alt: string;
  width: number;
  height: number;
  badgeNo: string;
  indexOfLabel: string | null;
  prevId: string | null;
  nextId: string | null;
  onInfoClick: () => void;
  /** 情報モーダル表示中は矢印キーでの作品切り替えを無効化 */
  navigationDisabled?: boolean;
};

const SWIPE_MIN_PX = 56;

function ChevronLeft({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M15 18l-6-6 6-6" />
    </svg>
  );
}

function ChevronRight({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M9 18l6-6-6-6" />
    </svg>
  );
}

function InfoIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 15.5v-4.5M12 8.5h.01" />
    </svg>
  );
}

export function PhotoDetailHero({
  src,
  alt,
  width,
  height,
  badgeNo,
  indexOfLabel,
  prevId,
  nextId,
  onInfoClick,
  navigationDisabled = false,
}: Props) {
  const router = useRouter();
  const touchStart = useRef<{ x: number; y: number } | null>(null);

  const goPrev = useCallback(() => {
    if (prevId) router.push(`/gallery/${prevId}`);
  }, [prevId, router]);

  const goNext = useCallback(() => {
    if (nextId) router.push(`/gallery/${nextId}`);
  }, [nextId, router]);

  useEffect(() => {
    if (navigationDisabled) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [goPrev, goNext, navigationDisabled]);

  const onTouchStart = (e: React.TouchEvent) => {
    const t = e.touches[0];
    touchStart.current = { x: t.clientX, y: t.clientY };
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    const start = touchStart.current;
    touchStart.current = null;
    if (!start) return;
    const t = e.changedTouches[0];
    const dx = t.clientX - start.x;
    const dy = t.clientY - start.y;
    if (Math.abs(dx) < Math.abs(dy)) return;
    if (Math.abs(dx) < SWIPE_MIN_PX) return;
    if (dx > 0) goPrev();
    else goNext();
  };

  const navIconClass =
    "text-zinc-400 transition-colors hover:text-zinc-600 active:text-zinc-700";

  const sideLinkClass = `hidden shrink-0 items-center justify-center rounded-lg p-2 md:flex ${navIconClass} lg:p-3 lg:text-zinc-600 lg:hover:bg-zinc-500/[0.12] lg:hover:text-zinc-900`;

  const sideChevronClass =
    "h-5 w-5 shrink-0 opacity-55 md:opacity-50 lg:h-9 lg:w-9 lg:opacity-95 lg:hover:opacity-100 lg:[stroke-width:2.25]";

  return (
    <section className="mx-auto flex min-h-[100dvh] w-full max-w-6xl flex-col px-5 pt-2.5 pb-3 md:max-w-7xl md:px-8 md:pt-5 md:pb-4 lg:min-h-[calc(100dvh-4.5rem)] lg:max-w-[min(92vw,1440px)]">
      <div className="flex min-h-0 flex-1 flex-col justify-start max-lg:pt-[min(6dvh,2rem)] lg:justify-center lg:pt-0">
        <div className="flex w-full flex-col items-stretch md:flex-row md:items-center md:gap-3 lg:gap-5">
          {prevId ? (
            <Link
              href={`/gallery/${prevId}`}
              className={sideLinkClass}
              aria-label="Previous photo"
            >
              <ChevronLeft className={sideChevronClass} />
            </Link>
          ) : (
            <span className="hidden w-10 shrink-0 md:block lg:w-14" aria-hidden />
          )}

          <div className="flex min-w-0 flex-1 flex-col md:min-h-0">
            {/* 幅は写真に合わせて、No. を直上・i は右上に寄せる */}
            <div className="mx-auto flex w-fit max-w-full flex-col">
              <div className="mb-1.5 flex w-full min-w-0 items-end justify-between gap-2 md:mb-2">
                <p className="min-w-0 font-sans text-[10px] font-medium tracking-[0.22em] text-on-surface-variant uppercase">
                  No. {badgeNo}
                  {indexOfLabel ? (
                    <span className="ml-2 font-normal tracking-normal text-on-surface-variant/80 normal-case">
                      · {indexOfLabel}
                    </span>
                  ) : null}
                </p>
                <button
                  type="button"
                  onClick={onInfoClick}
                  className="-mr-0.5 -mt-0.5 shrink-0 rounded-lg p-1 text-zinc-400/50 transition-[color,opacity,background-color] hover:text-zinc-500/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary/40 active:opacity-80 lg:-mr-1 lg:-mt-1 lg:p-2.5 lg:text-zinc-600 lg:hover:bg-zinc-500/[0.12] lg:hover:text-zinc-900"
                  aria-label="作品情報を表示"
                >
                  <InfoIcon className="h-3.5 w-3.5 opacity-90 lg:h-6 lg:w-6 lg:opacity-100 lg:[stroke-width:2]" />
                </button>
              </div>
              <div
                className="flex justify-center"
                onTouchStart={onTouchStart}
                onTouchEnd={onTouchEnd}
              >
                <Image
                  src={src}
                  alt={alt}
                  width={width}
                  height={height}
                  className="h-auto max-h-[min(62dvh,880px)] w-auto max-w-full object-contain select-none md:max-h-[min(76dvh,1020px)] lg:max-h-[min(80dvh,1120px)]"
                  sizes="(max-width:768px)100vw,min(1440px,92vw)"
                  priority
                  draggable={false}
                  unoptimized
                />
              </div>
            </div>

            {(prevId || nextId) && (
              <div className="mt-3 flex items-center justify-between md:hidden">
                {prevId ? (
                  <Link
                    href={`/gallery/${prevId}`}
                    className={`p-2 ${navIconClass}`}
                    aria-label="Previous photo"
                  >
                    <ChevronLeft className="h-5 w-5 opacity-70" />
                  </Link>
                ) : (
                  <span className="w-9" aria-hidden />
                )}
                {nextId ? (
                  <Link
                    href={`/gallery/${nextId}`}
                    className={`p-2 ${navIconClass}`}
                    aria-label="Next photo"
                  >
                    <ChevronRight className="h-5 w-5 opacity-70" />
                  </Link>
                ) : (
                  <span className="w-9" aria-hidden />
                )}
              </div>
            )}
          </div>

          {nextId ? (
            <Link
              href={`/gallery/${nextId}`}
              className={sideLinkClass}
              aria-label="Next photo"
            >
              <ChevronRight className={sideChevronClass} />
            </Link>
          ) : (
            <span className="hidden w-10 shrink-0 md:block lg:w-14" aria-hidden />
          )}
        </div>
      </div>
    </section>
  );
}
