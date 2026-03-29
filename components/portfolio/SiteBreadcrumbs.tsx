"use client";

import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

import { getPhotoById, photoWorkBadge } from "@/lib/photos";

type Crumb = { href?: string; label: string };

function buildCrumbs(pathname: string, photoId: string | null): Crumb[] | null {
  if (pathname === "/") return null;

  const crumbs: Crumb[] = [{ href: "/", label: "Home" }];

  if (pathname === "/gallery") {
    crumbs.push({ label: "Gallery" });
    return crumbs;
  }

  if (pathname.startsWith("/gallery/") && photoId) {
    crumbs.push({ href: "/gallery", label: "Gallery" });
    const photo = getPhotoById(photoId);
    const badge = photo ? photoWorkBadge(photo.id) : null;
    const label =
      photo?.title ??
      (badge ? `No. ${badge.no}` : "Work");
    crumbs.push({ label });
    return crumbs;
  }

  if (pathname === "/about") {
    crumbs.push({ label: "About" });
    return crumbs;
  }

  if (pathname === "/contact") {
    crumbs.push({ label: "Contact" });
    return crumbs;
  }

  crumbs.push({ label: "Page" });
  return crumbs;
}

export function SiteBreadcrumbs() {
  const pathname = usePathname();
  const params = useParams();
  const photoId =
    typeof params.id === "string" ? params.id : null;

  const crumbs = buildCrumbs(pathname, photoId);
  if (!crumbs?.length) return null;

  const isPhotoDetail =
    Boolean(photoId) && pathname.startsWith("/gallery/");
  const needsFabClearance =
    pathname === "/gallery" ||
    pathname === "/about" ||
    pathname === "/contact" ||
    isPhotoDetail;

  /** 固定メニューFABの下にパンくずが入るよう max-lg のみ上余白 */
  const fabTopPad = needsFabClearance
    ? "max-lg:pt-[calc(3.75rem+env(safe-area-inset-top,0px))]"
    : "max-lg:pt-[calc(2.75rem+env(safe-area-inset-top,0px))]";

  return (
    <nav
      aria-label="パンくずリスト"
      className={`shrink-0 border-b border-outline-variant/15 bg-surface/90 backdrop-blur-[6px] pb-2.5 lg:pt-[max(0.35rem,env(safe-area-inset-top,0px))] ${fabTopPad}`}
    >
      <div className="mx-auto flex w-full max-w-[1920px] justify-end px-5 md:px-8 lg:justify-start lg:px-10 xl:px-12">
        <ol className="flex min-w-0 max-w-full flex-wrap items-center justify-end gap-x-1.5 gap-y-1 font-sans text-[10px] tracking-[0.18em] text-on-surface-variant uppercase lg:justify-start">
          {crumbs.map((c, i) => {
            const last = i === crumbs.length - 1;
            return (
              <li key={`${c.label}-${i}`} className="flex min-w-0 items-center gap-x-1.5">
                {i > 0 ? (
                  <span className="text-on-surface-variant/40" aria-hidden>
                    /
                  </span>
                ) : null}
                {last || !c.href ? (
                  <span
                    className="truncate text-on-surface"
                    aria-current={last ? "page" : undefined}
                  >
                    {c.label}
                  </span>
                ) : (
                  <Link
                    href={c.href}
                    className="truncate text-on-surface-variant transition-colors hover:text-primary"
                  >
                    {c.label}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
}
