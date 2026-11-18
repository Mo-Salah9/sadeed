import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { HeroVisual } from "@/components/three/HeroVisual";

export function Hero() {
  const t = useTranslations("hero");

  return (
    <section aria-labelledby="hero-title" className="relative isolate overflow-hidden bg-navy-900 text-white">
      {/* Decorative background */}
      <div aria-hidden="true" className="bg-grid absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
      <div aria-hidden="true" className="absolute -top-40 -end-40 -z-10 h-[32rem] w-[32rem] rounded-full bg-teal-500/20 blur-3xl" />
      <div aria-hidden="true" className="absolute -bottom-48 -start-32 -z-10 h-[28rem] w-[28rem] rounded-full bg-navy-600/40 blur-3xl" />

      <Container className="grid items-center gap-10 pt-28 pb-16 sm:pt-32 lg:min-h-[min(92vh,56rem)] lg:grid-cols-2 lg:gap-6 lg:pt-24 lg:pb-12">
        <div className="text-center lg:text-start">
          <p className="inline-flex items-center gap-2 rounded-full border border-teal-400/30 bg-teal-500/10 px-4 py-1.5 text-sm font-medium text-teal-300">
            <span className="h-1.5 w-1.5 rounded-full bg-teal-400" aria-hidden="true" />
            {t("eyebrow")}
          </p>
          <h1
            id="hero-title"
            className="mt-6 text-4xl leading-tight font-bold tracking-tight text-balance sm:text-5xl lg:text-6xl"
          >
            {t("titleStart")} <span className="text-gradient">{t("titleHighlight")}</span>
          </h1>
          <p className="mt-4 text-lg font-semibold text-teal-300 sm:text-xl">{t("tagline")}</p>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-white/75 sm:text-lg lg:mx-0">
            {t("description")}
          </p>
          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start">
            <ButtonLink href={{ pathname: "/", hash: "services" }} size="lg" className="w-full sm:w-auto">
              {t("ctaServices")}
              <ArrowRight className="h-5 w-5 rtl:-scale-x-100" aria-hidden="true" />
            </ButtonLink>
            <ButtonLink
              href={{ pathname: "/", query: { service: "demo" }, hash: "contact" }}
              variant="outline"
              size="lg"
              className="w-full sm:w-auto"
            >
              {t("ctaDemo")}
            </ButtonLink>
          </div>
          <p className="mt-8 text-sm text-white/55">{t("trust")}</p>
        </div>

        <div className="mx-auto w-full max-w-md sm:max-w-lg lg:max-w-none">
          <HeroVisual alt={t("visualAlt")} />
        </div>
      </Container>
    </section>
  );
}
