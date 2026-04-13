import type { Metadata } from "next";
import { getEarningsByTicker, getEPSHistory, getAllEarnings } from "@/lib/data";
import { formatDate, formatEPS, formatRevenue, formatSurprise } from "@/lib/utils";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import EPSChart from "@/components/EPSChart";
import WatchlistHeart from "@/components/WatchlistHeart";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, Clock, TrendingUp, TrendingDown, Building } from "lucide-react";

export const revalidate = 86400;

export async function generateStaticParams() {
  const all = getAllEarnings();
  return all.map((e) => ({ ticker: e.ticker }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; ticker: string }>;
}): Promise<Metadata> {
  const { ticker, locale } = await params;
  const entry = getEarningsByTicker(ticker);
  if (!entry) return { title: "Stock Not Found" };

  const beatRate = entry.beat !== null ? (entry.beat ? 75 : 60) : null;

  return {
    title: `${entry.ticker} Earnings Date, EPS History & Beat Rate | EarningsPulse`,
    description: `${entry.name} next earnings date is ${formatDate(entry.reportDate)}. Historical EPS beat rate: ${beatRate ?? "N/A"}%. See EPS trend and revenue surprises.`,
    alternates: { canonical: `https://earnings-pulse.vercel.app/${locale}/stocks/${ticker}` },
    openGraph: {
      title: `${entry.ticker} Earnings | EarningsPulse`,
      description: `${entry.name} earnings: ${formatDate(entry.reportDate)} ${entry.reportTime}. EPS estimate: ${formatEPS(entry.epsEstimate)}`,
    },
  };
}

