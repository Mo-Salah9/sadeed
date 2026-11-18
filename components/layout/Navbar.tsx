"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { Link, usePathname } from "@/i18n/navigation";
import { buttonClasses } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { sectionIds } from "@/lib/site";
import { LanguageSwitcher } from "./LanguageSwitcher";

const navSections = sectionIds.filter((id) => id !== "contact");

export function Navbar({ siteName }: { siteName: string }) {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);

  // Solid background once the page is scrolled
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Highlight the section currently in view
  useEffect(() => {
    if (!isHome) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) if (entry.isIntersecting) setActive(entry.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [isHome]);

  // Close the mobile menu with Escape and lock page scroll while it is open
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const solid = scrolled || open || !isHome;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        solid ? "bg-navy-900/90 shadow-lg shadow-navy-950/20 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <Container className="flex h-16 items-center justify-between gap-4 lg:h-18">
        <Link href="/" aria-label={t("home")} className="shrink-0 rounded-lg" onClick={() => setOpen(false)}>
          <Logo wordmark={siteName} />
        </Link>

        <nav aria-label={t("primary")} className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {navSections.map((id) => (
              <li key={id}>
                <Link
                  href={{ pathname: "/", hash: id }}
                  aria-current={active === id ? "true" : undefined}
                  className={`rounded-full px-3 py-2 text-sm font-medium transition-colors ${
                    active === id ? "text-teal-300" : "text-white/80 hover:text-white"
                  }`}
                >
                  {t(id)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          <span className="hidden sm:block">
            <Link href={{ pathname: "/", hash: "contact" }} className={buttonClasses({ size: "md" })}>
              {t("contactUs")}
            </Link>
          </span>
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full text-white hover:bg-white/10 lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? t("closeMenu") : t("openMenu")}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-6 w-6" aria-hidden="true" /> : <Menu className="h-6 w-6" aria-hidden="true" />}
          </button>
        </div>
      </Container>

      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-menu"
            aria-label={t("primary")}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden border-t border-white/10 bg-navy-900 lg:hidden"
          >
            <Container className="py-4">
              <ul className="flex flex-col">
                {navSections.map((id) => (
                  <li key={id}>
                    <Link
                      href={{ pathname: "/", hash: id }}
                      onClick={() => setOpen(false)}
                      className="block rounded-lg px-3 py-3 text-base font-medium text-white/85 hover:bg-white/5 hover:text-white"
                    >
                      {t(id)}
                    </Link>
                  </li>
                ))}
              </ul>
              <Link
                href={{ pathname: "/", hash: "contact" }}
                onClick={() => setOpen(false)}
                className={buttonClasses({ size: "lg", className: "mt-4 w-full" })}
              >
                {t("contactUs")}
              </Link>
            </Container>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
