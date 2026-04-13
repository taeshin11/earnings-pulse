"use client";

import { useState } from "react";
import EarningsCard from "./EarningsCard";
import type { EarningsEntry } from "@/lib/data";

interface Props {
  entries: EarningsEntry[];
  locale: string;
}

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
const SECTORS = ["All", "Technology", "Healthcare", "Financials", "Communication Services", "Consumer Discretionary", "Consumer Staples", "Energy", "Industrials", "Utilities"];
const TIMES = ["All", "BMO", "AMC"];

export default function EarningsCalendar({ entries, locale }: Props) {
  const [sector, setSector] = useState("All");
  const [time, setTime] = useState("All");

  // Group by day of week
  const grouped: Record<string, EarningsEntry[]> = {};
  DAYS.forEach((d) => (grouped[d] = []));

  const filtered = entries.filter(
    (e) =>
      (sector === "All" || e.sector === sector) &&
      (time === "All" || e.reportTime === time)
  );

  filtered.forEach((e) => {
    const date = new Date(e.reportDate);
    const dayIdx = date.getDay(); // 0=Sun, 1=Mon, ...
    if (dayIdx >= 1 && dayIdx <= 5) {
      grouped[DAYS[dayIdx - 1]].push(e);
    }
  });

  return (
    <div>
      {/* Filters */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 20 }}>
        {/* Sector filter */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, alignItems: "center" }}>
          {SECTORS.map((s) => (
            <button
              key={s}
              onClick={() => setSector(s)}
              style={{
                padding: "5px 12px",
                borderRadius: 20,
                border: "1px solid",
                fontSize: 12,
                fontWeight: 500,
                cursor: "pointer",
                transition: "all 0.15s",
                ...(sector === s
                  ? { background: "#4f46e5", color: "#fff", borderColor: "#4f46e5" }
                  : { background: "#fff", color: "#6b7280", borderColor: "#e0e7ff" }),
              }}
            >
              {s}
            </button>
          ))}
        </div>

        {/* Time filter */}
        <div style={{ display: "flex", gap: 6, marginLeft: "auto" }}>
          {TIMES.map((t) => (
            <button
              key={t}
              onClick={() => setTime(t)}
              style={{
                padding: "5px 12px",
                borderRadius: 20,
                border: "1px solid",
                fontSize: 12,
                fontWeight: 500,
                cursor: "pointer",
                ...(time === t
                  ? { background: "#7c3aed", color: "#fff", borderColor: "#7c3aed" }
                  : { background: "#fff", color: "#6b7280", borderColor: "#e0e7ff" }),
              }}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Ad slot */}
      <div id="adsterra-native-banner" style={{ width: "100%", marginBottom: 20, minHeight: 100, borderRadius: 12, background: "#f0f4ff", border: "1px dashed #c7d2fe", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <span style={{ fontSize: 12, color: "#a5b4fc" }}>Advertisement</span>
      </div>

      {/* Calendar grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16 }}>
        {DAYS.map((day) => (
          <div key={day}>
            <h3 style={{ fontSize: 13, fontWeight: 600, color: "#4f46e5", marginBottom: 10, textTransform: "uppercase", letterSpacing: "0.05em", paddingBottom: 6, borderBottom: "2px solid #e0e7ff" }}>
              {day}
              <span style={{ fontSize: 11, fontWeight: 400, color: "#9ca3af", marginLeft: 6 }}>
                ({grouped[day].length})
              </span>
            </h3>
            {grouped[day].length === 0 ? (
              <p style={{ fontSize: 12, color: "#d1d5db", textAlign: "center", padding: "20px 0" }}>No earnings</p>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {grouped[day].map((e) => (
                  <EarningsCard key={e.ticker} entry={e} locale={locale} />
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
