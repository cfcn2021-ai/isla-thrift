// CLIENT TO CONFIGURE:
// Replace these handles with the real Isla Thrifts social accounts before launch.
// All "Reserve" buttons across the site will route to these handles with a prefilled
// product message — no checkout, no payment fees.

export const site = {
  name: "Isla Thrifts",
  tagline: "big wins need big risks, no shortcuts.",
  description:
    "A curated thrift store for branded and quality pieces — clothes, bags, and shoes — sourced and verified for people who want the real thing without the full price.",
  url: "https://islathrifts.com",
  social: {
    instagram: "islathrifts",
    tiktok: "islathrifts",
    facebook: "islathrifts",
    messenger: "islathrifts",
  },
  shipping: {
    notice:
      "Nationwide delivery · Shipping quoted on DM · All items are authenticated",
  },
} as const;
