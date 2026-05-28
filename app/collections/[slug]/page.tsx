import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  CollectionSortBar,
  CollectionToolbar,
} from "@/components/CollectionToolbar";
import { ProductCard } from "@/components/ProductCard";
import { ScrollReveal } from "@/components/ScrollReveal";
import { collections, getCollection } from "@/data/collections";
import {
  applyFilters,
  computeFacets,
  parseFilters,
  priceBandsFor,
  type FilterParams,
} from "@/lib/filterProducts";
import { getProductsInCollection } from "@/lib/products";

type Params = { slug: string };
// Next 16 passes searchParams as the full record — we narrow to the keys we use.
type SearchParams = Promise<Record<string, string | string[] | undefined>>;

export function generateStaticParams(): Params[] {
  return collections.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const c = getCollection(slug);
  if (!c) return {};
  return { title: c.title, description: c.descriptor };
}

function pickString(v: string | string[] | undefined): string | undefined {
  if (Array.isArray(v)) return v[0];
  return v;
}

export default async function CollectionPage({
  params,
  searchParams,
}: {
  params: Promise<Params>;
  searchParams: SearchParams;
}) {
  const { slug } = await params;
  const collection = getCollection(slug);
  if (!collection) notFound();

  const sp = await searchParams;
  const filterParams: FilterParams = {
    sort: pickString(sp.sort),
    condition: pickString(sp.condition),
    brand: pickString(sp.brand),
    price: pickString(sp.price),
    type: pickString(sp.type),
    includeSold: pickString(sp["include-sold"]),
  };

  const allItems = await getProductsInCollection(collection.slug);
  const facets = computeFacets(allItems);
  const filters = parseFilters(filterParams);
  const visible = applyFilters(allItems, filters);

  return (
    <>
      <div className="bg-pool">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10 pt-10 sm:pt-16 pb-10 sm:pb-14">
          <ScrollReveal>
            <p className="text-xs uppercase tracking-wide2 text-accent-dark">Collection</p>
            <h1 className="mt-3 font-brand text-5xl sm:text-7xl lg:text-8xl text-ink leading-[0.95]">
              {collection.title}
            </h1>
            <p className="mt-4 max-w-2xl text-ink-muted">{collection.descriptor}</p>
          </ScrollReveal>
        </div>
      </div>

      <section className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10 pt-8 sm:pt-12 pb-20">

      <div className="grid gap-10 lg:grid-cols-[220px_1fr] lg:gap-14">
        <CollectionToolbar
          facets={facets}
          showClothingTypeFilter={collection.slug === "clothing"}
          priceBands={priceBandsFor(collection.slug)}
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
                {allItems.length === 0
                  ? "Nothing here yet."
                  : "No matches for those filters."}
              </p>
              <p className="mt-2 text-sm text-ink-muted">
                {allItems.length === 0
                  ? "Fresh drops weekly. Check back soon."
                  : "Try loosening a filter or browsing the sold archive."}
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
