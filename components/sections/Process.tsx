import { CodeXml, PencilRuler, Rocket, Search, type LucideIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

/** Each step takes a color from the logo, moving along its spectrum. */
const steps: { key: "discover" | "design" | "develop" | "deploy"; Icon: LucideIcon; tile: string; glow: string }[] = [
  { key: "discover", Icon: Search, tile: "from-cyan to-primary", glow: "shadow-[0_14px_30px_-10px_rgb(14_165_233_/_0.55)]" },
  { key: "design", Icon: PencilRuler, tile: "from-primary to-secondary", glow: "shadow-[0_14px_30px_-10px_rgb(139_92_246_/_0.55)]" },
  { key: "develop", Icon: CodeXml, tile: "from-secondary to-pink", glow: "shadow-[0_14px_30px_-10px_rgb(236_72_153_/_0.5)]" },
  { key: "deploy", Icon: Rocket, tile: "from-pink to-orange", glow: "shadow-[0_14px_30px_-10px_rgb(245_158_11_/_0.55)]" },
];

export function Process() {
  const t = useTranslations("process");

  return (
    <section id="process" aria-labelledby="process-title" className="bg-white py-24 sm:py-32">
      <Container>
        <SectionHeading
          id="process-title"
          tone="light"
          eyebrow={t("eyebrow")}
          title={t("title")}
          subtitle={t("subtitle")}
        />

        <div className="relative mt-16">
          {/* Connector in the logo spectrum (desktop) */}
          <div
            aria-hidden="true"
            className="absolute inset-x-[12.5%] top-8 hidden h-1 rounded-full bg-gradient-logo opacity-80 lg:block rtl:-scale-x-100"
          />
          <ol className="relative grid gap-12 md:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {steps.map(({ key, Icon, tile, glow }, i) => (
              <Reveal as="li" key={key} delay={i * 0.1} className="relative text-center">
                <div
                  className={`relative mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br text-white ring-8 ring-white ${tile} ${glow}`}
                >
                  <Icon className="h-7 w-7" aria-hidden="true" />
                  <span className="absolute -top-2.5 -end-2.5 flex h-7 w-7 items-center justify-center rounded-full bg-ink text-xs font-bold text-white ring-4 ring-white">
                    {i + 1}
                  </span>
                </div>
                <h3 className="mt-6 text-xl font-bold text-ink">{t(`steps.${key}.title`)}</h3>
                <p className="mx-auto mt-3 max-w-xs text-sm text-ink-muted">{t(`steps.${key}.description`)}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
