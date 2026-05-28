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
    description: `Shop ${result.brand.name} pieces curated from PH thrift stores — pre-owned, condition-graded, and ready to ship.`,
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
    <>
      <div className="bg-pool">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10 pt-10 sm:pt-16 pb-10 sm:pb-14">
          <ScrollReveal>
            <div className="flex items-baseline gap-3 text-xs uppercase tracking-wide2 text-accent-dark">
              <Link href="/brands" className="press hover:text-ink">Brands</Link>
              <span className="text-ink-muted">/</span>
              <span className="text-ink-muted">{brand.name}</span>
            </div>
            <h1 className="mt-3 font-brand text-5xl sm:text-7xl lg:text-8xl text-ink leading-[0.95]">
              {brand.name}
            </h1>
            <p className="mt-4 max-w-2xl text-ink-muted">
              {inStockCount} available · {brand.count} total pieces sourced.
            </p>
          </ScrollReveal>
        </div>
      </div>

      <section className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10 pt-8 sm:pt-12 pb-20">
      <div className="grid gap-10 lg:grid-cols-[220px_1fr] lg:gap-14">
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
            <div className="bg-pool rounded-2xl py-20 text-center">
              <p className="font-brand text-3xl text-ink">
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
    </>
  );
}
