import Link from "next/link";

export default function NotFound() {
  return (
    <section className="mx-auto max-w-[700px] px-4 sm:px-6 py-32 text-center">
      <p className="text-xs uppercase tracking-wide2 text-ink-muted">404</p>
      <h1 className="mt-3 font-display text-5xl sm:text-6xl leading-[1.05]">
        Already gone.
      </h1>
      <p className="mt-4 text-ink-muted">
        One-of-a-kind pieces don&apos;t wait around. Try a fresh drop.
      </p>
      <Link
        href="/collections/new-arrivals"
        className="mt-8 inline-flex items-center px-7 py-4 bg-ink text-sand-50 text-sm uppercase tracking-wide2 press hover:bg-accent-dark"
      >
        New Arrivals
      </Link>
    </section>
  );
}
