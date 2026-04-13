import Link from "next/link";
import type { EarningsEntry } from "@/lib/data";
import { formatDate, formatEPS, getBeatRateBg } from "@/lib/utils";
import { Calendar, TrendingUp, TrendingDown } from "lucide-react";

interface Props {
  entry: EarningsEntry;
  locale: string;
  beatRate?: number;
}

export default function StockCard({ entry, locale, beatRate }: Props) {
  return (
    <Link href={`/${locale}/stocks/${entry.ticker}`} style={{ textDecoration: "none" }}>
      <div
        style={{
          background: "#fff",
          borderRadius: 12,
          border: "1px solid #e0e7ff",
          borderLeft: `4px solid ${entry.beat === null ? "#4f46e5" : entry.beat ? "#10b981" : "#f43f5e"}`,
          padding: "1rem 1.25rem",
          transition: "all 0.15s",
        }}
        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 20px rgba(79,70,229,0.12)"; }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = "none"; }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <span style={{ fontSize: 18, fontWeight: 700, color: "#1e1b4b" }}>{entry.ticker}</span>
            {beatRate !== undefined && (
              <span style={{ marginLeft: 8, fontSize: 12, fontWeight: 600, padding: "2px 8px", borderRadius: 10, ...{ background: beatRate >= 70 ? "#d1fae5" : beatRate >= 50 ? "#fef3c7" : "#ffe4e6", color: beatRate >= 70 ? "#065f46" : beatRate >= 50 ? "#92400e" : "#9f1239" } }}>
                {beatRate}% beat rate
              </span>
            )}
          </div>
          {entry.beat !== null && (
            entry.beat ? <TrendingUp size={16} color="#10b981" /> : <TrendingDown size={16} color="#f43f5e" />
          )}
        </div>

        <p style={{ fontSize: 13, color: "#4b5563", marginTop: 4, marginBottom: 10 }}>{entry.name}</p>

        <div style={{ display: "flex", gap: 16, fontSize: 12, color: "#6b7280" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <Calendar size={11} />
            <span>{formatDate(entry.reportDate)}</span>
          </div>
          <span style={{ background: entry.reportTime === "BMO" ? "#eef2ff" : "#fdf4ff", color: entry.reportTime === "BMO" ? "#4f46e5" : "#7c3aed", padding: "1px 6px", borderRadius: 8, fontSize: 11, fontWeight: 600 }}>
            {entry.reportTime}
          </span>
          <span>EPS Est: {formatEPS(entry.epsEstimate)}</span>
        </div>
      </div>
    </Link>
  );
}
