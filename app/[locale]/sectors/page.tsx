import type { Metadata } from "next";
import { getAllSectors, getAllEarnings } from "@/lib/data";
import { getBeatRateBg } from "@/lib/utils";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BeatRateChart from "@/components/BeatRateChart";
import Link from "next/link";
import { TrendingUp } from "lucide-react";

export const revalidate = 86400;

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Sector Earnings Beat Rates — S&P 500 Sector Analysis | EarningsPulse",
    description: "Compare earnings beat rates across all S&P 500 sectors. Technology, Healthcare, Financials, and more. Updated daily with latest earnings data.",
  };
}

export default async function SectorsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const sectors = getAllSectors();
  const allEarnings = getAllEarnings();

  const sorted = [...sectors].sort((a, b) => b.beatRate - a.beatRate);

  return (
    <>
      <Navbar />
      <main style={{ maxWidth: 1200, margin: "0 auto", padding: "2rem 1rem", minHeight: "80vh" }}>
        {/* Header */}
        <div style={{ marginBottom: "1.5rem" }}>
          <h1 style={{ fontSize: "1.8rem", fontWeight: 800, color: "#1e1b4b", marginBottom: 8 }}>
            Sector Earnings Beat Rates
          </h1>
          <p style={{ color: "#6b7280", fontSize: 15 }}>
            Compare earnings beat rates across all S&P 500 sectors. Based on last 4 quarters of data.
          </p>
        </div>

        {/* Chart */}
        <div style={{ marginBottom: "2rem" }}>
          <BeatRateChart sectors={sectors} />
        </div>

        {/* Ad slot */}
        <div style={{ width: "100%", marginBottom: 20, minHeight: 90, borderRadius: 10, background: "#f0f4ff", border: "1px dashed #c7d2fe", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <span style={{ fontSize: 12, color: "#a5b4fc" }}>Advertisement</span>
        </div>

        {/* Sector cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 16 }}>
          {sorted.map((sector) => {
            const sectorEarnings = allEarnings.filter((e) => e.sector === sector.sector);
            const hasReported = sectorEarnings.filter((e) => e.epsActual !== null);
            const beats = hasReported.filter((e) => e.beat === true);
            const beatRateColor = sector.beatRate >= 70 ? "#059669" : sector.beatRate >= 50 ? "#d97706" : "#dc2626";
            const beatRateBg = sector.beatRate >= 70 ? "#d1fae5" : sector.beatRate >= 50 ? "#fef3c7" : "#ffe4e6";

            return (
              <Link key={sector.slug} href={`/${locale}/sectors/${sector.slug}`} style={{ textDecoration: "none" }}>
                <div
                  style={{ background: "#fff", borderRadius: 12, border: "1px solid #e0e7ff", padding: "1.25rem", transition: "all 0.15s" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 20px rgba(79,70,229,0.12)"; (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = "none"; (e.currentTarget as HTMLElement).style.transform = "none"; }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                    <h2 style={{ fontSize: 16, fontWeight: 700, color: "#1e1b4b", margin: 0 }}>{sector.sector}</h2>
                    <span style={{ fontSize: 20, fontWeight: 800, color: beatRateColor }}>{sector.beatRate}%</span>
                  </div>

                  {/* Beat rate bar */}
                  <div style={{ background: "#f0f4ff", borderRadius: 6, height: 8, marginBottom: 12, overflow: "hidden" }}>
                    <div style={{ width: `${sector.beatRate}%`, height: "100%", background: beatRateColor, borderRadius: 6, transition: "width 0.5s" }} />
                  </div>

                  <div style={{ display: "flex", gap: 12, fontSize: 12, color: "#6b7280", marginBottom: 10 }}>
                    <span>{sectorEarnings.length} tracked</span>
                    <span>{hasReported.length} reported</span>
                    <span style={{ color: beatRateColor, fontWeight: 600 }}>{beats.length} beats</span>
                  </div>

                  {sector.topBeaters.length > 0 && (
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                      {sector.topBeaters.map((t) => (
                        <span key={t} style={{ fontSize: 11, fontWeight: 600, padding: "2px 8px", borderRadius: 8, background: "#d1fae5", color: "#065f46" }}>
                          {t}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      </main>
      <Footer locale={locale} />
    </>
  );
}
