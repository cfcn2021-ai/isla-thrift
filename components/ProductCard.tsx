import Link from "next/link";
import { ConditionBadge } from "./ConditionBadge";
import { ProductImage } from "./ProductImage";
import type { Product } from "@/lib/products";

function peso(n: number): string {
  return `₱${n.toLocaleString("en-PH")}`;
}

export function ProductCard({
  product,
  index = 0,
  width = "auto",
}: {
  product: Product;
  index?: number;
  width?: "auto" | "fixed";
}) {
  const primary = product.images?.[0];

  return (
    <Link
      href={`/products/${product.slug}`}
      className={`group block ${
        width === "fixed" ? "w-[220px] sm:w-[260px] shrink-0" : ""
      }`}
    >
      <div
        className={`relative aspect-[4/5] overflow-hidden rounded-xl bg-white transition-colors duration-500 ease-out-soft group-hover:bg-transparent ${
          product.sold ? "[&_img]:grayscale-[55%] [&_img]:opacity-90" : ""
        }`}
      >
        {/* Primary image */}
        <div className="absolute inset-0 transition-transform duration-500 ease-out-soft group-hover:scale-[1.06]">
          <ProductImage
            image={primary}
            fallbackKind="product-card"
            fallbackIndex={index}
            alt={`${product.brand} ${product.title}`}
            sizes="(max-width: 768px) 50vw, (max-width: 1280px) 25vw, 280px"
          />
        </div>

        {product.sold && (
          <div className="absolute top-3 left-3 z-10">
            <span className="inline-flex items-center rounded-full bg-ink text-sand-50 px-2.5 py-1 text-[10px] uppercase tracking-wide2">
              Sold
            </span>
          </div>
        )}

        {!product.sold && product.comparePrice && (
          <div className="absolute top-3 left-3 z-10">
            <span className="btn-coral inline-flex items-center rounded-full px-2.5 py-1 text-[10px] uppercase tracking-wide2">
              On Sale
            </span>
          </div>
        )}

        <div className="absolute top-3 right-3 z-10 flex flex-col items-end gap-1.5">
          <ConditionBadge condition={product.condition} size="xs" />
          <span className="inline-flex items-center rounded-full bg-white/95 text-ink ring-1 ring-inset ring-sand-200 px-2 py-0.5 text-[10px] uppercase tracking-wide2">
            Size {product.size}
          </span>
        </div>
      </div>

      <div className="mt-3 px-0.5">
        <p className="text-[10px] tracking-wide2 uppercase text-ink-muted">
          {product.brand}
        </p>
        <h3 className="mt-1 font-display text-[17px] leading-snug text-ink group-hover:text-accent-dark transition-colors duration-200 ease-out-soft">
          {product.title}
        </h3>
        <div className="mt-1 flex items-baseline gap-2">
          <p className={`text-sm ${product.sold ? "text-ink-muted line-through" : "text-ink"}`}>
            {peso(product.price)}
          </p>
          {product.comparePrice && !product.sold && (
            <p className="text-xs text-ink-muted line-through">
              {peso(product.comparePrice)}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}
