import { Briefcase, GraduationCap, Landmark, School, type LucideIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

const sectors: { key: "schools" | "universities" | "government" | "corporate"; Icon: LucideIcon }[] = [
  { key: "schools", Icon: School },
  { key: "universities", Icon: GraduationCap },
  { key: "government", Icon: Landmark },
  { key: "corporate", Icon: Briefcase },
];

export function Sectors() {
  const t = useTranslations("sectors");

  return (
    <section id="sectors" aria-labelledby="sectors-title" className="bg-white py-20 sm:py-28">
      <Container>
        <SectionHeading id="sectors-title" eyebrow={t("eyebrow")} title={t("title")} subtitle={t("subtitle")} />
        <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {sectors.map(({ key, Icon }, i) => (
            <Reveal as="li" key={key} delay={i * 0.08} className="h-full">
              <div className="flex h-full flex-col items-center rounded-2xl border border-navy-900/10 p-8 text-center transition hover:border-teal-500/50 hover:bg-surface">
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-teal-500/10 text-teal-800">
                  <Icon className="h-8 w-8" aria-hidden="true" />
                </span>
                <h3 className="mt-5 text-lg font-semibold text-navy-900">{t(`items.${key}.title`)}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{t(`items.${key}.description`)}</p>
              </div>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}
