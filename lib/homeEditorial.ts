/**
 * stitch_contact_mobile/gallery_home/code.html の 12 カラム・非対称グリッドに対応。
 */
export type ImageLayout =
  | "natural"
  | "4/5"
  | "square"
  | "hero530"
  | "16/10"
  | "3/4";

export type HomeEditorialBlock = {
  photoId: string;
  gridClass: string;
  imageLayout: ImageLayout;
  footer: "split" | "simple" | "splitIcon";
};

export const homeEditorialBlocks: readonly HomeEditorialBlock[] = [
  {
    photoId: "sample-01",
    gridClass: "md:col-span-8",
    imageLayout: "natural",
    footer: "split",
  },
  {
    photoId: "sample-02",
    gridClass: "md:col-start-10 md:col-span-3 md:mt-36",
    imageLayout: "4/5",
    footer: "simple",
  },
  {
    photoId: "sample-03",
    gridClass: "md:col-start-2 md:col-span-4",
    imageLayout: "square",
    footer: "simple",
  },
  {
    photoId: "sample-04",
    gridClass: "md:col-span-12 md:mt-8",
    imageLayout: "hero530",
    footer: "simple",
  },
  {
    photoId: "sample-05",
    gridClass: "md:col-start-4 md:col-span-6",
    imageLayout: "16/10",
    footer: "splitIcon",
  },
  {
    photoId: "sample-06",
    gridClass: "md:col-start-2 md:col-span-3",
    imageLayout: "3/4",
    footer: "simple",
  },
];
