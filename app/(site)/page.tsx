import { HomePhotoHero } from "@/components/home/HomePhotoHero";
import { HomeScrollDock } from "@/components/home/HomeScrollDock";

export default function HomePage() {
  return (
    <div id="top" className="w-full">
      <HomePhotoHero />
      <HomeScrollDock />
    </div>
  );
}
