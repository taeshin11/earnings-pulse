import Link from "next/link";
import { Clock } from "lucide-react";
import type { EarningsEntry } from "@/lib/data";
import { formatEPS, formatSurprise, getBeatBorderColor, getBeatColor, getBeatLabel } from "@/lib/utils";

interface Props {
  entry: EarningsEntry;
  locale: string;
}

export default function EarningsCard({ entry, locale }: Props) {
  const beatLabel = getBeatLabel(entry.beat);
  const beatColorCls = getBeatColor(entry.beat);
  const borderCls = getBeatBorderColor(entry.beat);

  return (
    <Link
      href={`/${locale}/stocks/${entry.ticker}`}
      style={{ textDecoration: "none", display: "block" }}
    >
      <div
        style={{
          background: "#fff",
          borderRadius: 12,
          border: "1px solid #e0e7ff",
          borderLeft: `4px solid ${entry.beat === null ? "#4f46e5" : entry.beat ? "#10b981" : "#f43f5e"}`,
          padding: "14px 16px",
          transition: "all 0.15s",
          cursor: "pointer",
        }}
        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 20px rgba(79,70,229,0.12)"; (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)"; }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = "none"; (e.currentTarget as HTMLElement).style.transform = "none"; }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
          <div>
            <span style={{ fontSize: 15, fontWeight: 700, color: "#1e1b4b" }}>{entry.ticker}</span>
            <span style={{ fontSize: 12, color: "#6b7280", marginLeft: 6 }}>{entry.sector}</span>
          </div>
          <span
            style={{
              fontSize: 11,
              fontWeight: 600,
              padding: "2px 8px",
              borderRadius: 20,
              border: "1px solid",
              ...(entry.beat === null
                ? { background: "#eef2ff", color: "#4f46e5", borderColor: "#c7d2fe" }
                : entry.beat
                ? { background: "#d1fae5", color: "#065f46", borderColor: "#6ee7b7" }
                : { background: "#ffe4e6", color: "#9f1239", borderColor: "#fda4af" }),
            }}
          >
            {beatLabel}
          </span>
        </div>

        <p style={{ fontSize: 12, color: "#4b5563", marginBottom: 10, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
          {entry.name}
        </p>

        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12 }}>
          <div>
            <span style={{ color: "#9ca3af" }}>Est.</span>
            <span style={{ marginLeft: 4, fontWeight: 600, color: "#1e1b4b" }}>{formatEPS(entry.epsEstimate)}</span>
          </div>
          {entry.epsActual !== null && (
            <div>
              <span style={{ color: "#9ca3af" }}>Act.</span>
              <span style={{ marginLeft: 4, fontWeight: 600, color: "#1e1b4b" }}>{formatEPS(entry.epsActual)}</span>
            </div>
          )}
          {entry.surprise !== null && (
            <div>
              <span style={{ marginLeft: 4, fontWeight: 600, color: entry.surprise >= 0 ? "#059669" : "#dc2626" }}>
                {formatSurprise(entry.surprise)}
              </span>
            </div>
          )}
        </div>

        <div style={{ marginTop: 8, display: "flex", alignItems: "center", gap: 4 }}>
          <Clock size={11} color="#9ca3af" />
          <span style={{ fontSize: 11, color: "#9ca3af" }}>
            {entry.reportTime === "BMO" ? "Before Market Open" : "After Market Close"}
          </span>
        </div>
      </div>
    </Link>
  );
}
