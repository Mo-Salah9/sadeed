import Image from "next/image";

/**
 * Official SADEED logo: the brand symbol (extracted from the supplied artwork,
 * /public/brand/sadeed-symbol.png) plus the SADEED wordmark set as live text so it
 * stays crisp at every size. To swap the artwork, replace the PNG (keep a transparent
 * background); proportions are preserved automatically.
 */
const SYMBOL = { src: "/brand/sadeed-symbol.png", width: 800, height: 476 };

type LogoProps = {
  /** Show the SADEED wordmark next to the symbol. */
  wordmark?: boolean;
  /** Height of the symbol in px. */
  size?: number;
  priority?: boolean;
  className?: string;
};

export function LogoSymbol({ size = 40, priority = false, className = "" }: Omit<LogoProps, "wordmark">) {
  const width = Math.round((size * SYMBOL.width) / SYMBOL.height);
  return (
    <Image
      src={SYMBOL.src}
      alt=""
      width={width}
      height={size}
      priority={priority}
      sizes={`${width}px`}
      className={`shrink-0 ${className}`}
      style={{ width, height: size }}
    />
  );
}

export function Logo({ wordmark = true, size = 40, priority = false, className = "" }: LogoProps) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`} dir="ltr">
      <LogoSymbol size={size} priority={priority} />
      {wordmark && (
        <span
          className="text-xl font-bold tracking-[0.14em] text-white"
          style={{ fontFamily: "var(--font-poppins), var(--font-inter), sans-serif" }}
        >
          SADEED
        </span>
      )}
    </span>
  );
}
