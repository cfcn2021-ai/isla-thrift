import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  CollectionSortBar,
  CollectionToolbar,
} from "@/components/CollectionToolbar";
import { ProductCard } from "@/components/ProductCard";
import { ScrollReveal } from "@/components/ScrollReveal";
import {
  applyFilters,
  computeFacets,
  parseFilters,
  type FilterParams,
} from "@/lib/filterProducts";
import { getAllBrands, getProductsByBrand } from "@/lib/products";

type Params = { slug: string };
type SearchParams = Promise<Record<string, string | string[] | undefined>>;

export async function generateStaticParams(): Promise<Params[]> {
  const brands = await getAllBrands();
  return brands.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const result = await getProductsByBrand(slug);
  if (!result) return {};
  return {
    title: result.brand.name,
    description: `Shop authenticated ${result.brand.name} pieces — pre-owned, condition-graded, and ready to ship.`,
  };
}

function pickString(v: string | string[] | undefined): string | undefined {
  if (Array.isArray(v)) return v[0];
  return v;
}

export default async function BrandPage({
  params,
  searchParams,
}: {
  params: Promise<Params>;
  searchParams: SearchParams;
}) {
  const { slug } = await params;
  const result = await getProductsByBrand(slug);
  if (!result) notFound();

  const { brand, products } = result;

  const sp = await searchParams;
  const filterParams: FilterParams = {
    sort: pickString(sp.sort),
    condition: pickString(sp.condition),
    // No brand filter on brand pages (already scoped).
    price: pickString(sp.price),
    type: pickString(sp.type),
    includeSold: pickString(sp["include-sold"]),
  };

  const facets = computeFacets(products);
  const filters = parseFilters(filterParams);
  const visible = applyFilters(products, filters);
  const inStockCount = products.filter((p) => !p.sold).length;

  return (
    <section className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10 pt-10 sm:pt-16 pb-20">
      <ScrollReveal>
        <div className="flex items-baseline gap-3 text-xs uppercase tracking-wide2 text-ink-muted">
          <Link href="/brands" className="press hover:text-ink">Brands</Link>
          <span>/</span>
          <span>{brand.name}</span>
        </div>
        <h1 className="mt-3 font-display text-4xl sm:text-6xl tracking-[-0.01em]">
          {brand.name}
        </h1>
        <p className="mt-3 max-w-2xl text-ink-muted">
          {inStockCount} available · {brand.count} total pieces sourced.
        </p>
      </ScrollReveal>

      <div className="mt-10 grid gap-10 lg:grid-cols-[220px_1fr] lg:gap-14">
        <CollectionToolbar
          facets={facets}
          showBrandFilter={false}
          selectedConditions={[...filters.conditions]}
          selectedBrandSlugs={[...filters.brandSlugs]}
          selectedPriceBands={[...filters.priceBandKeys]}
          selectedClothingTypes={[...filters.clothingTypes]}
          includeSold={filters.includeSold}
          sort={filters.sort}
          totalShown={visible.length}
        />

        <div>
          <CollectionSortBar sort={filters.sort} totalShown={visible.length} />

          {visible.length === 0 ? (
            <div className="border border-dashed border-sand-200 rounded-xl py-20 text-center">
              <p className="font-display text-2xl">
                {products.length === 0
                  ? `Nothing in stock for ${brand.name} yet.`
                  : "No matches for those filters."}
              </p>
              <p className="mt-2 text-sm text-ink-muted">
                <Link href="/brands" className="underline press hover:text-ink">
                  Browse other brands →
                </Link>
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3">
              {visible.map((p, i) => (
                <ScrollReveal key={p.slug} delay={(i % 6) * 50}>
                  <ProductCard product={p} index={i} />
                </ScrollReveal>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
