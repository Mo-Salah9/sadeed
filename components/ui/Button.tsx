import type { ComponentProps } from "react";
import { Link } from "@/i18n/navigation";

type Variant = "primary" | "outline" | "outlineDark" | "ghost";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-200 disabled:pointer-events-none disabled:opacity-60 cursor-pointer";

const variants: Record<Variant, string> = {
  primary: "bg-teal-500 text-navy-900 hover:bg-teal-400 hover:shadow-glow",
  outline: "border border-white/30 text-white hover:border-teal-400 hover:bg-white/5",
  outlineDark: "border border-navy-900/20 text-navy-900 hover:border-teal-600 hover:bg-navy-900/5",
  ghost: "text-white/80 hover:text-white",
};

const sizes: Record<Size, string> = {
  md: "h-10 px-5 text-sm",
  lg: "h-12 px-7 text-base",
};

type Common = { variant?: Variant; size?: Size; className?: string };

export function buttonClasses({ variant = "primary", size = "md", className = "" }: Common = {}) {
  return `${base} ${variants[variant]} ${sizes[size]} ${className}`;
}

export function ButtonLink({
  variant,
  size,
  className,
  ...props
}: Common & ComponentProps<typeof Link>) {
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
