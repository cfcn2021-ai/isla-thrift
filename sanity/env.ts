// Read env vars without throwing.
// If Sanity isn't configured yet, the site still builds and runs — fetchers return
// empty arrays and the homepage shows a "no drops yet" state. Set NEXT_PUBLIC_SANITY_PROJECT_ID
// in .env.local to activate.

export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2025-01-01";

export const dataset =
  process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "";

export const isSanityConfigured = projectId.length > 0;

export const readToken = process.env.SANITY_API_READ_TOKEN || "";
export const revalidateSecret = process.env.SANITY_REVALIDATE_SECRET || "";
