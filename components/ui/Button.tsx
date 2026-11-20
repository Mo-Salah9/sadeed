import type { ComponentProps } from "react";
import { Link } from "@/i18n/navigation";

type Variant = "primary" | "secondary" | "ghost";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-[var(--radius-button)] font-semibold whitespace-nowrap transition-all duration-200 ease-out hover:-translate-y-0.5 active:translate-y-0 disabled:pointer-events-none disabled:opacity-60 cursor-pointer";

const variants: Record<Variant, string> = {
  primary: "bg-gradient-button text-white shadow-glow-blue hover:brightness-115 hover:shadow-glow-purple",
  secondary:
    "border border-primary/70 bg-bg/40 text-white hover:border-primary hover:bg-primary/10 hover:brightness-110",
  ghost: "text-text-secondary hover:text-white",
};

const sizes: Record<Size, string> = {
  md: "h-11 px-5 text-sm",
  lg: "h-13 px-7 text-base",
};

type Common = { variant?: Variant; size?: Size; className?: string };

export function buttonClasses({ variant = "primary", size = "md", className = "" }: Common = {}) {
  return `${base} ${variants[variant]} ${sizes[size]} ${className}`;
}

export function ButtonLink({ variant, size, className, ...props }: Common & ComponentProps<typeof Link>) {
  return <Link {...props} className={buttonClasses({ variant, size, className })} />;
}

export function Button({
  variant,
  size,
  className,
  type = "button",
  ...props
}: Common & ComponentProps<"button">) {
  return <button type={type} {...props} className={buttonClasses({ variant, size, className })} />;
}
