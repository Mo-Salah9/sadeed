# SADEED Website

Bilingual (Arabic RTL / English LTR) website for **SADEED: Interactive E-Learning Solutions** (سديد | حلول تعليمية تفاعلية): VR, AR and educational games.

**Stack:** Next.js 15 (App Router) · TypeScript · Tailwind CSS v4 · next-intl · React Three Fiber + drei · Framer Motion · React Hook Form + Zod · Resend

---

## Getting started

Requirements: **Node.js 18.18+** (20 or 22 recommended).

```bash
npm install
cp .env.example .env.local   # then fill in the values (see below)
npm run dev                  # http://localhost:3000 → redirects to /ar
```

| Script          | What it does                           |
| --------------- | -------------------------------------- |
| `npm run dev`   | Development server                     |
| `npm run build` | Production build (type-checks + lints) |
| `npm run start` | Serve the production build             |
| `npm run lint`  | ESLint                                 |

### Environment variables

| Variable               | Required    | Description |
| ---------------------- | ----------- | ----------- |
| `NEXT_PUBLIC_SITE_URL` | Yes (prod)  | Public URL without a trailing slash: `https://www.sadeedstudio.com`. Used for canonical URLs, hreflang, Open Graph and `sitemap.xml`. Read at **build time**, so redeploy after changing it. |
| `RESEND_API_KEY`       | Yes (prod)  | API key from [resend.com](https://resend.com/api-keys). |
| `CONTACT_EMAIL`        | Yes (prod)  | Where form submissions are delivered. Comma-separate multiple addresses. |
| `CONTACT_FROM_EMAIL`   | Recommended | Sender, e.g. `SADEED Website <website@sadeedstudio.com>`. The domain must be verified in Resend. If unset, Resend's test sender is used, which can only deliver to your own Resend account email. |

In development, a missing `RESEND_API_KEY` or `CONTACT_EMAIL` makes the form succeed and print the message to the terminal. In production it returns an error, so messages are never silently lost.

---

## Brand system

The site follows the SADEED brand guidelines. The tokens live in the `@theme` block of `app/globals.css`.

| Token | Value | Use |
| ----- | ----- | --- |
| `primary` | `#0EA5E9` Electric Blue | Brand, links, eyebrows, VR |
| `secondary` | `#8B5CF6` Vibrant Purple | Highlights, AR |
| `teal` | `#14B8A6` Digital Teal | VR/AR, interactive |
| `orange` / `pink` | `#F59E0B` / `#EC4899` | Educational games, creative accents |
| `bg` | `#0B1023` Deep Navy | Page background |
| `surface` / `border` | `#1E293B` / `#334155` | Cards, panels, dividers |
| `text` / `text-secondary` / `text-muted` | `#FFF` / `#CBD5E1` / `#94A3B8` | Typography |

- **Gradient utilities:** `bg-gradient-primary`, `bg-gradient-immersive`, `bg-gradient-gaming`, `bg-gradient-dark`, plus `text-gradient*` for gradient text.
  - **Buttons** use `bg-gradient-button`, the same blue → purple gradient with slightly deeper stops (`#0369A1 → #6D28D9`). With the official stops, white text only reaches about 3:1 contrast. The deeper stops pass WCAG AA (4.5:1+).
- **Typography:**
  - Arabic: **Tajawal** (headings) and **Cairo** (body).
  - English: **Poppins** (headings) and **Inter** (body).
  - Switched per locale via `html[lang]` in `globals.css`; fonts are set up in `lib/fonts.ts`.
- **Shape:** cards use a 20px radius (`--radius-card`), buttons 12px (`--radius-button`), and transitions run 200–300ms.
- **Service colors:**
  - VR: blue/teal
  - AR: purple/teal
  - Games: orange/pink

  These are used on the Solutions cards and the portfolio labels.

### Logo

- `public/brand/sadeed-symbol.png` is the official symbol on a transparent background. It was extracted from the supplied artwork with the colors preserved and the outer glow softened. It's designed for **dark backgrounds**, which the whole site uses.
- `components/ui/Logo.tsx` places the symbol next to the **SADEED** wordmark, set in Poppins as live text so it stays sharp. To use a new logo file, replace the PNG (transparent background). Proportions are read from the `SYMBOL` constant in that file.
- Favicons are `app/icon.png` and `app/apple-icon.png`, both the symbol only. OG images are `public/og/og-{ar,en}.jpg` (1200×630).
- For a light-background version of the logo, add a separate asset; the current PNG is made for dark backgrounds.

---

## Project structure

```
app/
  [locale]/layout.tsx       <html lang dir>, fonts, metadata, Navbar/Footer
  [locale]/page.tsx         Home: Hero → Solutions → Why → Projects → Process → About → Sectors → Contact
  [locale]/contact/page.tsx Standalone contact page
  api/contact/route.ts      Zod validation + Resend, honeypot, rate limit
  sitemap.ts, robots.ts, icon.png, apple-icon.png, globals.css
components/
  layout/    Navbar, Footer, LanguageSwitcher
  sections/  Hero, Solutions, WhyImmersive, Portfolio(+Grid), Process, About, Sectors, Contact(+Form)
  three/     HeroVisual (capability check + inline SVG fallback), HeroScene (R3F)
  ui/        Logo, Button, Container, SectionHeading, Reveal, SocialIcon, JsonLd
data/projects.ts            Portfolio entries
messages/ar.json, en.json   All UI text
lib/                        site.ts (contact info, nav), seo.ts, contact-schema.ts, fonts.ts
public/brand/               Logo symbol · public/og/ Open Graph images · public/placeholders/ placeholder art
```

---

## Editing content

- **Text:** all of it is in `messages/ar.json` and `messages/en.json`, which must have the same keys. TypeScript checks keys against `en.json`, so a typo fails the build.
- **Contact details, social links, navigation:** `lib/site.ts`.
- **Portfolio:** `data/projects.ts`. Add an image (1200×800 `.webp`) to `public/` and an entry:

```ts
{
  slug: "my-new-project",
  category: "vr", // "vr" | "ar" | "game" | "simulation"
  image: "/projects/my-new-project.webp",
  title: { en: "My New Project", ar: "مشروعي الجديد" },
  description: { en: "One or two sentences…", ar: "جملة أو جملتان…" },
  tags: { en: ["VR", "Science"], ar: ["واقع افتراضي", "علوم"] },
},
```

**Arabic copy tip:** don't attach "و" directly to English words, as in "Meta Quest وPico". Mixed-direction text renders in the wrong order. Use Arabic commas instead: "Meta Quest، Pico".

### Placeholder content to replace before launch

- Phone, email and social URLs in `lib/site.ts`
- Sample portfolio projects and the images in `public/placeholders/`
- The "Why immersive" figures, which come from PwC's 2020 VR study (cited on the page)

---

## How it works

- **i18n / RTL:** next-intl with the `/ar` and `/en` prefixes; `/` redirects to `/ar`. Layouts use logical utilities (`ms-`, `pe-`, `start-`, `rtl:`) so they mirror automatically. The language switcher keeps the current page and `#section`.
- **3D hero:** an inline SVG illustration renders first, with no network request. three.js is loaded (client-only) when the browser is idle **and** the device passes these checks:
  - viewport ≥ 768px
  - ≥ 4 CPU cores
  - ≥ 4 GB memory, when reported
  - WebGL available
  - no `prefers-reduced-motion`
  - no Save-Data or 2G

  Rendering pauses when the hero is off screen.
- **Animations:**
  - The scroll reveal (`Reveal.tsx`) is progressive enhancement. Content is visible in the server HTML and only hidden by JavaScript if it's below the fold.
  - The hero background glows drift slowly.
  - All motion is disabled under `prefers-reduced-motion`.
- **Fonts:** the Arabic heading font (Tajawal) uses `display: swap`, so headings always show in the brand font. The Arabic body font (Cairo) uses `display: optional`, because its fallback metrics differ enough that a late swap would shift the layout. Arabic text never gets letter-spacing (see `:lang(ar)` in `globals.css`), because spacing breaks the joins between Arabic letters.
- **Contact form:** the same Zod schema runs in the browser and on the server. A honeypot field catches bots, and there's an in-memory rate limit of 5 requests per 10 minutes per IP. `?service=vr|ar|games|demo` pre-selects the dropdown; the Solutions cards use this.
- **SEO:** per-locale title and description, canonical URL, hreflang + `x-default`, Open Graph and Twitter cards, `sitemap.xml`, `robots.txt`, and Organization JSON-LD.
- **Accessibility:** skip link, landmarks, one `h1` per page, labelled fields with `aria-invalid` and `aria-describedby`, a live status region, a keyboard-operable menu (Esc closes it), visible focus rings, and WCAG AA contrast.

### Lighthouse (local production build)

| Page | Mobile (Perf / A11y / BP / SEO) | Desktop |
| ---- | ------------------------------- | ------- |
| `/ar` | 98 / 100 / 100 / 100 | 100 / 100 / 100 / 100 |
| `/en` | 92 / 100 / 100 / 100 | 100 / 100 / 100 / 100 |
| `/ar/contact`, `/en/contact` | 92–94 / 100 / 100 / 100 | not measured |

---

## Deploying (Vercel)

1. Import the GitHub repository in Vercel. The Next.js preset is detected automatically.
2. Under **Settings → Environment Variables**, add `NEXT_PUBLIC_SITE_URL=https://www.sadeedstudio.com`, `RESEND_API_KEY`, `CONTACT_EMAIL` and `CONTACT_FROM_EMAIL`.
3. Under **Settings → Domains**, add the custom domain. Some networks block `*.vercel.app` addresses, so share the custom domain, not the `vercel.app` URL.
4. Verify `sadeedstudio.com` in Resend so emails can come from your domain.

Every push to `main` deploys to production automatically.
