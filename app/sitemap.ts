import type { MetadataRoute } from "next";
import { getAllEarnings, getAllSectors } from "@/lib/data";

const BASE = "https://earnings-pulse.vercel.app";
const LOCALES = ["en", "ko", "ja", "zh", "es", "fr", "de", "pt"];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries = getAllEarnings();
  const sectors = getAllSectors();
  const urls: MetadataRoute.Sitemap = [];

  // Homepage + main pages for each locale
  for (const locale of LOCALES) {
    urls.push({
      url: `${BASE}/${locale}`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    });
    urls.push({
      url: `${BASE}/${locale}/calendar`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    });
    urls.push({
      url: `${BASE}/${locale}/stocks`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    });
    urls.push({
      url: `${BASE}/${locale}/sectors`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    });
  }

  // Stock pages (English only for brevity, add locales as needed)
  for (const entry of entries) {
    urls.push({
      url: `${BASE}/en/stocks/${entry.ticker}`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.7,
    });
  }

  // Sector pages
  for (const sector of sectors) {
    urls.push({
      url: `${BASE}/en/sectors/${sector.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.6,
    });
  }

  return urls;
}
