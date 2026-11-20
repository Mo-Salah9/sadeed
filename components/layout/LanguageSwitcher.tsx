"use client";

import { Globe } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname, useRouter } from "@/i18n/navigation";

/** Switches between Arabic and English while keeping the current page and section (#hash). */
export function LanguageSwitcher({ className = "", onSwitch }: { className?: string; onSwitch?: () => void }) {
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const other = locale === "ar" ? "en" : "ar";

  return (
    <Link
      href={pathname}
      locale={other}
      hrefLang={other}
      lang={other}
      title={t("switchLanguage")}
      onClick={(e) => {
        onSwitch?.();
        const hash = window.location.hash.slice(1);
        if (hash) {
          e.preventDefault();
          router.replace(`${pathname}#${hash}`, { locale: other, scroll: false });
        }
      }}
      className={`inline-flex h-11 items-center gap-1.5 rounded-[var(--radius-button)] border border-border bg-surface/40 px-3.5 text-sm font-medium text-text-secondary transition hover:border-primary/70 hover:text-white ${className}`}
    >
      <Globe className="h-4 w-4" aria-hidden="true" />
      <span className="sm:hidden" aria-hidden="true">
        {t("otherLanguageShort")}
      </span>
      <span className="sr-only sm:not-sr-only">{t("otherLanguage")}</span>
    </Link>
  );
}
