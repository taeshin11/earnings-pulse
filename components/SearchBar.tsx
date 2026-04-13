"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Search, X } from "lucide-react";
import type { EarningsEntry } from "@/lib/data";

interface Props {
  entries: EarningsEntry[];
  locale: string;
}

export default function SearchBar({ entries, locale }: Props) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<EarningsEntry[]>([]);
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (query.trim().length < 1) {
      setResults([]);
      setOpen(false);
      return;
    }
    debounceRef.current = setTimeout(() => {
      const q = query.toLowerCase();
      const found = entries.filter(
        (e) =>
          e.ticker.toLowerCase().includes(q) ||
          e.name.toLowerCase().includes(q)
      ).slice(0, 8);
      setResults(found);
      setOpen(found.length > 0);
    }, 200);
  }, [query, entries]);

  const go = (ticker: string) => {
    setQuery("");
    setOpen(false);
    router.push(`/${locale}/stocks/${ticker}`);
  };

  return (
    <div style={{ position: "relative", width: "100%", maxWidth: 400 }}>
      <div style={{ position: "relative" }}>
        <Search
          size={16}
          color="#9ca3af"
          style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)" }}
        />
        <input
          ref={inputRef}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => results.length > 0 && setOpen(true)}
          onBlur={() => setTimeout(() => setOpen(false), 150)}
          placeholder="Search ticker or company..."
          style={{
            width: "100%",
            padding: "9px 36px 9px 36px",
            borderRadius: 10,
            border: "1px solid #e0e7ff",
            background: "#fff",
            fontSize: 14,
            color: "#1e1b4b",
            outline: "none",
            boxSizing: "border-box",
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" && results.length > 0) go(results[0].ticker);
          }}
        />
        {query && (
          <button
            onClick={() => { setQuery(""); setOpen(false); }}
            style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", padding: 2, color: "#9ca3af" }}
          >
            <X size={14} />
          </button>
        )}
      </div>

      {open && (
        <div style={{ position: "absolute", top: "calc(100% + 6px)", left: 0, right: 0, background: "#fff", borderRadius: 10, border: "1px solid #e0e7ff", boxShadow: "0 8px 30px rgba(79,70,229,0.12)", zIndex: 100 }}>
          {results.map((e) => (
            <button
              key={e.ticker}
              onMouseDown={() => go(e.ticker)}
              style={{ display: "flex", alignItems: "center", gap: 10, width: "100%", padding: "10px 14px", background: "none", border: "none", cursor: "pointer", textAlign: "left", borderBottom: "1px solid #f0f4ff" }}
              onMouseEnter={(ev) => { (ev.currentTarget as HTMLElement).style.background = "#f8f9ff"; }}
              onMouseLeave={(ev) => { (ev.currentTarget as HTMLElement).style.background = "none"; }}
            >
              <span style={{ fontWeight: 700, color: "#4f46e5", fontSize: 13, minWidth: 40 }}>{e.ticker}</span>
              <span style={{ fontSize: 13, color: "#4b5563" }}>{e.name}</span>
              <span style={{ marginLeft: "auto", fontSize: 11, color: "#9ca3af" }}>{e.sector}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
