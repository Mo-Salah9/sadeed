import { Briefcase, GraduationCap, Landmark, School, type LucideIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

const sectors: { key: "schools" | "universities" | "government" | "corporate"; Icon: LucideIcon; color: string }[] = [
  { key: "schools", Icon: School, color: "text-primary" },
  { key: "universities", Icon: GraduationCap, color: "text-secondary-soft" },
  { key: "government", Icon: Landmark, color: "text-teal-soft" },
  { key: "corporate", Icon: Briefcase, color: "text-orange" },
];

export function Sectors() {
  const t = useTranslations("sectors");

  return (
    <section id="sectors" aria-labelledby="sectors-title" className="border-y border-border/50 bg-bg-raised/60 py-20 sm:py-24">
      <Container>
        <SectionHeading id="sectors-title" eyebrow={t("eyebrow")} title={t("title")} />
        <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {sectors.map(({ key, Icon, color }, i) => (
            <Reveal as="li" key={key} delay={i * 0.08} className="h-full">
              <div className="group flex h-full gap-4 rounded-[var(--radius-card)] border border-border bg-surface/40 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:bg-surface/70">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-border bg-bg">
                  <Icon className={`h-6 w-6 ${color}`} aria-hidden="true" />
                </span>
                <div>
                  <h3 className="text-lg font-bold text-white">{t(`items.${key}.title`)}</h3>
                  <p className="mt-1.5 text-sm text-text-muted">{t(`items.${key}.description`)}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}
