# The Cat And Butterfly

A Next.js App Router migration of [thecatnbutterfly.com](https://www.thecatnbutterfly.com) — a social venture by author Boon that brings people from different backgrounds around the world to share the common stories of humanity.

Built with Tailwind CSS v4, statically generated, and ready to deploy on Vercel.

---

## Site map

### Public routes (match the original navigation)

| Route | Wix original | Description |
|---|---|---|
| `/` | `thecatnbutterfly.com/` | Home — hero, interactive 3-book gallery, Inspirations preview, contact form |
| `/blog` | `thecatnbutterfly.com/blog` | Inspirations — all blog posts, date-descending |
| `/post/relationship-with-money` | `thecatnbutterfly.com/post/relationship-with-money` | Blog post — *Relationship with Money* |
| `/post/ego-vs-egolessness` | `thecatnbutterfly.com/post/ego-vs-egolessness` | Blog post — *Ego vs Egolessness* |
| `/post/the-gift-of-authenticity` | `thecatnbutterfly.com/post/the-gift-of-authenticity` | Blog post — *The Gift of Authenticity* |
| `/post/your-energy-defines-your-reality` | `thecatnbutterfly.com/post/your-energy-defines-your-reality` | Blog post — *Your Energy Defines Your Reality* |

### Hidden pages (existed on original Wix site, not linked from nav)

| Route | Wix original | Description |
|---|---|---|
| `/howareyoudoing` | `thecatnbutterfly.com/howareyoudoing` | Book landing page — *How Are You Doing Today?*; includes Amazon Kindle + PayPal purchase links |
| `/thank-you-for-puchase` | `thecatnbutterfly.com/thank-you-for-puchase` | Post-purchase confirmation page (URL typo "puchase" preserved from original) |
| `/fullscreen-page` | `thecatnbutterfly.com/fullscreen-page` | Empty placeholder page (mirrors original) |

### API

| Route | Description |
|---|---|
| `/api/contact` | Contact form handler — validates and sends via Resend |

### Book gallery lightbox (home page, not separate routes)

The three books on the home page use a Wix Pro Gallery-style expand lightbox — clicking any cover opens a full-screen modal. The original used `?pgid=` query params; this replica implements the same behaviour as a client component (`components/BookGallery.tsx`).

| Original `?pgid=` | Lightbox slide |
|---|---|
| `/?pgid=mc04nnov-ea79633f-50eb-4163-a651-c634bcc048ef` | *How Are You Doing Today?* |
| `/?pgid=mc04nnov-765fd2ff-d8e0-4f48-b30a-c04cf9194b79` | *The Cat and Butterfly* |
| `/?pgid=mc04nnov-57592696-5a36-400d-87d1-b714be3ac910` | *Effortless Living* |

---

## Setup

```bash
npm install
```

Copy the example env file and fill in your values:

```bash
cp .env.example .env.local
```

| Variable | Required | Description |
|---|---|---|
| `RESEND_API_KEY` | Yes (for email) | Get a free key at [resend.com](https://resend.com) |
| `CONTACT_TO_EMAIL` | No | Email address that receives contact submissions (defaults to `hello@thecatnbutterfly.com`) |

The contact form degrades gracefully without `RESEND_API_KEY` — it shows an error rather than crashing.

---

## Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Powered by Turbopack.

---

## Production build

```bash
npm run build
```

All pages except `/api/contact` are statically generated. Confirm a clean build before deploying.

---

## Deploy to Vercel

Connect this repo to [Vercel](https://vercel.com) and it will auto-deploy on push. Add environment variables in the Vercel dashboard under **Settings → Environment Variables**.

Or deploy manually:

```bash
vercel deploy
```

---

## Project structure

```
app/
  layout.tsx                      # Root layout: fonts, header, footer, metadata
  page.tsx                        # Home page (server component)
  globals.css                     # Tailwind v4 + brand design tokens
  blog/page.tsx                   # Inspirations listing
  post/[slug]/page.tsx            # Blog post (statically generated)
  howareyoudoing/page.tsx         # Hidden book landing page
  thank-you-for-puchase/page.tsx  # Hidden post-purchase page
  fullscreen-page/page.tsx        # Hidden placeholder page
  api/contact/route.ts            # Contact form API (Resend)

components/
  Header.tsx                      # Site header + navigation
  Footer.tsx                      # Site footer
  BookGallery.tsx                 # Home page gallery collage + lightbox (client component)
  ContactForm.tsx                 # Contact form with client-side validation

lib/
  books.ts                        # Book data (title, cover path, dimensions, description)
  posts.ts                        # MDX loader: getAllPosts(), getPost(slug), getAllSlugs()

content/posts/
  relationship-with-money.mdx
  ego-vs-egolessness.mdx
  the-gift-of-authenticity.mdx
  your-energy-defines-your-reality.mdx

public/images/
  474399_5b60c5cb48a94cc1ae245fa3850245d7~mv2.jpg   # How Are You Doing Today? cover
  474399_962dd4d43bac4ff59a0e60cbca1a3623~mv2.jpg   # The Cat and Butterfly cover
  474399_60c155f493b644d9a31af593204b2528~mv2.webp  # Effortless Living cover
  474399_f6345447f5234defaac5c82c97bcccf1~mv2.png   # 3D book mockup (howareyoudoing hero)
  474399_3e6b7d05fb03411cb22589be55c9bfee~mv2.jpg   # Author photo — Boon
  b25591_24a35ec53c4a4d41a0da9c7b7cd6d2d3~mv2_d_3000_1965_s_2.jpg   # Relationship with Money cover
  b25591_2790fd3a23db403793dbf2c3c1c62723~mv2_d_3000_1946_s_2.jpg   # Ego vs Egolessness cover
  b25591_3352e742a2e5467aad7df422106fc278~mv2_d_3000_2000_s_2.jpg   # The Gift of Authenticity cover
```

---

## Adding blog posts

Create a new `.mdx` file in `content/posts/` with this frontmatter:

```mdx
---
title: "Post Title"
slug: "post-slug"
date: "2025-01-01T12:00:00"
excerpt: "Short description shown on the blog listing and home preview."
cover: "/images/your-cover-image.jpg"
---

Post content here…
```

The post is statically generated at `/post/post-slug` on the next build. Posts are sorted by `date` descending — use ISO 8601 timestamps if multiple posts share the same day to control their order.

---

## Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 16 (App Router, TypeScript) |
| Styling | Tailwind CSS v4 with `@tailwindcss/typography` |
| Fonts | Playfair Display + Jost via `next/font/google` |
| Blog | `next-mdx-remote` (RSC) + `gray-matter` |
| Email | Resend (`/api/contact`) |
| Images | `next/image` — all covers served from `public/images/` |
| Deployment | Vercel (recommended) |

---

## Design tokens

Defined in `app/globals.css` under `@theme inline`. Use Tailwind utility classes — never hardcode hex values.

| Token | Value | Usage |
|---|---|---|
| `brand-brown` | `#2F2B26` | Primary text, buttons |
| `brand-brown-light` | `#525150` | Secondary text |
| `brand-cream` | `#FFFEF9` | Main background |
| `brand-cream-alt` | `#FBF5E7` | Alternate section background |
| `brand-teal` | `#2b5672` | Accent, links, focus rings |
| `brand-red` | `#df3131` | Decorative rules, bullet icons |
| `brand-gray` | `#646464` | Labels, captions |

---

## Notes

- Wix-licensed fonts (Avenir, Futura, DIN Next) are substituted with the closest free Google Font equivalents.
- Wix member/system pages (`/account-settings`, `/profile`, `/search`, etc.) are intentionally not replicated — they require Wix's backend.
- All content belongs to the site owner (Boon / thecatandbutterfly.com) and is migrated from their own Wix site.
- The `thank-you-for-puchase` URL typo (`puchase` instead of `purchase`) is preserved to match the original Wix URL.
