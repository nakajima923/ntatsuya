"use client";

import { useCallback, useState, type ComponentProps, type ReactNode } from "react";

import { PhotoDetailHero } from "@/components/gallery/PhotoDetailHero";
import { PhotoDetailInfoModal } from "@/components/gallery/PhotoDetailInfoModal";

export type PhotoDetailHeroInput = Omit<
  ComponentProps<typeof PhotoDetailHero>,
  "onInfoClick" | "navigationDisabled"
>;

export function PhotoDetailExperience({
  hero,
  children,
}: {
  hero: PhotoDetailHeroInput;
  children: ReactNode;
}) {
  const [infoOpen, setInfoOpen] = useState(false);
  const closeInfo = useCallback(() => setInfoOpen(false), []);
  const openInfo = useCallback(() => setInfoOpen(true), []);

  return (
    <div>
      <PhotoDetailHero
        {...hero}
        onInfoClick={openInfo}
        navigationDisabled={infoOpen}
      />
      <PhotoDetailInfoModal open={infoOpen} onClose={closeInfo}>
        {children}
      </PhotoDetailInfoModal>
    </div>
  );
}
