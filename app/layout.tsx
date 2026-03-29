import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";

import "./globals.css";

const notoSansJp = Noto_Sans_JP({
  variable: "--font-noto-sans-jp",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "ntatsuya — Photo",
    template: "%s — ntatsuya",
  },
  description:
    "写真ポートフォリオ。ギャラリー・About・お問い合わせ（Googleフォーム）。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className={`${notoSansJp.variable} h-full antialiased`}>
      <body className="min-h-full min-h-[100dvh] flex flex-col">{children}</body>
    </html>
  );
}
