export type CollectionSlug =
  | "new-arrivals"
  | "clothing"
  | "bags"
  | "shoes"
  | "sale";

export type Collection = {
  slug: CollectionSlug;
  title: string;
  descriptor: string;
};

export const collections: Collection[] = [
  {
    slug: "new-arrivals",
    title: "New Arrivals",
    descriptor: "Fresh drops. One of a kind. Gone when it's gone.",
  },
  {
    slug: "clothing",
    title: "Clothing",
    descriptor: "Vintage tees, denim, outerwear, and quiet luxury pieces.",
  },
  {
    slug: "bags",
    title: "Bags",
    descriptor: "Designer carry, weekenders, and everyday workhorses.",
  },
  {
    slug: "shoes",
    title: "Shoes",
    descriptor: "Sneakers, boots, and dress shoes worth a second life.",
  },
  {
    slug: "sale",
    title: "Sale",
    descriptor: "Marked down. Still good as new.",
  },
];

export function getCollection(slug: string): Collection | undefined {
  return collections.find((c) => c.slug === slug);
}
