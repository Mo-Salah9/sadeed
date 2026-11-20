import { ArrowUp, Mail, MapPin, Phone } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { SocialIcon } from "@/components/ui/SocialIcon";
import { navItems, siteConfig } from "@/lib/site";

const solutionKeys = ["vr", "ar", "games"] as const;

export function Footer() {
  const t = useTranslations("footer");
  const nav = useTranslations("nav");
  const solutions = useTranslations("solutions.items");
  const info = useTranslations("contact.info");
  const year = new Date().getFullYear();

  const headingClass = "text-sm font-semibold tracking-wider text-white uppercase";
  const linkClass = "text-text-muted transition-colors duration-200 hover:text-white";

  return (
    <footer className="relative border-t border-border/60 bg-bg">
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-gradient-immersive opacity-60" />
      <Container className="grid gap-10 py-16 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
        <div className="space-y-5">
          <Link href="/" className="inline-block rounded-lg">
            <Logo size={44} />
          </Link>
          <p className="max-w-xs text-sm leading-relaxed text-text-muted">{t("tagline")}</p>
          <ul className="flex gap-2">
            {siteConfig.socials.map((s) => (
              <li key={s.id}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-[var(--radius-button)] border border-border bg-surface/50 text-text-secondary transition hover:-translate-y-0.5 hover:border-primary/60 hover:text-white"
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
          <ul className="mt-5 space-y-3 text-sm">
            {navItems.map((item) => (
              <li key={item}>
                <Link href={{ pathname: "/", hash: item === "home" ? "top" : item }} className={linkClass}>
                  {nav(item)}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/contact" className={linkClass}>
                {nav("contact")}
              </Link>
            </li>
          </ul>
        </nav>

        <div>
          <h2 className={headingClass}>{t("solutions")}</h2>
          <ul className="mt-5 space-y-3 text-sm">
            {solutionKeys.map((key) => (
              <li key={key}>
                <Link href={{ pathname: "/", hash: "solutions" }} className={linkClass}>
                  {solutions(`${key}.title`)}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className={headingClass}>{t("contact")}</h2>
          <ul className="mt-5 space-y-3 text-sm">
            <li>
              <a href={`mailto:${siteConfig.email}`} className={`inline-flex items-center gap-2.5 ${linkClass}`}>
                <Mail className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                {siteConfig.email}
              </a>
            </li>
            <li>
              <a href={`tel:${siteConfig.phoneHref}`} className={`inline-flex items-center gap-2.5 ${linkClass}`}>
                <Phone className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                <span dir="ltr">{siteConfig.phoneDisplay}</span>
              </a>
            </li>
            <li className="inline-flex items-center gap-2.5 text-text-muted">
              <MapPin className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
              {info("locationValue")}
            </li>
          </ul>
        </div>
      </Container>

      <div className="border-t border-border/60">
        <Container className="flex flex-col items-center justify-between gap-3 py-6 text-sm text-text-muted sm:flex-row">
          <p>{t("rights", { year })}</p>
          <a href="#top" className="inline-flex items-center gap-1.5 transition-colors hover:text-white">
            <ArrowUp className="h-4 w-4" aria-hidden="true" />
            {t("backToTop")}
          </a>
        </Container>
      </div>
    </footer>
  );
}
