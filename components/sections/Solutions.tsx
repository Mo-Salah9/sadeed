import { ArrowRight, Box, Check, Gamepad2, Glasses, type LucideIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

type SolutionKey = "vr" | "ar" | "games";

/** Service-specific visual identity from the brand guide (VR blue/teal, AR purple/teal, Games orange/pink). */
const solutions: {
  key: SolutionKey;
  Icon: LucideIcon;
  gradient: string;
  ink: string;
  tint: string;
  hover: string;
}[] = [
  {
    key: "vr",
    Icon: Glasses,
    gradient: "from-cyan via-primary to-teal",
    ink: "text-blue-ink",
    tint: "bg-primary/10",
    hover: "hover:border-primary/50 hover:shadow-[0_24px_48px_-16px_rgb(14_165_233_/_0.35)]",
  },
  {
    key: "ar",
    Icon: Box,
    gradient: "from-secondary via-secondary to-teal",
    ink: "text-purple-ink",
    tint: "bg-secondary/10",
    hover: "hover:border-secondary/50 hover:shadow-[0_24px_48px_-16px_rgb(139_92_246_/_0.35)]",
  },
  {
    key: "games",
    Icon: Gamepad2,
    gradient: "from-orange via-orange to-pink",
    ink: "text-pink-ink",
    tint: "bg-orange/10",
    hover: "hover:border-orange/50 hover:shadow-[0_24px_48px_-16px_rgb(236_72_153_/_0.3)]",
  },
];

const featureKeys = ["one", "two", "three"] as const;

export function Solutions() {
  const t = useTranslations("solutions");

  return (
    <section id="solutions" aria-labelledby="solutions-title" className="relative isolate overflow-hidden bg-white py-24 sm:py-32">
      {/* Soft logo-colored light */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-32 start-[8%] h-80 w-80 rounded-full bg-cyan/15 blur-[100px]" />
        <div className="absolute top-20 end-[6%] h-80 w-80 rounded-full bg-pink/10 blur-[100px]" />
        <div className="absolute inset-x-0 bottom-0 mx-auto h-72 w-[40rem] max-w-full rounded-full bg-orange/10 blur-[110px]" />
      </div>

      <Container>
        <SectionHeading
          id="solutions-title"
          tone="light"
          eyebrow={t("eyebrow")}
          title={t("title")}
          subtitle={t("subtitle")}
        />

        <ul className="mt-16 grid gap-6 md:grid-cols-3">
          {solutions.map(({ key, Icon, gradient, ink, tint, hover }, i) => (
            <Reveal as="li" key={key} delay={i * 0.1} className="h-full">
              <article
                className={`group relative flex h-full flex-col overflow-hidden rounded-[var(--radius-card)] border border-line bg-white p-7 shadow-soft transition-all duration-300 hover:-translate-y-1.5 sm:p-8 ${hover}`}
              >
                <div aria-hidden="true" className={`absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r ${gradient}`} />
                <div
                  aria-hidden="true"
                  className={`pointer-events-none absolute -top-20 -end-20 h-48 w-48 rounded-full ${tint} blur-2xl transition-transform duration-500 group-hover:scale-125`}
                />

                <span
                  className={`relative flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br text-white shadow-lg ${gradient}`}
                >
                  <Icon className="h-7 w-7" aria-hidden="true" />
                </span>

                <h3 className="relative mt-7 text-xl font-bold text-ink sm:text-2xl">{t(`items.${key}.title`)}</h3>
                <p className="relative mt-3 text-ink-muted">{t(`items.${key}.description`)}</p>

                <ul className="relative mt-6 space-y-3 border-t border-line pt-6">
                  {featureKeys.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-sm text-ink-secondary">
                      <span className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${tint}`}>
                        <Check className={`h-3.5 w-3.5 ${ink}`} aria-hidden="true" />
                      </span>
                      {t(`items.${key}.features.${f}`)}
                    </li>
                  ))}
                </ul>

                <Link
                  href={{ pathname: "/", query: { service: key }, hash: "contact" }}
                  className={`relative mt-auto inline-flex items-center gap-2 pt-8 text-sm font-semibold ${ink} transition-all hover:gap-3`}
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
