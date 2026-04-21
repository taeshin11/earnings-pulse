import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: "About EarningsPulse — Stock Earnings Tracker",
    description:
      "EarningsPulse tracks quarterly earnings reports, EPS beats and misses, revenue surprises, and guidance updates for S&P 500 and major public companies.",
    alternates: {
      canonical: `https://earnings-pulse-iota.vercel.app/${locale}/about`,
      languages: {
        en: "/en/about",
        ko: "/ko/about",
        ja: "/ja/about",
        zh: "/zh/about",
        es: "/es/about",
        fr: "/fr/about",
        de: "/de/about",
        pt: "/pt/about",
      },
    },
    openGraph: {
      title: "About EarningsPulse",
      description:
        "EarningsPulse tracks quarterly earnings reports, EPS beats and misses, revenue surprises, and guidance updates for S&P 500 companies.",
      url: `https://earnings-pulse-iota.vercel.app/${locale}/about`,
    },
  };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <>
      <Navbar />
      <main style={{ minHeight: "80vh" }}>
        {/* Hero */}
        <section
          style={{
            background: "linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)",
            padding: "4rem 1rem 3rem",
          }}
        >
          <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center" }}>
            <h1
              style={{
                fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
                fontWeight: 800,
                color: "#fff",
                marginBottom: 16,
                lineHeight: 1.2,
              }}
            >
              About EarningsPulse
            </h1>
            <p
              style={{
                fontSize: "clamp(1rem, 2vw, 1.15rem)",
                color: "#a5b4fc",
                maxWidth: 600,
                margin: "0 auto",
                lineHeight: 1.7,
              }}
            >
              Your go-to source for quarterly earnings reports, EPS surprises,
              revenue beats, and earnings call intelligence — updated during
              every earnings season.
            </p>
          </div>
        </section>

        {/* Mission */}
        <section style={{ maxWidth: 800, margin: "0 auto", padding: "3rem 1rem" }}>
          <h2
            style={{
              fontSize: "1.5rem",
              fontWeight: 700,
              color: "#1e1b4b",
              marginBottom: "1rem",
            }}
          >
            What Is EarningsPulse?
          </h2>
          <p style={{ color: "#374151", lineHeight: 1.8, fontSize: 15, marginBottom: "1.25rem" }}>
            EarningsPulse is a free earnings tracking platform that aggregates
            quarterly earnings reports, EPS (earnings per share) estimates,
            actual results, and revenue surprises for S&P 500 companies and
            other major publicly traded stocks. Our goal is to give individual
            investors and financial researchers a clear, fast view of how
            companies are performing relative to Wall Street expectations.
          </p>
          <p style={{ color: "#374151", lineHeight: 1.8, fontSize: 15 }}>
            Each earnings season, hundreds of companies report their quarterly
            financial results. EarningsPulse organizes these reports into an
            easy-to-navigate calendar, highlights beat and miss rates by sector,
            and surfaces significant EPS surprises so you can quickly understand
            market-moving earnings events.
          </p>
        </section>

        {/* Features grid */}
        <section
          style={{
            background: "#f0f4ff",
            padding: "3rem 1rem",
          }}
        >
          <div style={{ maxWidth: 1000, margin: "0 auto" }}>
            <h2
              style={{
                fontSize: "1.5rem",
                fontWeight: 700,
                color: "#1e1b4b",
                marginBottom: "2rem",
                textAlign: "center",
              }}
            >
              What We Track
            </h2>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
                gap: "1.25rem",
              }}
            >
              {[
                {
                  title: "Earnings Reports Calendar",
                  desc: "See which companies report this week, next week, and throughout earnings season. Includes BMO (Before Market Open) and AMC (After Market Close) timing.",
                  icon: "📅",
                },
                {
                  title: "EPS Beats & Misses",
                  desc: "Compare analyst consensus EPS estimates against actual reported earnings per share. Track surprise percentages to see who significantly outperformed or disappointed.",
                  icon: "📊",
                },
                {
                  title: "Revenue Surprises",
                  desc: "Beyond EPS, revenue guidance and actuals matter. We track top-line revenue beats and misses alongside earnings surprises for a fuller picture.",
                  icon: "💰",
                },
                {
                  title: "Guidance Updates",
                  desc: "Forward guidance from management is often more important than the earnings itself. We note when companies raise, lower, or maintain their guidance.",
                  icon: "🔭",
                },
                {
                  title: "Sector Beat Rates",
                  desc: "See which sectors — Technology, Healthcare, Financials, Energy, and more — are beating estimates most consistently this earnings season.",
                  icon: "🏭",
                },
                {
                  title: "After-Hours Reactions",
                  desc: "Earnings often move stocks significantly after hours. We track after-hours and pre-market price movements following earnings announcements.",
                  icon: "🌙",
                },
              ].map((feature) => (
                <div
                  key={feature.title}
                  style={{
                    background: "#fff",
                    borderRadius: 12,
                    padding: "1.5rem",
                    border: "1px solid #e0e7ff",
                  }}
                >
                  <div style={{ fontSize: 28, marginBottom: 10 }}>{feature.icon}</div>
                  <h3
                    style={{
                      fontSize: 15,
                      fontWeight: 700,
                      color: "#1e1b4b",
                      marginBottom: 8,
                    }}
                  >
                    {feature.title}
                  </h3>
                  <p style={{ fontSize: 13, color: "#6b7280", lineHeight: 1.6 }}>
                    {feature.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Coverage */}
        <section style={{ maxWidth: 800, margin: "0 auto", padding: "3rem 1rem" }}>
          <h2
            style={{
              fontSize: "1.5rem",
              fontWeight: 700,
              color: "#1e1b4b",
              marginBottom: "1rem",
            }}
          >
            Coverage Universe
          </h2>
          <p style={{ color: "#374151", lineHeight: 1.8, fontSize: 15, marginBottom: "1.25rem" }}>
            Our primary focus is the <strong>S&amp;P 500</strong> — the 500
            largest publicly traded U.S. companies by market capitalization. We
            also cover high-profile earnings from NASDAQ-100 constituents and
            other widely followed stocks that generate significant market
            attention during earnings season.
          </p>
          <p style={{ color: "#374151", lineHeight: 1.8, fontSize: 15, marginBottom: "1.25rem" }}>
            Earnings data is sourced from public SEC filings, company press
            releases, and financial data providers. All data is intended for
            informational purposes only. Please verify critical financial data
            directly through{" "}
            <a
              href="https://www.sec.gov/cgi-bin/browse-edgar"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#4f46e5" }}
            >
              SEC EDGAR
            </a>{" "}
            before making any investment decisions.
          </p>
          <div
            style={{
              background: "#fffbeb",
              border: "1px solid #fcd34d",
              borderRadius: 10,
              padding: "1rem 1.25rem",
              fontSize: 13,
              color: "#92400e",
              lineHeight: 1.6,
            }}
          >
            <strong>Disclaimer:</strong> EarningsPulse provides earnings data
            for informational and educational purposes only. Nothing on this site
            constitutes investment advice. Past earnings results do not predict
            future stock performance.
          </div>
        </section>

        {/* CTA */}
        <section
          style={{
            background: "linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)",
            padding: "3rem 1rem",
            textAlign: "center",
          }}
        >
          <h2
            style={{
              fontSize: "1.5rem",
              fontWeight: 700,
              color: "#fff",
              marginBottom: 12,
            }}
          >
            Start Tracking Earnings
          </h2>
          <p style={{ color: "#a5b4fc", marginBottom: "1.5rem", fontSize: 15 }}>
            View this week&apos;s earnings calendar and see which companies are
            beating analyst expectations.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <Link
              href={`/${locale}/calendar`}
              style={{
                background: "#4f46e5",
                color: "#fff",
                padding: "0.75rem 1.5rem",
                borderRadius: 8,
                textDecoration: "none",
                fontWeight: 600,
                fontSize: 15,
              }}
            >
              Earnings Calendar
            </Link>
            <Link
              href={`/${locale}/how-to-use`}
              style={{
                background: "rgba(255,255,255,0.12)",
                color: "#e0e7ff",
                padding: "0.75rem 1.5rem",
                borderRadius: 8,
                textDecoration: "none",
                fontWeight: 600,
                fontSize: 15,
              }}
            >
              How to Use
            </Link>
          </div>
        </section>
      </main>
      <Footer locale={locale} />
    </>
  );
}
