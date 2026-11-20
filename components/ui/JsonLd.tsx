import { getTranslations } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { localizedUrl } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

/** schema.org Organization data for search engines. */
export async function OrganizationJsonLd({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: "meta" });
  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: t("siteName"),
    alternateName: locale === "ar" ? "SADEED" : "سديد",
    url: localizedUrl(locale),
    logo: `${siteConfig.url}/brand/sadeed-symbol.png`,
    description: t("description"),
    email: siteConfig.email,
    telephone: siteConfig.phoneHref,
    address: {
      "@type": "PostalAddress",
      addressLocality: locale === "ar" ? "عمّان" : "Amman",
      addressCountry: "JO",
    },
    sameAs: siteConfig.socials.map((s) => s.href),
  };

  return (
    <script
      type="application/ld+json"
      // Escape "<" so the JSON can never close the script tag
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
