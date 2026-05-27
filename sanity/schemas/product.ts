import { defineField, defineType } from "sanity";

export const product = defineType({
  name: "product",
  title: "Product",
  type: "document",
  fields: [
    defineField({
      name: "brand",
      title: "Brand",
      type: "string",
      description:
        "Use the exact brand name (e.g. 'Louis Vuitton', not 'LV'). Items are grouped at /brands by this field — match casing across products so they don't split into duplicates.",
      validation: (R) => R.required(),
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      description:
        "Model/style only — the Brand field renders separately above the title on cards. Be specific: 'Neverfull MM in Damier Ebene', not just 'Tote Bag'. Specific titles win on search and feel curated.",
      validation: (R) => R.required(),
    }),
    defineField({
      name: "slug",
      title: "URL slug",
      type: "slug",
      options: { source: (doc) => `${doc.brand} ${doc.title}`, maxLength: 96 },
      validation: (R) => R.required(),
    }),
    defineField({
      name: "price",
      title: "Price (₱)",
      type: "number",
      validation: (R) => R.required().positive(),
    }),
    defineField({
      name: "comparePrice",
      title: "Original price (₱) — for sale items",
      type: "number",
      description: "Leave blank unless on sale. Shows the strike-through price.",
    }),
    defineField({
      name: "size",
      title: "Size",
      type: "string",
      description: "e.g. M, L, US 9, Large",
      validation: (R) => R.required(),
    }),
    defineField({
      name: "condition",
      title: "Condition",
      type: "string",
      options: {
        list: [
          { title: "Like New", value: "like_new" },
          { title: "Good", value: "good" },
          { title: "Fair", value: "fair" },
        ],
        layout: "radio",
      },
      initialValue: "good",
      validation: (R) => R.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Clothing", value: "clothing" },
          { title: "Bags", value: "bags" },
          { title: "Shoes", value: "shoes" },
        ],
        layout: "radio",
      },
      validation: (R) => R.required(),
    }),
    defineField({
      name: "clothingType",
      title: "Clothing type",
      type: "string",
      description:
        "Only used when Category = Clothing. Drives the Type sub-filter on /collections/clothing.",
      options: {
        list: [
          { title: "T-shirt", value: "tshirt" },
          { title: "Polo", value: "polo" },
          { title: "Hoodie", value: "hoodie" },
          { title: "Sweater", value: "sweater" },
          { title: "Jacket", value: "jacket" },
          { title: "Pants", value: "pants" },
          { title: "Shorts", value: "shorts" },
          { title: "Skirt", value: "skirt" },
          { title: "Dress", value: "dress" },
        ],
      },
      hidden: ({ document }) => document?.category !== "clothing",
    }),
    defineField({
      name: "tagSale",
      title: "Show in Sale collection",
      type: "boolean",
      description: "Turn on to include this item in /collections/sale.",
      initialValue: false,
    }),
    defineField({
      name: "tagNewArrival",
      title: "Show in New Arrivals",
      type: "boolean",
      description: "Auto-on for new items. Turn off once it stops being new.",
      initialValue: true,
    }),
    defineField({
      name: "measurements",
      title: "Measurements",
      type: "text",
      rows: 2,
      description: 'e.g. Chest: 22" / Length: 28" / Shoulder: 19"',
    }),
    defineField({
      name: "notes",
      title: "Description / Notes",
      type: "text",
      rows: 4,
      description:
        "Honest condition notes, fit, sourcing details. Customers read this carefully.",
      validation: (R) => R.required(),
    }),
    defineField({
      name: "authentication",
      title: "Authentication notes",
      type: "text",
      rows: 2,
      description: "How you verified this piece. e.g. date code, stitching, hardware.",
    }),
    defineField({
      name: "images",
      title: "Photos",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
      description: "Upload 3+ photos. First image is the cover.",
      validation: (R) => R.min(1).error("Add at least one photo."),
    }),
    defineField({
      name: "sold",
      title: "Mark as Sold Out",
      type: "boolean",
      description: "Toggle on once the item is reserved/paid. Keeps the listing visible but greyed out.",
      initialValue: false,
    }),
  ],
  orderings: [
    {
      title: "Newest first",
      name: "newest",
      by: [{ field: "_createdAt", direction: "desc" }],
    },
    {
      title: "Price: high to low",
      name: "priceDesc",
      by: [{ field: "price", direction: "desc" }],
    },
  ],
  preview: {
    select: {
      title: "title",
      brand: "brand",
      sold: "sold",
      condition: "condition",
      media: "images.0",
    },
    prepare({ title, brand, sold, condition, media }) {
      return {
        title: `${brand} — ${title}`,
        subtitle: `${condition?.replace("_", " ") ?? ""}${sold ? " · SOLD" : ""}`,
        media,
      };
    },
  },
});
