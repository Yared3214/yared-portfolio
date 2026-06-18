# Yared Bitewlign — Portfolio

A dark, atmospheric portfolio for a full-stack and mobile developer, built with
Next.js 15, TypeScript and Tailwind CSS v4. All content is data-driven so it can
be updated without touching components.

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm start          # serve the production build
npm run typecheck  # TypeScript only
npm run resume     # regenerate public/resume.pdf
```

---

## 1. Where everything lives

| What | File |
| --- | --- |
| Name, title, intro, email, socials, availability, résumé path, secret word | `src/content/site.ts` |
| Projects + categories | `src/content/projects.ts` |
| Skills categories | `src/content/skills.ts` |
| Experience / education timeline | `src/content/journey.ts` |
| Study tracks (certificates section) | `src/content/certificates.ts` |
| Personal interests | `src/content/interests.ts` |
| Blog articles | `src/content/writing.ts` |
| Résumé PDF content | `scripts/generate-resume.mjs` |
| Design tokens (colours, type, ease) | `src/app/globals.css` |
| Sections | `src/components/sections/` |
| Browser chrome (nav, cursor, starfield, loader, easter egg) | `src/components/chrome/` |
| Generated SVG artwork | `src/components/ui/Artwork.tsx` |

### Profile photo

Drop an image in `public/` and set `avatar: "/avatar.jpg"` in
`src/content/site.ts`. When `avatar` is empty the site renders the monogram
portrait instead, so it never shows a broken image.

### Project screenshots

Project cards and case studies use generated abstract artwork
(`art: { variant, from, to }`). To use a real screenshot, add the file to
`public/` and pass it to the card/detail image — the artwork is a fallback so
the layout is never empty.

### Résumé

`public/resume.pdf` is generated from `scripts/generate-resume.mjs` with no
dependencies. Replace the file with your own tailored PDF at any time, or edit
the `CONTENT` object and run `npm run resume`. The hero and nav buttons download
whatever sits at `site.resume`.

### Easter egg

Typing `site.secretWord` (default `orbit`) anywhere outside an input opens a
hidden note and draws a constellation in the hero starfield. The small star in
the footer triggers the same thing for touch users.

---

## 2. Contact form (real email delivery)

The form posts to `POST /api/contact`, which validates input, applies a
best-effort per-IP rate limit, and sends a real email through
[Resend](https://resend.com)'s HTTP API (edge/Workers compatible).

**It will not fake a success.** If the environment is not configured, the
endpoint returns `503` and the UI says so and offers a direct mailto link.

Set these environment variables (see `.env.example`):

```bash
RESEND_API_KEY=re_...                      # https://resend.com/api-keys
CONTACT_TO_EMAIL=yaredbitewlign@gmail.com  # where messages arrive
CONTACT_FROM_EMAIL="Portfolio <hello@yourdomain.com>"
```

Local development: copy `.env.example` to `.env.local` and fill it in.
Hosted (Vercel / Cloudflare / Sites): add the same names as project secrets.

> `CONTACT_FROM_EMAIL` must be a verified sender or domain in Resend. For a
> quick test you can use `onboarding@resend.dev`, which only delivers to the
> account owner's address.

The in-memory rate limit is per server isolate; for production-grade limiting
use your host's firewall rules or a shared store (e.g. Redis / KV).

---

## 3. Deploying

The site is a standard Next.js App Router project and deploys to Vercel,
Cloudflare Workers (via OpenNext) or any Node host.

Before publishing:

1. Set `site.url` in `src/content/site.ts` to the real domain — it is used for
   canonical URLs, Open Graph metadata, `sitemap.xml` and `robots.txt`.
2. Add the contact form environment variables.
3. Review the content notes below.

## 4. Content status

The projects, name, title, bio, social links and skill list now come from the
previous portfolio (`portfolio-steel-pi-37.vercel.app`). What to check:

- **Projects** — the four real applications: Skin Health Companion, Ethio Stock
  Link Lite, FastX Delivery and Ethiopian Artisan Marketplace. Repository and
  live-demo links are the ones from the old site. Add a `demo` URL only when it
  is public; otherwise the card shows "Demo soon" instead of a dead button.
  The four projects are categorised as **Full-Stack** (three) and **Frontend**
  (one), so the *Backend*, *AI/ML* and *Other* filters deliberately show the
  empty state until a project in those categories is added — or remove those
  entries from `projectCategories` in `src/content/projects.ts`.
- **Timeline** — built only from stated facts: computer science foundations,
  one year of post-graduate experience, four shipped apps. No employers,
  institutions or dates were invented.
- **Study tracks** — the old site listed no formal certificates, so this section
  is labelled "Learning tracks, not badges" and claims no issuer. Replace each
  entry with a real certificate (name, issuer, date, and `credentialUrl` when
  one exists) as they are earned.
- **Articles** — four essays written for this site around the real projects.
  They are sample writing: replace or delete them and add your own; external
  links can be set with `externalUrl` per post.
- **Interests** — plausible placeholders. Make them yours.
- **Résumé PDF** — generated from the real project list; replace it with your
  own tailored file when ready.
- **`site.url`** — still `https://yaredbitewlign.com` as a placeholder. Point it
  at the real domain before publishing.

## 5. Accessibility & performance notes

- Semantic landmarks, skip link, visible focus styles, keyboard-operable
  filters, dialogs, menu and form.
- All motion respects `prefers-reduced-motion`; the starfield renders a static
  frame and the custom cursor is disabled.
- Custom cursor only activates for fine pointers; touch devices keep native
  behaviour.
- Canvas animation pauses when off-screen or when the tab is hidden.
- No animation or UI dependencies: React + Next.js only, ~134 kB first-load JS.
- Text contrast is checked for both themes; colour is never the only signal
  (labels, icons and text accompany status changes).