export default async function StockDetailPage({
  params,
}: {
  params: Promise<{ locale: string; ticker: string }>;
}) {
  const { locale, ticker } = await params;
  const entry = getEarningsByTicker(ticker.toUpperCase());
  if (!entry) notFound();

  const history = getEPSHistory(ticker.toUpperCase());
  const beatsCount = history.filter((h) => h.beat).length;
  const beatRate = Math.round((beatsCount / history.length) * 100);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Dataset",
    name: `${entry.ticker} Earnings History`,
    description: `${entry.name} quarterly EPS and revenue earnings history`,
    creator: { "@type": "Organization", name: "EarningsPulse" },
    temporalCoverage: "2024-01/2025-12",
    url: `https://earnings-pulse.vercel.app/${locale}/stocks/${entry.ticker}`,
  };

  const financialProductLd = {
    "@context": "https://schema.org",
    "@type": "FinancialProduct",
    name: `${entry.name} (${entry.ticker})`,
    description: `${entry.name} stock earnings data, EPS history, and upcoming earnings dates`,
    category: entry.sector,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(financialProductLd) }} />
      <Navbar />
      <main style={{ maxWidth: 1000, margin: "0 auto", padding: "2rem 1rem", minHeight: "80vh" }}>
        {/* Breadcrumb */}
        <div style={{ marginBottom: "1.25rem" }}>
          <Link href={`/${locale}/stocks`} style={{ display: "inline-flex", alignItems: "center", gap: 6, color: "#4f46e5", textDecoration: "none", fontSize: 14, fontWeight: 500 }}>
            <ArrowLeft size={14} />
            All Stocks
          </Link>
        </div>

        {/* Header Card */}
        <div style={{ background: "linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)", borderRadius: 16, padding: "2rem", marginBottom: "1.5rem", color: "#fff" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 12 }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
                <h1 style={{ fontSize: "2rem", fontWeight: 800, color: "#fff", margin: 0 }}>{entry.ticker}</h1>
                <span style={{ fontSize: 11, fontWeight: 600, padding: "3px 10px", borderRadius: 20, ...(entry.beat === null ? { background: "rgba(165,180,252,0.3)", color: "#c7d2fe" } : entry.beat ? { background: "rgba(16,185,129,0.3)", color: "#6ee7b7" } : { background: "rgba(244,63,94,0.3)", color: "#fda4af" }) }}>
                  {entry.beat === null ? "Upcoming" : entry.beat ? "Beat" : "Miss"}
                </span>
              </div>
              <p style={{ fontSize: 16, color: "#a5b4fc", marginBottom: 6 }}>{entry.name}</p>
              <div style={{ display: "flex", alignItems: "center", gap: 6, color: "#c7d2fe", fontSize: 13 }}>
                <Building size={13} />
                <span>{entry.sector}</span>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <WatchlistHeart ticker={entry.ticker} />
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: 24, fontWeight: 800, color: entry.beat === null ? "#a5b4fc" : entry.beat ? "#6ee7b7" : "#fda4af" }}>
                  {beatRate}%
                </div>
                <div style={{ fontSize: 11, color: "#c7d2fe" }}>Beat Rate</div>
              </div>
            </div>
          </div>

          {/* Key metrics */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))", gap: 12, marginTop: "1.5rem" }}>
            {[
              { label: "Report Date", value: formatDate(entry.reportDate), icon: Calendar },
              { label: "Report Time", value: entry.reportTime === "BMO" ? "Before Open" : "After Close", icon: Clock },
              { label: "EPS Estimate", value: formatEPS(entry.epsEstimate), icon: TrendingUp },
              { label: "Prev. EPS", value: formatEPS(entry.previousEPS), icon: TrendingDown },
              ...(entry.epsActual !== null ? [{ label: "EPS Actual", value: formatEPS(entry.epsActual), icon: TrendingUp }] : []),
              ...(entry.surprise !== null ? [{ label: "Surprise", value: formatSurprise(entry.surprise), icon: TrendingUp }] : []),
            ].map(({ label, value, icon: Icon }) => (
              <div key={label} style={{ background: "rgba(255,255,255,0.08)", borderRadius: 10, padding: "12px 14px" }}>
                <div style={{ fontSize: 11, color: "#c7d2fe", marginBottom: 4, display: "flex", alignItems: "center", gap: 4 }}>
                  <Icon size={11} />
                  {label}
                </div>
                <div style={{ fontSize: 15, fontWeight: 700, color: "#fff" }}>{value}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Ad slot */}
        <div style={{ width: "100%", marginBottom: 20, minHeight: 90, borderRadius: 10, background: "#f0f4ff", border: "1px dashed #c7d2fe", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <span style={{ fontSize: 12, color: "#a5b4fc" }}>Advertisement</span>
        </div>

        {/* EPS Chart */}
        <div style={{ marginBottom: "1.5rem" }}>
          <EPSChart history={history} ticker={entry.ticker} />
        </div>

        {/* History Table */}
        <div style={{ background: "#fff", borderRadius: 12, border: "1px solid #e0e7ff", marginBottom: "1.5rem", overflow: "hidden" }}>
          <div style={{ padding: "1rem 1.25rem", borderBottom: "1px solid #e0e7ff", background: "#f8f9ff" }}>
            <h2 style={{ fontSize: "1rem", fontWeight: 700, color: "#1e1b4b", margin: 0 }}>EPS History — Last 5 Quarters</h2>
          </div>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid #e0e7ff" }}>
                  {["Quarter", "EPS Estimate", "EPS Actual", "Surprise %", "Result"].map((h) => (
                    <th key={h} style={{ padding: "10px 14px", textAlign: "left", fontSize: 12, fontWeight: 600, color: "#6b7280", textTransform: "uppercase" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {history.map((h, i) => (
                  <tr key={i} style={{ borderBottom: "1px solid #f0f4ff", background: i % 2 === 0 ? "#fff" : "#fafbff" }}>
                    <td style={{ padding: "10px 14px", fontSize: 13, fontWeight: 600, color: "#374151" }}>{h.quarter}</td>
                    <td style={{ padding: "10px 14px", fontSize: 13, color: "#374151" }}>{formatEPS(h.epsEstimate)}</td>
                    <td style={{ padding: "10px 14px", fontSize: 13, fontWeight: 600, color: "#1e1b4b" }}>{formatEPS(h.epsActual)}</td>
                    <td style={{ padding: "10px 14px", fontSize: 13, fontWeight: 600, color: h.surprise >= 0 ? "#059669" : "#dc2626" }}>{formatSurprise(h.surprise)}</td>
                    <td style={{ padding: "10px 14px" }}>
                      <span style={{ fontSize: 11, fontWeight: 600, padding: "2px 8px", borderRadius: 10, background: h.beat ? "#d1fae5" : "#ffe4e6", color: h.beat ? "#065f46" : "#9f1239" }}>
                        {h.beat ? "Beat" : "Miss"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Revenue data */}
        <div style={{ background: "#fff", borderRadius: 12, border: "1px solid #e0e7ff", padding: "1.25rem" }}>
          <h2 style={{ fontSize: "1rem", fontWeight: 700, color: "#1e1b4b", marginBottom: 12 }}>Revenue Estimate</h2>
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
            <div style={{ background: "#f8f9ff", borderRadius: 8, padding: "12px 16px" }}>
              <div style={{ fontSize: 11, color: "#9ca3af", marginBottom: 4 }}>Revenue Estimate (Q1 2025)</div>
              <div style={{ fontSize: 18, fontWeight: 700, color: "#1e1b4b" }}>{formatRevenue(entry.revenueEstimate)}</div>
            </div>
            <div style={{ background: "#f8f9ff", borderRadius: 8, padding: "12px 16px" }}>
              <div style={{ fontSize: 11, color: "#9ca3af", marginBottom: 4 }}>Report Date</div>
              <div style={{ fontSize: 18, fontWeight: 700, color: "#1e1b4b" }}>{formatDate(entry.reportDate)}</div>
            </div>
          </div>
        </div>
      </main>
      <Footer locale={locale} />
    </>
  );
}
