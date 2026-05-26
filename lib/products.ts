// Server-side data layer. All product reads go through Sanity.
// Pages call these async fetchers; revalidation tags are wired so a Studio publish
// invalidates the right pages via the /api/revalidate webhook.
//
// When Sanity isn't configured yet, every fetcher returns a safe empty result so the
// site still builds and runs locally. The homepage shows a "no drops yet" state until
// the owner creates a Sanity project and seeds it.

import { client } from "@/sanity/lib/client";
import {
  allBrandsQuery,
  allProductsQuery,
  newArrivalsQuery,
  productBySlugQuery,
  productSlugsQuery,
  productsByBrandQuery,
  productsByCategoryQuery,
  saleProductsQuery,
} from "@/sanity/queries";
import type { CollectionSlug } from "@/data/collections";

export type Condition = "like_new" | "good" | "fair";
export type Category = "clothing" | "bags" | "shoes";

export type ProductImage = {
  url: string;
  lqip?: string;
  dimensions?: { width: number; height: number };
  alt?: string;
};

export type Product = {
  slug: string;
  brand: string;
  title: string;
  price: number;
  comparePrice?: number;
  size: string;
  condition: Condition;
  category: Category;
  tagSale?: boolean;
  tagNewArrival?: boolean;
  measurements?: string;
  notes: string;
  authentication?: string;
  images: ProductImage[];
  sold?: boolean;
};

export const conditionLabels: Record<Condition, string> = {
  like_new: "Like New",
  good: "Good",
  fair: "Fair",
};

const productsTag = ["products"];

async function safeFetch<T>(
  fn: () => Promise<T>,
  fallback: T,
  label: string,
): Promise<T> {
  if (!client) return fallback;
  try {
    return await fn();
  } catch (err) {
    console.warn(`[sanity] ${label} failed:`, (err as Error).message);
    return fallback;
  }
}

export async function getAllProducts(): Promise<Product[]> {
  return safeFetch(
    () =>
      client!.fetch<Product[]>(
        allProductsQuery,
        {},
        { next: { tags: productsTag } },
      ),
    [],
    "getAllProducts",
  );
}

export async function getProduct(slug: string): Promise<Product | null> {
  return safeFetch(
    () =>
      client!.fetch<Product | null>(
        productBySlugQuery,
        { slug },
        { next: { tags: [`product:${slug}`, ...productsTag] } },
      ),
    null,
    `getProduct(${slug})`,
  );
}

export async function getAllProductSlugs(): Promise<string[]> {
  return safeFetch(
    () => client!.fetch<string[]>(productSlugsQuery),
    [],
    "getAllProductSlugs",
  );
}

export type BrandSummary = {
  name: string;
  slug: string;
  count: number;
};

// URL-safe slug for a brand display name. Used for /brands/[slug] routes and
// for the brand filter param on collection pages. Kept simple: lowercase,
// alphanumerics + hyphens. Matches the inverse of `unslugifyBrand` below.
export function slugifyBrand(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export async function getAllBrands(): Promise<BrandSummary[]> {
  const names = await safeFetch(
    () =>
      client!.fetch<string[]>(
        allBrandsQuery,
        {},
        { next: { tags: productsTag } },
      ),
    [] as string[],
    "getAllBrands",
  );

  const tally = new Map<string, { name: string; count: number }>();
  for (const raw of names) {
    if (!raw) continue;
    const slug = slugifyBrand(raw);
    if (!slug) continue;
    const entry = tally.get(slug);
    if (entry) {
      entry.count += 1;
    } else {
      // Preserve the first-seen casing as the canonical display name.
      tally.set(slug, { name: raw, count: 1 });
    }
  }

  return [...tally.entries()]
    .map(([slug, { name, count }]) => ({ slug, name, count }))
    .sort((a, b) => a.name.localeCompare(b.name));
}

export async function getProductsByBrand(
  brandSlug: string,
): Promise<{ brand: BrandSummary; products: Product[] } | null> {
  const brands = await getAllBrands();
  const brand = brands.find((b) => b.slug === brandSlug);
  if (!brand) return null;

  const products = await safeFetch(
    () =>
      client!.fetch<Product[]>(
        productsByBrandQuery,
        { brandLower: brand.name.toLowerCase() },
        { next: { tags: productsTag } },
      ),
    [],
    `brand:${brandSlug}`,
  );

  return { brand, products };
}

export async function getProductsInCollection(
  slug: CollectionSlug,
): Promise<Product[]> {
  if (slug === "new-arrivals") {
    return safeFetch(
      () =>
        client!.fetch<Product[]>(
          newArrivalsQuery,
          {},
          { next: { tags: productsTag } },
        ),
      [],
      "new-arrivals",
    );
  }
  if (slug === "sale") {
    return safeFetch(
      () =>
        client!.fetch<Product[]>(
          saleProductsQuery,
          {},
          { next: { tags: productsTag } },
        ),
      [],
      "sale",
    );
  }
  return safeFetch(
    () =>
      client!.fetch<Product[]>(
        productsByCategoryQuery,
        { category: slug },
        { next: { tags: productsTag } },
      ),
    [],
    `category:${slug}`,
  );
}
