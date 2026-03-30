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
          ? "block w-full flex-1 pt-0"
          : "block w-full flex-1 lg:pt-[4.5rem]"
      }
    >
      {!isHome ? <SiteBreadcrumbs /> : null}
      {children}
    </main>
  );
}
