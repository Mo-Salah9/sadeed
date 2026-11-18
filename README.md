# Sadeed Studio Website

Bilingual (Arabic RTL / English LTR) marketing site for **Sadeed Studio: Immersive Learning** (استوديو سديد | تعلّم بواقع جديد).

**Stack:** Next.js 15 (App Router) · TypeScript · Tailwind CSS v4 · next-intl · Framer Motion · React Three Fiber + drei · React Hook Form + Zod · Resend

---

## Getting started

Requirements: **Node.js 18.18+** (20 or 22 recommended).

```bash
npm install
cp .env.example .env.local   # then fill in the values (see below)
npm run dev                  # http://localhost:3000 → redirects to /ar
```

| Script          | What it does                     |
| --------------- | -------------------------------- |
| `npm run dev`   | Development server               |
| `npm run build` | Production build (type-checks + lints) |
| `npm run start` | Serve the production build       |
| `npm run lint`  | ESLint                           |

### Environment variables

| Variable               | Required | Description |
| ---------------------- | -------- | ----------- |
| `NEXT_PUBLIC_SITE_URL` | Yes (prod) | Public URL without trailing slash, e.g. `https://sadeed.studio`. Used for canonical URLs, hreflang, Open Graph and `sitemap.xml`. |
| `RESEND_API_KEY`       | Yes (prod) | API key from [resend.com](https://resend.com/api-keys). |
| `CONTACT_EMAIL`        | Yes (prod) | Where form submissions are delivered. Comma-separate multiple addresses. |
| `CONTACT_FROM_EMAIL`   | Recommended | Sender, e.g. `Sadeed Studio Website <website@sadeed.studio>`. The domain must be verified in Resend. If unset, Resend's test sender `onboarding@resend.dev` is used, which can only deliver to your own Resend account email. |

**In development**, if `RESEND_API_KEY` or `CONTACT_EMAIL` is missing, the contact form still succeeds and the message is printed to the terminal. In production, a missing key returns an error so messages are never silently lost.

---

## Project structure

```
app/
  [locale]/
    layout.tsx        <html lang dir>, fonts, metadata, Navbar/Footer
    page.tsx          Landing page (all sections)
    contact/page.tsx  Standalone contact page
    not-found.tsx     Localized 404
  api/contact/route.ts  Validates (Zod) + sends email (Resend), honeypot, rate limit
  sitemap.ts, robots.ts, icon.svg, globals.css
components/
  layout/             Navbar, Footer, LanguageSwitcher
  sections/           Hero, About, Services, WhyImmersive, Process, Portfolio(+Grid), Sectors, Contact(+Form)
  three/              HeroVisual (capability check + fallback), HeroScene (R3F)
  ui/                 Logo, Button, Container, SectionHeading, Reveal, SocialIcon, JsonLd
data/projects.ts      Portfolio entries
i18n/                 routing.ts, navigation.ts, request.ts
lib/                  site.ts (contact info, socials), seo.ts, contact-schema.ts, fonts.ts
messages/ar.json, en.json   All UI text
public/placeholders/  Placeholder images · public/og/ Open Graph images
middleware.ts         Locale routing (/ → /ar)
```

---

## Editing content

- **Text:** every UI string is in `messages/ar.json` and `messages/en.json`, and both files must have the same keys. TypeScript checks keys against `en.json` (see `global.d.ts`), so a typo fails the build.
- **Contact details & social links:** `lib/site.ts`.
- **Logo:** `components/ui/Logo.tsx`. Replace the SVG inside `LogoMark` and keep the props. Also update `app/icon.svg` (favicon).
- **Brand colors & fonts:** the `@theme` block in `app/globals.css` and `lib/fonts.ts`.
- **Open Graph images:** replace `public/og/og-ar.png` and `og-en.png` (1200×630).

### Adding a portfolio project

1. Add an image (ideally 1200×800 `.webp`) to `public/placeholders/` or a new `public/projects/` folder.
2. Add an entry to `data/projects.ts`:

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

The filter buttons only show categories that have at least one project.

### Placeholder content to review before launch

- Phone number, email and social URLs in `lib/site.ts`, and the default domain `https://sadeed.studio`
- Portfolio projects in `data/projects.ts` (sample projects)
- The "Why immersive" figures in `messages/*.json` → `why.items`. They come from PwC's 2020 VR soft-skills study and are cited in `why.note`. Replace them if you have your own data.
- Images in `public/placeholders/` and `public/og/`

---

## How it works

- **i18n / RTL:** next-intl with the `/ar` and `/en` prefixes; `/` redirects to `/ar`. Automatic browser-language detection is off so Arabic is always the default. Set `localeDetection: true` in `i18n/routing.ts` to turn it on. `<html>` gets `lang` and `dir` per locale. Layouts use logical utilities (`ms-`, `pe-`, `start-`, `text-start`, `rtl:`) so they mirror automatically. The language switcher keeps the current page and `#section`.
- **3D hero:** `HeroVisual` first renders an inline SVG illustration, which costs no network request. It loads three.js (via `next/dynamic`, client-only) only when the browser is idle **and** the device passes these checks: viewport ≥ 768px, ≥ 4 CPU cores, ≥ 4 GB memory (when reported), WebGL available, no `prefers-reduced-motion`, no Save-Data or 2G. The scene stops rendering when scrolled out of view. Phones and low-end devices keep the static illustration.
- **Contact form:** the same Zod schema (`lib/contact-schema.ts`) validates on the client and in the API route. Errors are translation keys. A hidden honeypot field silently drops bots, and an in-memory limit allows 5 requests per 10 minutes per IP. On serverless this limit is per instance; use Upstash/Vercel KV for a strict limit. `?service=demo` pre-selects the service (used by the hero "Request a Demo" button).
- **SEO:** per-locale `<title>`, description, canonical, hreflang alternates (+ `x-default`), Open Graph and Twitter cards; `sitemap.xml` with alternates; `robots.txt`; schema.org `Organization` JSON-LD.
- **Accessibility:** skip link, landmarks, one `h1` per page, labelled form fields with `aria-invalid` and `aria-describedby`, an `aria-live` form status, a keyboard-operable mobile menu (Esc closes it), visible focus rings, AA contrast, and reduced-motion support.

### Lighthouse (local production build)

| Page | Mobile (Perf / A11y / BP / SEO) | Desktop |
| ---- | ------------------------------- | ------- |
| `/ar` | 92 / 100 / 100 / 100 | 100 / 100 / 100 / 100 |
| `/en` | 93 / 100 / 100 / 100 | 100 / 100 / 100 / 100 |
| `/ar/contact`, `/en/contact` | 92–95 / 100 / 100 / 100 | — |

---

## Deploying to Vercel

1. Push the project to GitHub, GitLab or Bitbucket.
2. In Vercel: **Add New → Project**, then import the repository. The Next.js framework preset is detected automatically; no build settings need to change.
3. Under **Settings → Environment Variables**, add `NEXT_PUBLIC_SITE_URL`, `RESEND_API_KEY`, `CONTACT_EMAIL` and `CONTACT_FROM_EMAIL` for Production (and Preview if you want).
4. Deploy. Then add your domain under **Settings → Domains**, and make sure `NEXT_PUBLIC_SITE_URL` matches it. Redeploy after changing that variable, because it is read at build time.
5. In Resend, verify the domain used in `CONTACT_FROM_EMAIL` (add the DNS records Resend gives you).
6. Optionally, submit `https://your-domain/sitemap.xml` in Google Search Console.

To self-host instead, run `npm run build && npm run start` on Node 18.18+ behind a reverse proxy.
