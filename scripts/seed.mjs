// One-time seed for Isla Thrifts.
// Imports nine sample products so the Studio (and live site) has something to demo with.
// Usage:
//   1. Create a Sanity project at sanity.io, get a project ID, create dataset "production".
//   2. Create a token with "Editor" permissions at manage.sanity.io → API → Tokens.
//   3. Copy .env.local.example to .env.local and fill in the values.
//   4. Run: node --env-file=.env.local scripts/seed.mjs
//
// Idempotent: existing products with the same slug are skipped.

import { createClient } from "@sanity/client";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_WRITE_TOKEN;

if (!projectId || !token) {
  console.error(
    "Missing env: need NEXT_PUBLIC_SANITY_PROJECT_ID and SANITY_WRITE_TOKEN in .env.local",
  );
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2025-01-01",
  token,
  useCdn: false,
});

const products = [
  {
    brand: "Nike",
    title: "Vintage Windrunner Jacket",
    slug: "nike-windrunner-jacket",
    price: 1850,
    size: "M",
    condition: "like_new",
    category: "clothing",
    tagNewArrival: true,
    measurements: 'Chest: 22" / Length: 28" / Shoulder: 19"',
    notes:
      "Three-color tonal panels, full zip, mesh-lined. Sourced from a private collector in Manila.",
    authentication: "Tag stitching and embroidery verified against archival reference.",
  },
  {
    brand: "Louis Vuitton",
    title: "Neverfull MM in Damier Ebene",
    slug: "lv-neverfull-mm",
    price: 38500,
    size: "MM",
    condition: "good",
    category: "bags",
    tagNewArrival: true,
    measurements: "L 32cm × H 29cm × W 17cm",
    notes:
      "Light patina on vachetta handles. Interior clean. Comes with original pochette and date code.",
    authentication: "Date code, hardware stamps, and stitch count verified by Entrupy.",
  },
  {
    brand: "Jordan",
    title: "Air Jordan 1 Mid — University Blue",
    slug: "jordan-1-mid-unc",
    price: 4200,
    size: "US 9",
    condition: "good",
    category: "shoes",
    tagNewArrival: true,
    measurements: "Men's US 9 / EU 42.5 / 27cm",
    notes: "Light creasing on toe box, soles 80% life. Original box not included.",
    authentication: "QR tag, glue lines, and Nike Air branding cross-checked.",
  },
  {
    brand: "Stussy",
    title: "World Tour Tee — Faded Black",
    slug: "stussy-world-tour-tee",
    price: 950,
    comparePrice: 1400,
    size: "L",
    condition: "good",
    category: "clothing",
    tagNewArrival: true,
    tagSale: true,
    measurements: 'Chest: 23" / Length: 29"',
    notes: "Beautifully washed black with cracked print. No holes or stains.",
    authentication: "Tag font and stitching match 2010s Japan production.",
  },
  {
    brand: "Coach",
    title: "Leather Carryall Tote",
    slug: "coach-leather-tote",
    price: 3200,
    size: "Large",
    condition: "like_new",
    category: "bags",
    tagNewArrival: true,
    measurements: "L 38cm × H 30cm × W 15cm",
    notes: "Saddle brown pebbled leather. Interior unmarked.",
    authentication: "Creed stamp serial verified against Coach reference.",
  },
  {
    brand: "New Balance",
    title: "990v5 Made in USA — Grey",
    slug: "new-balance-990v5",
    price: 5400,
    size: "US 10",
    condition: "like_new",
    category: "shoes",
    tagNewArrival: true,
    measurements: "Men's US 10 / EU 44 / 28cm",
    notes: "Worn twice indoors. Pigskin suede in classic grey.",
    authentication: "Made in USA tag, sock liner, and box label all verified.",
  },
  {
    brand: "Uniqlo U",
    title: "Linen-Blend Unstructured Blazer",
    slug: "uniqlo-u-blazer",
    price: 1100,
    comparePrice: 1800,
    size: "S",
    condition: "like_new",
    category: "clothing",
    tagSale: true,
    measurements: 'Chest: 20" / Length: 27" / Sleeve: 24"',
    notes: "Worn once. From Lemaire-era Uniqlo U collab.",
    authentication: "Inner tag and season code verified.",
  },
  {
    brand: "Longchamp",
    title: "Le Pliage Medium — Navy",
    slug: "longchamp-le-pliage",
    price: 1600,
    size: "Medium",
    condition: "good",
    category: "bags",
    measurements: "L 30cm × H 28cm × W 20cm",
    notes: "Light wear on leather flap. Nylon body clean.",
    authentication: "Logo emboss and zipper pull verified.",
    sold: true,
  },
  {
    brand: "Vans",
    title: "Old Skool — Black/White",
    slug: "vans-old-skool-black",
    price: 1200,
    size: "US 8",
    condition: "good",
    category: "shoes",
    measurements: "Men's US 8 / EU 40.5 / 26cm",
    notes: "Soles 70% life. Some creasing, no major damage.",
    authentication: "Insole branding and stitching consistent with Vans factory production.",
  },
];

const docs = products.map((p) => ({
  _id: `product-${p.slug}`,
  _type: "product",
  brand: p.brand,
  title: p.title,
  slug: { _type: "slug", current: p.slug },
  price: p.price,
  ...(p.comparePrice ? { comparePrice: p.comparePrice } : {}),
  size: p.size,
  condition: p.condition,
  category: p.category,
  tagSale: p.tagSale ?? false,
  tagNewArrival: p.tagNewArrival ?? false,
  measurements: p.measurements,
  notes: p.notes,
  authentication: p.authentication,
  images: [],
  sold: p.sold ?? false,
}));

console.log(`Seeding ${docs.length} products to ${projectId}/${dataset}...`);

const tx = client.transaction();
docs.forEach((d) => tx.createIfNotExists(d));
const res = await tx.commit();
console.log(`✓ Committed transaction ${res.transactionId}`);
console.log(`Open Sanity Studio → upload photos for each item.`);
