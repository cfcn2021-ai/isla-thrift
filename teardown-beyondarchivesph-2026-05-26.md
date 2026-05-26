# Teardown — beyondarchivesph.com/collections/accessories
**Date:** 2026-05-26
**Mode:** Competitor intel for [[isla-thrifts-project]]
**Source:** Raw HTML provided in chat (one page: `/collections/accessories`)
**Stack detected:** Shopify, theme **Publisher v15.3.0** (theme_store_id 1864), default Dawn-family architecture, ~30+ JS bundles, Shop Pay, Trekkie/Web Pixels analytics, hCaptcha, Progus Store Locator app.

---

## TL;DR

Beyond Archives is a **Shopify Publisher theme with minimal customization** running a high-end Chrome Hearts / luxury archive reseller out of PH. Same business model as Isla Thrifts (1-of-1 curated branded resale) but pitched at the streetwear-luxury crowd at much higher price points (₱13k–₱285k).

They're doing **a few things genuinely well** that Isla should copy. They're also doing **several things poorly** that Isla can leapfrog with almost no effort because we control the entire stack (Next.js + Sanity, no Shopify constraints).

**Their biggest weakness:** 36 of 44 products on this page are SOLD OUT (82%). The collection feels like a graveyard, not a curated drop. Isla can win on freshness signaling alone.

**Their biggest strength:** brand-led IA. "ALL BRANDS" is a top-nav item with 22 brand-specific collections. Shoppers in this category buy by brand first, item second. **Isla must do this.**

---

## P0 — Steal these patterns immediately

### 1. Brand-first IA (ALL BRANDS as top-nav)
**What:** Their menu has `ALL BRANDS` as a top-level item with 22 sub-collections: Balenciaga, BAPE, Burberry, Chanel, Chrome Hearts, Dior, Hermes, Louis Vuitton, Prada, etc.
**Why it matters:** In branded resale, shoppers search by brand before category. "Do you have Louis Vuitton?" not "Do you have bags?" Our current nav only has Clothing / Bags / Shoes — we're invisible to brand-search behavior.
**Fix for Isla:** Add a `Brands` collection in Sanity with a brand field on every product. Generate `/brands/[brand]` routes. Surface a "Shop by brand" strip on home (logos or text list). 1–2 hour change.

### 2. Brand-name in product title
**What:** Every product title leads with the brand: "Chrome Hearts Cross Logo Baseball Hat", not "Cross Logo Cap" or "Vintage Hat."
**Why it matters:** SEO (long-tail brand searches), trust (signals authentication confidence), and shopper scan-ability on the grid.
**Fix for Isla:** Enforce naming convention in Sanity schema or studio docs: `{Brand} {Model/Style} {Color/Variant}`. Update sample products in `scripts/seed.ts`.

### 3. Sold-out badge + greyed CTA pattern (do NOT hide sold items)
**What:** Sold-out products stay on the grid with a "Sold out" badge bottom-left and a disabled "Sold out" button. Image stays at full opacity.
**Why it matters:** Manufactures social proof — visitors immediately see "everything here sells." This is the right call for 1-of-1 inventory. Hiding sold items would make the store look empty.
**Fix for Isla:** Currently the `status: 'sold'` items in Sanity should render with a "Sold" pill + disabled "Reserve" button instead of being filtered out. Check `lib/products.ts` and `components/ProductCard.tsx`.

### 4. Two-image hover swap on cards
**What:** Each product card has a primary image (lay-flat/cutout) and on hover swaps to a second image (alternate angle or detail shot).
**Why it matters:** For used/branded goods, buyers need multiple angles to feel safe. Card-level hover swap moves the trust-building moment forward, before the click.
**Fix for Isla:** `ProductCard.tsx` should accept `images[0]` and `images[1]`, render both stacked, CSS-only hover swap on the second. ~30 min change.

