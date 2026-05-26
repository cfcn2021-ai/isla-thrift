import { groq } from "next-sanity";

const productFields = `
  "slug": slug.current,
  brand,
  title,
  price,
  comparePrice,
  size,
  condition,
  category,
  tagSale,
  tagNewArrival,
  measurements,
  notes,
  authentication,
  sold,
  images[]{
    "url": asset->url,
    "lqip": asset->metadata.lqip,
    "dimensions": asset->metadata.dimensions,
    alt
  }
`;

export const allProductsQuery = groq`
  *[_type == "product"] | order(sold asc, _createdAt desc) {
    ${productFields}
  }
`;

export const productBySlugQuery = groq`
  *[_type == "product" && slug.current == $slug][0] {
    ${productFields}
  }
`;

export const productSlugsQuery = groq`
  *[_type == "product" && defined(slug.current)][].slug.current
`;

export const productsByCategoryQuery = groq`
  *[_type == "product" && category == $category] | order(sold asc, _createdAt desc) {
    ${productFields}
  }
`;

export const newArrivalsQuery = groq`
  *[_type == "product" && tagNewArrival == true] | order(sold asc, _createdAt desc) {
    ${productFields}
  }
`;

export const saleProductsQuery = groq`
  *[_type == "product" && tagSale == true] | order(sold asc, _createdAt desc) {
    ${productFields}
  }
`;

// Returns just the brand strings for every product (deduped in JS to avoid
// fragile GROQ group-by). Used to build the /brands index and the brand
// filter facet on collection pages.
export const allBrandsQuery = groq`
  *[_type == "product" && defined(brand)].brand
`;

// Products for one brand. Brand match is case-insensitive: we lower-case both
// the stored brand and the incoming slug-derived needle, then compare. This
// keeps the schema permissive (free-text brand field) without forcing the
// client to use exact casing.
export const productsByBrandQuery = groq`
  *[_type == "product" && lower(brand) == $brandLower]
    | order(sold asc, _createdAt desc) {
    ${productFields}
  }
`;
