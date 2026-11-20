type Props = {
  id?: string;
  eyebrow: string;
  title: string;
  subtitle?: string;
  align?: "center" | "start";
  /** "dark" for dark sections (white text), "light" for light sections (navy text). */
  tone?: "dark" | "light";
  /** Heading level; use "h1" when the section is the page's main heading. */
  as?: "h1" | "h2";
};

export function SectionHeading({
  id,
  eyebrow,
  title,
  subtitle,
  align = "center",
  tone = "dark",
  as: Heading = "h2",
}: Props) {
  const centered = align === "center";
  const light = tone === "light";
  return (
    <div className={`max-w-3xl ${centered ? "mx-auto text-center" : "text-start"}`}>
      <p
        className={`inline-flex items-center gap-2.5 text-sm font-semibold tracking-wider uppercase ${
          light ? "text-blue-ink" : "text-primary"
        } ${centered ? "justify-center" : ""}`}
      >
        <span aria-hidden="true" className="h-1 w-8 rounded-full bg-gradient-logo" />
        {eyebrow}
      </p>
      <Heading
        id={id}
        className={`mt-4 text-[1.75rem] font-bold tracking-tight text-balance sm:text-4xl lg:text-5xl ${
          light ? "text-ink" : "text-white"
        }`}
      >
        {title}
      </Heading>
      {subtitle && (
        <p className={`mt-5 text-base text-pretty sm:text-lg ${light ? "text-ink-muted" : "text-text-secondary"}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
