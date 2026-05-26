import type { Metadata } from "next";
import Link from "next/link";
import { PlaceholderImage } from "@/components/PlaceholderImage";
import { ScrollReveal } from "@/components/ScrollReveal";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "About",
  description: site.description,
};

const steps = [
  {
    n: "01",
    title: "Find",
    body: "We hunt private collections, estate clear-outs, and the rare seller across Manila who knows what they have.",
  },
  {
    n: "02",
    title: "Authenticate",
    body: "Every branded item is verified — stitching, hardware, date codes, materials. If it doesn't pass, it doesn't list.",
  },
  {
    n: "03",
    title: "Ship",
    body: "Photographed, documented, and shipped nationwide. One-of-a-kind means once it's gone, it's gone.",
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="bg-pool relative overflow-hidden">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10 pt-12 sm:pt-20 pb-16">
        <div className="grid gap-12 lg:gap-20 lg:grid-cols-12 items-start">
          <ScrollReveal className="lg:col-span-7">
            <p className="text-xs uppercase tracking-wide2 text-accent-dark">About</p>
            <h1 className="mt-3 font-brand text-6xl sm:text-8xl leading-[0.95] text-ink">
              The good stuff,<br />
              <span className="text-accent-dark">honestly priced.</span>
            </h1>
            <p className="mt-8 max-w-xl text-[17px] sm:text-lg leading-relaxed text-ink-muted">
              {site.description}
            </p>
            <p className="mt-6 max-w-xl text-[17px] sm:text-lg leading-relaxed text-ink-muted">
              {/* PLACEHOLDER: Client to replace with real founder story / origin. */}
              We started Isla Thrifts because the people we know — friends, family, neighbors —
              shouldn&apos;t have to choose between affording the brands they love and trusting
              that what they&apos;re buying is real. So we do the work in between.
            </p>
            <p className="mt-10 font-display italic text-xl text-ink-muted">
              {site.tagline}
            </p>
          </ScrollReveal>

          <ScrollReveal delay={120} className="lg:col-span-5">
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl shadow-xl shadow-accent/10">
              <PlaceholderImage kind="about" index={2} />
            </div>
          </ScrollReveal>
        </div>
        </div>
      </section>

      <section className="bg-sunset mt-0">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10 py-20 sm:py-28">
          <ScrollReveal>
            <p className="text-xs uppercase tracking-wide2 text-coral-dark">How it works</p>
            <h2 className="mt-2 font-brand text-5xl sm:text-7xl text-ink">Three steps.</h2>
          </ScrollReveal>

          <ol className="mt-12 grid gap-8 sm:grid-cols-3 sm:gap-10">
            {steps.map((s, i) => (
              <ScrollReveal key={s.n} delay={i * 100} as="li">
                <p className="font-brand text-7xl text-accent-dark leading-none">{s.n}</p>
                <p className="mt-4 font-display text-2xl">{s.title}</p>
                <p className="mt-2 text-ink-muted leading-relaxed">{s.body}</p>
              </ScrollReveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10 py-24 sm:py-32">
        <ScrollReveal className="max-w-2xl">
          <h2 className="font-brand text-5xl sm:text-7xl text-ink leading-[1.0]">
            Have something to sell or trade?
          </h2>
          <p className="mt-4 text-ink-muted leading-relaxed">
            We&apos;re always looking for branded pieces with real provenance. DM us on
            Instagram with photos and we&apos;ll come back with an offer.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={`https://ig.me/m/${site.social.instagram}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-tropical inline-flex items-center px-7 py-4 rounded-full text-sm uppercase tracking-wide2"
            >
              DM on Instagram
            </a>
            <Link
              href="/faq"
              className="inline-flex items-center px-7 py-4 rounded-full text-sm uppercase tracking-wide2 text-ink-muted press hover:text-ink"
            >
              Read the FAQ →
            </Link>
          </div>
        </ScrollReveal>
      </section>
    </>
  );
}
