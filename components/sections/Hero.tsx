import { ArrowRight, Box, Gamepad2, Glasses } from "lucide-react";
import { useTranslations } from "next-intl";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { HeroVisual } from "@/components/three/HeroVisual";

const chips = [
  { key: "vr", Icon: Glasses, className: "text-primary" },
  { key: "ar", Icon: Box, className: "text-secondary-soft" },
  { key: "games", Icon: Gamepad2, className: "text-orange" },
] as const;

export function Hero() {
  const t = useTranslations("hero");

  return (
    <section id="hero" aria-labelledby="hero-title" className="relative isolate overflow-hidden bg-gradient-dark">
      {/* Decorative, slowly drifting gradient light */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="bg-grid absolute inset-0 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_40%,black,transparent)]" />
        <div className="animate-drift absolute -top-48 -end-24 h-[34rem] w-[34rem] rounded-full bg-primary/25 blur-[120px]" />
        <div className="animate-drift-slow absolute top-[22rem] -start-40 h-[30rem] w-[30rem] rounded-full bg-secondary/25 blur-[120px]" />
        <div className="animate-drift absolute top-[36rem] end-1/4 h-72 w-72 rounded-full bg-pink/15 blur-[100px]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-bg" />
      </div>

      <Container className="grid items-center gap-8 pt-28 pb-10 sm:pt-32 sm:pb-20 lg:min-h-[min(100vh,58rem)] lg:grid-cols-[1.25fr_1fr] lg:gap-4 lg:pt-24 lg:pb-16">
        <div className="text-center lg:text-start">
          <p className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/50 px-4 py-1.5 text-sm font-medium text-text-secondary backdrop-blur">
            <span className="h-2 w-2 rounded-full bg-gradient-immersive" aria-hidden="true" />
            {t("eyebrow")}
          </p>

          <h1
            id="hero-title"
            className="mt-6 text-[2.5rem] leading-[1.12] font-extrabold tracking-tight text-balance text-white sm:text-5xl lg:text-[3.5rem] xl:text-[4rem]"
          >
            {t("titleStart")} <span className="text-gradient-immersive">{t("titleHighlight")}</span>
          </h1>

          <p className="mt-5 text-lg font-semibold text-primary sm:text-xl">{t("tagline")}</p>
          <p className="mx-auto mt-4 max-w-xl text-base text-text-secondary sm:text-lg lg:mx-0">{t("description")}</p>

          <div className="mt-9 flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start">
            <ButtonLink href={{ pathname: "/", hash: "solutions" }} size="lg" className="w-full sm:w-auto">
              {t("ctaPrimary")}
              <ArrowRight className="h-5 w-5 rtl:-scale-x-100" aria-hidden="true" />
            </ButtonLink>
            <ButtonLink
              href={{ pathname: "/", hash: "portfolio" }}
              variant="secondary"
              size="lg"
              className="w-full sm:w-auto"
            >
              {t("ctaSecondary")}
            </ButtonLink>
          </div>

          <ul className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 lg:justify-start">
            {chips.map(({ key, Icon, className }) => (
              <li key={key} className="inline-flex items-center gap-2 text-sm font-medium text-text-secondary">
                <Icon className={`h-4 w-4 ${className}`} aria-hidden="true" />
                {t(`chips.${key}`)}
              </li>
            ))}
          </ul>
        </div>

        <div className="mx-auto w-full max-w-sm sm:max-w-md lg:max-w-none">
          <HeroVisual alt={t("visualAlt")} />
        </div>
      </Container>
    </section>
  );
}
