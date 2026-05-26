import Link from "next/link";
import { ScrollReveal } from "@/components/ScrollReveal";
import { ProductCard } from "@/components/ProductCard";
import { CategoryTile } from "@/components/CategoryTile";
import { PlaceholderImage } from "@/components/PlaceholderImage";
import { HeroActions } from "@/components/HeroActions";
import { getProductsInCollection } from "@/lib/products";
import { site } from "@/data/site";

export default async function HomePage() {
  const newArrivals = (await getProductsInCollection("new-arrivals")).slice(0, 6);

  return (
    <>
      {/* HERO — full-bleed tropical background, mobile-first */}
      <section className="relative -mt-16 min-h-[100svh] flex items-center justify-center overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/hero-bg.jpg"
          alt=""
          aria-hidden
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/0 to-black/35" />

        <div className="relative z-10 w-full mx-auto max-w-[1400px] px-5 sm:px-6 lg:px-10 pt-24 sm:pt-28 pb-24 text-center">
          <ScrollReveal>
            <p className="text-[10px] sm:text-xs uppercase tracking-[0.28em] sm:tracking-[0.3em] text-white/90 drop-shadow">
              Curated drops · Philippines
            </p>
          </ScrollReveal>

          <ScrollReveal delay={80}>
            <h1 className="mt-5 sm:mt-6 font-brand text-[64px] sm:text-[112px] lg:text-[168px] leading-[0.9] text-white drop-shadow-[0_6px_24px_rgba(0,0,0,0.35)]">
              {site.name}
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={160}>
            <p className="mt-5 sm:mt-6 font-display italic text-base sm:text-2xl text-white/95 max-w-[18rem] sm:max-w-xl mx-auto drop-shadow leading-snug">
              {site.tagline}
            </p>
          </ScrollReveal>

          <ScrollReveal delay={240}>
            <HeroActions />
          </ScrollReveal>

          <div className="absolute bottom-5 left-1/2 -translate-x-1/2">
            <span className="inline-block bg-white/85 backdrop-blur px-3 py-1 text-[10px] uppercase tracking-wide2 text-ink rounded-full">
              Drop · {new Date().toLocaleString("en-US", { month: "long", year: "numeric" })}
            </span>
          </div>
        </div>
      </section>

      {/* CATEGORY GRID */}
      <section className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10 mt-12 sm:mt-20">
        <ScrollReveal className="flex items-end justify-between mb-6 sm:mb-10">
          <div>
            <p className="text-xs uppercase tracking-wide2 text-accent-dark">Categories</p>
            <h2 className="mt-2 font-brand text-4xl sm:text-6xl text-ink">Find your lane.</h2>
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
              <h2 className="font-brand text-5xl sm:text-7xl text-ink leading-none">New In</h2>
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
            <p className="font-brand text-5xl sm:text-7xl text-ink leading-[1.0]">
              We find the ones <span className="text-accent-dark">worth keeping.</span>
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
        <div className="grid gap-0 sm:gap-0 sm:grid-cols-2 overflow-hidden rounded-2xl bg-pool shadow-xl shadow-accent/10">
          <ScrollReveal className="relative aspect-[4/3] sm:aspect-auto sm:min-h-[480px]">
            <PlaceholderImage kind="featured" index={1} />
          </ScrollReveal>
          <ScrollReveal delay={120} className="p-8 sm:p-14 lg:p-20 flex flex-col justify-center">
            <p className="text-xs uppercase tracking-wide2 text-accent-dark">Featured</p>
            <h2 className="mt-3 font-brand text-5xl sm:text-7xl text-ink leading-[0.95]">
              Bags Drop.
            </h2>
            <p className="mt-4 text-ink-muted max-w-md leading-relaxed">
              Designer carry — Louis Vuitton, Coach, Longchamp — fully authenticated and ready
              to ship. Hand-picked from private collections across Manila.
            </p>
            <div className="mt-8">
              <Link
                href="/collections/bags"
                className="btn-tropical inline-flex items-center px-7 py-4 rounded-full text-sm uppercase tracking-wide2"
              >
                Shop the drop
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* CONDITION GUIDE */}
      <section className="mt-28 sm:mt-40 bg-pool">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10 py-16 sm:py-24">
          <ScrollReveal>
            <p className="text-xs uppercase tracking-wide2 text-accent-dark">Reading the labels</p>
            <h2 className="mt-2 font-brand text-4xl sm:text-6xl text-ink max-w-2xl leading-[0.95]">
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
