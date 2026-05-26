# Isla Thrifts — Teardown punch list implementation

Source: `teardown-beyondarchivesph-2026-05-26.md` (P0 punch list).

## Mistakes we explicitly did NOT copy from Beyond Archives

- ❌ Hamburger nav on desktop — kept horizontal nav on `md+`
- ❌ Tiny submark logo dead-center — kept left-aligned wordmark
- ❌ 82% sold-out dominates the page — **hide sold by default**, opt-in toggle reveals archive
- ❌ No condition labels — first-class card pill + filter facet
- ❌ No trust signals — explicit trust strip above footer (every page)
- ❌ Heavy blur/dim on sold items (graveyard feel) — subtle `grayscale-[55%]` only
- ❌ Generic "Add to cart" CTAs — kept "Reserve via DM" personality

## Tasks

- [x] **1. Footer**: newsletter capture ("get first dibs on new arrivals") + trust strip above footer. Newsletter routes to IG DM with prefilled message (no ESP setup needed → matches build-and-leave).
- [x] **2. ProductCard**: replaced heavy blur on sold items with subtle grayscale + sold-out badge. Added 2-image cross-fade on hover when 2+ images exist.
- [x] **3. Brand data layer**: added `allBrandsQuery`, `productsByBrandQuery` to `sanity/queries.ts`; added `getAllBrands()`, `getProductsByBrand()`, `slugifyBrand()` to `lib/products.ts`.
- [x] **4. Brand routes**: `/brands` index (A-Z list with counts), `/brands/[slug]` listing using same toolbar UI as collection pages.
- [x] **5. Nav update**: added Brands link to `Nav.tsx` links array (auto-inherited by `MobileMenu`).
- [x] **6. Collection filters**: tightened grid to `gap-2 sm:gap-3`; converted decorative sort/filter UI to functional URL-searchParams-driven controls. New `CollectionToolbar` + `CollectionSortBar` client components + pure `lib/filterProducts.ts`.
- [x] **7. Schema/seed docs**: brand-first title + brand-casing guidance in Sanity schema description fields + new section in HANDOFF.md.
- [x] **8. Build + smoke test**: `npm run build` clean (12 routes), prod server smoke tested — all routes 200, bad slugs 404, filter URL params don't break, key UI strings present in rendered HTML.

## Review — what changed

### New files
- `app/brands/page.tsx` — A-Z brand index with counts
- `app/brands/[slug]/page.tsx` — per-brand product listing (uses CollectionToolbar)
- `components/CollectionToolbar.tsx` — client component: filter sidebar + mobile drawer + sort dropdown. Updates URL via `router.replace({ scroll: false })` so filters are bookmarkable and SSR-friendly.
- `lib/filterProducts.ts` — pure filter/sort/facet logic. In-memory JS (catalog is dozens, not thousands — query-time Sanity filtering would be premature).

### Modified files
- `components/Footer.tsx` — trust strip section + first-dibs CTA + Brands link in shop menu
- `components/ProductCard.tsx` — lighter sold treatment, 2-image hover swap, line-through on sold prices
- `components/Nav.tsx` — added Brands link
- `app/collections/[slug]/page.tsx` — now reads `searchParams`, runs through `applyFilters`, renders `CollectionToolbar`
- `lib/dm.ts` — added `instagramFirstDibsUrl()` helper
- `lib/products.ts` — added `BrandSummary`, `slugifyBrand`, `getAllBrands`, `getProductsByBrand`
- `sanity/queries.ts` — added `allBrandsQuery`, `productsByBrandQuery`
- `sanity/schemas/product.ts` — naming-convention guidance on brand + title fields
- `HANDOFF.md` — new "Naming conventions" section for the client

### Architecture notes
- **Filter UX uses URL searchParams** (not React state) — bookmarkable, shareable, works without JS-state hydration, server-renders the correct grid.
- **Default sort**: newest first, sold-out hidden. "Show sold archive (N)" toggle reveals them.
- **Brand normalization**: brands stay as free-text strings in Sanity (no schema migration). `slugifyBrand()` normalizes for routing/filtering, so "Louis Vuitton" / "louis vuitton" / "Louis  Vuitton " all map to `louis-vuitton`. First-seen casing wins as display name.
- **`/collections/[slug]` is now dynamic** (was SSG) because it reads searchParams. Sanity data is still cached + revalidated via the existing `products` tag — only the render-with-params step runs per request.
- **Brand filter is auto-hidden on `/brands/[slug]`** (already brand-scoped) via `showBrandFilter={false}` prop.

### What's still TODO for actual launch (not part of this punch list)
- Owner needs to do the 60-second Sanity signup + paste project ID into `.env.local` (per HANDOFF.md). Until then, all pages render empty-state placeholders gracefully.
- Real product photos. All current samples are CSS gradient placeholders.
- Replace `islathrifts` social handles in `data/site.ts` with the real ones before launch.
