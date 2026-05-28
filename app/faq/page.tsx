import type { Metadata } from "next";
import { Accordion } from "@/components/Accordion";
import { ScrollReveal } from "@/components/ScrollReveal";

export const metadata: Metadata = {
  title: "FAQ & Shipping",
  description: "How Isla Thrifts sources, ships, and handles payments.",
};

const faqs = [
  {
    q: "Are these real branded pieces?",
    a: "Yes — that's the whole point of what we do. We comb through thrift stores ourselves and only list pieces that are clearly the real label and in solid, wearable condition. If we're not confident in a piece, we leave it on the rack. What you see online is what we'd wear ourselves.",
  },
  {
    q: "How do I reserve and pay?",
    a: "Tap Reserve on any item — Messenger opens with the product details already typed in. Instagram doesn't let us prefill the chat, so we copy the reservation text to your clipboard automatically — just paste it once IG opens. We confirm availability, then send payment instructions (GCash, Maya, bank transfer, or COD). The item is held for 24 hours once you confirm.",
  },
  {
    q: "What is your return policy?",
    a: "All thrift sales are final. Because everything is one-of-a-kind and pre-owned, we document condition in detail upfront. Photos, measurements, and notes are honest — what you see is what ships.",
  },
  {
    q: "How long does shipping take?",
    a: "Shipping time depends on where you are in the Philippines — usually a couple of days for nearby areas and up to a week for farther provinces via J&T or LBC. Tracking is sent the moment we dispatch.",
  },
  {
    q: "Do you ship nationwide?",
    a: "Yes — anywhere in the Philippines. Shipping rates depend on your location and are quoted on DM before you pay.",
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
          Quick answers on how we source, ship, and handle payments.
        </p>
      </ScrollReveal>

      <div className="mt-14">
        <Accordion items={faqs} />
      </div>

      <div className="mt-20 grid gap-8 sm:grid-cols-2">
        <ScrollReveal>
          <div className="rounded-2xl bg-sand-100 p-7 h-full">
            <p className="text-xs uppercase tracking-wide2 text-accent-dark">Shipping map</p>
            <h3 className="mt-2 font-brand text-3xl text-ink">Nationwide PH delivery</h3>
            <div className="mt-5 flex justify-center">
              <div
                aria-hidden
                className="w-full max-w-[260px] aspect-square bg-palm"
                style={{
                  WebkitMaskImage: "url(/ph-map.png)",
                  maskImage: "url(/ph-map.png)",
                  WebkitMaskSize: "165%",
                  maskSize: "165%",
                  WebkitMaskRepeat: "no-repeat",
                  maskRepeat: "no-repeat",
                  WebkitMaskPosition: "center",
                  maskPosition: "center",
                }}
              />
            </div>
            <p className="mt-4 text-sm text-ink-muted leading-relaxed">
              Delivery time and shipping rates depend on where you are. We quote your shipping fee on DM before you pay.
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
