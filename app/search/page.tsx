import type { Metadata } from "next";
import Link from "next/link";
import { ProductCard } from "@/components/ProductCard";
import { ScrollReveal } from "@/components/ScrollReveal";
import { getAllProducts, type Product } from "@/lib/products";

export const metadata: Metadata = {
  title: "Search",
  description: "Search across every curated piece on Isla Thrifts.",
};

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

function pickString(v: string | string[] | undefined): string | undefined {
  if (Array.isArray(v)) return v[0];
  return v;
}

function matches(product: Product, q: string): boolean {
  const haystack = [
    product.title,
    product.brand,
    product.category,
    product.notes,
    product.size,
    product.condition,
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
  return q
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean)
    .every((term) => haystack.includes(term));
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const sp = await searchParams;
  const q = (pickString(sp.q) ?? "").trim();

  const all = q ? await getAllProducts() : [];
  const results = q ? all.filter((p) => matches(p, q)) : [];

  return (
    <>
      <div className="bg-pool">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10 pt-10 sm:pt-16 pb-10 sm:pb-14">
          <ScrollReveal>
            <p className="text-xs uppercase tracking-wide2 text-accent-dark">Search</p>
            <h1 className="mt-3 font-brand text-5xl sm:text-7xl lg:text-8xl text-ink leading-[0.95]">
              {q ? `“${q}”` : "Find a piece."}
            </h1>
            <p className="mt-4 max-w-2xl text-ink-muted">
              {q
                ? `${results.length} ${results.length === 1 ? "match" : "matches"} across every curated piece.`
                : "Search by brand, title, category, size, or condition — Nike, Louis Vuitton, denim, bag, size 8, like new."}
            </p>

            <form action="/search" method="get" className="mt-6 flex max-w-xl gap-2">
              <input
                type="search"
                name="q"
                defaultValue={q}
                placeholder="Search brands, titles, sizes…"
                autoFocus
                className="flex-1 bg-white/95 border border-sand-200 rounded-full px-5 py-3 text-sm text-ink placeholder:text-ink-muted/70 focus:outline-none focus:border-accent press"
              />
              <button
                type="submit"
                className="btn-tropical px-6 py-3 rounded-full text-sm uppercase tracking-wide2"
              >
                Search
              </button>
            </form>
          </ScrollReveal>
        </div>
      </div>

      <section className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10 pt-10 sm:pt-14 pb-20">
        {!q ? (
          <div className="bg-pool rounded-2xl py-20 text-center">
            <p className="font-brand text-3xl text-ink">Type to start.</p>
            <p className="mt-2 text-sm text-ink-muted">
              Or{" "}
              <Link href="/collections/new-arrivals" className="underline press hover:text-ink">
                browse new arrivals
              </Link>
              .
            </p>
          </div>
        ) : results.length === 0 ? (
          <div className="bg-pool rounded-2xl py-20 text-center">
            <p className="font-brand text-3xl text-ink">No matches.</p>
            <p className="mt-2 text-sm text-ink-muted">
              Try a brand, a category, or{" "}
              <Link href="/brands" className="underline press hover:text-ink">
                browse all brands
              </Link>
              .
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3">
            {results.map((p, i) => (
              <ScrollReveal key={p.slug} delay={(i % 6) * 50}>
                <ProductCard product={p} index={i} />
              </ScrollReveal>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
