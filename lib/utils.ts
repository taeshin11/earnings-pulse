export function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export function formatSurprise(surprise: number | null): string {
  if (surprise === null) return "—";
  return surprise > 0 ? `+${surprise.toFixed(1)}%` : `${surprise.toFixed(1)}%`;
}

export function formatEPS(eps: number | null): string {
  if (eps === null) return "—";
  return `$${eps.toFixed(2)}`;
}

export function formatRevenue(rev: number | null): string {
  if (rev === null) return "—";
  return `$${rev.toFixed(1)}B`;
}

export function getBeatColor(beat: boolean | null): string {
  if (beat === null) return "bg-indigo-50 text-indigo-700 border-indigo-200";
  if (beat) return "bg-emerald-50 text-emerald-700 border-emerald-200";
  return "bg-rose-50 text-rose-700 border-rose-200";
}

export function getBeatBorderColor(beat: boolean | null): string {
  if (beat === null) return "border-l-indigo-400";
  if (beat) return "border-l-emerald-500";
  return "border-l-rose-500";
}

export function getBeatLabel(beat: boolean | null): string {
  if (beat === null) return "Upcoming";
  if (beat) return "Beat";
  return "Miss";
}

export function getBeatRateColor(rate: number): string {
  if (rate >= 70) return "text-emerald-600";
  if (rate >= 50) return "text-amber-600";
  return "text-rose-600";
}

export function getBeatRateBg(rate: number): string {
  if (rate >= 70) return "bg-emerald-100 text-emerald-800";
  if (rate >= 50) return "bg-amber-100 text-amber-800";
  return "bg-rose-100 text-rose-800";
}

export function slugToLabel(slug: string): string {
  return slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}
