import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { getAllEarnings, getAllSectors, getUpcomingEarnings } from "@/lib/data";
import { formatDate } from "@/lib/utils";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import EarningsCalendar from "@/components/EarningsCalendar";
import BeatRateChart from "@/components/BeatRateChart";
import SearchBar from "@/components/SearchBar";
import Link from "next/link";
import { AdsterraNativeBanner } from '@/components/ads/AdsterraNativeBanner';
import { AdsterraDisplay } from '@/components/ads/AdsterraDisplay';

export const revalidate = 86400;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const now = new Date();
  const monthYear = now.toLocaleDateString("en-US", { month: "long", year: "numeric" });
  const upcoming = getUpcomingEarnings(7);

  return {
    title: `Earnings Calendar This Week ${monthYear} — EPS Beat/Miss Tracker | EarningsPulse`,
    description: `${upcoming.length} companies report earnings this week. Track EPS estimates, beat/miss rates, and sector trends. Updated daily.`,
    alternates: {
      canonical: `https://earnings-pulse.vercel.app/${locale}`,
      languages: {
        en: "/en", ko: "/ko", ja: "/ja", zh: "/zh",
        es: "/es", fr: "/fr", de: "/de", pt: "/pt",
      },
    },
    openGraph: {
      title: `Earnings Calendar This Week | EarningsPulse`,
      description: `${upcoming.length} companies report earnings this week. Track EPS and sector trends.`,
      url: `https://earnings-pulse.vercel.app/${locale}`,
    },
  };
}

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      name: "EarningsPulse",
      url: "https://earnings-pulse.vercel.app",
      description: "Stock earnings calendar with EPS beat/miss tracking",
      potentialAction: {
        "@type": "SearchAction",
        target: "https://earnings-pulse.vercel.app/en/stocks/{search_term_string}",
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "What is an earnings beat?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "An earnings beat occurs when a company reports EPS (earnings per share) higher than analyst consensus estimates.",
          },
        },
        {
          "@type": "Question",
          name: "What does BMO and AMC mean?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "BMO means Before Market Open — the company reports earnings before the stock market opens. AMC means After Market Close — the company reports after trading ends.",
          },
        },
        {
          "@type": "Question",
          name: "How often is this data updated?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "EarningsPulse data is updated daily using multiple data sources including Alpha Vantage and Yahoo Finance.",
          },
        },
        {
          "@type": "Question",
          name: "What is EPS surprise?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "EPS surprise is the percentage difference between reported EPS and analyst estimates. A positive surprise means the company beat expectations.",
          },
        },
      ],
    },
  ],
};

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations("home");
  const allEarnings = getAllEarnings();
  const sectors = getAllSectors();
  const upcoming = getUpcomingEarnings(7);
  const recent = allEarnings.filter((e) => e.epsActual !== null).slice(0, 5);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <main style={{ minHeight: "80vh" }}>
        {/* Hero */}
        <section style={{ background: "linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)", padding: "4rem 1rem 3rem" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "2rem" }}>
              <h1 style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 800, color: "#fff", marginBottom: 12, lineHeight: 1.2 }}>
                {t("thisWeekEarnings")}
              </h1>
              <p style={{ fontSize: "clamp(1rem, 2vw, 1.2rem)", color: "#a5b4fc", maxWidth: 600, margin: "0 auto 1.5rem" }}>
                Track EPS estimates, beat/miss rates, and sector trends — updated daily
              </p>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <SearchBar entries={allEarnings} locale={locale} />
              </div>
            </div>

            {/* Stats */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 12, marginTop: "1.5rem" }}>
              {[
                { label: "Reporting This Week", value: upcoming.length, color: "#a5b4fc" },
                { label: "Already Reported", value: allEarnings.filter((e) => e.epsActual !== null).length, color: "#6ee7b7" },
                { label: "Beat Rate", value: `${Math.round((allEarnings.filter((e) => e.beat === true).length / Math.max(allEarnings.filter((e) => e.beat !== null).length, 1)) * 100)}%`, color: "#fbbf24" },
                { label: "Total Tracked", value: allEarnings.length, color: "#f9a8d4" },
              ].map((stat) => (
                <div key={stat.label} style={{ background: "rgba(255,255,255,0.08)", borderRadius: 12, padding: "1rem", textAlign: "center", border: "1px solid rgba(255,255,255,0.12)" }}>
                  <div style={{ fontSize: "clamp(1.4rem, 3vw, 2rem)", fontWeight: 700, color: stat.color }}>{stat.value}</div>
                  <div style={{ fontSize: 12, color: "#c7d2fe", marginTop: 4 }}>{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Calendar */}
        <section style={{ maxWidth: 1200, margin: "0 auto", padding: "2rem 1rem" }}>
          <h2 style={{ fontSize: "1.4rem", fontWeight: 700, color: "#1e1b4b", marginBottom: "1.25rem" }}>
            This Week&apos;s Earnings Calendar
          </h2>
          <EarningsCalendar entries={upcoming} locale={locale} />
        </section>

        {/* Recent Results */}
        {recent.length > 0 && (
          <section style={{ maxWidth: 1200, margin: "0 auto", padding: "0 1rem 2rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
              <h2 style={{ fontSize: "1.4rem", fontWeight: 700, color: "#1e1b4b" }}>Recent Results</h2>
              <Link href={`/${locale}/stocks`} style={{ fontSize: 13, color: "#4f46e5", textDecoration: "none", fontWeight: 500 }}>
                View All &rarr;
              </Link>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 12 }}>
              {recent.map((e) => (
                <Link key={e.ticker} href={`/${locale}/stocks/${e.ticker}`} style={{ textDecoration: "none" }}>
                  <div style={{ background: "#fff", borderRadius: 10, border: "1px solid #e0e7ff", borderLeft: `4px solid ${e.beat ? "#10b981" : "#f43f5e"}`, padding: "12px 14px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                      <span style={{ fontWeight: 700, color: "#1e1b4b" }}>{e.ticker}</span>
                      <span style={{ fontSize: 11, fontWeight: 600, padding: "2px 8px", borderRadius: 10, background: e.beat ? "#d1fae5" : "#ffe4e6", color: e.beat ? "#065f46" : "#9f1239" }}>
                        {e.beat ? "Beat" : "Miss"} {e.surprise !== null && `${e.surprise > 0 ? "+" : ""}${e.surprise}%`}
                      </span>
                    </div>
                    <p style={{ fontSize: 12, color: "#6b7280" }}>{e.name}</p>
                    <p style={{ fontSize: 12, color: "#9ca3af", marginTop: 4 }}>{formatDate(e.reportDate)} &middot; {e.reportTime}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Sector Beat Rates */}
        <section style={{ maxWidth: 1200, margin: "0 auto", padding: "0 1rem 2rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
            <h2 style={{ fontSize: "1.4rem", fontWeight: 700, color: "#1e1b4b" }}>{t("sectorBeatRates")}</h2>
            <Link href={`/${locale}/sectors`} style={{ fontSize: 13, color: "#4f46e5", textDecoration: "none", fontWeight: 500 }}>
              View All &rarr;
            </Link>
          </div>
          <BeatRateChart sectors={sectors} />
        </section>

        {/* FAQ */}
        <section style={{ maxWidth: 800, margin: "0 auto", padding: "0 1rem 3rem" }}>
          <h2 style={{ fontSize: "1.4rem", fontWeight: 700, color: "#1e1b4b", marginBottom: "1.25rem" }}>
            {t("faqTitle")}
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {[
              { q: t("faq1Q"), a: t("faq1A") },
              { q: t("faq2Q"), a: t("faq2A") },
              { q: t("faq3Q"), a: t("faq3A") },
              { q: t("faq4Q"), a: t("faq4A") },
            ].map((faq, i) => (
              <details key={i} style={{ background: "#fff", borderRadius: 10, border: "1px solid #e0e7ff", padding: "1rem 1.25rem" }}>
                <summary style={{ fontWeight: 600, color: "#1e1b4b", cursor: "pointer", fontSize: 15 }}>
                  {faq.q}
                </summary>
                <p style={{ marginTop: 10, color: "#4b5563", fontSize: 14, lineHeight: 1.6 }}>{faq.a}</p>
              </details>
            ))}
          </div>
        </section>
      <AdsterraNativeBanner />
      <AdsterraDisplay />
      </main>
      <Footer locale={locale} />
    </>
  );
}
