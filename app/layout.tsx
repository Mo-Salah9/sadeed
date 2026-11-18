import "./globals.css";

// The <html> and <body> tags live in app/[locale]/layout.tsx so that
// `lang` and `dir` can be set per locale.
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
