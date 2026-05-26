"use client";

import { useState } from "react";
import { ProductImage } from "./ProductImage";
import { Lightbox } from "./Lightbox";
import type { ProductImage as Img } from "@/lib/products";

export function ProductGallery({
  images,
  alt,
}: {
  images: Img[];
  alt: string;
}) {
  const count = Math.max(images.length, 1);
  const [active, setActive] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  return (
    <>
      <div className="grid gap-3 sm:grid-cols-[88px_1fr] sm:gap-4">
        <div className="order-2 sm:order-1 flex sm:flex-col gap-2 sm:gap-3 overflow-x-auto sm:overflow-visible scrollbar-hide">
          {Array.from({ length: count }).map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              aria-label={`View image ${i + 1}`}
              className={`relative aspect-[4/5] w-20 sm:w-full shrink-0 overflow-hidden rounded-md border transition-colors duration-200 ease-out-soft press ${
                i === active
                  ? "border-ink"
                  : "border-sand-200 hover:border-ink/40"
              }`}
            >
              <ProductImage
                image={images[i]}
                fallbackKind="product-thumb"
                fallbackIndex={i}
                sizes="88px"
                alt={`${alt} — view ${i + 1}`}
              />
            </button>
          ))}
        </div>

        <button
          onClick={() => setLightboxOpen(true)}
          aria-label="Open zoomable image"
          className="order-1 sm:order-2 relative aspect-[4/5] w-full overflow-hidden rounded-xl border border-sand-200 bg-white cursor-zoom-in group"
        >
          <div className="absolute inset-0 transition-transform duration-500 ease-out-soft group-hover:scale-[1.02]">
            <ProductImage
              image={images[active]}
              fallbackKind="product-main"
              fallbackIndex={active}
              sizes="(max-width: 1024px) 100vw, 600px"
              priority
              alt={alt}
            />
          </div>
          <div className="absolute bottom-3 right-3 rounded-full bg-ink/70 text-sand-50 text-[10px] uppercase tracking-wide2 px-2.5 py-1 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200 ease-out-soft">
            Click to zoom
          </div>
        </button>
      </div>

      <Lightbox
        open={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        images={images}
        startIndex={active}
        alt={alt}
      />
    </>
  );
}
