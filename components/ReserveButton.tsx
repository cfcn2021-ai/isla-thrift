"use client";

import { useState } from "react";
import { instagramReserveUrl, messengerReserveUrl } from "@/lib/dm";
import type { Product } from "@/lib/products";

type Props = {
  product: Product;
  variant?: "primary" | "ghost";
  full?: boolean;
};

export function ReserveButton({ product, variant = "primary", full = false }: Props) {
  const [open, setOpen] = useState(false);

  if (product.sold) {
    return (
      <button
        disabled
        className={`${
          full ? "w-full" : ""
        } inline-flex items-center justify-center px-6 py-3.5 rounded-full text-sm uppercase tracking-wide2 bg-sand-100 text-ink-muted cursor-not-allowed`}
      >
        Sold Out
      </button>
    );
  }

  const base = `${full ? "w-full" : ""} relative inline-flex items-center justify-center px-6 py-3.5 rounded-full text-sm uppercase tracking-wide2`;
  const styles =
    variant === "primary"
      ? "btn-tropical"
      : "border border-accent/30 text-ink hover:border-accent hover:bg-accent/10 press";

  return (
    <div className={full ? "w-full" : "inline-block"}>
      <button onClick={() => setOpen((v) => !v)} className={`${base} ${styles}`}>
        {open ? "Choose where" : "Reserve this piece"}
      </button>

      <div
        className={`grid gap-2 overflow-hidden transition-all duration-400 ease-out-soft ${
          open ? "mt-3 max-h-40 opacity-100" : "mt-0 max-h-0 opacity-0"
        }`}
      >
        <a
          href={instagramReserveUrl(product)}
          target="_blank"
          rel="noopener noreferrer"
          className={`btn-coral ${full ? "w-full" : ""} inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-sm uppercase tracking-wide2`}
        >
          <InstagramGlyph /> Instagram DM
        </a>
        <a
          href={messengerReserveUrl(product)}
          target="_blank"
          rel="noopener noreferrer"
          className={`${full ? "w-full" : ""} inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-sm uppercase tracking-wide2 border border-accent/30 text-ink press hover:bg-accent/10 hover:border-accent`}
        >
          <MessengerGlyph /> Messenger
        </a>
      </div>
    </div>
  );
}

function InstagramGlyph() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="17.5" cy="6.5" r="1.1" fill="currentColor" />
    </svg>
  );
}

function MessengerGlyph() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 2C6.5 2 2 6.1 2 11.2c0 2.8 1.4 5.3 3.6 7v3.6l3.3-1.8c1 .3 2 .4 3.1.4 5.5 0 10-4.1 10-9.2S17.5 2 12 2Zm1 12.5-2.5-2.7-4.9 2.7 5.3-5.7 2.6 2.7 4.8-2.7-5.3 5.7Z"
        fill="currentColor"
      />
    </svg>
  );
}
