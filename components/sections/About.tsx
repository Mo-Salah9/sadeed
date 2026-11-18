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
    <section id="about" aria-labelledby="about-title" className="bg-white py-20 sm:py-28">
      <Container className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <Reveal className="relative order-last lg:order-first">
          <div className="relative aspect-[6/5] overflow-hidden rounded-3xl shadow-card">
            <Image
              src="/placeholders/about.webp"
              alt=""
              fill
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover"
            />
          </div>
          <div className="absolute -bottom-6 start-6 flex items-center gap-3 rounded-2xl bg-navy-900 px-5 py-4 text-white shadow-card sm:start-10">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-teal-500/15">
              <MapPin className="h-5 w-5 text-teal-400" aria-hidden="true" />
            </span>
            <span>
              <span className="block text-xs text-white/60">{t("locationLabel")}</span>
              <span className="block font-semibold">{t("location")}</span>
            </span>
          </div>
        </Reveal>

        <div>
          <SectionHeading id="about-title" eyebrow={t("eyebrow")} title={t("title")} align="start" />
          <div className="mt-6 space-y-4 text-lg leading-relaxed text-muted">
            <p>{t("body1")}</p>
            <p>{t("body2")}</p>
          </div>

          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {highlightKeys.map((key) => (
              <li key={key} className="flex items-start gap-2 text-navy-900">
                <CircleCheck className="mt-0.5 h-5 w-5 shrink-0 text-teal-600" aria-hidden="true" />
                <span className="font-medium">{t(`highlights.${key}`)}</span>
              </li>
            ))}
          </ul>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-navy-900/10 bg-surface p-5">
              <Target className="h-6 w-6 text-teal-600" aria-hidden="true" />
              <h3 className="mt-3 font-semibold text-navy-900">{t("missionTitle")}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted">{t("mission")}</p>
            </div>
            <div className="rounded-2xl border border-navy-900/10 bg-surface p-5">
              <Compass className="h-6 w-6 text-teal-600" aria-hidden="true" />
              <h3 className="mt-3 font-semibold text-navy-900">{t("visionTitle")}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted">{t("vision")}</p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
