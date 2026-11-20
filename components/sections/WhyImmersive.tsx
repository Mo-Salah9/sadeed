import { Brain, Gauge, ShieldCheck, TrendingUp, type LucideIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

const items: { key: "speed" | "confidence" | "safe" | "focus"; Icon: LucideIcon; value: string; icon: string }[] = [
  { key: "speed", Icon: Gauge, value: "text-gradient", icon: "text-primary" },
  { key: "confidence", Icon: TrendingUp, value: "text-gradient-immersive", icon: "text-teal-soft" },
  { key: "safe", Icon: ShieldCheck, value: "text-gradient", icon: "text-secondary-soft" },
  { key: "focus", Icon: Brain, value: "text-gradient-gaming", icon: "text-orange" },
];

export function WhyImmersive() {
  const t = useTranslations("why");

  return (
    <section
      id="why"
      aria-labelledby="why-title"
      className="relative isolate overflow-hidden bg-gradient-dark py-24 sm:py-32"
    >
      <div aria-hidden="true" className="bg-grid absolute inset-0 -z-10 opacity-70" />
      <div
        aria-hidden="true"
        className="absolute top-1/2 start-1/2 -z-10 h-[32rem] w-[32rem] -translate-1/2 rounded-full bg-secondary/15 blur-[120px]"
      />
      <Container>
        <SectionHeading id="why-title" eyebrow={t("eyebrow")} title={t("title")} subtitle={t("subtitle")} />
        <ul className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {items.map(({ key, Icon, value, icon }, i) => (
            <Reveal as="li" key={key} delay={i * 0.08} className="h-full">
              <div className="flex h-full flex-col rounded-[var(--radius-card)] border border-border bg-surface/50 p-7 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/50">
                <Icon className={`h-6 w-6 ${icon}`} aria-hidden="true" />
                <p className={`mt-5 font-heading text-5xl font-extrabold tracking-tight ${value}`} dir="ltr">
                  {t(`items.${key}.value`)}
                </p>
                <h3 className="mt-3 text-lg font-bold text-white">{t(`items.${key}.label`)}</h3>
                <p className="mt-2 text-sm text-text-muted">{t(`items.${key}.description`)}</p>
              </div>
            </Reveal>
          ))}
        </ul>
        <p className="mx-auto mt-10 max-w-3xl text-center text-xs text-text-muted">{t("note")}</p>
      </Container>
    </section>
  );
}
