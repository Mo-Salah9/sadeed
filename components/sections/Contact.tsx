import { Mail, MapPin, Phone } from "lucide-react";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SocialIcon } from "@/components/ui/SocialIcon";
import { ContactForm } from "./ContactForm";
import { siteConfig } from "@/lib/site";

export function Contact({ headingLevel = "h2" }: { headingLevel?: "h1" | "h2" }) {
  const t = useTranslations("contact");
  const SubHeading = headingLevel === "h1" ? "h2" : "h3";

  const details = [
    { Icon: Mail, label: t("info.email"), value: siteConfig.email, href: `mailto:${siteConfig.email}`, ltr: true },
    { Icon: Phone, label: t("info.phone"), value: siteConfig.phoneDisplay, href: `tel:${siteConfig.phoneHref}`, ltr: true },
    { Icon: MapPin, label: t("info.location"), value: t("info.locationValue") },
  ];

  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="relative isolate overflow-hidden bg-navy-900 py-20 text-white sm:py-28"
    >
      <div aria-hidden="true" className="absolute -top-32 -start-32 -z-10 h-96 w-96 rounded-full bg-teal-500/15 blur-3xl" />
      <Container className="grid gap-12 lg:grid-cols-5 lg:gap-16">
        <div className="lg:col-span-2">
          <SectionHeading
            id="contact-title"
            tone="light"
            align="start"
            eyebrow={t("eyebrow")}
            title={t("title")}
            subtitle={t("subtitle")}
            as={headingLevel}
          />

          <SubHeading className="mt-10 text-sm font-semibold tracking-wide text-white/60 uppercase">{t("info.title")}</SubHeading>
          <ul className="mt-4 space-y-4">
            {details.map(({ Icon, label, value, href, ltr }) => (
              <li key={label} className="flex items-center gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/5 text-teal-400">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <span>
                  <span className="block text-xs text-white/60">{label}</span>
                  {href ? (
                    <a href={href} dir={ltr ? "ltr" : undefined} className="font-medium hover:text-teal-300">
                      {value}
                    </a>
                  ) : (
                    <span className="font-medium">{value}</span>
                  )}
                </span>
              </li>
            ))}
          </ul>

          <SubHeading className="mt-10 text-sm font-semibold tracking-wide text-white/60 uppercase">{t("info.social")}</SubHeading>
          <ul className="mt-4 flex gap-3">
            {siteConfig.socials.map((s) => (
              <li key={s.id}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/5 text-white/80 transition hover:bg-teal-500 hover:text-navy-900"
                >
                  <SocialIcon id={s.id} />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-3">
          <div className="rounded-3xl bg-white p-6 text-navy-900 shadow-2xl sm:p-8">
            <ContactForm />
          </div>
        </div>
      </Container>
    </section>
  );
}
