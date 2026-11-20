"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { Link, usePathname } from "@/i18n/navigation";
import { buttonClasses } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { navItems, type NavItem } from "@/lib/site";
import { LanguageSwitcher } from "./LanguageSwitcher";

const hrefFor = (item: NavItem) => ({ pathname: "/" as const, hash: item === "home" ? "top" : item });

export function Navbar() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Highlight the nav item for the section currently in view
  useEffect(() => {
    if (!isHome) return;
    const ids = ["hero", ...navItems.filter((i) => i !== "home"), "contact"];
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id === "hero" ? "home" : entry.target.id);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [isHome]);

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
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        solid ? "border-b border-border/60 bg-bg/80 backdrop-blur-xl" : "border-b border-transparent"
      }`}
    >
      <Container className="flex h-18 items-center justify-between gap-4">
        <Link href="/" className="shrink-0 rounded-lg" onClick={() => setOpen(false)}>
          <Logo size={38} priority />
        </Link>

        <nav aria-label={t("primary")} className="hidden lg:block">
          <ul className="flex items-center gap-1 rounded-full border border-border/70 bg-surface/40 p-1 backdrop-blur">
            {navItems.map((item) => {
              const isActive = isHome && active === item;
              return (
                <li key={item}>
                  <Link
                    href={hrefFor(item)}
                    aria-current={isActive ? "true" : undefined}
                    className={`block rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                      isActive ? "bg-white/10 text-white" : "text-text-secondary hover:text-white"
                    }`}
                  >
                    {t(item)}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          <span className="hidden sm:block">
            <Link href={{ pathname: "/", hash: "contact" }} className={buttonClasses()}>
              {t("contact")}
            </Link>
          </span>
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-[var(--radius-button)] text-white hover:bg-white/10 lg:hidden"
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
            className="overflow-hidden border-t border-border/60 bg-bg/95 backdrop-blur-xl lg:hidden"
          >
            <Container className="py-4">
              <ul className="flex flex-col gap-1">
                {navItems.map((item) => (
                  <li key={item}>
                    <Link
                      href={hrefFor(item)}
                      onClick={() => setOpen(false)}
                      className="block rounded-xl px-4 py-3 text-base font-medium text-text-secondary hover:bg-white/5 hover:text-white"
                    >
                      {t(item)}
                    </Link>
                  </li>
                ))}
              </ul>
              <Link
                href={{ pathname: "/", hash: "contact" }}
                onClick={() => setOpen(false)}
                className={buttonClasses({ size: "lg", className: "mt-4 w-full" })}
              >
                {t("contact")}
              </Link>
            </Container>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
