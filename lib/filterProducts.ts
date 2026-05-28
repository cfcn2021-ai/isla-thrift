// Pure, URL-driven filter + sort for product lists.
// Both /collections/[slug] and /brands/[slug] funnel their products through here so
// the filter UI behaves identically everywhere. Logic is intentionally simple in-memory
// JS — our catalog is small (dozens, not thousands) so query-time filtering in Sanity
// would be premature complexity.

import {
  clothingTypeLabels,
  slugifyBrand,
  type ClothingType,
  type Condition,
  type Product,
} from "./products";

export type SortKey = "newest" | "price-asc" | "price-desc";

export const sortOptions: { value: SortKey; label: string }[] = [
  { value: "newest", label: "Newest" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
];

export type PriceBand = { value: string; label: string };

// Default catalog-wide price bands (clothing, bags, mixed). Categories with
// different price ranges (e.g. shoes) override via `priceBandsFor` below.
export const priceBands: PriceBand[] = [
  { value: "lt300", label: "Under ₱300" },
  { value: "300-1000", label: "₱300–₱1,000" },
  { value: "1000-3000", label: "₱1,000–₱3,000" },
  { value: "gt3000", label: "₱3,000+" },
];

const shoesPriceBands: PriceBand[] = [
  { value: "lt1000", label: "Under ₱1,000" },
  { value: "1000-3000", label: "₱1,000–₱3,000" },
  { value: "3000-7000", label: "₱3,000–₱7,000" },
  { value: "gt7000", label: "₱7,000+" },
];

export function priceBandsFor(categorySlug?: string): PriceBand[] {
  if (categorySlug === "shoes") return shoesPriceBands;
  return priceBands;
}

export const conditionOptions: { value: Condition; label: string }[] = [
  { value: "like_new", label: "Like New" },
  { value: "good", label: "Good" },
  { value: "fair", label: "Fair" },
];

export const clothingTypeOptions: { value: ClothingType; label: string }[] = (
  Object.keys(clothingTypeLabels) as ClothingType[]
).map((v) => ({ value: v, label: clothingTypeLabels[v] }));

// URL search params we read. Values are CSV strings (e.g. "good,like_new").
// We keep `URLSearchParams` semantics so a missing key === undefined.
export type FilterParams = {
  sort?: string;
  condition?: string;
  brand?: string;
  price?: string;
  type?: string;
  // Default behaviour HIDES sold items so the page leads with what shoppers can
  // actually buy — explicit override surfaces the sold archive for browsing.
  includeSold?: string;
};

function parseList(v: string | undefined): string[] {
  if (!v) return [];
  return v
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

function inPriceBand(price: number, band: string): boolean {
  if (band.startsWith("lt")) return price < Number(band.slice(2));
  if (band.startsWith("gt")) return price >= Number(band.slice(2));
  const m = band.match(/^(\d+)-(\d+)$/);
  if (m) return price >= Number(m[1]) && price < Number(m[2]);
  return true;
}

export type AppliedFilters = {
  conditions: Set<Condition>;
  brandSlugs: Set<string>;
  priceBandKeys: Set<string>;
  clothingTypes: Set<ClothingType>;
  includeSold: boolean;
  sort: SortKey;
};

export function parseFilters(params: FilterParams): AppliedFilters {
  return {
    conditions: new Set(parseList(params.condition) as Condition[]),
    brandSlugs: new Set(parseList(params.brand)),
    priceBandKeys: new Set(parseList(params.price)),
    clothingTypes: new Set(parseList(params.type) as ClothingType[]),
    includeSold: params.includeSold === "1",
    sort: ((["newest", "price-asc", "price-desc"] as const).includes(
      params.sort as SortKey,
    )
      ? (params.sort as SortKey)
      : "newest") as SortKey,
  };
}

export function applyFilters(
  products: Product[],
  filters: AppliedFilters,
): Product[] {
  const filtered = products.filter((p) => {
    if (!filters.includeSold && p.sold) return false;
    if (filters.conditions.size > 0 && !filters.conditions.has(p.condition)) {
      return false;
    }
    if (
      filters.brandSlugs.size > 0 &&
      !filters.brandSlugs.has(slugifyBrand(p.brand))
    ) {
      return false;
    }
    if (filters.priceBandKeys.size > 0) {
      const matchesAny = [...filters.priceBandKeys].some((band) =>
        inPriceBand(p.price, band),
      );
      if (!matchesAny) return false;
    }
    if (filters.clothingTypes.size > 0) {
      if (!p.clothingType || !filters.clothingTypes.has(p.clothingType)) {
        return false;
      }
    }
    return true;
  });

  switch (filters.sort) {
    case "price-asc":
      filtered.sort((a, b) => a.price - b.price);
      break;
    case "price-desc":
      filtered.sort((a, b) => b.price - a.price);
      break;
    case "newest":
    default:
      // Source order from Sanity is already `sold asc, _createdAt desc`. When
      // sold are included we want unsold first within "newest" — re-stabilise.
      filtered.sort((a, b) => Number(!!a.sold) - Number(!!b.sold));
      break;
  }

  return filtered;
}

// Facet counts for the sidebar. Counts reflect the FULL product set (not the
// already-filtered subset) so toggling a filter doesn't make options vanish —
// users can always see the size of every bucket they could move into.
export type Facets = {
  brands: { slug: string; name: string; count: number }[];
  conditions: { value: Condition; count: number }[];
  clothingTypes: { value: ClothingType; count: number }[];
  soldCount: number;
  totalCount: number;
};

export function computeFacets(products: Product[]): Facets {
  const brandMap = new Map<string, { name: string; count: number }>();
  const condMap = new Map<Condition, number>();
  const typeMap = new Map<ClothingType, number>();
  let soldCount = 0;

  for (const p of products) {
    const slug = slugifyBrand(p.brand);
    const existing = brandMap.get(slug);
    if (existing) existing.count += 1;
    else brandMap.set(slug, { name: p.brand, count: 1 });

    condMap.set(p.condition, (condMap.get(p.condition) ?? 0) + 1);
    if (p.clothingType) {
      typeMap.set(p.clothingType, (typeMap.get(p.clothingType) ?? 0) + 1);
    }
    if (p.sold) soldCount += 1;
  }

  return {
    brands: [...brandMap.entries()]
      .map(([slug, { name, count }]) => ({ slug, name, count }))
      .sort((a, b) => a.name.localeCompare(b.name)),
    conditions: conditionOptions
      .map((c) => ({ value: c.value, count: condMap.get(c.value) ?? 0 }))
      .filter((c) => c.count > 0),
    clothingTypes: clothingTypeOptions
      .map((t) => ({ value: t.value, count: typeMap.get(t.value) ?? 0 }))
      .filter((t) => t.count > 0),
    soldCount,
    totalCount: products.length,
  };
}
