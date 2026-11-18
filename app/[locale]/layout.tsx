import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { routing, localeDirection } from "@/i18n/routing";
import { inter, plexArabic } from "@/lib/fonts";
import { buildMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const viewport: Viewport = {
  themeColor: "#0B1E3F",
  colorScheme: "light",
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const t = await getTranslations({ locale, namespace: "meta" });
  return {
    ...buildMetadata({
      locale,
      title: t("title"),
      description: t("description"),
      siteName: t("siteName"),
      ogAlt: t("ogAlt"),
      absoluteTitle: true,
    }),
    applicationName: t("siteName"),
    formatDetection: { telephone: false },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  setRequestLocale(locale);
  const t = await getTranslations("nav");
  const meta = await getTranslations("meta");

  // Only ship the namespaces that client components need
  const { nav, contact } = await getMessages();

  return (
    <html
      lang={locale}
      dir={localeDirection[locale]}
      className={`${inter.variable} ${plexArabic.variable}`}
    >
      <body id="top">
        <NextIntlClientProvider messages={{ nav, contact }}>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:start-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-teal-500 focus:px-4 focus:py-2 focus:font-semibold focus:text-navy-900"
          >
            {t("skipToContent")}
          </a>
          <Navbar siteName={meta("siteName")} />
          <main id="main" tabIndex={-1} className="outline-none">
            {children}
          </main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
