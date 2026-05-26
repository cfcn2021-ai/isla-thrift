"use client";

import { useEffect, useRef, useState } from "react";
import { ProductImage } from "./ProductImage";
import type { ProductImage as Img } from "@/lib/products";

type Props = {
  open: boolean;
  onClose: () => void;
  images: Img[];
  startIndex: number;
  alt: string;
};

export function Lightbox({ open, onClose, images, startIndex, alt }: Props) {
  const count = Math.max(images.length, 1);
  const [index, setIndex] = useState(startIndex);
  const [zoom, setZoom] = useState(1);
  const touchStart = useRef<number | null>(null);

  useEffect(() => {
    if (open) {
      setIndex(startIndex);
      setZoom(1);
    }
  }, [open, startIndex]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") setIndex((i) => (i + 1) % count);
      if (e.key === "ArrowLeft") setIndex((i) => (i - 1 + count) % count);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, count, onClose]);

  if (!open) return null;

  const onWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    setZoom((z) => Math.max(1, Math.min(3, z + (e.deltaY > 0 ? -0.1 : 0.1))));
  };

  const onTouchStart = (e: React.TouchEvent) => {
    touchStart.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStart.current == null) return;
    const dx = e.changedTouches[0].clientX - touchStart.current;
    if (Math.abs(dx) > 50) {
      if (dx < 0) setIndex((i) => (i + 1) % count);
      else setIndex((i) => (i - 1 + count) % count);
    }
    touchStart.current = null;
  };

  return (
    <div
      className="fixed inset-0 z-[60] bg-ink/95 flex items-center justify-center animate-fade-up"
      onClick={onClose}
    >
      <button
        aria-label="Close"
        onClick={onClose}
        className="absolute top-5 right-5 text-sand-50/80 hover:text-sand-50 press p-2"
      >
        <svg width="22" height="22" viewBox="0 0 20 20" fill="none">
          <path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </button>

      {count > 1 && (
        <>
          <button
            aria-label="Previous"
            onClick={(e) => {
              e.stopPropagation();
              setIndex((i) => (i - 1 + count) % count);
              setZoom(1);
            }}
            className="hidden sm:flex absolute left-6 top-1/2 -translate-y-1/2 text-sand-50/80 hover:text-sand-50 press p-3"
          >
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
              <path d="M15 6l-6 6 6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            aria-label="Next"
            onClick={(e) => {
              e.stopPropagation();
              setIndex((i) => (i + 1) % count);
              setZoom(1);
            }}
            className="hidden sm:flex absolute right-6 top-1/2 -translate-y-1/2 text-sand-50/80 hover:text-sand-50 press p-3"
          >
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
              <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </>
      )}

      <div
        className="relative w-[92vw] max-w-[1100px] aspect-[4/5] sm:aspect-[5/6] cursor-zoom-in overflow-hidden"
        onClick={(e) => e.stopPropagation()}
        onWheel={onWheel}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <div
          className="absolute inset-0 transition-transform duration-300 ease-out-soft"
          style={{ transform: `scale(${zoom})` }}
        >
          <ProductImage
            image={images[index]}
            fallbackKind="product-main"
            fallbackIndex={index}
            sizes="92vw"
            alt={alt}
          />
        </div>
      </div>

      {count > 1 && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-1.5">
          {Array.from({ length: count }).map((_, i) => (
            <span
              key={i}
              className={`h-1 rounded-full transition-all duration-300 ease-out-soft ${
                i === index ? "w-6 bg-sand-50" : "w-1.5 bg-sand-50/40"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
