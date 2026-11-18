import { useLocale, useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { projects, type ProjectCategory } from "@/data/projects";
import type { Locale } from "@/i18n/routing";
import { PortfolioGrid, type PortfolioItem } from "./PortfolioGrid";

const categories: ProjectCategory[] = ["vr", "ar", "game", "simulation"];

export function Portfolio() {
  const t = useTranslations("portfolio");
  const locale = useLocale() as Locale;

  // Localize on the server so the client only receives the strings it needs
  const items: PortfolioItem[] = projects.map((p) => ({
    slug: p.slug,
    category: p.category,
    image: p.image,
    title: p.title[locale],
    description: p.description[locale],
    tags: p.tags[locale],
  }));

  const usedCategories = categories.filter((c) => projects.some((p) => p.category === c));

  return (
    <section id="portfolio" aria-labelledby="portfolio-title" className="bg-surface py-20 sm:py-28">
      <Container>
        <SectionHeading
          id="portfolio-title"
          eyebrow={t("eyebrow")}
          title={t("title")}
          subtitle={t("subtitle")}
        />
        <PortfolioGrid
          items={items}
          filterLabel={t("filterLabel")}
          filters={[
            { id: "all", label: t("all") },
            ...usedCategories.map((c) => ({ id: c, label: t(`categories.${c}`) })),
          ]}
        />
      </Container>
    </section>
  );
}
