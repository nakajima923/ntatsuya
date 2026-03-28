import type { Metadata } from "next";
import { Manrope, Noto_Serif_JP } from "next/font/google";

import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const notoSerifJp = Noto_Serif_JP({
  variable: "--font-noto-serif",
  subsets: ["latin"],
  weight: ["200", "400", "600"],
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
    <html
      lang="ja"
      className={`${manrope.variable} ${notoSerifJp.variable} h-full antialiased`}
    >
      <body className="min-h-full min-h-[100dvh] flex flex-col">{children}</body>
    </html>
  );
}
