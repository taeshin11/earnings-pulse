import type { Metadata } from "next";
import { getSectorBySlug, getEarningsBySector, getAllSectors } from "@/lib/data";
import { formatDate, formatEPS, formatSurprise } from "@/lib/utils";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import EarningsTable from "@/components/EarningsTable";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, TrendingUp } from "lucide-react";

export const revalidate = 86400;

export async function generateStaticParams() {
  const sectors = getAllSectors();
  return sectors.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const sector = getSectorBySlug(slug);
  if (!sector) return { title: "Sector Not Found" };

  return {
    title: `${sector.sector} Earnings This Week — Beat Rate & Trends | EarningsPulse`,
    description: `${sector.companiesCount} ${sector.sector} companies report earnings this week. Sector beat rate: ${sector.beatRate}%. See all tickers and EPS estimates.`,
  };
}

export default async function SectorDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const sector = getSectorBySlug(slug);
  if (!sector) notFound();

  const entries = getEarningsBySector(slug);
  const hasReported = entries.filter((e) => e.epsActual !== null);
  const beats = hasReported.filter((e) => e.beat === true);
  const beatRateColor = sector.beatRate >= 70 ? "#059669" : sector.beatRate >= 50 ? "#d97706" : "#dc2626";

  return (
    <>
      <Navbar />
      <main style={{ maxWidth: 1200, margin: "0 auto", padding: "2rem 1rem", minHeight: "80vh" }}>
        {/* Breadcrumb */}
        <div style={{ marginBottom: "1.25rem" }}>
          <Link href={`/${locale}/sectors`} style={{ display: "inline-flex", alignItems: "center", gap: 6, color: "#4f46e5", textDecoration: "none", fontSize: 14, fontWeight: 500 }}>
            <ArrowLeft size={14} />
            All Sectors
          </Link>
        </div>

        {/* Header */}
        <div style={{ background: "linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)", borderRadius: 16, padding: "2rem", marginBottom: "1.5rem", color: "#fff" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 12 }}>
            <div>
              <h1 style={{ fontSize: "1.8rem", fontWeight: 800, color: "#fff", marginBottom: 8 }}>
                {sector.sector} Earnings
              </h1>
              <p style={{ color: "#a5b4fc", fontSize: 15 }}>
                Sector earnings beat rate and upcoming reports
              </p>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: 36, fontWeight: 800, color: sector.beatRate >= 70 ? "#6ee7b7" : sector.beatRate >= 50 ? "#fbbf24" : "#fda4af" }}>
                {sector.beatRate}%
              </div>
              <div style={{ fontSize: 12, color: "#c7d2fe" }}>Beat Rate</div>
            </div>
          </div>

          {/* Stats */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))", gap: 12, marginTop: "1.5rem" }}>
            {[
              { label: "Total Tracked", value: entries.length },
              { label: "Reported", value: hasReported.length },
              { label: "Beats", value: beats.length },
              { label: "Avg Surprise", value: `${sector.avgSurprise}%` },
            ].map((stat) => (
              <div key={stat.label} style={{ background: "rgba(255,255,255,0.08)", borderRadius: 10, padding: "12px 14px" }}>
                <div style={{ fontSize: 11, color: "#c7d2fe", marginBottom: 4 }}>{stat.label}</div>
                <div style={{ fontSize: 20, fontWeight: 700, color: "#fff" }}>{stat.value}</div>
              </div>
            ))}
          </div>

          {/* Beat rate bar */}
          <div style={{ marginTop: "1.5rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6, fontSize: 12, color: "#c7d2fe" }}>
              <span>Beat Rate</span>
              <span>{sector.beatRate}%</span>
            </div>
            <div style={{ background: "rgba(255,255,255,0.15)", borderRadius: 8, height: 10, overflow: "hidden" }}>
              <div style={{ width: `${sector.beatRate}%`, height: "100%", background: sector.beatRate >= 70 ? "#10b981" : sector.beatRate >= 50 ? "#f59e0b" : "#f43f5e", borderRadius: 8, transition: "width 0.5s" }} />
            </div>
          </div>
        </div>

        {/* Top Beaters / Missers */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: "1.5rem" }}>
          {sector.topBeaters.length > 0 && (
            <div style={{ background: "#fff", borderRadius: 12, border: "1px solid #e0e7ff", padding: "1.25rem" }}>
              <h2 style={{ fontSize: 14, fontWeight: 700, color: "#059669", marginBottom: 12, display: "flex", alignItems: "center", gap: 6 }}>
                <TrendingUp size={14} /> Top Beaters
              </h2>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {sector.topBeaters.map((t) => (
                  <Link key={t} href={`/${locale}/stocks/${t}`} style={{ textDecoration: "none" }}>
                    <span style={{ fontSize: 13, fontWeight: 700, padding: "4px 12px", borderRadius: 8, background: "#d1fae5", color: "#065f46", display: "block" }}>
                      {t}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}
          {sector.topMissers.length > 0 && (
            <div style={{ background: "#fff", borderRadius: 12, border: "1px solid #e0e7ff", padding: "1.25rem" }}>
              <h2 style={{ fontSize: 14, fontWeight: 700, color: "#dc2626", marginBottom: 12 }}>Top Missers</h2>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {sector.topMissers.map((t) => (
                  <Link key={t} href={`/${locale}/stocks/${t}`} style={{ textDecoration: "none" }}>
                    <span style={{ fontSize: 13, fontWeight: 700, padding: "4px 12px", borderRadius: 8, background: "#ffe4e6", color: "#9f1239", display: "block" }}>
                      {t}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Ad slot */}
        <div style={{ width: "100%", marginBottom: 20, minHeight: 90, borderRadius: 10, background: "#f0f4ff", border: "1px dashed #c7d2fe", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <span style={{ fontSize: 12, color: "#a5b4fc" }}>Advertisement</span>
        </div>

        {/* Stocks table */}
        <h2 style={{ fontSize: "1.2rem", fontWeight: 700, color: "#1e1b4b", marginBottom: "1rem" }}>
          All {sector.sector} Stocks
        </h2>
        {entries.length > 0 ? (
          <EarningsTable entries={entries} locale={locale} />
        ) : (
          <div style={{ textAlign: "center", padding: "3rem", color: "#9ca3af", background: "#fff", borderRadius: 12, border: "1px solid #e0e7ff" }}>
            No stocks tracked in this sector yet.
          </div>
        )}
      </main>
      <Footer locale={locale} />
    </>
  );
}
