// Webhook endpoint Sanity hits when content publishes.
// Setup: Sanity Studio → API → Webhooks → Add. URL: <site>/api/revalidate.
// Secret: must match SANITY_REVALIDATE_SECRET env var. Trigger on: create / update / delete.
// We revalidate the broad "products" tag (covers homepage + all collections) plus the
// specific product page if the payload includes a slug.

import { revalidateTag, revalidatePath } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";
import { parseBody } from "next-sanity/webhook";
import { revalidateSecret } from "@/sanity/env";

type Body = {
  _type?: string;
  slug?: string;
};

export async function POST(req: NextRequest) {
  try {
    if (!revalidateSecret) {
      return new NextResponse("Missing SANITY_REVALIDATE_SECRET", { status: 500 });
    }

    const { isValidSignature, body } = await parseBody<Body>(req, revalidateSecret);

    if (!isValidSignature) {
      return new NextResponse("Invalid signature", { status: 401 });
    }
    if (!body) {
      return new NextResponse("Bad payload", { status: 400 });
    }

    revalidateTag("products", { expire: 0 });

    if (body.slug) {
      revalidateTag(`product:${body.slug}`, { expire: 0 });
      revalidatePath(`/products/${body.slug}`);
    }

    return NextResponse.json({ revalidated: true, slug: body.slug ?? null });
  } catch (err) {
    return new NextResponse((err as Error).message, { status: 500 });
  }
}
