import Link from "next/link";
import type { Metadata } from "next";
import { ScrollReveal } from "@/components/ScrollReveal";
import { getAllBrands } from "@/lib/products";

export const metadata: Metadata = {
  title: "Brands",
  description:
    "Every brand we've curated, from Louis Vuitton and Coach to Stussy and Nike. Shop by the labels you trust.",
};

export default async function BrandsIndexPage() {
  const brands = await getAllBrands();

  return (
    <>
      <div className="bg-pool">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10 pt-10 sm:pt-16 pb-10 sm:pb-14">
          <ScrollReveal>
            <p className="text-xs uppercase tracking-wide2 text-accent-dark">Shop by</p>
            <h1 className="mt-3 font-brand text-5xl sm:text-7xl lg:text-8xl text-ink leading-[0.95]">
              Brands
            </h1>
            <p className="mt-4 max-w-2xl text-ink-muted">
              Every label we&apos;ve sourced and authenticated. From luxury houses to streetwear staples.
            </p>
          </ScrollReveal>
        </div>
      </div>

      <section className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10 pt-12 pb-20">
        {brands.length === 0 ? (
          <div className="bg-pool rounded-2xl py-20 text-center">
            <p className="font-brand text-3xl text-ink">No brands yet.</p>
            <p className="mt-2 text-sm text-ink-muted">
              Add products in the Studio at <code>/studio</code> and they&apos;ll be grouped here automatically.
            </p>
          </div>
        ) : (
          <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-3">
            {brands.map((b, i) => (
              <ScrollReveal key={b.slug} delay={(i % 8) * 40}>
                <li>
                  <Link
                    href={`/brands/${b.slug}`}
                    className="group flex items-baseline justify-between gap-3 py-3 border-b border-accent/20 press"
                  >
                    <span className="font-display text-xl sm:text-2xl text-ink group-hover:text-accent-dark transition-colors duration-200 ease-out-soft">
                      {b.name}
                    </span>
                    <span className="text-xs uppercase tracking-wide2 text-ink-muted">
                      {b.count}
                    </span>
                  </Link>
                </li>
              </ScrollReveal>
            ))}
          </ul>
        )}
      </section>
    </>
  );
}
