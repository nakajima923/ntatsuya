import type { Metadata } from "next";
import Link from "next/link";
import { Fragment } from "react";

import { aboutBio, site } from "@/lib/content";

export const metadata: Metadata = {
  title: "About",
  description: "Profile — bilingual bio and contact.",
};

function LinesParagraph({
  lines,
  className,
}: {
  lines: readonly string[];
  className?: string;
}) {
  return (
    <p className={className}>
      {lines.map((line, i) => (
        <Fragment key={i}>
          {i > 0 ? <br /> : null}
          {line}
        </Fragment>
      ))}
    </p>
  );
}

export default function AboutPage() {
  const { nameJa, sectionsJa, sectionsEn } = aboutBio;
  const lastJa = sectionsJa.length - 1;
  const lastEn = sectionsEn.length - 1;

  return (
    <div className="mx-auto max-w-4xl px-6 pb-24 pt-6 md:px-10 md:pt-8">
      <main id="container">
        <div className="textcontainer">
          <p className="name mb-12 border-b border-outline-variant/25 pb-8 font-serif text-3xl tracking-tight text-on-surface md:text-4xl">
            {nameJa}
          </p>

          <div className="aboutmain grid grid-cols-1 gap-14 md:grid-cols-2 md:gap-0 md:divide-x md:divide-outline-variant/20">
            <div className="jp md:pr-10 lg:pr-14" lang="ja">
              {sectionsJa.map((lines, idx) => (
                <LinesParagraph
                  key={idx}
                  lines={lines}
                  className={
                    idx === lastJa
                      ? "maintextend mt-8 text-sm leading-[1.85] text-on-surface-variant md:text-base"
                      : "maintext mb-8 text-sm leading-[1.85] text-on-surface md:mb-10 md:text-base"
                  }
                />
              ))}
            </div>

            <div className="en md:pl-10 lg:pl-14" lang="en">
              {sectionsEn.map((lines, idx) => (
                <LinesParagraph
                  key={idx}
                  lines={lines}
                  className={
                    idx === lastEn
                      ? "maintextend mt-8 text-sm leading-[1.85] text-on-surface-variant md:text-base"
                      : "maintext mb-8 text-sm leading-[1.85] text-on-surface md:mb-10 md:text-base"
                  }
                />
              ))}
            </div>
          </div>

          <p className="mt-16 text-center font-sans text-[10px] tracking-[0.2em] text-on-surface-variant uppercase md:mt-20">
            <Link
              href={`mailto:${site.email}`}
              className="border-b border-outline-variant/30 pb-0.5 transition-colors hover:border-primary hover:text-on-surface"
            >
              {site.email}
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}
