import Link from "next/link";
import { inter } from "@/lib/fonts";

// Fallback for requests that never reached a locale (rare: the middleware
// redirects almost everything to /ar or /en).
export default function GlobalNotFound() {
  return (
    <html lang="en" dir="ltr" className={inter.variable}>
      <body className="grid min-h-screen place-items-center bg-navy-900 p-6 text-center text-white">
        <div>
          <h1 className="text-3xl font-bold">404</h1>
          <p className="mt-2 text-white/70">Page not found · الصفحة غير موجودة</p>
          <Link href="/ar" className="mt-6 inline-block text-teal-400 underline underline-offset-4">
            الرئيسية / Home
          </Link>
        </div>
      </body>
    </html>
  );
}
