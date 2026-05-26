# Isla Thrifts — Handoff

This site has zero monthly cost (Vercel free + Sanity free) and lets the owner manage everything from a browser. No code needed after the initial setup.

## What the owner can do (no developer needed)

Log into `islathrifts.com/studio` and:
- **Add an item** — fill the form, drag photos in, hit Publish
- **Mark sold** — toggle the "Sold Out" switch on an item, hit Publish
- **Edit anything** — change price, description, photos, condition, size
- **Delete** — three-dot menu → delete

Every change goes live within ~5 seconds.

### Naming conventions (matters for search + the Brands page)

- **Brand**: use the exact, full name — `Louis Vuitton` not `LV`, `Saint Laurent` not `YSL`. Match casing across items or they'll split into duplicate brand entries on `/brands`.
- **Title**: model/style only, no brand. The brand renders separately on cards. Be specific: `Neverfull MM in Damier Ebene` beats `Tote Bag`. Specific titles win on Google search and feel curated.
- **Photos**: upload 3+ angles. The first is the card cover; the second auto-shows on hover. Aim for clean, consistent backgrounds (Photoroom or remove.bg works) so the grid feels editorial, not chaotic.

---

## One-time setup (developer does this once)

### 1. Create a Sanity project
- Go to <https://www.sanity.io/manage> → New project
- Project name: `Isla Thrifts`
- Dataset: `production` (default)
- Copy the **Project ID**

### 2. Create a write token (for seeding)
- Same dashboard → API → Tokens → Add API token
- Name: `seed`
- Permissions: **Editor**
- Copy the token

### 3. Create environment variables
```powershell
cd C:\Users\MSI\isla-thrifts
Copy-Item .env.local.example .env.local
notepad .env.local
```

Fill in:
- `NEXT_PUBLIC_SANITY_PROJECT_ID` = the Project ID
- `SANITY_WRITE_TOKEN` = the token
- `SANITY_REVALIDATE_SECRET` = any random string (e.g. output of `[guid]::NewGuid()`)

### 4. Seed the nine sample products
```powershell
node --env-file=.env.local scripts/seed.mjs
```

You should see `✓ Committed transaction <id>`. Open `localhost:3000/studio` and you'll see the products listed.

### 5. Run the site locally
```powershell
npm run dev
```

Open http://localhost:3000 — the homepage now shows the seeded items.

---

## Deploying to Vercel

```powershell
npm install -g vercel
vercel
```

Follow the prompts. Then add the env vars in Vercel:
- Vercel dashboard → your project → Settings → Environment Variables
- Copy every key from `.env.local` (set scope to `Production`, `Preview`, `Development`)

### Wire the revalidation webhook
- Sanity dashboard → API → Webhooks → Create webhook
- URL: `https://<your-vercel-domain>/api/revalidate`
- Dataset: `production`
- Trigger on: Create, Update, Delete
- Filter: `_type == "product"`
- HTTP method: `POST`
- API version: `2025-01-01`
- Projection:
  ```
  {
    "_type": _type,
    "slug": slug.current
  }
  ```
- Secret: paste the same `SANITY_REVALIDATE_SECRET` you set above

Test: edit a product in Studio, hit Publish, refresh the site within 5 seconds — change is live.

---

## Inviting the owner to Studio

- sanity.io/manage → your project → Members → Invite
- Role: **Editor** (can publish, can't delete the project or change billing)
- Send them: their login link + the URL `https://islathrifts.com/studio`

Record a 5-minute Loom walking them through: adding an item, marking sold, deleting. Send the link.

---

## Updating social handles before launch

Edit `data/site.ts`:
```ts
social: {
  instagram: "the_real_handle",
  messenger: "the_real_handle",
  ...
}
```

Push the change. All "Reserve" buttons site-wide will use the new handles.

---

## What runs where

| Layer | Where | Cost |
|---|---|---|
| Site (Next.js) | Vercel Hobby | Free |
| CMS Studio | Same Next.js app at `/studio` | Free |
| Content + images | Sanity Free tier | Free |
| Domain | Wherever you bought it | ~₱600/year |
| Payments | DM → GCash/Maya/bank | 0% fees |

**Total monthly: ₱0.**

Scale ceiling on Sanity free tier: 3 users, 500k API requests/mo, 10GB asset bandwidth/mo. To hit those limits you'd need ~5,000+ unique customers per day.
