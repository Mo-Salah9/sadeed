type Props = {
  id?: string;
  eyebrow: string;
  title: string;
  subtitle?: string;
  tone?: "light" | "dark";
  align?: "center" | "start";
  /** Heading level; use "h1" when the section is the page's main heading. */
  as?: "h1" | "h2";
};

export function SectionHeading({ id, eyebrow, title, subtitle, tone = "dark", align = "center", as: Heading = "h2" }: Props) {
  const isDark = tone === "dark";
  return (
    <div className={`max-w-2xl ${align === "center" ? "mx-auto text-center" : "text-start"}`}>
      <p
        className={`text-sm font-semibold tracking-wide uppercase ${isDark ? "text-teal-800" : "text-teal-400"}`}
      >
        {eyebrow}
      </p>
      <Heading
        id={id}
        className={`mt-3 text-3xl font-bold tracking-tight text-balance sm:text-4xl ${
          isDark ? "text-navy-900" : "text-white"
        }`}
      >
        {title}
      </Heading>
      {subtitle && (
        <p className={`mt-4 text-lg text-pretty ${isDark ? "text-muted" : "text-white/75"}`}>{subtitle}</p>
      )}
    </div>
  );
}
