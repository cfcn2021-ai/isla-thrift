import Link from "next/link";
import { site } from "@/data/site";
import {
  facebookProfileUrl,
  instagramFirstDibsUrl,
  instagramProfileUrl,
  tiktokProfileUrl,
} from "@/lib/dm";

const trustPillars = [
  "Authenticated before listing",
  "Reserve via DM — no payment until you confirm",
  "Nationwide shipping",
];

export function Footer() {
  return (
    <>
      {/* TRUST STRIP — thin band immediately above footer.
          Stays understated so it reinforces the buying story without shouting. */}
      <section className="mt-24 bg-sand-100 border-y border-sand-200">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10 py-5 grid gap-3 sm:gap-6 sm:grid-cols-3">
          {trustPillars.map((p) => (
            <div
              key={p}
              className="flex items-center justify-center gap-2.5 text-[12px] sm:text-[13px] tracking-wide text-ink-muted text-center sm:text-left"
            >
              <span className="inline-block w-1 h-1 rounded-full bg-accent-dark shrink-0" />
              <span>{p}</span>
            </div>
          ))}
        </div>
      </section>

      <footer className="bg-sand-50">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10 py-16">
          <div className="grid gap-12 md:grid-cols-12">
            <div className="md:col-span-5">
              <p className="font-display text-2xl tracking-[0.06em] uppercase">
                {site.name}
              </p>
              <p className="mt-3 font-display italic text-ink-muted">
                {site.tagline}
              </p>
              <p className="mt-6 text-sm text-ink-muted max-w-md leading-relaxed">
                {site.description}
              </p>

              {/* FIRST-DIBS CTA — styled like a newsletter signup, but actually opens
                  Instagram DM with a prefilled message. No ESP infrastructure to
                  set up; the client manages drops through the same inbox they
                  already check. Swap to a real email tool later if needed. */}
              <div className="mt-8 max-w-md">
                <p className="font-display text-lg leading-snug">
                  Get first dibs on new arrivals.
                </p>
                <p className="mt-1 text-sm text-ink-muted">
                  Drops sell fast. DM us to be added to the early-access list — no spam, just the good stuff.
                </p>
                <a
                  href={instagramFirstDibsUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center px-6 py-3 bg-ink text-sand-50 text-sm uppercase tracking-wide2 press hover:bg-accent-dark"
                >
                  Add me on Instagram →
                </a>
              </div>
            </div>

            <div className="md:col-span-3">
              <p className="text-xs uppercase tracking-wide2 text-ink-muted mb-4">Shop</p>
              <ul className="space-y-2.5 text-sm">
                <li><Link className="press hover:text-accent-dark" href="/collections/new-arrivals">New Arrivals</Link></li>
                <li><Link className="press hover:text-accent-dark" href="/collections/clothing">Clothing</Link></li>
                <li><Link className="press hover:text-accent-dark" href="/collections/bags">Bags</Link></li>
                <li><Link className="press hover:text-accent-dark" href="/collections/shoes">Shoes</Link></li>
                <li><Link className="press hover:text-accent-dark" href="/brands">Brands</Link></li>
                <li><Link className="press hover:text-accent-dark" href="/collections/sale">Sale</Link></li>
              </ul>
            </div>

            <div className="md:col-span-2">
              <p className="text-xs uppercase tracking-wide2 text-ink-muted mb-4">Info</p>
              <ul className="space-y-2.5 text-sm">
                <li><Link className="press hover:text-accent-dark" href="/about">About</Link></li>
                <li><Link className="press hover:text-accent-dark" href="/faq">FAQ / Shipping</Link></li>
              </ul>
            </div>

            <div className="md:col-span-2">
              <p className="text-xs uppercase tracking-wide2 text-ink-muted mb-4">Follow</p>
              <ul className="space-y-2.5 text-sm">
                <li><a className="press hover:text-accent-dark" href={instagramProfileUrl()} target="_blank" rel="noopener noreferrer">Instagram</a></li>
                <li><a className="press hover:text-accent-dark" href={tiktokProfileUrl()} target="_blank" rel="noopener noreferrer">TikTok</a></li>
                <li><a className="press hover:text-accent-dark" href={facebookProfileUrl()} target="_blank" rel="noopener noreferrer">Facebook</a></li>
              </ul>
            </div>
          </div>

          <div className="mt-14 pt-8 border-t border-sand-200 grid gap-4 md:grid-cols-2 text-xs text-ink-muted">
            <p>© 2025 {site.name}. All rights reserved.</p>
            <p className="md:text-right">
              Reserve any item via DM. Payment instructions sent after we confirm availability — GCash, Maya, bank transfer, or COD.
            </p>
            <p className="md:col-span-2">All items are pre-owned and authenticated before listing.</p>
          </div>
        </div>
      </footer>
    </>
  );
}
