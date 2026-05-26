"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { MobileMenu } from "./MobileMenu";
import { site } from "@/data/site";

const links = [
  { href: "/collections/new-arrivals", label: "New Arrivals" },
  { href: "/collections/clothing", label: "Clothing" },
  { href: "/collections/bags", label: "Bags" },
  { href: "/collections/shoes", label: "Shoes" },
  { href: "/brands", label: "Brands" },
  { href: "/collections/sale", label: "Sale" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={`sticky top-0 z-40 transition-[background,box-shadow] duration-300 ease-out-soft ${
          scrolled
            ? "bg-sand-50/90 backdrop-blur hairline"
            : "bg-sand-50/0 backdrop-blur-0"
        }`}
      >
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10 h-16 flex items-center justify-between">
          <button
            aria-label="Open menu"
            onClick={() => setMenuOpen(true)}
            className="md:hidden press p-2 -ml-2"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M3 6h14M3 10h14M3 14h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>

          <Link
            href="/"
            className="font-display text-[18px] sm:text-[20px] tracking-[0.12em] uppercase press"
          >
            {site.name}
          </Link>

          <nav className="hidden md:flex items-center gap-7 text-[13px] tracking-wide">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="relative press text-ink hover:text-accent-dark"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-1.5">
            <button aria-label="Search" className="press p-2 hover:text-accent-dark">
              <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                <circle cx="9" cy="9" r="6" stroke="currentColor" strokeWidth="1.5" />
                <path d="m14 14 4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
            <a
              href={`https://ig.me/m/${site.social.instagram}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-2 press text-[12px] uppercase tracking-wide2 px-3 py-2 border border-ink/15 rounded-full hover:bg-ink hover:text-sand-50 hover:border-ink"
            >
              DM to Reserve
            </a>
          </div>
        </div>
      </header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} links={links} />
    </>
  );
}
