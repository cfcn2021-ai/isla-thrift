"use client";

import Link from "next/link";
import { useEffect } from "react";
import { site } from "@/data/site";

type Props = {
  open: boolean;
  onClose: () => void;
  links: { href: string; label: string }[];
};

export function MobileMenu({ open, onClose, links }: Props) {
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  return (
    <div
      aria-hidden={!open}
      className={`fixed inset-0 z-50 md:hidden transition-opacity duration-300 ease-out-soft ${
        open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}
    >
      <div
        className="absolute inset-0 bg-ink/40"
        onClick={onClose}
      />
      <div
        className={`absolute inset-y-0 left-0 w-[85%] max-w-sm bg-sand-50 shadow-2xl flex flex-col transition-transform duration-500 ease-out-soft ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-5 h-16 hairline">
          <Link
            href="/"
            onClick={onClose}
            className="font-display text-[18px] tracking-[0.12em] uppercase"
          >
            {site.name}
          </Link>
          <button aria-label="Close menu" onClick={onClose} className="press p-2 -mr-2">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <nav className="flex flex-col px-5 py-6 gap-1">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={onClose}
              className="font-display text-3xl py-3 press hover:text-accent-dark"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="mt-auto px-5 pb-8 pt-6 border-t border-sand-200">
          <p className="text-xs uppercase tracking-wide2 text-ink-muted mb-3">
            Reserve via
          </p>
          <a
            href={`https://ig.me/m/${site.social.instagram}`}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full text-center px-4 py-3 bg-ink text-sand-50 text-sm tracking-wide uppercase press"
          >
            Instagram DM
          </a>
          <Link
            href="/about"
            onClick={onClose}
            className="block mt-2 text-center text-sm text-ink-muted press hover:text-ink"
          >
            About Isla Thrifts
          </Link>
        </div>
      </div>
    </div>
  );
}
