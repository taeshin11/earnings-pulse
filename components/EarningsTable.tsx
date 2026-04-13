import Link from "next/link";
import type { EarningsEntry } from "@/lib/data";
import { formatDate, formatEPS, formatRevenue, formatSurprise } from "@/lib/utils";

interface Props {
  entries: EarningsEntry[];
  locale: string;
}

export default function EarningsTable({ entries, locale }: Props) {
  if (entries.length === 0) {
    return (
      <div style={{ textAlign: "center", padding: "3rem", color: "#6b7280", background: "#fff", borderRadius: 12, border: "1px solid #e0e7ff" }}>
        No earnings data available.
      </div>
    );
  }

  return (
    <div style={{ overflowX: "auto", borderRadius: 12, border: "1px solid #e0e7ff", background: "#fff" }}>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ background: "#f8f9ff", borderBottom: "2px solid #e0e7ff" }}>
            {["Ticker", "Company", "Sector", "Report Date", "Time", "EPS Est.", "EPS Act.", "Surprise", "Status"].map((h) => (
              <th key={h} style={{ padding: "10px 14px", textAlign: "left", fontSize: 12, fontWeight: 600, color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.05em", whiteSpace: "nowrap" }}>
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {entries.map((e, i) => (
            <tr key={e.ticker} style={{ borderBottom: "1px solid #f0f4ff", background: i % 2 === 0 ? "#fff" : "#fafbff" }}>
              <td style={{ padding: "10px 14px" }}>
                <Link href={`/${locale}/stocks/${e.ticker}`} style={{ fontWeight: 700, color: "#4f46e5", textDecoration: "none", fontSize: 14 }}>
                  {e.ticker}
                </Link>
              </td>
              <td style={{ padding: "10px 14px", fontSize: 13, color: "#374151", maxWidth: 180 }}>
                <span style={{ display: "block", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  {e.name}
                </span>
              </td>
              <td style={{ padding: "10px 14px", fontSize: 12, color: "#6b7280" }}>{e.sector}</td>
              <td style={{ padding: "10px 14px", fontSize: 13, color: "#374151", whiteSpace: "nowrap" }}>{formatDate(e.reportDate)}</td>
              <td style={{ padding: "10px 14px" }}>
                <span style={{
                  fontSize: 11, fontWeight: 600, padding: "2px 7px", borderRadius: 10,
                  background: e.reportTime === "BMO" ? "#eef2ff" : "#fdf4ff",
                  color: e.reportTime === "BMO" ? "#4f46e5" : "#7c3aed",
                }}>
                  {e.reportTime}
                </span>
              </td>
              <td style={{ padding: "10px 14px", fontSize: 13, color: "#374151", fontWeight: 500 }}>{formatEPS(e.epsEstimate)}</td>
              <td style={{ padding: "10px 14px", fontSize: 13, fontWeight: 600, color: "#1e1b4b" }}>{formatEPS(e.epsActual)}</td>
              <td style={{ padding: "10px 14px", fontSize: 13, fontWeight: 600, color: e.surprise !== null ? (e.surprise >= 0 ? "#059669" : "#dc2626") : "#9ca3af" }}>
                {formatSurprise(e.surprise)}
              </td>
              <td style={{ padding: "10px 14px" }}>
                <span style={{
                  fontSize: 11, fontWeight: 600, padding: "2px 8px", borderRadius: 10,
                  ...(e.beat === null
                    ? { background: "#eef2ff", color: "#4f46e5" }
                    : e.beat
                    ? { background: "#d1fae5", color: "#065f46" }
                    : { background: "#ffe4e6", color: "#9f1239" }),
                }}>
                  {e.beat === null ? "Upcoming" : e.beat ? "Beat" : "Miss"}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
