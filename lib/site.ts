/**
 * Site-wide configuration. Update contact details and social links here.
 * Text that is shown to users lives in /messages/*.json instead.
 */
export const siteConfig = {
  // Set NEXT_PUBLIC_SITE_URL in production (used for canonical URLs, OG tags, sitemap).
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.sadeedstudio.com").replace(/\/$/, ""),
  email: "hello@sadeedstudio.com",
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

/** In-page section anchors. */
export const sectionIds = ["solutions", "why", "portfolio", "process", "about", "sectors", "contact"] as const;
export type SectionId = (typeof sectionIds)[number];

/** Primary navigation (keys map to `nav.*` messages; `home` scrolls to the top). */
export const navItems = ["home", "about", "solutions", "portfolio"] as const;
export type NavItem = (typeof navItems)[number];
