import { Mail, MapPin, Phone } from "lucide-react";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SocialIcon } from "@/components/ui/SocialIcon";
import { siteConfig } from "@/lib/site";
import { ContactForm } from "./ContactForm";

export function Contact({ headingLevel = "h2" }: { headingLevel?: "h1" | "h2" }) {
  const t = useTranslations("contact");
  const SubHeading = headingLevel === "h1" ? "h2" : "h3";

  const details = [
    { Icon: Mail, label: t("info.email"), value: siteConfig.email, href: `mailto:${siteConfig.email}`, ltr: true },
    { Icon: Phone, label: t("info.phone"), value: siteConfig.phoneDisplay, href: `tel:${siteConfig.phoneHref}`, ltr: true },
    { Icon: MapPin, label: t("info.location"), value: t("info.locationValue") },
  ];

  const subHeadingClass = "mt-10 text-sm font-semibold tracking-wider text-text-muted uppercase";

  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="relative isolate overflow-hidden bg-gradient-dark py-24 sm:py-32"
    >
      <div aria-hidden="true" className="bg-grid absolute inset-0 -z-10 opacity-50" />
      <div aria-hidden="true" className="absolute top-1/3 end-1/4 -z-10 h-72 w-72 rounded-full bg-orange/10 blur-[110px]" />
      <div aria-hidden="true" className="absolute -top-40 -start-40 -z-10 h-[28rem] w-[28rem] rounded-full bg-primary/20 blur-[120px]" />
      <div aria-hidden="true" className="absolute -bottom-40 -end-40 -z-10 h-[28rem] w-[28rem] rounded-full bg-pink/15 blur-[120px]" />

      <Container className="grid gap-12 lg:grid-cols-5 lg:gap-16">
        <div className="lg:col-span-2">
          <SectionHeading
            id="contact-title"
            align="start"
            eyebrow={t("eyebrow")}
            title={t("title")}
            subtitle={t("subtitle")}
            as={headingLevel}
          />

          <SubHeading className={subHeadingClass}>{t("info.title")}</SubHeading>
          <ul className="mt-4 space-y-4">
            {details.map(({ Icon, label, value, href, ltr }) => (
              <li key={label} className="flex items-center gap-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[var(--radius-button)] border border-border bg-surface/60 text-primary">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <span>
                  <span className="block text-xs text-text-muted">{label}</span>
                  {href ? (
                    <a
                      href={href}
                      dir={ltr ? "ltr" : undefined}
                      className="font-medium text-white transition-colors hover:text-primary"
                    >
                      {value}
                    </a>
                  ) : (
                    <span className="font-medium text-white">{value}</span>
                  )}
                </span>
              </li>
            ))}
          </ul>

          <SubHeading className={subHeadingClass}>{t("info.social")}</SubHeading>
          <ul className="mt-4 flex gap-3">
            {siteConfig.socials.map((s) => (
              <li key={s.id}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="flex h-12 w-12 items-center justify-center rounded-[var(--radius-button)] border border-border bg-surface/60 text-text-secondary transition-all hover:-translate-y-0.5 hover:border-primary/60 hover:text-white"
                >
                  <SocialIcon id={s.id} />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-3">
          <div className="border-gradient rounded-[var(--radius-card)] p-6 shadow-card sm:p-8">
            <ContactForm />
          </div>
        </div>
      </Container>
    </section>
  );
}
