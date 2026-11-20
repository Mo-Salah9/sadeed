import { ArrowRight, Box, Check, Gamepad2, Glasses, type LucideIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

type SolutionKey = "vr" | "ar" | "games";

/** Service-specific visual identity from the brand guide. */
const solutions: {
  key: SolutionKey;
  Icon: LucideIcon;
  gradient: string;
  accentText: string;
  glow: string;
  hoverBorder: string;
}[] = [
  {
    key: "vr",
    Icon: Glasses,
    gradient: "from-primary to-teal",
    accentText: "text-primary",
    glow: "bg-primary/25",
    hoverBorder: "hover:border-primary/60",
  },
  {
    key: "ar",
    Icon: Box,
    gradient: "from-secondary to-teal",
    accentText: "text-secondary-soft",
    glow: "bg-secondary/25",
    hoverBorder: "hover:border-secondary/60",
  },
  {
    key: "games",
    Icon: Gamepad2,
    gradient: "from-orange to-pink",
    accentText: "text-orange",
    glow: "bg-pink/20",
    hoverBorder: "hover:border-orange/60",
  },
];

const featureKeys = ["one", "two", "three"] as const;

export function Solutions() {
  const t = useTranslations("solutions");

  return (
    <section id="solutions" aria-labelledby="solutions-title" className="relative bg-bg py-24 sm:py-32">
      <Container>
        <SectionHeading id="solutions-title" eyebrow={t("eyebrow")} title={t("title")} subtitle={t("subtitle")} />

        <ul className="mt-16 grid gap-6 md:grid-cols-3">
          {solutions.map(({ key, Icon, gradient, accentText, glow, hoverBorder }, i) => (
            <Reveal as="li" key={key} delay={i * 0.1} className="h-full">
              <article
                className={`group relative flex h-full flex-col overflow-hidden rounded-[var(--radius-card)] border border-border bg-surface/60 p-7 shadow-card transition-all duration-300 hover:-translate-y-1.5 sm:p-8 ${hoverBorder}`}
              >
                {/* Glow that intensifies on hover */}
                <div
                  aria-hidden="true"
                  className={`pointer-events-none absolute -top-24 -end-24 h-56 w-56 rounded-full blur-3xl transition-opacity duration-300 opacity-60 group-hover:opacity-100 ${glow}`}
                />
                <div aria-hidden="true" className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${gradient}`} />

                <span
                  className={`relative flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br text-white shadow-lg ${gradient}`}
                >
                  <Icon className="h-7 w-7" aria-hidden="true" />
                </span>

                <h3 className="relative mt-7 text-xl font-bold text-white sm:text-2xl">{t(`items.${key}.title`)}</h3>
                <p className="relative mt-3 text-text-secondary">{t(`items.${key}.description`)}</p>

                <ul className="relative mt-6 space-y-3 border-t border-border/70 pt-6">
                  {featureKeys.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-sm text-text-secondary">
                      <Check className={`mt-0.5 h-4 w-4 shrink-0 ${accentText}`} aria-hidden="true" />
                      {t(`items.${key}.features.${f}`)}
                    </li>
                  ))}
                </ul>

                <Link
                  href={{ pathname: "/", query: { service: key }, hash: "contact" }}
                  className={`relative mt-auto inline-flex items-center gap-2 pt-8 text-sm font-semibold ${accentText} transition-all hover:gap-3`}
                >
                  {t("learnMore")}
                  <ArrowRight className="h-4 w-4 rtl:-scale-x-100" aria-hidden="true" />
                </Link>
              </article>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}
