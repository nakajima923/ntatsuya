import { ScrollToTopButton } from "@/components/portfolio/ScrollToTopButton";
import { SiteFooter } from "@/components/portfolio/SiteFooter";
import { SiteHeader } from "@/components/portfolio/SiteHeader";

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-full flex-col bg-surface text-on-surface">
      <SiteHeader />
      <main className="flex-1 pt-16 md:pt-[4.5rem]">{children}</main>
      <SiteFooter />
      <ScrollToTopButton />
    </div>
  );
}
