"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

import { SiteBreadcrumbs } from "@/components/portfolio/SiteBreadcrumbs";

export function MainContent({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <main
      className={
        isHome
          ? "flex min-h-0 flex-1 flex-col pt-0"
          : "flex min-h-0 flex-1 flex-col lg:pt-[4.5rem]"
      }
    >
      {!isHome ? <SiteBreadcrumbs /> : null}
      {children}
    </main>
  );
}
