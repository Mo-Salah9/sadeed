import { Cairo, Inter, Poppins, Tajawal } from "next/font/google";

// English: Poppins (headings) + Inter (body)
export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const poppins = Poppins({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

// Arabic: Tajawal (headings) + Cairo (body)
// "optional": Arabic fallback fonts have very different metrics, so swapping late would
// shift the layout. Fonts are preloaded and are almost always ready in time; otherwise
// they are used from cache on the next page view.
export const cairo = Cairo({
  subsets: ["arabic"],
  variable: "--font-cairo",
  display: "optional",
});

export const tajawal = Tajawal({
  subsets: ["arabic"],
  weight: ["700", "800"],
  variable: "--font-tajawal",
  display: "optional",
});

export const fontVariables = [inter.variable, poppins.variable, cairo.variable, tajawal.variable].join(" ");
