/**
 * Placeholder logo: a VR headset outline whose right lens is a target,
 * with an arrow hitting the bullseye ("sadeed" = on target).
 * Replace this file with the final brand mark when it is ready;
 * keep the same props so nothing else needs to change.
 */
type LogoProps = {
  /** Text next to the mark. Omit to render the mark only. */
  wordmark?: string;
  /** "light" = white text for dark backgrounds, "dark" = navy text for light backgrounds. */
  tone?: "light" | "dark";
  className?: string;
};

export function LogoMark({ className = "h-9 w-9" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" aria-hidden="true" className={className}>
      {/* Headset body with nose bridge */}
      <path
        d="M8 14H40A4 4 0 0 1 44 18V30A4 4 0 0 1 40 34H31L27.5 29.5H20.5L17 34H8A4 4 0 0 1 4 30V18A4 4 0 0 1 8 14Z"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      {/* Left lens */}
      <circle cx="15" cy="23.5" r="4.5" stroke="currentColor" strokeWidth="2.25" />
      {/* Right lens = target */}
      <circle cx="33" cy="23.5" r="5" stroke="#00C2CB" strokeWidth="2.25" />
      <circle cx="33" cy="23.5" r="1.9" fill="#00C2CB" />
      {/* Arrow into the bullseye */}
      <path d="M45.5 3.5L34.6 21.6" stroke="#00C2CB" strokeWidth="2.25" strokeLinecap="round" />
      <path d="M41.4 3.2L45.5 3.5L45.9 7.6" stroke="#00C2CB" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Logo({ wordmark, tone = "light", className = "" }: LogoProps) {
  const text = tone === "light" ? "text-white" : "text-navy-900";
  return (
    <span className={`inline-flex items-center gap-2.5 ${text} ${className}`}>
      <LogoMark />
      {wordmark && <span className="text-lg font-bold tracking-tight whitespace-nowrap">{wordmark}</span>}
    </span>
  );
}
