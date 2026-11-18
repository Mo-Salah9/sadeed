import { useTranslations } from "next-intl";
import { ButtonLink } from "@/components/ui/Button";

export default function NotFound() {
  const t = useTranslations("notFound");
  return (
    <section className="grid min-h-[80vh] place-items-center bg-navy-900 px-6 pt-24 pb-16 text-center text-white">
      <div className="max-w-md">
        <p className="text-gradient text-6xl font-bold">404</p>
        <h1 className="mt-4 text-2xl font-bold sm:text-3xl">{t("title")}</h1>
        <p className="mt-3 text-white/70">{t("description")}</p>
        <ButtonLink href="/" size="lg" className="mt-8">
          {t("back")}
        </ButtonLink>
      </div>
    </section>
  );
}
