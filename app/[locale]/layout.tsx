import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: {
    default: "EarningsPulse — Stock Earnings Calendar",
    template: "%s | EarningsPulse",
  },
  description:
    "Track S&P 500 earnings dates, EPS estimates, beat/miss rates, and sector trends. Updated daily.",
  metadataBase: new URL("https://earnings-pulse.vercel.app"),
  openGraph: {
    siteName: "EarningsPulse",
    type: "website",
  },
  alternates: {
    languages: {
      en: "/en",
      ko: "/ko",
      ja: "/ja",
      zh: "/zh",
      es: "/es",
      fr: "/fr",
      de: "/de",
      pt: "/pt",
    },
  },
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as never)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body style={{ background: "#f8f9ff", color: "#1e1b4b", minHeight: "100vh" }}>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
