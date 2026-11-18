import { Brain, Gauge, ShieldCheck, TrendingUp, type LucideIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

const items: { key: "retention" | "engagement" | "safe" | "focus"; Icon: LucideIcon }[] = [
  { key: "retention", Icon: Gauge },
  { key: "engagement", Icon: TrendingUp },
  { key: "safe", Icon: ShieldCheck },
  { key: "focus", Icon: Brain },
];

export function WhyImmersive() {
  const t = useTranslations("why");

  return (
    <section
      id="why"
      aria-labelledby="why-title"
      className="relative isolate overflow-hidden bg-navy-900 py-20 text-white sm:py-28"
    >
      <div aria-hidden="true" className="bg-grid absolute inset-0 -z-10 opacity-60" />
      <div aria-hidden="true" className="absolute top-1/2 start-1/2 -z-10 h-[30rem] w-[30rem] -translate-1/2 rounded-full bg-teal-500/10 blur-3xl" />
      <Container>
        <SectionHeading
          id="why-title"
          tone="light"
          eyebrow={t("eyebrow")}
          title={t("title")}
          subtitle={t("subtitle")}
        />
        <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map(({ key, Icon }, i) => (
            <Reveal as="li" key={key} delay={i * 0.08} className="h-full">
              <div className="flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-sm transition hover:border-teal-400/40">
                <Icon className="h-6 w-6 text-teal-400" aria-hidden="true" />
                <p className="mt-4 text-4xl font-bold tracking-tight text-gradient sm:text-5xl" dir="ltr">
                  {t(`items.${key}.value`)}
                </p>
                <h3 className="mt-2 font-semibold text-white">{t(`items.${key}.label`)}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/70">{t(`items.${key}.description`)}</p>
              </div>
            </Reveal>
          ))}
        </ul>
        <p className="mx-auto mt-10 max-w-3xl text-center text-xs leading-relaxed text-white/50">{t("note")}</p>
      </Container>
    </section>
  );
}
