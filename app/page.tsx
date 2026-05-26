import Link from "next/link";
import { ScrollReveal } from "@/components/ScrollReveal";
import { ProductCard } from "@/components/ProductCard";
import { CategoryTile } from "@/components/CategoryTile";
import { PlaceholderImage } from "@/components/PlaceholderImage";
import { getProductsInCollection } from "@/lib/products";
import { site } from "@/data/site";

export default async function HomePage() {
  const newArrivals = (await getProductsInCollection("new-arrivals")).slice(0, 6);

  return (
    <>
      {/* HERO */}
      <section className="relative">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10 pt-8 sm:pt-14 lg:pt-20 pb-10 sm:pb-16">
          <div className="grid gap-10 lg:gap-16 lg:grid-cols-12 items-center min-h-[78vh]">
            <div className="lg:col-span-6">
              <ScrollReveal>
                <p className="text-xs uppercase tracking-wide2 text-ink-muted">
                  Curated drops · Philippines
                </p>
              </ScrollReveal>

              <ScrollReveal delay={80}>
                <h1 className="mt-5 font-display text-[58px] sm:text-[72px] lg:text-[96px] leading-[0.95] tracking-[-0.02em]">
                  Shop Bold.
                </h1>
              </ScrollReveal>

              <ScrollReveal delay={160}>
                <p className="mt-6 font-display italic text-lg sm:text-xl text-ink-muted max-w-md">
                  {site.tagline}
                </p>
              </ScrollReveal>

              <ScrollReveal delay={240}>
                <div className="mt-10 flex flex-wrap items-center gap-3">
                  <Link
                    href="/collections/new-arrivals"
                    className="inline-flex items-center px-7 py-4 bg-ink text-sand-50 text-sm uppercase tracking-wide2 press hover:bg-accent-dark"
                  >
                    Shop New Arrivals
                  </Link>
                  <Link
                    href="/about"
                    className="inline-flex items-center px-7 py-4 text-sm uppercase tracking-wide2 text-ink-muted press hover:text-ink"
                  >
                    The story →
                  </Link>
                </div>
              </ScrollReveal>
            </div>

            <ScrollReveal
              delay={140}
              className="lg:col-span-6 relative h-[55vh] sm:h-[68vh] lg:h-[78vh]"
            >
              {/* PLACEHOLDER: replaced automatically once client uploads a featured
                  hero photo to Sanity (any product with `tagNewArrival = true` uses
                  the first image of the latest one). */}
              <div className="relative w-full h-full overflow-hidden rounded-xl">
                {newArrivals[0]?.images?.[0]?.url ? (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    src={newArrivals[0].images[0].url}
                    alt={`${newArrivals[0].brand} ${newArrivals[0].title}`}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                ) : (
                  <PlaceholderImage kind="hero" index={1} />
                )}
              </div>
              <div className="absolute -bottom-5 -left-5 hidden lg:block">
                <span className="inline-block bg-sand-50 px-3 py-1 text-[10px] uppercase tracking-wide2 text-ink-muted border border-sand-200">
                  Drop · {new Date().toLocaleString("en-US", { month: "long", year: "numeric" })}
                </span>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* CATEGORY GRID */}
      <section className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10 mt-12 sm:mt-20">
        <ScrollReveal className="flex items-end justify-between mb-6 sm:mb-10">
          <div>
            <p className="text-xs uppercase tracking-wide2 text-ink-muted">Categories</p>
            <h2 className="mt-2 font-display text-3xl sm:text-4xl">Find your lane.</h2>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-5">
          {[
            { href: "/collections/clothing", label: "Clothing" },
            { href: "/collections/bags", label: "Bags" },
            { href: "/collections/shoes", label: "Shoes" },
          ].map((cat, i) => (
            <ScrollReveal key={cat.href} delay={i * 80}>
              <CategoryTile href={cat.href} label={cat.label} index={i} />
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* NEW ARRIVALS */}
      <section className="mt-24 sm:mt-32">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
          <ScrollReveal className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-6 sm:mb-10">
            <div>
              <h2 className="font-display text-4xl sm:text-5xl">New In</h2>
              <p className="mt-2 text-sm sm:text-base text-ink-muted">
                Fresh drops. One of a kind. Gone when it&apos;s gone.
              </p>
            </div>
            <Link
              href="/collections/new-arrivals"
              className="text-sm uppercase tracking-wide2 text-ink-muted press hover:text-ink"
            >
              View all →
            </Link>
          </ScrollReveal>
        </div>

        <div className="mx-auto max-w-[1400px]">
          {newArrivals.length === 0 ? (
            <div className="mx-4 sm:mx-6 lg:mx-10 border border-dashed border-sand-200 rounded-xl py-16 text-center">
              <p className="font-display text-2xl">No drops yet.</p>
              <p className="mt-2 text-sm text-ink-muted">
                Add your first product in the Studio at <code>/studio</code>.
              </p>
            </div>
          ) : (
            <div className="flex gap-3 sm:gap-5 overflow-x-auto scrollbar-hide px-4 sm:px-6 lg:px-10 pb-2">
              {newArrivals.map((p, i) => (
                <ScrollReveal key={p.slug} delay={i * 60}>
                  <ProductCard product={p} index={i} width="fixed" />
                </ScrollReveal>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ABOUT STRIP */}
      <section className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10 mt-28 sm:mt-40">
        <div className="grid gap-10 sm:gap-16 sm:grid-cols-12 items-start">
          <ScrollReveal className="sm:col-span-7">
            <p className="font-display text-[34px] sm:text-[44px] leading-[1.1] tracking-[-0.01em]">
              We find the ones <span className="italic text-accent-dark">worth keeping.</span>
            </p>
          </ScrollReveal>
          <ScrollReveal delay={120} className="sm:col-span-5 sm:pt-3">
            <p className="text-base sm:text-[17px] text-ink-muted leading-relaxed">
              Isla Thrifts is a curated thrift store for branded and quality pieces — clothes,
              bags, and shoes — sourced and verified for people who want the real thing without
              the full price. Based in the Philippines. Shipping nationwide.
            </p>
            <Link
              href="/about"
              className="mt-6 inline-flex items-center text-sm uppercase tracking-wide2 text-ink press hover:text-accent-dark"
            >
              Our process →
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* FEATURED COLLECTION BANNER */}
      <section className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10 mt-28 sm:mt-40">
        <div className="grid gap-0 sm:gap-0 sm:grid-cols-2 overflow-hidden rounded-xl border border-sand-200 bg-sand-100">
          <ScrollReveal className="relative aspect-[4/3] sm:aspect-auto sm:min-h-[480px]">
            <PlaceholderImage kind="featured" index={3} />
          </ScrollReveal>
          <ScrollReveal delay={120} className="p-8 sm:p-14 lg:p-20 flex flex-col justify-center">
            <p className="text-xs uppercase tracking-wide2 text-ink-muted">Featured</p>
            <h2 className="mt-3 font-display text-3xl sm:text-5xl leading-[1.05]">
              Bags Drop.
            </h2>
            <p className="mt-4 text-ink-muted max-w-md leading-relaxed">
              Designer carry — Louis Vuitton, Coach, Longchamp — fully authenticated and ready
              to ship. Hand-picked from private collections across Manila.
            </p>
            <div className="mt-8">
              <Link
                href="/collections/bags"
                className="inline-flex items-center px-7 py-4 bg-ink text-sand-50 text-sm uppercase tracking-wide2 press hover:bg-accent-dark"
              >
                Shop the drop
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* CONDITION GUIDE */}
      <section className="mt-28 sm:mt-40 bg-sand-100">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10 py-16 sm:py-24">
          <ScrollReveal>
            <p className="text-xs uppercase tracking-wide2 text-ink-muted">Reading the labels</p>
            <h2 className="mt-2 font-display text-3xl sm:text-4xl max-w-2xl">
              What do the condition labels mean?
            </h2>
          </ScrollReveal>

          <div className="mt-10 grid gap-6 sm:grid-cols-3 sm:gap-8">
            {[
              {
                label: "Like New",
                icon: (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2l2.6 6.6L22 9.7l-5.4 4.9L18 22l-6-3.5L6 22l1.4-7.4L2 9.7l7.4-1.1L12 2Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
                  </svg>
                ),
                desc: "Worn once or twice. No visible flaws. Looks fresh out of the bag.",
              },
              {
                label: "Good",
                icon: (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                    <path d="M5 12l4 4 10-10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ),
                desc: "Light, expected wear. Fully wearable. Documented in detail per item.",
              },
              {
                label: "Fair",
                icon: (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="3" fill="currentColor" />
                  </svg>
                ),
                desc: "Visible wear, character intact. Priced honestly for what it is.",
              },
            ].map((c, i) => (
              <ScrollReveal key={c.label} delay={i * 80}>
                <div className="bg-sand-50 border border-sand-200 rounded-xl p-7 h-full">
                  <div className="w-10 h-10 rounded-full bg-sand-100 flex items-center justify-center text-accent-dark mb-5">
                    {c.icon}
                  </div>
                  <p className="font-display text-2xl">{c.label}</p>
                  <p className="mt-2 text-sm text-ink-muted leading-relaxed">{c.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
