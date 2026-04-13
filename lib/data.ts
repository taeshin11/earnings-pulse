import earningsData from "@/data/earnings-fallback.json";
import sectorsData from "@/data/sectors-fallback.json";

export interface EarningsEntry {
  ticker: string;
  name: string;
  sector: string;
  reportDate: string;
  reportTime: "BMO" | "AMC";
  epsEstimate: number;
  revenueEstimate: number;
  previousEPS: number;
  epsActual: number | null;
  beat: boolean | null;
  surprise: number | null;
}

export interface SectorEntry {
  sector: string;
  slug: string;
  beatRate: number;
  companiesCount: number;
  avgSurprise: number;
  topBeaters: string[];
  topMissers: string[];
}

export function getAllEarnings(): EarningsEntry[] {
  return earningsData as EarningsEntry[];
}

export function getAllSectors(): SectorEntry[] {
  return sectorsData as SectorEntry[];
}

export function getEarningsByTicker(ticker: string): EarningsEntry | null {
  const all = getAllEarnings();
  return all.find((e) => e.ticker.toUpperCase() === ticker.toUpperCase()) || null;
}

export function getEarningsBySector(sectorSlug: string): EarningsEntry[] {
  const all = getAllEarnings();
  const sector = getAllSectors().find((s) => s.slug === sectorSlug);
  if (!sector) return [];
  return all.filter((e) => e.sector === sector.sector);
}

export function getThisWeekEarnings(): EarningsEntry[] {
  const all = getAllEarnings();
  const now = new Date();
  // Get Monday of current week
  const day = now.getDay();
  const diff = now.getDate() - day + (day === 0 ? -6 : 1);
  const monday = new Date(now.setDate(diff));
  monday.setHours(0, 0, 0, 0);
  const friday = new Date(monday);
  friday.setDate(monday.getDate() + 4);
  friday.setHours(23, 59, 59, 999);

  return all.filter((e) => {
    const d = new Date(e.reportDate);
    return d >= monday && d <= friday;
  });
}

export function getUpcomingEarnings(days = 30): EarningsEntry[] {
  const all = getAllEarnings();
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  const future = new Date(now);
  future.setDate(now.getDate() + days);

  return all
    .filter((e) => {
      const d = new Date(e.reportDate);
      return d >= now && d <= future;
    })
    .sort((a, b) => new Date(a.reportDate).getTime() - new Date(b.reportDate).getTime());
}

export function getSectorBySlug(slug: string): SectorEntry | null {
  return getAllSectors().find((s) => s.slug === slug) || null;
}

// Mock historical EPS data for stock detail pages
export function getEPSHistory(ticker: string) {
  const entry = getEarningsByTicker(ticker);
  if (!entry) return [];

  const quarters = ["Q1 2024", "Q2 2024", "Q3 2024", "Q4 2024", "Q1 2025"];
  const base = entry.previousEPS || 1.0;

  return quarters.map((quarter, i) => ({
    quarter,
    epsEstimate: parseFloat((base * (0.85 + i * 0.05) * (0.9 + Math.random() * 0.2)).toFixed(2)),
    epsActual: parseFloat((base * (0.85 + i * 0.05) * (0.95 + Math.random() * 0.15)).toFixed(2)),
    surprise: parseFloat(((Math.random() - 0.3) * 20).toFixed(1)),
    beat: Math.random() > 0.3,
  }));
}
