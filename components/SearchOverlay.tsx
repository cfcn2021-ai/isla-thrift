"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

type Props = {
  open: boolean;
  onClose: () => void;
};

export function SearchOverlay({ open, onClose }: Props) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [q, setQ] = useState("");

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    requestAnimationFrame(() => inputRef.current?.focus());
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const term = q.trim();
    if (!term) return;
    onClose();
    setQ("");
    router.push(`/search?q=${encodeURIComponent(term)}`);
  }

  return (
    <div
      aria-hidden={!open}
      className={`fixed inset-0 z-[60] transition-opacity duration-300 ease-out-soft ${
        open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}
    >
      <div
        className="absolute inset-0 bg-ink/40 backdrop-blur-sm"
        onClick={onClose}
      />
      <div
        className={`absolute inset-x-0 top-0 bg-sand-50 shadow-2xl transition-transform duration-300 ease-out-soft ${
          open ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10 py-6 sm:py-8">
          <div className="flex items-center justify-between mb-5">
            <p className="text-xs uppercase tracking-wide2 text-accent-dark">
              Search Isla Thrifts
            </p>
            <button
              aria-label="Close search"
              onClick={onClose}
              className="press p-2 -mr-2 text-ink-muted hover:text-ink"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          <form onSubmit={submit} className="flex gap-2">
            <div className="relative flex-1">
              <svg
                width="18"
                height="18"
                viewBox="0 0 20 20"
                fill="none"
                className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-muted"
              >
                <circle cx="9" cy="9" r="6" stroke="currentColor" strokeWidth="1.5" />
                <path d="m14 14 4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              <input
                ref={inputRef}
                type="search"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Brand, title, size, category, condition…"
                className="w-full bg-white/95 border border-sand-200 rounded-full pl-11 pr-5 py-3 text-base text-ink placeholder:text-ink-muted/70 focus:outline-none focus:border-accent press"
              />
            </div>
            <button
              type="submit"
              className="btn-tropical px-6 py-3 rounded-full text-sm uppercase tracking-wide2"
            >
              Go
            </button>
          </form>

          <p className="mt-3 text-xs text-ink-muted">
            Press <kbd className="px-1.5 py-0.5 rounded bg-sand-100 border border-sand-200 text-[10px]">Esc</kbd> to close.
          </p>
        </div>
      </div>
    </div>
  );
}
