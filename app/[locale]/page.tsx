import { setRequestLocale } from "next-intl/server";
import { use } from "react";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { Hero } from "@/components/sections/Hero";
import { Portfolio } from "@/components/sections/Portfolio";
import { Process } from "@/components/sections/Process";
import { Sectors } from "@/components/sections/Sectors";
import { Solutions } from "@/components/sections/Solutions";
import { WhyImmersive } from "@/components/sections/WhyImmersive";
import { OrganizationJsonLd } from "@/components/ui/JsonLd";
import type { Locale } from "@/i18n/routing";

export default function HomePage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = use(params);
  setRequestLocale(locale);

  return (
    <>
      <OrganizationJsonLd locale={locale} />
      <Hero />
      <Solutions />
      <WhyImmersive />
      <Portfolio />
      <Process />
      <About />
      <Sectors />
      <Contact />
    </>
  );
}
