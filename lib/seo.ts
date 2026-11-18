import type { Metadata } from "next";
import { routing, type Locale } from "@/i18n/routing";
import { siteConfig } from "./site";

const ogLocale: Record<Locale, string> = { ar: "ar_JO", en: "en_US" };

/** Absolute URL for a locale + path, e.g. ("en", "/contact") → https://…/en/contact */
export function localizedUrl(locale: Locale, path = "") {
  return `${siteConfig.url}/${locale}${path === "/" ? "" : path}`;
}

/** hreflang alternates for a path, including x-default (Arabic). */
export function languageAlternates(path = "") {
  return {
    ...Object.fromEntries(routing.locales.map((l) => [l, localizedUrl(l, path)])),
    "x-default": localizedUrl(routing.defaultLocale, path),
  };
}

export function buildMetadata({
  locale,
  path = "",
  title,
  description,
  siteName,
  ogAlt,
  absoluteTitle = false,
}: {
  locale: Locale;
  path?: string;
  title: string;
  description: string;
  siteName: string;
  ogAlt: string;
  absoluteTitle?: boolean;
}): Metadata {
  const url = localizedUrl(locale, path);
  const image = { url: `/og/og-${locale}.png`, width: 1200, height: 630, alt: ogAlt };

  return {
    metadataBase: new URL(siteConfig.url),
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: url, languages: languageAlternates(path) },
    openGraph: {
      type: "website",
      url,
      siteName,
      title,
      description,
      locale: ogLocale[locale],
      alternateLocale: routing.locales.filter((l) => l !== locale).map((l) => ogLocale[l]),
      images: [image],
    },
    twitter: { card: "summary_large_image", title, description, images: [image.url] },
  };
}
