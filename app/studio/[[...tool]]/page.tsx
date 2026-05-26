// Embedded Sanity Studio at /studio.
// Client logs in here with their email-invited account.
// Shows a setup screen when Sanity env isn't configured yet.

"use client";

import { NextStudio } from "next-sanity/studio";
import config from "@/sanity.config";
import { isSanityConfigured } from "@/sanity/env";

export const dynamic = "force-static";

export default function StudioPage() {
  if (!isSanityConfigured) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-sand-50 px-6">
        <div className="max-w-lg text-center">
          <p className="text-xs uppercase tracking-[0.18em] text-ink-muted">Studio</p>
          <h1 className="mt-3 font-display text-4xl">Almost ready.</h1>
          <p className="mt-4 text-ink-muted leading-relaxed">
            Sanity isn&apos;t configured yet. Create a project at{" "}
            <a
              className="underline text-accent-dark"
              href="https://www.sanity.io/manage"
              target="_blank"
              rel="noopener noreferrer"
            >
              sanity.io/manage
            </a>
            , then add the project ID to{" "}
            <code className="px-1.5 py-0.5 bg-sand-100 rounded text-sm">.env.local</code>{" "}
            and restart the server. See <code className="px-1.5 py-0.5 bg-sand-100 rounded text-sm">HANDOFF.md</code> for the full setup.
          </p>
        </div>
      </div>
    );
  }
  return <NextStudio config={config} />;
}
