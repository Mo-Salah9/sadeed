import { ArrowUp, Mail, MapPin, Phone } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { SocialIcon } from "@/components/ui/SocialIcon";
import { sectionIds, siteConfig } from "@/lib/site";

const serviceKeys = ["vr", "xr", "games", "simulations"] as const;

export function Footer() {
  const t = useTranslations("footer");
  const nav = useTranslations("nav");
  const meta = useTranslations("meta");
  const services = useTranslations("services.items");
  const info = useTranslations("contact.info");
  const year = new Date().getFullYear();

  const headingClass = "text-sm font-semibold tracking-wide text-white uppercase";
  const linkClass = "text-white/70 transition-colors hover:text-teal-300";

  return (
    <footer className="bg-navy-950 text-white">
      <Container className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-4">
          <Link href="/" aria-label={nav("home")} className="inline-block rounded-lg">
            <Logo wordmark={meta("siteName")} />
          </Link>
          <p className="max-w-xs text-sm leading-relaxed text-white/70">{t("tagline")}</p>
          <ul className="flex gap-2">
            {siteConfig.socials.map((s) => (
              <li key={s.id}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/5 text-white/80 transition hover:bg-teal-500 hover:text-navy-900"
                >
                  <SocialIcon id={s.id} className="h-4 w-4" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <nav aria-labelledby="footer-explore">
          <h2 id="footer-explore" className={headingClass}>
            {t("explore")}
          </h2>
          <ul className="mt-4 space-y-2.5 text-sm">
            {sectionIds.map((id) => (
              <li key={id}>
                <Link href={{ pathname: "/", hash: id }} className={linkClass}>
                  {nav(id)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className={headingClass}>{t("services")}</h2>
          <ul className="mt-4 space-y-2.5 text-sm">
            {serviceKeys.map((key) => (
              <li key={key}>
                <Link href={{ pathname: "/", hash: "services" }} className={linkClass}>
                  {services(`${key}.title`)}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className={headingClass}>{t("contact")}</h2>
          <ul className="mt-4 space-y-3 text-sm">
            <li>
              <a href={`mailto:${siteConfig.email}`} className={`inline-flex items-center gap-2 ${linkClass}`}>
                <Mail className="h-4 w-4 shrink-0 text-teal-400" aria-hidden="true" />
                {siteConfig.email}
              </a>
            </li>
            <li>
              <a href={`tel:${siteConfig.phoneHref}`} className={`inline-flex items-center gap-2 ${linkClass}`}>
                <Phone className="h-4 w-4 shrink-0 text-teal-400" aria-hidden="true" />
                <span dir="ltr">{siteConfig.phoneDisplay}</span>
              </a>
            </li>
            <li className="inline-flex items-center gap-2 text-white/70">
              <MapPin className="h-4 w-4 shrink-0 text-teal-400" aria-hidden="true" />
              {info("locationValue")}
            </li>
          </ul>
        </div>
      </Container>

      <div className="border-t border-white/10">
        <Container className="flex flex-col items-center justify-between gap-3 py-6 text-sm text-white/60 sm:flex-row">
          <p>{t("rights", { year })}</p>
          <a href="#top" className="inline-flex items-center gap-1.5 hover:text-teal-300">
            <ArrowUp className="h-4 w-4" aria-hidden="true" />
            {t("backToTop")}
          </a>
        </Container>
      </div>
    </footer>
  );
}