### 5. Tight grid gaps (2–4px)
**What:** `--grid-desktop-vertical-spacing: 4px`, `--grid-desktop-horizontal-spacing: 4px`, mobile `2px`. Cards almost touch.
**Why it matters:** Creates a "wall of product" / contact-sheet feel that signals abundance and editorial curation. Wide gutters feel boutique-empty when inventory is small.
**Fix for Isla:** Our current grid in `/app/collections/[slug]/page.tsx` uses `gap-3 sm:gap-5`. Tighten to `gap-1 sm:gap-1` on collection pages (keep wider gaps on the home "New In" carousel for breathing room).

### 6. Newsletter copy: "get first dibs on new arrivals"
**What:** Their footer signup is exactly that line. Hits the FOMO/scarcity loop perfectly for drops-based resale.
**Why it matters:** "Subscribe to our newsletter" is generic. Theirs ties signup to a concrete benefit (early access).
**Fix for Isla:** Currently we have a generic newsletter or none. Copy this verbatim — it's a category convention, not a brand asset. Pair with a real email tool later (Mailchimp free or Resend).

### 7. Brand-driven product variety on home grid
**What:** Their homepage and collection pages are dominated by one-line product cards in cohesive cutout style (Photoroom-removed backgrounds on neutral grey).
**Why it matters:** Visual consistency across 44 products despite each being shot at different times in different conditions. Cheap and scalable.
**Fix for Isla:** Recommend the client process all photos through Photoroom or remove.bg before upload. Document this in `HANDOFF.md` as part of the photo workflow.

---

## P1 — Patterns to consider (with caveats)

### 8. Sticky header with cart icon counter
Standard pattern, low effort, worth it. Already half-done in `components/Nav.tsx`.

### 9. Filter sidebar: Availability + Price range only
**What:** Their entire filter UI is just two facets. No size, no color, no condition.
**Caveat:** Their inventory is tiny (44 items). More filters would feel like noise. **For Isla**, condition filter (Like New / Good / Fair) IS worth adding because it's a key trust signal — Beyond Archives is missing this entirely.

### 10. Sort options including "Date, new to old"
**What:** Seven sort options including date.
**Why it matters:** Repeat visitors want to see what's new since their last visit. Essential for drops culture.
**Fix for Isla:** Add `?sort=newest` to collection pages.

### 11. Pagination over infinite scroll
Their `?page=2` approach is fine for SEO (every product gets a crawlable URL). Don't switch to infinite scroll just because it feels modern. Pagination + small page size (24/page) is correct here.

### 12. Country/currency selector
PHP default with full international list. **Isla doesn't need this** — we're PH-only nationwide. Don't add complexity for hypothetical international buyers.

---

## P0 — Mistakes to NOT copy

### 13. Hamburger drawer menu on DESKTOP
**What:** Their `<header-drawer data-breakpoint="desktop">` means the full nav is hidden behind a hamburger icon even on 1440px screens. Top nav shows only: logo + search + account + cart.
**Why it's bad:** Catastrophic for discoverability. Desktop users expect a horizontal nav. Hiding 22 brands + categories behind a single icon means users don't know what's available without clicking. This is a known Publisher theme antipattern.
**For Isla:** Show the full primary nav inline on `md:` and up. Hamburger only on mobile. Our current `components/Nav.tsx` already does this — don't regress.

### 14. Tiny submark logo, dead-center
**What:** Logo is an 80×80px square submark (just an icon), center-aligned. Looks generic and amateur on desktop. Brand identity is invisible at first glance.
**For Isla:** Use a wordmark ("Isla Thrifts") at minimum 32px height, left-aligned on desktop, center on mobile. The client likely doesn't have a logo asset — text wordmark in Playfair is enough for v1. Our current `Nav.tsx` already does this.

