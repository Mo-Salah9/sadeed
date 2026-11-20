import { Brain, Gauge, ShieldCheck, TrendingUp, type LucideIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

/** One logo color per stat. */
const items: { key: "speed" | "confidence" | "safe" | "focus"; Icon: LucideIcon; value: string; bar: string; glow: string }[] = [
  { key: "speed", Icon: Gauge, value: "from-cyan to-primary", bar: "from-cyan to-primary", glow: "bg-primary/25" },
  { key: "confidence", Icon: TrendingUp, value: "from-[#a78bfa] to-secondary", bar: "from-primary to-secondary", glow: "bg-secondary/25" },
  { key: "safe", Icon: ShieldCheck, value: "from-[#f472b6] to-pink", bar: "from-secondary to-pink", glow: "bg-pink/20" },
  { key: "focus", Icon: Brain, value: "from-[#fbbf24] to-orange", bar: "from-pink to-orange", glow: "bg-orange/20" },
];

export function WhyImmersive() {
  const t = useTranslations("why");

  return (
    <section id="why" aria-labelledby="why-title" className="relative isolate overflow-hidden bg-gradient-dark py-24 sm:py-32">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="bg-grid absolute inset-0 opacity-60" />
        <div className="absolute -top-24 start-[5%] h-96 w-96 rounded-full bg-primary/20 blur-[120px]" />
        <div className="absolute top-1/3 end-[5%] h-96 w-96 rounded-full bg-pink/15 blur-[120px]" />
        <div className="absolute -bottom-32 start-1/3 h-80 w-80 rounded-full bg-orange/15 blur-[120px]" />
      </div>
      <Container>
        <SectionHeading id="why-title" eyebrow={t("eyebrow")} title={t("title")} subtitle={t("subtitle")} />
        <ul className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {items.map(({ key, Icon, value, bar, glow }, i) => (
            <Reveal as="li" key={key} delay={i * 0.08} className="h-full">
              <div className="group relative flex h-full flex-col overflow-hidden rounded-[var(--radius-card)] border border-white/10 bg-white/[0.04] p-7 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-white/25">
                <div aria-hidden="true" className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${bar}`} />
                <div
                  aria-hidden="true"
                  className={`pointer-events-none absolute -top-16 -end-16 h-40 w-40 rounded-full blur-2xl transition-opacity duration-300 opacity-70 group-hover:opacity-100 ${glow}`}
                />
                <Icon className="relative h-6 w-6 text-white/80" aria-hidden="true" />
                <p
                  className={`relative mt-5 bg-gradient-to-r bg-clip-text font-heading text-5xl font-extrabold tracking-tight text-transparent ${value}`}
                  dir="ltr"
                >
                  {t(`items.${key}.value`)}
                </p>
                <h3 className="relative mt-3 text-lg font-bold text-white">{t(`items.${key}.label`)}</h3>
                <p className="relative mt-2 text-sm text-text-secondary">{t(`items.${key}.description`)}</p>
              </div>
            </Reveal>
          ))}
        </ul>
        <p className="mx-auto mt-10 max-w-3xl text-center text-xs text-text-muted">{t("note")}</p>
      </Container>
    </section>
  );
}
