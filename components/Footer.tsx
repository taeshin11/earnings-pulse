"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { TrendingUp } from "lucide-react";

export default function Footer({ locale = "en" }: { locale?: string }) {
  const [visits, setVisits] = useState<{ today: number; total: number } | null>(null);

  useEffect(() => {
    fetch("/api/visits")
      .then((r) => r.json())
      .then((d) => setVisits(d))
      .catch(() => {});
  }, []);

  return (
    <footer style={{ background: "#1e1b4b", color: "#c7d2fe", marginTop: "auto" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "2.5rem 1rem" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "2rem", marginBottom: "2rem" }}>
          {/* Brand */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
              <div style={{ background: "#4f46e5", borderRadius: 6, padding: "4px 6px" }}>
                <TrendingUp size={18} color="#fff" />
              </div>
              <span style={{ fontWeight: 700, fontSize: 16, color: "#fff" }}>EarningsPulse</span>
            </div>
            <p style={{ fontSize: 13, lineHeight: 1.6, color: "#a5b4fc" }}>
              Track S&P 500 earnings dates, EPS estimates, beat/miss rates, and sector trends. Updated daily.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 style={{ fontSize: 13, fontWeight: 600, color: "#e0e7ff", marginBottom: 12, textTransform: "uppercase", letterSpacing: "0.05em" }}>Navigation</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {[
                { href: `/${locale}`, label: "Home" },
                { href: `/${locale}/calendar`, label: "Calendar" },
                { href: `/${locale}/stocks`, label: "All Stocks" },
                { href: `/${locale}/sectors`, label: "Sectors" },
              ].map((link) => (
                <Link key={link.href} href={link.href} style={{ color: "#a5b4fc", textDecoration: "none", fontSize: 14 }}>
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Top Stocks */}
          <div>
            <h3 style={{ fontSize: 13, fontWeight: 600, color: "#e0e7ff", marginBottom: 12, textTransform: "uppercase", letterSpacing: "0.05em" }}>Popular Stocks</h3>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {["AAPL", "MSFT", "NVDA", "TSLA", "GOOGL", "META", "AMZN", "JPM"].map((t) => (
                <Link key={t} href={`/${locale}/stocks/${t}`} style={{ color: "#a5b4fc", textDecoration: "none", fontSize: 13, background: "rgba(255,255,255,0.08)", padding: "2px 8px", borderRadius: 12 }}>
                  {t}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: "1.25rem", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
          <p style={{ fontSize: 12, color: "#6366f1" }}>
            &copy; {new Date().getFullYear()} EarningsPulse. Data for informational purposes only.
          </p>
          {visits && (
            <p style={{ fontSize: 11, color: "#6366f1" }}>
              Today: {visits.today.toLocaleString()} | Total: {visits.total.toLocaleString()}
            </p>
          )}
        </div>
      </div>
    </footer>
  );
}
