import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full border-t border-slate-200 bg-white py-12">
      <div className="max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 font-mono text-xs text-slate-500 uppercase tracking-wider">
        <div className="flex items-center gap-4">
          <span className="font-display font-extrabold text-darkText text-lg">ARCADE.</span>
          <span className="text-slate-300">|</span>
          <span>© 2026 ARCADE STUDIOS. ALL RIGHTS RESERVED.</span>
        </div>

        <div className="flex flex-wrap items-center gap-8 font-semibold">
          <Link href="#work" className="hover:text-accentBlue transition-colors">
            WORK
          </Link>
          <Link href="#capabilities" className="hover:text-accentBlue transition-colors">
            CAPABILITIES
          </Link>
          <Link href="#culture" className="hover:text-accentBlue transition-colors">
            CULTURE
          </Link>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            className="hover:text-accentBlue transition-colors"
          >
            INSTAGRAM
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noreferrer"
            className="hover:text-accentBlue transition-colors"
          >
            LINKEDIN
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="hover:text-accentBlue transition-colors"
          >
            GITHUB
          </a>
        </div>
      </div>
    </footer>
  );
}