### 15. 82% of inventory shown as sold-out
**What:** 36 of 44 products on `/collections/accessories` are sold out. The page feels like a clearance bin.
**For Isla:** Yes, keep sold items visible (P0 #3 above), BUT:
- Default sort should push in-stock items first
- Add a "Currently Available" tab/filter that's selected by default
- "Sold archive" can be a secondary view for SEO/social proof
- Empty states matter: if a collection has <6 in-stock items, show a "More dropping soon" card

### 16. No condition labels visible anywhere
**What:** Branded resale at ₱285,000 for a Chrome Hearts cape, with zero indication of condition on the product card OR filter UI. Buyer has to click in to find out.
**For Isla:** Condition is OUR trust moat. Every card should show a small condition pill (Like New / Good / Fair). Condition should be a filter. Our existing `components/ConditionBadge.tsx` exists — make sure it renders on `ProductCard.tsx`.

### 17. No trust signals on the collection page
**What:** No "Verified Authentic" badge, no shipping/returns mention, no IG embed, no customer photo, no testimonial.
**For Isla:** Add a thin trust strip above the footer on collection pages: "Hand-authenticated · Ships nationwide · Reserve via DM, no payment until you confirm." Three sentences. Huge impact.

### 18. Generic "Add to cart" / "Sold out" CTAs
**What:** Standard Shopify button copy.
**For Isla:** Our advantage. "Reserve via DM" on available items, "Snagged" or "Claimed" on sold items. Personality beats generic. Already mostly done in `components/ReserveButton.tsx` — audit for consistency.

### 19. Heavy JS payload (~30+ bundles)
**What:** Shopify ships captcha bootstrap, web pixel manager, Trekkie analytics, Shop Pay portable wallets, predictive search, cart drawer, quick-add forms, etc. All before the page is interactive.
**For Isla:** This is FREE for us. Next.js + Sanity ships maybe 3–5 bundles. We get a perceptibly faster site with zero extra work. **This is also a sales angle** — "Your Shopify alternative loads in half the time" is verifiable with PageSpeed Insights.

### 20. Empty-cart drawer shows a "SALE" collection promo
**What:** When the cart drawer is opened with nothing in it, they show a collection card linking to `/collections/sale`. Decent cross-sell, but the SALE collection currently uses a product image (a Chrome Hearts cap) — not a true promo card.
**For Isla:** N/A — we have no cart. But if we ever add a "Reserved items" tracker, follow the same instinct: never show a dead empty state, always recommend the next thing.

---

## Design system extracted

| Token | Beyond Archives | Isla Thrifts (current) | Recommendation |
|---|---|---|---|
| Body font | Muli (sans) | Inter (sans) | Keep Inter — cleaner |
| Heading font | Questrial (sans) | Playfair Display (serif) | Keep Playfair — more boutique |
| Bg neutral | `#ededed` (light grey) | `#FAFAF7` (warm sand) | Keep sand — warmer |
| Ink | `#121212` | `#1A1A18` | Keep |
| Accent | none (black-on-grey only) | `#C8A96E` muted gold | Keep — gives us a signature |
| Page max width | 160rem (1600px) | 1400px | Keep 1400px — easier to design |
| Grid gap (desktop) | 4px | 12–20px currently | **Tighten to 4–8px on collection pages** |
| Card corner radius | 1rem | 0 (sharp) | Keep sharp — more editorial |
| Button radius | 6px | 0 (sharp) | Keep sharp |
| Letter-spacing body | 0.06rem | default | Add 0.015–0.02em to body — subtle premium feel |

**Verdict:** Our design tokens are already stronger than theirs. The warm sand + Playfair Display + gold accent feels more "curated boutique" than their generic grey + sans-sans Publisher defaults.

---

## IA comparison

**Beyond Archives nav (hidden behind hamburger):**
Home → New Arrivals → Men (7 subcats) → Women (6 subcats) → Bags → Accessories (3 subcats) → ALL BRANDS (22) → ALL PRODUCTS → SALE → About

**Isla current nav:**
Clothing → Bags → Shoes → New Arrivals → About

**Recommended Isla nav additions:**
- Add **Brands** (top-level, opens to brand list) ← critical
- Add **Sale** (separate from clothing/bags/shoes) ← for psychological discount triggers
- Split **Clothing** into Men/Women only if we get enough inventory to justify it (probably not for v1)

---

## Conversion mechanics: what they have, what we should have

| Mechanic | Beyond Archives | Isla (current) | Should Isla add? |
|---|---|---|---|
| Cart + checkout | Shopify | None (Reserve-via-DM) | **No — our model is the differentiator** |
| Newsletter capture | Footer only | None | **Yes — footer + maybe exit-intent** |
| Predictive search | Yes | None | Maybe v2 — only if catalog grows past 50 items |
| Country selector | Yes | None | No |
| Sold-out badges | Yes | Need to verify | **Yes — make sure these render** |
| Sort options | 7 | Unknown | **Add at least: Newest, Price ↑↓** |
| Filter sidebar | Availability, Price | None | **Add: Condition, Brand, Price** |
| Pagination | Yes (24/page) | Likely all-on-one-page | **Add if catalog > 30 items** |
| Trust strip (auth/shipping) | No | No | **Yes — easy P0 win** |
| Sticky header | Yes | Verify | Yes if not already |

---

## Pitch angles (for selling against Shopify competitors)

If you're pitching Isla's model to future thrift-store clients who are currently on Shopify like Beyond Archives:

1. **"₱0/month forever vs ₱1,600+/mo + 2% per sale."** Beyond Archives is paying Shopify + apps + Shop Pay fees on every transaction. At PH thrift margins, that's real money.
2. **"Faster site = more sales."** Their page loads ~30 JS bundles before the first interaction. Ours loads ~5. Lighthouse score will demonstrate this objectively.
3. **"Brand-led IA from day one."** They retrofitted brands into a default theme menu — it works, but it's clearly bolted on (hamburger-only on desktop, brand list is alphabetical with no logos). We design for brand-first browsing from the schema up.
4. **"Reserve-via-DM matches PH thrift buying behavior."** Most PH thrift sales already happen in Instagram DMs. We mirror the real flow instead of forcing buyers into a cart they'll abandon.
5. **"Condition transparency by default."** Beyond Archives sells a ₱285k cashmere cape with zero condition info on the product card. We make condition a first-class data field.

---

## Limitations

- I analyzed only the rendered HTML provided in the chat (one page: `/collections/accessories`). No CSS files, no JS bundles, no homepage, no product detail page, no checkout, no mobile rendering verified.
- No real performance numbers (Lighthouse/PSI not run). Performance comments are inferred from asset count and bundle weight signals in the HTML.
- I haven't audited the live Isla Thrifts site against this teardown — recommendations assume the current scaffold state per [[isla-thrifts-project]]. Some "fix for Isla" items may already be done — verify before changing code.

---

## Punch list — what to do this week

Ordered by impact ÷ effort:

1. **Add `Brands` to nav + Sanity schema + `/brands/[slug]` route** (P0, ~2 hr)
2. **Tighten collection grid gap to 4–8px on desktop** (P0, ~15 min)
3. **Ensure `ProductCard` renders condition pill + sold-out treatment** (P0, ~30 min)
4. **Add two-image hover swap on product cards** (P0, ~30 min)
5. **Add trust strip above footer on collection pages** (P0, ~30 min)
6. **Update newsletter footer copy to "get first dibs on new arrivals"** (P0, ~5 min)
7. **Enforce brand-first product title convention in seed + Sanity guide** (P0, ~20 min)
8. **Add sort dropdown (Newest, Price ↑↓) on collection pages** (P1, ~1 hr)
9. **Add filter sidebar (Condition, Brand, Price range)** (P1, ~2 hr)
10. **Add a "Currently Available" default filter** so sold items don't dominate first paint (P1, ~30 min)
