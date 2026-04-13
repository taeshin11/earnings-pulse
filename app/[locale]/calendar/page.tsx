import type { Metadata } from "next";
import { getAllEarnings } from "@/lib/data";
import { formatDate } from "@/lib/utils";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import EarningsTable from "@/components/EarningsTable";
import Link from "next/link";

export const revalidate = 86400;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const now = new Date();
  const monthYear = now.toLocaleDateString("en-US", { month: "long", year: "numeric" });
  return {
    title: `Earnings Calendar ${monthYear} — Full Monthly View | EarningsPulse`,
    description: `Complete earnings calendar for ${monthYear}. All S&P 500 companies reporting earnings with EPS estimates and beat/miss tracking.`,
  };
}

export default async function CalendarPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const all = getAllEarnings().sort(
    (a, b) => new Date(a.reportDate).getTime() - new Date(b.reportDate).getTime()
  );

  // Group by month
  const byMonth: Record<string, typeof all> = {};
  all.forEach((e) => {
    const d = new Date(e.reportDate);
    const key = d.toLocaleDateString("en-US", { month: "long", year: "numeric" });
    if (!byMonth[key]) byMonth[key] = [];
    byMonth[key].push(e);
  });

  // Group by date within month
  const byDate: Record<string, Record<string, typeof all>> = {};
  Object.entries(byMonth).forEach(([month, entries]) => {
    byDate[month] = {};
    entries.forEach((e) => {
      const d = formatDate(e.reportDate);
      if (!byDate[month][d]) byDate[month][d] = [];
      byDate[month][d].push(e);
    });
  });

  return (
    <>
      <Navbar />
      <main style={{ maxWidth: 1200, margin: "0 auto", padding: "2rem 1rem", minHeight: "80vh" }}>
        <div style={{ marginBottom: "1.5rem" }}>
          <h1 style={{ fontSize: "1.8rem", fontWeight: 800, color: "#1e1b4b", marginBottom: 8 }}>
            Full Earnings Calendar
          </h1>
          <p style={{ color: "#6b7280", fontSize: 15 }}>
            All S&P 500 companies with scheduled earnings reports — Q1 2025
          </p>
        </div>

        {/* Ad slot */}
        <div style={{ width: "100%", marginBottom: 24, minHeight: 90, borderRadius: 10, background: "#f0f4ff", border: "1px dashed #c7d2fe", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <span style={{ fontSize: 12, color: "#a5b4fc" }}>Advertisement</span>
        </div>

        {Object.entries(byDate).map(([month, dates]) => (
          <section key={month} style={{ marginBottom: "2.5rem" }}>
            <h2 style={{ fontSize: "1.2rem", fontWeight: 700, color: "#4f46e5", marginBottom: "1rem", paddingBottom: 8, borderBottom: "2px solid #e0e7ff" }}>
              {month}
            </h2>

            {Object.entries(dates).map(([date, entries]) => (
              <div key={date} style={{ marginBottom: "1.5rem" }}>
                <h3 style={{ fontSize: 14, fontWeight: 600, color: "#6b7280", marginBottom: 10, display: "flex", alignItems: "center", gap: 8 }}>
                  {date}
                  <span style={{ fontSize: 12, color: "#9ca3af" }}>({entries.length} companies)</span>
                </h3>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 12 }}>
                  {/* BMO */}
                  <div>
                    <div style={{ fontSize: 12, fontWeight: 600, color: "#4f46e5", marginBottom: 8, background: "#eef2ff", padding: "4px 10px", borderRadius: 6, display: "inline-block" }}>
                      Before Market Open (BMO)
                    </div>
                    {entries.filter((e) => e.reportTime === "BMO").length === 0 ? (
                      <p style={{ fontSize: 12, color: "#d1d5db" }}>None</p>
                    ) : (
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                        {entries.filter((e) => e.reportTime === "BMO").map((e) => (
                          <Link key={e.ticker} href={`/${locale}/stocks/${e.ticker}`}
                            style={{ fontSize: 12, fontWeight: 600, padding: "3px 10px", borderRadius: 8, background: "#fff", border: "1px solid #e0e7ff", color: "#1e1b4b", textDecoration: "none" }}>
                            {e.ticker}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                  {/* AMC */}
                  <div>
                    <div style={{ fontSize: 12, fontWeight: 600, color: "#7c3aed", marginBottom: 8, background: "#fdf4ff", padding: "4px 10px", borderRadius: 6, display: "inline-block" }}>
                      After Market Close (AMC)
                    </div>
                    {entries.filter((e) => e.reportTime === "AMC").length === 0 ? (
                      <p style={{ fontSize: 12, color: "#d1d5db" }}>None</p>
                    ) : (
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                        {entries.filter((e) => e.reportTime === "AMC").map((e) => (
                          <Link key={e.ticker} href={`/${locale}/stocks/${e.ticker}`}
                            style={{ fontSize: 12, fontWeight: 600, padding: "3px 10px", borderRadius: 8, background: "#fff", border: "1px solid #e0e7ff", color: "#1e1b4b", textDecoration: "none" }}>
                            {e.ticker}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </section>
        ))}

        <section style={{ marginTop: "2rem" }}>
          <h2 style={{ fontSize: "1.3rem", fontWeight: 700, color: "#1e1b4b", marginBottom: "1rem" }}>All Earnings — Full Table</h2>
          <EarningsTable entries={all} locale={locale} />
        </section>
      </main>
      <Footer locale={locale} />
    </>
  );
}
