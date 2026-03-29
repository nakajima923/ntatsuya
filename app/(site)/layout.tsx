import { ConditionalSiteFooter } from "@/components/portfolio/ConditionalSiteFooter";
import { MainContent } from "@/components/portfolio/MainContent";
import { ScrollToTopButton } from "@/components/portfolio/ScrollToTopButton";
import { SiteHeader } from "@/components/portfolio/SiteHeader";

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-0 flex-1 flex-col bg-surface text-on-surface">
      <SiteHeader />
      <MainContent>{children}</MainContent>
      <ConditionalSiteFooter />
      <ScrollToTopButton />
    </div>
  );
}
