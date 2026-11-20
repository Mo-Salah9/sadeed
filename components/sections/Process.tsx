import { CodeXml, PencilRuler, Rocket, Search, type LucideIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

const steps: { key: "discover" | "design" | "develop" | "deploy"; Icon: LucideIcon }[] = [
  { key: "discover", Icon: Search },
  { key: "design", Icon: PencilRuler },
  { key: "develop", Icon: CodeXml },
  { key: "deploy", Icon: Rocket },
];

export function Process() {
  const t = useTranslations("process");

  return (
    <section id="process" aria-labelledby="process-title" className="bg-bg py-24 sm:py-32">
      <Container>
        <SectionHeading id="process-title" eyebrow={t("eyebrow")} title={t("title")} subtitle={t("subtitle")} />

        <div className="relative mt-16">
          {/* Connector line (desktop) */}
          <div
            aria-hidden="true"
            className="absolute inset-x-[12.5%] top-8 hidden h-px bg-gradient-immersive opacity-60 lg:block"
          />
          <ol className="relative grid gap-12 md:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {steps.map(({ key, Icon }, i) => (
              <Reveal as="li" key={key} delay={i * 0.1} className="relative text-center">
                <div className="relative mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-border bg-surface text-primary shadow-card ring-8 ring-bg">
                  <Icon className="h-7 w-7" aria-hidden="true" />
                  <span className="absolute -top-2.5 -end-2.5 flex h-7 w-7 items-center justify-center rounded-full bg-gradient-button text-xs font-bold text-white">
                    {i + 1}
                  </span>
                </div>
                <h3 className="mt-6 text-xl font-bold text-white">{t(`steps.${key}.title`)}</h3>
                <p className="mx-auto mt-3 max-w-xs text-sm text-text-muted">{t(`steps.${key}.description`)}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
