import { site } from "@/lib/content";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="flex w-full flex-col items-center gap-5 border-t border-outline-variant/20 bg-zinc-100/75 px-5 py-10 backdrop-blur-sm md:flex-row md:justify-between md:px-6">
      <div className="flex flex-col items-center gap-1 md:items-start">
        <p className="font-sans text-[9px] tracking-widest text-zinc-600 uppercase">
          © {year} {site.name}
        </p>
        <p className="font-sans text-[7px] tracking-[0.2em] text-zinc-400 uppercase">
          Photo portfolio
        </p>
      </div>
      <div className="flex flex-wrap justify-center gap-8 md:justify-start md:gap-10">
        <a
          href={site.instagram}
          className="font-sans text-[9px] tracking-widest text-zinc-500 uppercase transition-colors hover:text-zinc-900"
          target="_blank"
          rel="noreferrer"
        >
          Instagram
        </a>
        <a
          href={site.x}
          className="font-sans text-[9px] tracking-widest text-zinc-500 uppercase transition-colors hover:text-zinc-900"
          target="_blank"
          rel="noreferrer"
        >
          X
        </a>
        <a
          href={site.github}
          className="font-sans text-[9px] tracking-widest text-zinc-500 uppercase transition-colors hover:text-zinc-900"
          target="_blank"
          rel="noreferrer"
        >
          GitHub
        </a>
      </div>
    </footer>
  );
}
