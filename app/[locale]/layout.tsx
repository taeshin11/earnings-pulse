import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";
import Script from 'next/script';
import { FeedbackButton } from '@/components/FeedbackButton';
import { AdSocialBar } from '@/components/ads/AdSocialBar';

export const metadata: Metadata = {
  verification: {
    google: "WddgcbVJsL2BGHNAje5m6DK56IcR0Mw5UOqozI2Xtrc",
  },
  title: {
    default: "Earnings Calendar & EPS Tracker | EarningsPulse",
    template: "%s | EarningsPulse",
  },
  description:
    "Track quarterly earnings reports, EPS surprises, and revenue beats for S&P 500 companies. Updated in real-time during earnings season.",
  keywords: [
    "earnings calendar",
    "EPS tracker",
    "earnings reports",
    "earnings surprise",
    "quarterly earnings",
    "stock earnings",
    "earnings season",
    "EPS beat miss",
  ],
  metadataBase: new URL("https://earnings-pulse-iota.vercel.app"),
  openGraph: {
    siteName: "EarningsPulse",
    type: "website",
    title: "Earnings Calendar & EPS Tracker | EarningsPulse",
    description:
      "Track quarterly earnings reports, EPS surprises, and revenue beats for S&P 500 companies. Updated in real-time during earnings season.",
    url: "https://earnings-pulse-iota.vercel.app",
  },
  twitter: {
    card: "summary_large_image",
    title: "Earnings Calendar & EPS Tracker | EarningsPulse",
    description:
      "Track quarterly earnings reports, EPS surprises, and revenue beats for S&P 500 companies.",
  },
  alternates: {
    canonical: "https://earnings-pulse-iota.vercel.app",
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
  other: {
    "google-adsense-account": "ca-pub-7098271335538021",
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
          <AdSocialBar />
          <Script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7098271335538021" crossOrigin="anonymous" strategy="afterInteractive" />
          <FeedbackButton siteName="EarningsPulse" />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
