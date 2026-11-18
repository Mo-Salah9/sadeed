/**
 * Site-wide configuration. Update contact details and social links here.
 * Text that is shown to users lives in /messages/*.json instead.
 */
export const siteConfig = {
  // Set NEXT_PUBLIC_SITE_URL in production (used for canonical URLs, OG tags, sitemap).
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://sadeed.studio").replace(/\/$/, ""),
  email: "hello@sadeed.studio",
  phoneDisplay: "+962 6 000 0000",
  phoneHref: "+96260000000",
  socials: [
    { id: "linkedin", label: "LinkedIn", href: "https://www.linkedin.com/company/sadeed-studio" },
    { id: "instagram", label: "Instagram", href: "https://www.instagram.com/sadeed.studio" },
    { id: "youtube", label: "YouTube", href: "https://www.youtube.com/@sadeedstudio" },
    { id: "x", label: "X", href: "https://x.com/sadeedstudio" },
  ],
} as const;

export type SocialId = (typeof siteConfig.socials)[number]["id"];

/** In-page sections, in display order. Keys map to `nav.*` messages. */
export const sectionIds = ["about", "services", "why", "process", "portfolio", "sectors", "contact"] as const;
export type SectionId = (typeof sectionIds)[number];
