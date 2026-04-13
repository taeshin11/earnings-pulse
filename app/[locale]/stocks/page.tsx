"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { getAllEarnings, getAllSectors } from "@/lib/data";
import { formatDate, formatEPS, getBeatRateBg } from "@/lib/utils";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { Search } from "lucide-react";

export default function StocksPage() {
  const params = useParams();
  const locale = (params.locale as string) || "en";
  const allEntries = getAllEarnings();
  const sectors = getAllSectors();

  const [query, setQuery] = useState("");
  const [sectorFilter, setSectorFilter] = useState("All");

  const filtered = allEntries.filter((e) => {
    const matchQ =
      query === "" ||
      e.ticker.toLowerCase().includes(query.toLowerCase()) ||
      e.name.toLowerCase().includes(query.toLowerCase());
    const matchS = sectorFilter === "All" || e.sector === sectorFilter;
    return matchQ && matchS;
  });

  const sectorNames = ["All", ...Array.from(new Set(allEntries.map((e) => e.sector))).sort()];

  return (
    <>
      <Navbar />
      <main style={{ maxWidth: 1200, margin: "0 auto", padding: "2rem 1rem", minHeight: "80vh" }}>
        <div style={{ marginBottom: "1.5rem" }}>
          <h1 style={{ fontSize: "1.8rem", fontWeight: 800, color: "#1e1b4b", marginBottom: 8 }}>
            All Stocks with Earnings
          </h1>
          <p style={{ color: "#6b7280", fontSize: 15 }}>
            Browse S&P 500 companies with upcoming earnings dates and historical beat rates
          </p>
        </div>

        {/* Search + Filter */}
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: "1.5rem" }}>
          <div style={{ position: "relative", flex: 1, minWidth: 200 }}>
            <Search size={15} color="#9ca3af" style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)" }} />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by ticker or company name..."
              style={{ width: "100%", padding: "9px 12px 9px 32px", borderRadius: 8, border: "1px solid #e0e7ff", fontSize: 14, color: "#1e1b4b", outline: "none", boxSizing: "border-box" }}
            />
          </div>

          <select
            value={sectorFilter}
            onChange={(e) => setSectorFilter(e.target.value)}
            style={{ padding: "9px 12px", borderRadius: 8, border: "1px solid #e0e7ff", fontSize: 14, color: "#1e1b4b", background: "#fff", cursor: "pointer" }}
          >
            {sectorNames.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>

        {/* Stats bar */}
        <div style={{ display: "flex", gap: 16, marginBottom: "1.25rem", flexWrap: "wrap" }}>
          <span style={{ fontSize: 13, color: "#6b7280" }}>
            Showing <strong style={{ color: "#1e1b4b" }}>{filtered.length}</strong> of {allEntries.length} stocks
          </span>
          <span style={{ fontSize: 13, color: "#6b7280" }}>
            Beat: <strong style={{ color: "#059669" }}>{filtered.filter(e => e.beat === true).length}</strong>
          </span>
          <span style={{ fontSize: 13, color: "#6b7280" }}>
            Miss: <strong style={{ color: "#dc2626" }}>{filtered.filter(e => e.beat === false).length}</strong>
          </span>
          <span style={{ fontSize: 13, color: "#6b7280" }}>
            Upcoming: <strong style={{ color: "#4f46e5" }}>{filtered.filter(e => e.beat === null).length}</strong>
          </span>
        </div>

        {/* Ad slot */}
        <div style={{ width: "100%", marginBottom: 20, minHeight: 90, borderRadius: 10, background: "#f0f4ff", border: "1px dashed #c7d2fe", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <span style={{ fontSize: 12, color: "#a5b4fc" }}>Advertisement</span>
        </div>

        {/* Stock grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 12 }}>
          {filtered.map((e) => {
            const sectorData = sectors.find(s => s.sector === e.sector);
            return (
              <Link key={e.ticker} href={`/${locale}/stocks/${e.ticker}`} style={{ textDecoration: "none" }}>
                <div
                  style={{ background: "#fff", borderRadius: 10, border: "1px solid #e0e7ff", borderLeft: `4px solid ${e.beat === null ? "#4f46e5" : e.beat ? "#10b981" : "#f43f5e"}`, padding: "14px 16px", transition: "all 0.15s" }}
                  onMouseEnter={(ev) => { (ev.currentTarget as HTMLElement).style.boxShadow = "0 4px 16px rgba(79,70,229,0.1)"; }}
                  onMouseLeave={(ev) => { (ev.currentTarget as HTMLElement).style.boxShadow = "none"; }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
                    <div>
                      <span style={{ fontSize: 15, fontWeight: 700, color: "#1e1b4b" }}>{e.ticker}</span>
                      {sectorData && (
                        <span style={{ marginLeft: 8, fontSize: 11, fontWeight: 600, padding: "1px 7px", borderRadius: 8, ...{ background: sectorData.beatRate >= 70 ? "#d1fae5" : sectorData.beatRate >= 50 ? "#fef3c7" : "#ffe4e6", color: sectorData.beatRate >= 70 ? "#065f46" : sectorData.beatRate >= 50 ? "#92400e" : "#9f1239" } }}>
                          {sectorData.beatRate}%
                        </span>
                      )}
                    </div>
                    <span style={{ fontSize: 11, fontWeight: 600, padding: "2px 8px", borderRadius: 10, ...(e.beat === null ? { background: "#eef2ff", color: "#4f46e5" } : e.beat ? { background: "#d1fae5", color: "#065f46" } : { background: "#ffe4e6", color: "#9f1239" }) }}>
                      {e.beat === null ? "Upcoming" : e.beat ? "Beat" : "Miss"}
                    </span>
                  </div>
                  <p style={{ fontSize: 12, color: "#4b5563", marginBottom: 8, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{e.name}</p>
                  <div style={{ display: "flex", gap: 12, fontSize: 11, color: "#9ca3af" }}>
                    <span>{formatDate(e.reportDate)}</span>
                    <span style={{ background: e.reportTime === "BMO" ? "#eef2ff" : "#fdf4ff", color: e.reportTime === "BMO" ? "#4f46e5" : "#7c3aed", padding: "1px 6px", borderRadius: 6, fontWeight: 600 }}>{e.reportTime}</span>
                    <span>EPS: {formatEPS(e.epsEstimate)}</span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div style={{ textAlign: "center", padding: "3rem", color: "#9ca3af" }}>
            No stocks match your search.
          </div>
        )}
      </main>
      <Footer locale={locale} />
    </>
  );
}
