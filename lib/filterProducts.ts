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
  // Default behaviour SHOWS sold items (sorted last, marked "Sold") so the catalog
  // never looks deserted as inventory turns over. `include-sold=0` hides them for
  // shoppers who only want what's currently buyable.
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
    includeSold: params.includeSold !== "0",
    sort: ((["newest", "price-asc", "price-desc"] as const).includes(
      params.sort as SortKey,
    )
      ? (params.sort as SortKey)
      : "newest") as SortKey,
  };
}

// How many sold items a collection/brand page will surface. Keeps pages looking
// populated as inventory turns over, without letting them become a wall of "Sold"
// once the store has hundreds of past sales. Bump or lower this single number to taste.
export const MAX_SOLD_PER_PAGE = 8;

export function applyFilters(
  products: Product[],
  filters: AppliedFilters,
): Product[] {
  const matchesFacets = (p: Product): boolean => {
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
  };

  const matched = products.filter(matchesFacets);
  const available = matched.filter((p) => !p.sold);
  // Source order from Sanity is `sold asc, _createdAt desc`, so slicing the sold
  // subset keeps the most recently sold pieces.
  const sold = filters.includeSold
    ? matched.filter((p) => p.sold).slice(0, MAX_SOLD_PER_PAGE)
    : [];

  const result = [...available, ...sold];

  switch (filters.sort) {
    case "price-asc":
      result.sort((a, b) => a.price - b.price);
      break;
    case "price-desc":
      result.sort((a, b) => b.price - a.price);
      break;
    case "newest":
    default:
      // Unsold first within "newest"; the capped sold tail follows.
      result.sort((a, b) => Number(!!a.sold) - Number(!!b.sold));
      break;
  }

  return result;
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
