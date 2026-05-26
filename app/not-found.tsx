import Link from "next/link";

export default function NotFound() {
  return (
    <section className="mx-auto max-w-[700px] px-4 sm:px-6 py-32 text-center">
      <p className="text-xs uppercase tracking-wide2 text-accent-dark">404</p>
      <h1 className="mt-3 font-brand text-6xl sm:text-7xl text-ink leading-[0.95]">
        Already gone.
      </h1>
      <p className="mt-4 text-ink-muted">
        One-of-a-kind pieces don&apos;t wait around. Try a fresh drop.
      </p>
      <Link
        href="/collections/new-arrivals"
        className="btn-tropical mt-8 inline-flex items-center px-7 py-4 rounded-full text-sm uppercase tracking-wide2"
      >
        New Arrivals
      </Link>
    </section>
  );
}
