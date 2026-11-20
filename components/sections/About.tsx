import { CircleCheck, Compass, MapPin, Target } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

const highlightKeys = ["bilingual", "curriculum", "devices"] as const;

export function About() {
  const t = useTranslations("about");

  return (
    <section id="about" aria-labelledby="about-title" className="relative overflow-hidden bg-bg py-24 sm:py-32">
      <Container className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
        <Reveal className="relative order-last lg:order-first">
          <div
            aria-hidden="true"
            className="absolute -inset-6 -z-0 rounded-[2rem] bg-gradient-immersive opacity-20 blur-3xl"
          />
          <div className="relative aspect-[6/5] overflow-hidden rounded-[var(--radius-card)] border border-border shadow-card">
            <Image src="/placeholders/about.webp" alt="" fill sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover" />
          </div>
          <div className="absolute -bottom-6 start-6 flex items-center gap-3 rounded-2xl border border-border bg-surface/90 px-5 py-4 shadow-card backdrop-blur sm:start-10">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-button">
              <MapPin className="h-5 w-5 text-white" aria-hidden="true" />
            </span>
            <span>
              <span className="block text-xs text-text-muted">{t("locationLabel")}</span>
              <span className="block font-semibold text-white">{t("location")}</span>
            </span>
          </div>
        </Reveal>

        <div>
          <SectionHeading id="about-title" eyebrow={t("eyebrow")} title={t("title")} align="start" />
          <div className="mt-6 space-y-4 text-base text-text-secondary sm:text-lg">
            <p>{t("body1")}</p>
            <p>{t("body2")}</p>
          </div>

          <ul className="mt-7 flex flex-wrap gap-x-6 gap-y-3">
            {highlightKeys.map((key) => (
              <li key={key} className="flex items-center gap-2 text-sm font-medium text-white">
                <CircleCheck className="h-5 w-5 shrink-0 text-teal-soft" aria-hidden="true" />
                {t(`highlights.${key}`)}
              </li>
            ))}
          </ul>

          <div className="mt-9 grid gap-4 sm:grid-cols-2">
            <div className="border-gradient rounded-[var(--radius-card)] p-6">
              <Target className="h-6 w-6 text-primary" aria-hidden="true" />
              <h3 className="mt-4 text-lg font-bold text-white">{t("missionTitle")}</h3>
              <p className="mt-2 text-sm text-text-muted">{t("mission")}</p>
            </div>
            <div className="border-gradient rounded-[var(--radius-card)] p-6">
              <Compass className="h-6 w-6 text-secondary-soft" aria-hidden="true" />
              <h3 className="mt-4 text-lg font-bold text-white">{t("approachTitle")}</h3>
              <p className="mt-2 text-sm text-text-muted">{t("approach")}</p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
