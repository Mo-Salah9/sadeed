type Props = {
  id?: string;
  eyebrow: string;
  title: string;
  subtitle?: string;
  align?: "center" | "start";
  /** Heading level; use "h1" when the section is the page's main heading. */
  as?: "h1" | "h2";
};

export function SectionHeading({ id, eyebrow, title, subtitle, align = "center", as: Heading = "h2" }: Props) {
  const centered = align === "center";
  return (
    <div className={`max-w-3xl ${centered ? "mx-auto text-center" : "text-start"}`}>
      <p
        className={`inline-flex items-center gap-2 text-sm font-semibold tracking-wider text-primary uppercase ${
          centered ? "justify-center" : ""
        }`}
      >
        <span aria-hidden="true" className="h-px w-6 bg-gradient-primary" />
        {eyebrow}
      </p>
      <Heading
        id={id}
        className="mt-4 text-[1.75rem] font-bold tracking-tight text-balance text-white sm:text-4xl lg:text-5xl"
      >
        {title}
      </Heading>
      {subtitle && <p className="mt-5 text-base text-pretty text-text-secondary sm:text-lg">{subtitle}</p>}
    </div>
  );
}
