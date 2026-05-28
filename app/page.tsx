import Link from "next/link";
import { ScrollReveal } from "@/components/ScrollReveal";
import { ProductCard } from "@/components/ProductCard";
import { CategoryTile } from "@/components/CategoryTile";
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
        <div className="absolute inset-0 bg-gradient-to-b from-black/15 via-black/10 to-black/40" />

        <div className="relative z-10 w-full mx-auto max-w-[1400px] px-5 sm:px-6 lg:px-10 pt-24 sm:pt-28 pb-24 text-center">
          <ScrollReveal>
            <p className="text-[10px] sm:text-xs uppercase tracking-[0.28em] sm:tracking-[0.3em] text-white/90 drop-shadow">
              Curated drops · Philippines
            </p>
          </ScrollReveal>

          <ScrollReveal delay={80}>
            <h1
              className="mt-5 sm:mt-6 font-brand text-[64px] sm:text-[112px] lg:text-[168px] leading-[0.9] text-white"
              style={{
                textShadow:
                  "0 2px 6px rgba(0,0,0,0.45), 0 8px 24px rgba(0,0,0,0.55), 0 16px 48px rgba(0,0,0,0.35)",
              }}
            >
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
        </div>
      </section>

      {/* NEW ARRIVALS */}
      <section className="mt-16 sm:mt-24">
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
            <div className="mx-4 sm:mx-6 lg:mx-10 bg-pool rounded-2xl py-16 text-center">
              <p className="font-brand text-3xl text-ink">No drops yet.</p>
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

      {/* CATEGORY GRID */}
      <section className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10 mt-24 sm:mt-32">
        <ScrollReveal className="flex items-end justify-between mb-6 sm:mb-10">
          <div>
            <p className="text-xs uppercase tracking-wide2 text-accent-dark">Categories</p>
            <h2 className="mt-2 font-brand text-4xl sm:text-6xl text-ink">Find your lane.</h2>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-5">
          {[
            {
              href: "/collections/clothing",
              label: "Clothing",
              bgImage: "/category-clothing.jpg",
              bgPosition: "center",
              bgScale: 1,
            },
            { href: "/collections/bags", label: "Bags" },
            {
              href: "/collections/shoes",
              label: "Shoes",
              bgImage: "/category-shoes.jpg",
              bgPosition: "center",
              bgScale: 1.05,
            },
          ].map((cat, i) => (
            <ScrollReveal key={cat.href} delay={i * 80}>
              <CategoryTile
                href={cat.href}
                label={cat.label}
                index={i}
                bgImage={cat.bgImage}
                bgPosition={cat.bgPosition}
                bgScale={cat.bgScale}
              />
            </ScrollReveal>
          ))}
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
                key: "like_new",
                tone: "bg-gray-200 text-sun",
                icon: (
                  <svg width="44" height="44" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2l2.6 6.6L22 9.7l-5.4 4.9L18 22l-6-3.5L6 22l1.4-7.4L2 9.7l7.4-1.1L12 2Z" stroke="currentColor" strokeWidth="1" strokeLinejoin="round" />
                  </svg>
                ),
                desc: "Worn once or twice. No visible flaws. Looks fresh out of the bag.",
              },
              {
                key: "good",
                tone: "bg-gray-200 text-accent-dark",
                icon: (
                  <svg width="44" height="44" viewBox="0 0 24 24" fill="none">
                    <path d="M5 12l4 4 10-10" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ),
                desc: "Light, expected wear. Fully wearable. Documented in detail per item.",
              },
              {
                key: "fair",
                tone: "bg-gray-200 text-ink-muted",
                icon: (
                  <svg width="52" height="52" viewBox="0 0 24 24" fill="none">
                    <path d="M3 13c1.6-3.2 4-3.2 6 0s4.4 3.2 6 0 4.4-3.2 6 0" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ),
                desc: "Visible wear, character intact. Priced honestly for what it is.",
              },
            ].map((c, i) => (
              <ScrollReveal key={c.key} delay={i * 80}>
                <div className="bg-sand-50 border border-sand-200 rounded-xl p-7 h-full flex flex-col items-center text-center">
                  <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-5 ${c.tone}`}>
                    {c.icon}
                  </div>
                  <p className="text-sm text-ink-muted leading-relaxed">{c.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
