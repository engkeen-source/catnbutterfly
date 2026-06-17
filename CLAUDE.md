@AGENTS.md

# Project: thecatnbutterfly.com → Next.js Migration

This repo is a faithful migration of the Wix site **https://www.thecatnbutterfly.com** (author "Boon" / *The Cat and Butterfly*) into a self-hosted Next.js App Router application deployable on Vercel.

---

## Site map — Wix original → Next.js route

### Navigation pages

| Wix URL | Next.js route | File |
|---|---|---|
| `thecatnbutterfly.com/` | `/` | `app/page.tsx` |
| `thecatnbutterfly.com/blog` | `/blog` | `app/blog/page.tsx` |
| `thecatnbutterfly.com/post/relationship-with-money` | `/post/relationship-with-money` | `app/post/[slug]/page.tsx` + `content/posts/relationship-with-money.mdx` |
| `thecatnbutterfly.com/post/ego-vs-egolessness` | `/post/ego-vs-egolessness` | `app/post/[slug]/page.tsx` + `content/posts/ego-vs-egolessness.mdx` |
| `thecatnbutterfly.com/post/the-gift-of-authenticity` | `/post/the-gift-of-authenticity` | `app/post/[slug]/page.tsx` + `content/posts/the-gift-of-authenticity.mdx` |
| `thecatnbutterfly.com/post/your-energy-defines-your-reality` | `/post/your-energy-defines-your-reality` | `app/post/[slug]/page.tsx` + `content/posts/your-energy-defines-your-reality.mdx` |

### Hidden pages (not linked from navigation)

| Wix URL | Next.js route | File | Notes |
|---|---|---|---|
| `thecatnbutterfly.com/howareyoudoing` | `/howareyoudoing` | `app/howareyoudoing/page.tsx` | Book landing page — *How Are You Doing Today?*; has Amazon Kindle + PayPal purchase links |
| `thecatnbutterfly.com/thank-you-for-puchase` | `/thank-you-for-puchase` | `app/thank-you-for-puchase/page.tsx` | Post-purchase confirmation (note: "puchase" typo matches original URL) |
| `thecatnbutterfly.com/fullscreen-page` | `/fullscreen-page` | `app/fullscreen-page/page.tsx` | Empty placeholder; mirrors original |

### Wix Pro Gallery lightbox (same-page `?pgid=` slides → `BookGallery` client component)

These are not separate routes — they are Wix's client-side expand/lightbox on the home page. Replicated as `components/BookGallery.tsx` with prev/next navigation.

| Wix `?pgid=` URL | Lightbox slide | Book |
|---|---|---|
| `/?pgid=mc04nnov-ea79633f-50eb-4163-a651-c634bcc048ef` | Slide 1 | *How Are You Doing Today?* |
| `/?pgid=mc04nnov-765fd2ff-d8e0-4f48-b30a-c04cf9194b79` | Slide 2 | *The Cat and Butterfly* |
| `/?pgid=mc04nnov-57592696-5a36-400d-87d1-b714be3ac910` | Slide 3 | *Effortless Living* |

### Wix system pages — NOT replicated

`/account-settings`, `/notifications`, `/profile`, `/search`, popup `e0364` — Wix member/system infrastructure; not replicable without Wix's backend.

---

## Key design decisions

- **Fonts:** Wix uses licensed Avenir/Futura/DIN. Substituted with Google Fonts: **Playfair Display** (serif headings) + **Jost** (sans body/UI) via `next/font/google`.
- **Colors:** Brand tokens defined in `app/globals.css` under `@theme inline`. Always use `text-brand-*` / `bg-brand-*` Tailwind classes — never hardcode hex values.
- **Tailwind v4:** Uses `@import "tailwindcss"` and `@theme inline` — NOT a `tailwind.config.ts` file. Arbitrary values work (`flex-[68]`, `tracking-[0.25em]`, etc.).
- **Blog posts:** Stored as MDX in `content/posts/*.mdx`. Rendered server-side via `next-mdx-remote/rsc`. `lib/posts.ts` provides `getAllPosts()` (date-descending), `getPost(slug)`, `getAllSlugs()`.
- **Book gallery data:** `lib/books.ts` — array of 3 books with cover path, intrinsic dimensions, and description text. Used by `components/BookGallery.tsx` (client component).
- **Contact form:** `app/api/contact/route.ts` → Resend. Requires `RESEND_API_KEY` env var. Degrades gracefully without it.
- **Image hosting:** All images downloaded to `public/images/`. `next/image` is also configured to allow `static.wixstatic.com` in `next.config.ts` for any remaining Wix CDN references.
- **Purchase links:** `/howareyoudoing` links out to Amazon Kindle (`https://www.amazon.com/dp/B0FFHKS19F`) and PayPal (`https://www.paypal.com/ncp/payment/4YMFARPNQPHCU`) — not a local checkout flow.

---

## Image catalog

All files in `public/images/`:

| File | Used in | Description |
|---|---|---|
| `474399_5b60c5cb48a94cc1ae245fa3850245d7~mv2.jpg` | Gallery + lightbox (slide 1) | *How Are You Doing Today?* book cover (1249×1883) |
| `474399_962dd4d43bac4ff59a0e60cbca1a3623~mv2.jpg` | Gallery + lightbox (slide 2) | *The Cat and Butterfly* book cover (1100×1760) |
| `474399_60c155f493b644d9a31af593204b2528~mv2.webp` | Gallery + lightbox (slide 3) | *Effortless Living* book cover (1100×1760) |
| `474399_f6345447f5234defaac5c82c97bcccf1~mv2.png` | `/howareyoudoing` hero | 3D book mockup (414×622) |
| `474399_3e6b7d05fb03411cb22589be55c9bfee~mv2.jpg` | `/howareyoudoing` author bio | Author photo — Boon |
| `b25591_24a35ec53c4a4d41a0da9c7b7cd6d2d3~mv2_d_3000_1965_s_2.jpg` | Blog post cover | *Relationship with Money* |
| `b25591_2790fd3a23db403793dbf2c3c1c62723~mv2_d_3000_1946_s_2.jpg` | Blog post cover | *Ego vs Egolessness* |
| `b25591_3352e742a2e5467aad7df422106fc278~mv2_d_3000_2000_s_2.jpg` | Blog post cover | *The Gift of Authenticity* |

---

## Dev commands

```bash
npm install          # install deps
npm run dev          # start dev server (Turbopack) at http://localhost:3000
npm run build        # production build — run before deploying
npm run lint         # ESLint
```

---

## Environment variables

| Variable | Required | Description |
|---|---|---|
| `RESEND_API_KEY` | Yes (for email) | Resend API key — contact form uses this to send mail |
| `CONTACT_TO_EMAIL` | No | Recipient email for contact submissions (defaults to `hello@thecatnbutterfly.com`) |

Copy `.env.example` → `.env.local` and fill in values. **Never commit `.env.local`.**

---

## Scraping / content extraction

Original content was extracted using a private deepcrawl Cloudflare Worker at:
`https://deepcrawl-app-api-worker-production.tanengkeen5243.workers.dev`

The JWT secret for that worker is **not committed** to this repo. If you need to re-scrape pages,
generate a token with the `deepcrawl` skill in Claude Code.
