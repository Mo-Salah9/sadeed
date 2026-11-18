import { Gamepad2, Glasses, ScanEye, Stethoscope, type LucideIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

const services: { key: "vr" | "xr" | "games" | "simulations"; Icon: LucideIcon }[] = [
  { key: "vr", Icon: Glasses },
  { key: "xr", Icon: ScanEye },
  { key: "games", Icon: Gamepad2 },
  { key: "simulations", Icon: Stethoscope },
];

export function Services() {
  const t = useTranslations("services");

  return (
    <section id="services" aria-labelledby="services-title" className="bg-surface py-20 sm:py-28">
      <Container>
        <SectionHeading id="services-title" eyebrow={t("eyebrow")} title={t("title")} subtitle={t("subtitle")} />
        <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map(({ key, Icon }, i) => (
            <Reveal as="li" key={key} delay={i * 0.08} className="h-full">
              <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-navy-900/5 bg-white p-6 shadow-card transition duration-300 hover:-translate-y-1 hover:border-teal-500/40">
                <div
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 h-1 origin-[left] scale-x-0 bg-teal-500 transition-transform duration-300 group-hover:scale-x-100 rtl:origin-[right]"
                />
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-navy-900 text-teal-400 transition-colors group-hover:bg-teal-500 group-hover:text-navy-900">
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </span>
                <h3 className="mt-5 text-lg font-semibold text-navy-900">{t(`items.${key}.title`)}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{t(`items.${key}.description`)}</p>
              </article>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}
