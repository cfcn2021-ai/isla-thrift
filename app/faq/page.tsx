import type { Metadata } from "next";
import { Accordion } from "@/components/Accordion";
import { ScrollReveal } from "@/components/ScrollReveal";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "FAQ & Shipping",
  description: "How Isla Thrifts authenticates, ships, and handles payments.",
};

const faqs = [
  {
    q: "How do I know items are authentic?",
    a: "Every branded item is verified before listing — stitching, hardware, date codes, materials, and reference comparisons. The authentication notes for each piece appear on its product page. If something can't be verified, it doesn't go up.",
  },
  {
    q: "How do I reserve and pay?",
    a: "Tap Reserve on any item — it opens a prefilled DM on Instagram or Messenger with the product details. We confirm availability, then send payment instructions (GCash, Maya, bank transfer, or COD). The item is held for 24 hours once you confirm.",
  },
  {
    q: "What is your return policy?",
    a: "All thrift sales are final. Because everything is one-of-a-kind and pre-owned, we document condition in detail upfront. Photos, measurements, and notes are honest — what you see is what ships.",
  },
  {
    q: "How long does shipping take?",
    a: "Metro Manila: 1–2 days via Grab or J&T. Provincial: 3–7 days via J&T or LBC depending on location. Tracking is sent the moment we dispatch.",
  },
  {
    q: "Do you ship nationwide?",
    a: "Yes — anywhere in the Philippines. Free shipping on orders ₱1,500 and above.",
  },
  {
    q: "What payment methods do you accept?",
    a: "GCash, Maya, bank transfer (BPI / BDO / UnionBank), and Cash on Delivery for select areas. We'll walk you through it on DM.",
  },
  {
    q: "What do the condition labels mean?",
    a: "Like New — worn once or twice, no visible flaws. Good — light, expected wear, fully wearable, documented in detail. Fair — visible wear with character intact, priced honestly.",
  },
  {
    q: "Can I sell or trade my own pieces?",
    a: "Yes — DM us on Instagram with clear photos and we'll come back with an offer if it's a fit.",
  },
];

export default function FAQPage() {
  return (
    <section className="mx-auto max-w-[1100px] px-4 sm:px-6 lg:px-10 pt-12 sm:pt-20 pb-24">
      <ScrollReveal>
        <p className="text-xs uppercase tracking-wide2 text-accent-dark">Help</p>
        <h1 className="mt-3 font-brand text-5xl sm:text-7xl text-ink leading-[0.95]">
          FAQ &amp; Shipping
        </h1>
        <p className="mt-5 max-w-xl text-ink-muted leading-relaxed">
          Quick answers on how we authenticate, ship, and handle payments.
        </p>
      </ScrollReveal>

      <div className="mt-14">
        <Accordion items={faqs} />
      </div>

      <div className="mt-20 grid gap-8 sm:grid-cols-2">
        <ScrollReveal>
          <div className="rounded-2xl bg-pool p-7 h-full">
            <p className="text-xs uppercase tracking-wide2 text-accent-dark">Shipping map</p>
            <h3 className="mt-2 font-brand text-3xl text-ink">Nationwide PH delivery</h3>
            <div className="mt-5">
              <svg viewBox="0 0 200 240" className="w-full max-w-[200px] h-auto text-accent-dark">
                {/* Simplified PH archipelago silhouette */}
                <path
                  d="M70 25c8-2 18 2 22 12s-2 22-10 26c-6 3-14 3-18 9s-2 16 4 22 16 6 22 14c5 8 4 20-2 26-7 8-20 4-30 10-10 5-14 18-22 22-9 4-22-4-26-14s4-22 14-26c8-3 18-2 22-10 4-8-2-16-2-24s10-14 18-18c8-4 14-12 14-22-2-12 4-22 14-26Z"
                  fill="currentColor"
                  opacity="0.15"
                />
                <circle cx="100" cy="80" r="4" fill="currentColor" />
                <circle cx="78" cy="130" r="3" fill="currentColor" opacity="0.7" />
                <circle cx="122" cy="170" r="3" fill="currentColor" opacity="0.7" />
                <circle cx="92" cy="200" r="3" fill="currentColor" opacity="0.7" />
              </svg>
            </div>
            <p className="mt-4 text-sm text-ink-muted leading-relaxed">
              Metro Manila: 1–2 days. Provincial: 3–7 days. Free shipping on orders
              ₱{site.shipping.freeAbove.toLocaleString("en-PH")} and above.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={120}>
          <div className="rounded-2xl bg-pool p-7 h-full">
            <p className="text-xs uppercase tracking-wide2 text-accent-dark">Payments</p>
            <h3 className="mt-2 font-brand text-3xl text-ink">Accepted methods</h3>
            <ul className="mt-5 grid grid-cols-2 gap-2 text-sm">
              <li className="px-3 py-2 rounded-full bg-white/70 text-ink">GCash</li>
              <li className="px-3 py-2 rounded-full bg-white/70 text-ink">Maya</li>
              <li className="px-3 py-2 rounded-full bg-white/70 text-ink">Bank Transfer</li>
              <li className="px-3 py-2 rounded-full bg-white/70 text-ink">COD (select areas)</li>
            </ul>
            <p className="mt-4 text-sm text-ink-muted leading-relaxed">
              We send payment details on DM once you confirm the item. No checkout fees.
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
