import { Briefcase, GraduationCap, Landmark, School, type LucideIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

const sectors: { key: "schools" | "universities" | "government" | "corporate"; Icon: LucideIcon; tile: string; hover: string }[] = [
  { key: "schools", Icon: School, tile: "from-cyan to-primary", hover: "hover:border-primary/50" },
  { key: "universities", Icon: GraduationCap, tile: "from-primary to-secondary", hover: "hover:border-secondary/50" },
  { key: "government", Icon: Landmark, tile: "from-teal to-cyan", hover: "hover:border-teal/50" },
  { key: "corporate", Icon: Briefcase, tile: "from-orange to-pink", hover: "hover:border-orange/50" },
];

export function Sectors() {
  const t = useTranslations("sectors");

  return (
    <section id="sectors" aria-labelledby="sectors-title" className="bg-surface-light py-20 sm:py-24">
      <Container>
        <SectionHeading id="sectors-title" tone="light" eyebrow={t("eyebrow")} title={t("title")} />
        <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {sectors.map(({ key, Icon, tile, hover }, i) => (
            <Reveal as="li" key={key} delay={i * 0.08} className="h-full">
              <div
                className={`flex h-full flex-col rounded-[var(--radius-card)] border border-line bg-white p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lift ${hover}`}
              >
                <span
                  className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br text-white shadow-md ${tile}`}
                >
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </span>
                <h3 className="mt-5 text-lg font-bold text-ink">{t(`items.${key}.title`)}</h3>
                <p className="mt-1.5 text-sm text-ink-muted">{t(`items.${key}.description`)}</p>
              </div>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}
