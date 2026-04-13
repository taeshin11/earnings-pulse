"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { TrendingUp, Menu, X } from "lucide-react";

const locales = ["en", "ko", "ja", "zh", "es", "fr", "de", "pt"];

function getLocaleFromPath(path: string): string {
  const seg = path.split("/")[1];
  return locales.includes(seg) ? seg : "en";
}

function switchLocale(path: string, newLocale: string): string {
  const segs = path.split("/");
  if (locales.includes(segs[1])) {
    segs[1] = newLocale;
    return segs.join("/");
  }
  return `/${newLocale}${path}`;
}

export default function Navbar() {
  const pathname = usePathname();
  const locale = getLocaleFromPath(pathname);
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { href: `/${locale}`, label: "Home" },
    { href: `/${locale}/calendar`, label: "Calendar" },
    { href: `/${locale}/stocks`, label: "Stocks" },
    { href: `/${locale}/sectors`, label: "Sectors" },
  ];

  return (
    <nav style={{ background: "#fff", borderBottom: "1px solid #e0e7ff" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 1rem", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
        {/* Logo */}
        <Link href={`/${locale}`} style={{ display: "flex", alignItems: "center", gap: 8, textDecoration: "none" }}>
          <div style={{ background: "#4f46e5", borderRadius: 8, padding: "6px 8px", display: "flex", alignItems: "center" }}>
            <TrendingUp size={20} color="#fff" />
          </div>
          <span style={{ fontWeight: 700, fontSize: 18, color: "#1e1b4b" }}>EarningsPulse</span>
        </Link>

        {/* Desktop Nav */}
        <div style={{ display: "flex", gap: 4, alignItems: "center" }} className="hidden-mobile">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  padding: "6px 14px",
                  borderRadius: 8,
                  textDecoration: "none",
                  fontSize: 14,
                  fontWeight: 500,
                  color: isActive ? "#4f46e5" : "#6b7280",
                  background: isActive ? "#eef2ff" : "transparent",
                  transition: "all 0.15s",
                }}
              >
                {link.label}
              </Link>
            );
          })}
          {/* Locale switcher */}
          <select
            value={locale}
            onChange={(e) => { window.location.href = switchLocale(pathname, e.target.value); }}
            style={{ marginLeft: 8, padding: "4px 8px", borderRadius: 6, border: "1px solid #e0e7ff", fontSize: 13, color: "#4f46e5", background: "#f8f9ff", cursor: "pointer" }}
          >
            {locales.map((l) => <option key={l} value={l}>{l.toUpperCase()}</option>)}
          </select>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          style={{ background: "none", border: "none", cursor: "pointer", padding: 4, color: "#4f46e5" }}
          className="mobile-only"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div style={{ background: "#fff", borderTop: "1px solid #e0e7ff", padding: "1rem" }}>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              style={{ display: "block", padding: "10px 14px", borderRadius: 8, textDecoration: "none", fontSize: 15, fontWeight: 500, color: "#1e1b4b", marginBottom: 4 }}
            >
              {link.label}
            </Link>
          ))}
          <select
            value={locale}
            onChange={(e) => { window.location.href = switchLocale(pathname, e.target.value); }}
            style={{ marginTop: 8, padding: "6px 10px", borderRadius: 6, border: "1px solid #e0e7ff", fontSize: 14, color: "#4f46e5", width: "100%" }}
          >
            {locales.map((l) => <option key={l} value={l}>{l.toUpperCase()}</option>)}
          </select>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
        }
        @media (min-width: 769px) {
          .mobile-only { display: none !important; }
        }
      `}</style>
    </nav>
  );
}
