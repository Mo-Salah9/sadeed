"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CircleCheck, CircleAlert, LoaderCircle, Send } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { Suspense, useEffect, useId, useState } from "react";
import { useForm, type UseFormSetValue } from "react-hook-form";
import { Button } from "@/components/ui/Button";
import {
  contactSchema,
  serviceOptions,
  type ContactData,
  type ContactInput,
  type ServiceOption,
  type ValidationKey,
} from "@/lib/contact-schema";

type Status = "idle" | "success" | "error" | "rateLimited";

/** Pre-selects the service from ?service=… (e.g. the hero "Request a Demo" button). */
function ServiceFromQuery({ setValue }: { setValue: UseFormSetValue<ContactInput> }) {
  const params = useSearchParams();
  const service = params.get("service");
  useEffect(() => {
    if (service && (serviceOptions as readonly string[]).includes(service)) {
      setValue("service", service as ServiceOption, { shouldDirty: true });
    }
  }, [service, setValue]);
  return null;
}

const inputBase =
  "block w-full rounded-[var(--radius-button)] border bg-bg/70 px-4 py-3 text-white placeholder:text-text-muted/70 transition duration-200 focus:outline-none focus:ring-2 focus:ring-primary/40";

export function ContactForm() {
  const t = useTranslations("contact.form");
  const tv = useTranslations("contact.validation");
  const locale = useLocale();
  const uid = useId();
  const [status, setStatus] = useState<Status>("idle");

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ContactInput, unknown, ContactData>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", organization: "", service: undefined, message: "", website: "" },
    mode: "onTouched",
  });

  const onSubmit = async (data: ContactData) => {
    setStatus("idle");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, locale }),
      });
      if (res.status === 429) return setStatus("rateLimited");
      if (!res.ok) return setStatus("error");
      reset();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  const fieldId = (name: string) => `${uid}-${name}`;
  const errorMessage = (key?: string) => (key ? tv(key as ValidationKey) : undefined);
  const a11y = (name: keyof ContactInput) => ({
    id: fieldId(name),
    "aria-invalid": errors[name] ? true : undefined,
    "aria-describedby": errors[name] ? `${fieldId(name)}-error` : undefined,
  });
  const border = (name: keyof ContactInput) =>
    errors[name] ? "border-red-400" : "border-border hover:border-text-muted/60 focus:border-primary";

  const fieldError = (name: keyof ContactInput) =>
    errors[name] ? (
      <p id={`${fieldId(name)}-error`} className="mt-1.5 text-sm text-red-400">
        {errorMessage(errors[name]?.message)}
      </p>
    ) : null;

  const labelClass = "mb-2 block text-sm font-medium text-text-secondary";

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="relative space-y-5">
      <Suspense fallback={null}>
        <ServiceFromQuery setValue={setValue} />
      </Suspense>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor={fieldId("name")} className={labelClass}>
            {t("name")}
          </label>
          <input
            type="text"
            autoComplete="name"
            placeholder={t("namePlaceholder")}
            className={`${inputBase} ${border("name")}`}
            {...a11y("name")}
            {...register("name")}
          />
          {fieldError("name")}
        </div>
        <div>
          <label htmlFor={fieldId("email")} className={labelClass}>
            {t("email")}
          </label>
          <input
            type="email"
            dir="ltr"
            autoComplete="email"
            inputMode="email"
            placeholder={t("emailPlaceholder")}
            className={`${inputBase} ${border("email")} text-start rtl:text-end`}
            {...a11y("email")}
            {...register("email")}
          />
          {fieldError("email")}
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor={fieldId("organization")} className={labelClass}>
            {t("organization")} <span className="font-normal text-text-muted">{t("optional")}</span>
          </label>
          <input
            type="text"
            autoComplete="organization"
            placeholder={t("organizationPlaceholder")}
            className={`${inputBase} ${border("organization")}`}
            {...a11y("organization")}
            {...register("organization")}
          />
          {fieldError("organization")}
        </div>
        <div>
          <label htmlFor={fieldId("service")} className={labelClass}>
            {t("service")}
          </label>
          <select
            defaultValue=""
            className={`${inputBase} ${border("service")} appearance-none bg-[length:1.1rem] [&>option]:bg-surface [&>option]:text-white bg-[position:right_1rem_center] bg-no-repeat pe-10 rtl:bg-[position:left_1rem_center]`}
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2394A3B8' stroke-width='2'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E\")",
            }}
            {...a11y("service")}
            {...register("service")}
          >
            <option value="" disabled>
              {t("servicePlaceholder")}
            </option>
            {serviceOptions.map((s) => (
              <option key={s} value={s}>
                {t(`services.${s}`)}
              </option>
            ))}
          </select>
          {fieldError("service")}
        </div>
      </div>

      <div>
        <label htmlFor={fieldId("message")} className={labelClass}>
          {t("message")}
        </label>
        <textarea
          rows={5}
          placeholder={t("messagePlaceholder")}
          className={`${inputBase} ${border("message")} resize-y`}
          {...a11y("message")}
          {...register("message")}
        />
        {fieldError("message")}
      </div>

      {/* Honeypot: hidden from people and assistive tech */}
      <div aria-hidden="true" className="absolute -start-[9999px] h-px w-px overflow-hidden">
        <label htmlFor={fieldId("website")}>{t("honeypot")}</label>
        <input type="text" tabIndex={-1} autoComplete="off" id={fieldId("website")} {...register("website")} />
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <Button type="submit" size="lg" disabled={isSubmitting} className="w-full sm:w-auto">
          {isSubmitting ? (
            <>
              <LoaderCircle className="h-5 w-5 animate-spin" aria-hidden="true" />
              {t("sending")}
            </>
          ) : (
            <>
              {t("submit")}
              <Send className="h-4 w-4 rtl:-scale-x-100" aria-hidden="true" />
            </>
          )}
        </Button>

        <div role="status" aria-live="polite" className="text-sm">
          {status === "success" && (
            <p className="flex items-start gap-2 text-teal-soft">
              <CircleCheck className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
              {t("success")}
            </p>
          )}
          {(status === "error" || status === "rateLimited") && (
            <p className="flex items-start gap-2 text-red-400">
              <CircleAlert className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
              {status === "rateLimited" ? t("rateLimited") : t("error")}
            </p>
          )}
        </div>
      </div>
    </form>
  );
}
