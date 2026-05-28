import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { ConditionBadge } from "@/components/ConditionBadge";
import { ProductGallery } from "@/components/ProductGallery";
import { ReserveButton } from "@/components/ReserveButton";
import { Accordion } from "@/components/Accordion";
import { ScrollReveal } from "@/components/ScrollReveal";
import { ProductCard } from "@/components/ProductCard";
import {
  getAllProductSlugs,
  getAllProducts,
  getProduct,
} from "@/lib/products";

type Params = { slug: string };

export async function generateStaticParams(): Promise<Params[]> {
  const slugs = await getAllProductSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = await getProduct(slug);
  if (!p) return {};
  return {
    title: `${p.brand} ${p.title}`,
    description: p.notes,
  };
}

function peso(n: number) {
  return `₱${n.toLocaleString("en-PH")}`;
}

export default async function ProductPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) notFound();

  const all = await getAllProducts();
  const related = all
    .filter((p) => p.slug !== product.slug && p.category === product.category)
    .slice(0, 4);

  return (
    <section className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10 pt-8 sm:pt-12 pb-20">
      <nav className="text-xs uppercase tracking-wide2 text-ink-muted mb-6">
        <Link href="/" className="hover:text-ink press">Home</Link>
        <span className="mx-2">·</span>
        <Link href={`/collections/${product.category}`} className="hover:text-ink press capitalize">
          {product.category}
        </Link>
        <span className="mx-2">·</span>
        <span className="text-ink">{product.brand}</span>
      </nav>

      <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 items-start">
        <ProductGallery
          images={product.images ?? []}
          alt={`${product.brand} ${product.title}`}
        />

        <div className="lg:sticky lg:top-24">
          <p className="text-xs uppercase tracking-wide2 text-accent-dark">{product.brand}</p>
          <h1 className="mt-2 font-brand text-4xl sm:text-5xl leading-tight text-ink">
            {product.title}
          </h1>

          <div className="mt-5 flex items-baseline gap-3">
            <p className="font-brand text-3xl text-accent-dark">{peso(product.price)}</p>
            {product.comparePrice && (
              <p className="text-base text-ink-muted line-through">
                {peso(product.comparePrice)}
              </p>
            )}
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-2">
            <ConditionBadge condition={product.condition} />
            <span className="inline-flex items-center rounded-full bg-sand-100 text-ink ring-1 ring-inset ring-accent/20 px-2.5 py-1 text-[11px] uppercase tracking-wide2">
              Size {product.size}
            </span>
            {product.sold ? (
              <span className="inline-flex items-center rounded-full bg-ink text-sand-50 px-2.5 py-1 text-[11px] uppercase tracking-wide2">
                Sold
              </span>
            ) : (
              <span className="text-[11px] italic text-ink-muted">
                Only 1 available. Once it&apos;s gone, it&apos;s gone.
              </span>
            )}
          </div>

          <p className="mt-7 text-[15px] text-ink-muted leading-relaxed whitespace-pre-line">
            {product.notes}
          </p>

          <div className="mt-8">
            <ReserveButton product={product} full />
            <p className="mt-3 text-xs text-ink-muted text-center">
              Reserve via DM. Payment instructions sent once we confirm.
            </p>
          </div>

          <div className="mt-8 grid grid-cols-3 gap-3 text-[11px] uppercase tracking-wide2 text-ink-muted">
            <TrustItem
              icon={
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M12 3l8 3v6c0 4-3.5 7.5-8 9-4.5-1.5-8-5-8-9V6l8-3Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
                  <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              }
              label="Authenticated"
            />
            <TrustItem
              icon={
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M3 10h13l3 3v5H3z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
                  <circle cx="7" cy="20" r="1.6" stroke="currentColor" strokeWidth="1.4" />
                  <circle cx="17" cy="20" r="1.6" stroke="currentColor" strokeWidth="1.4" />
                </svg>
              }
              label="Ships Nationwide"
            />
            <TrustItem
              icon={
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M4 7h16M4 12h16M4 17h10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                </svg>
              }
              label="Detailed Notes"
            />
          </div>

          <div className="mt-10">
            <Accordion
              items={[
                ...(product.measurements
                  ? [{ q: "Measurements", a: <p>{product.measurements}</p> }]
                  : []),
                ...(product.authentication
                  ? [{ q: "Authentication", a: <p>{product.authentication}</p> }]
                  : []),
                {
                  q: "Shipping",
                  a: (
                    <p>
                      Nationwide via J&amp;T or LBC. Shipping rate depends on where
                      you&apos;re located — we quote your fee on DM before payment.
                      Tracking sent after dispatch.
                    </p>
                  ),
                },
                {
                  q: "Returns",
                  a: (
                    <p>
                      All thrift sales are final. We document condition in detail and ship
                      only after you&apos;ve seen the photos and confirmed via DM.
                    </p>
                  ),
                },
              ]}
            />
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <div className="mt-28 sm:mt-36">
          <ScrollReveal className="flex items-end justify-between mb-6 sm:mb-8">
            <h2 className="font-brand text-4xl sm:text-5xl text-ink capitalize">More in {product.category}</h2>
            <Link
              href={`/collections/${product.category}`}
              className="text-sm uppercase tracking-wide2 text-ink-muted press hover:text-ink"
            >
              View all →
            </Link>
          </ScrollReveal>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
            {related.map((p, i) => (
              <ScrollReveal key={p.slug} delay={i * 60}>
                <ProductCard product={p} index={i} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

function TrustItem({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex flex-col items-center text-center gap-2 py-3 border-y border-accent/20">
      <span className="text-accent-dark">{icon}</span>
      <span>{label}</span>
    </div>
  );
}
