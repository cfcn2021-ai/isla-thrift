"use client";

import { useState } from "react";

type Item = {
  q: string;
  a: React.ReactNode;
};

export function Accordion({ items }: { items: Item[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <ul className="divide-y divide-sand-200 border-y border-sand-200">
      {items.map((it, i) => {
        const isOpen = open === i;
        return (
          <li key={i}>
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              className="w-full flex items-center justify-between text-left py-5 sm:py-6 press"
              aria-expanded={isOpen}
            >
              <span className="font-display text-lg sm:text-xl pr-6">{it.q}</span>
              <span
                className={`shrink-0 w-7 h-7 rounded-full border border-sand-200 flex items-center justify-center text-ink-muted transition-transform duration-300 ease-out-soft ${
                  isOpen ? "rotate-45" : ""
                }`}
              >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M6 1v10M1 6h10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                </svg>
              </span>
            </button>
            <div
              className={`grid overflow-hidden transition-[grid-template-rows] duration-400 ease-out-soft ${
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              }`}
            >
              <div className="min-h-0 overflow-hidden">
                <div className="pb-6 pr-10 text-sm sm:text-[15px] text-ink-muted leading-relaxed">
                  {it.a}
                </div>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
