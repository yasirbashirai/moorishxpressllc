# Moorish Xpress, LLC: Website

Conversion-focused website for **Moorish Xpress, LLC** (owner Jude Hood), an asset-based box truck carrier
and box truck / hotshot dispatch service at 2920 Campbellton Rd SW, Atlanta, GA 30311.
Phone (678) 968-7511 · loads@moorishxpress.com · open 24/7 · tagline "When you need it there now".

## Stack
Next.js 16 (App Router) + Tailwind CSS v4 + TypeScript. Oswald (headlines) + Inter (body).
Brand: logo red (primary action), logo yellow (secondary), black/dark grey, white, neutral grey.

## Pages (26 static routes)
- `/` Home funnel: hero (2 CTAs) → audience switch → services → equipment toggle + metrics → 4-step process → coverage map → why us + flyer → FAQ + quote form → CTA
- `/services` + 6 service pages `/services/[slug]` (OTR, first mile, last mile, white glove, box truck dispatch, hotshot dispatch)
- `/dispatch` owner-operator landing + sign-up form
- `/about`, `/reviews` (real reviews only, review form), `/contact` (map + quote form)
- `/blog` + 6 SEO articles `/blog/[slug]`
- `sitemap.xml`, `robots.txt`, JSON-LD (LocalBusiness, Service, FAQ, Breadcrumb, BlogPosting)

## Where to edit
- Business details, services, coverage, FAQs: `src/lib/site.ts`
- Blog articles: `src/lib/posts.ts`
- Reviews: `reviews` array in `src/app/reviews/page.tsx`
- Social links, USDOT/MC, Google review link: `site.social`, `site.usdot`, `site.mc`, `site.googleReviewUrl` (hidden while empty)

## Forms
All forms (quote, dispatch sign-up, review) post to `/api/lead`. Without SMTP env vars, leads are logged to the server console.
To email leads set: `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `LEADS_TO` (defaults to loads@moorishxpress.com).

## Run
```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```
Do not run `next build` while `next dev` is running (they share `.next`).

## Open items
- Facebook / Instagram / LinkedIn URLs (not findable online; client's VA to send)
- USDOT / MC numbers
- The 2 secondary red/white logos and any other flyers (only the main logo + 1 flyer were received)
- Real truck photos (current photos are from the supplied stock folder; the hero truck is cropped from the client's flyer)
- SMTP env vars, domain + deploy
