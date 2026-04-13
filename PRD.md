# EarningsPulse — PRD

## Overview

EarningsPulse is a stock earnings calendar with sector filtering, EPS beat/miss tracking, and historical earnings surprise data. It targets traders, retail investors, and finance students who search for "earnings calendar this week", "AAPL earnings date 2025", "tech sector earnings beat rate", and "what companies report earnings today". Data is fetched daily from Yahoo Finance unofficial endpoints and Alpha Vantage free tier, with a static fallback JSON for S&P 500 companies.

## Target Users & Pain Points

- **Retail investors** who want to know what earnings reports are coming up this week
- **Swing traders** who trade earnings momentum and need beat/miss history
- **Finance students** learning how to read earnings reports
- **Portfolio managers** tracking sector earnings trends

Pain points:
- Earnings Whispers requires a subscription for full data
- Yahoo Finance calendar is cluttered and unfiltered
- No free tool shows historical beat/miss rate by sector
- Hard to find all ticker pages in one SEO-optimized format

## Core Features

### F01 — Weekly Earnings Calendar (Homepage)
- Current week view (Mon–Fri) with all reporting companies
- Sector filter (Technology, Healthcare, Finance, Energy, Consumer, etc.)
- Market cap filter (Large Cap / Mid Cap / Small Cap)
- Before/After market indicator (BMO / AMC)
- EPS estimate vs actual (when available)
- Highlight: beat (green), miss (red), in-line (neutral)

### F02 — Ticker Detail Page `/tickers/[symbol]`
- Historical earnings table: last 8 quarters
- EPS estimate vs actual vs surprise % for each quarter
- Revenue estimate vs actual
- Chart: quarterly EPS trend line + surprise bars (Chart.js combo chart)
- Next earnings date (from Alpha Vantage or static JSON)
- Schema.org `FinancialProduct` + `Dataset` markup
- "Add to watchlist" (localStorage only, no backend required)

### F03 — Sector Page `/sectors/[sector]`
- All tickers in sector reporting this week
- Sector beat rate % (last 4 quarters)
- Sector aggregate EPS trend chart
- Top beaters and top missers in sector

### F04 — Date Page `/dates/[yyyy-mm-dd]`
- All companies reporting on that specific date
- Grouped by pre-market / after-market
- Filter by sector
- Auto-generated for all dates with earnings in the current + next quarter

### F05 — Search Bar
- Autocomplete on ticker symbols and company names
- Debounced, client-side, over loaded JSON index
- Navigates to `/tickers/[symbol]`

### F06 — Data Pipeline
- **Primary**: Alpha Vantage free tier (25 req/day) — earnings calendar endpoint
- **Secondary**: Yahoo Finance `query1.finance.yahoo.com` — unofficial but stable JSON endpoints for EPS data
- **Tertiary**: Static fallback `public/data/sp500-earnings.json` for S&P 500 (pre-populated, updated weekly)
- Next.js ISR: `revalidate: 86400` (daily) on all pages
- GitHub Actions: daily refresh at 07:00 UTC (before US market open)

### F07 — Beat/Miss Tracker
- For each ticker, calculate beat/miss from stored historical data
- Beat rate % = (quarters beat / total quarters) × 100
- Display as a colored percentage badge (green ≥ 70%, amber 50–70%, red < 50%)
- Sector-level aggregate beat rate on sector pages

### F08 — Watchlist (Client-Side)
- localStorage-based watchlist (no account required)
- Heart icon on ticker cards and detail page
- Watchlist view on homepage: "Your Watchlist This Week"
- Persists across sessions, clears only on explicit remove

### F09 — Visitor Counter
- Upstash Redis free tier
- `/api/visits` route: increment + return `{ today, total }`
- Footer: "Today: X | Total: Y" — muted, small text

### F10 — Google Sheets Webhook
- Events: `ticker_view`, `sector_view`, `date_view`, `search`, `watchlist_add`
- Payload: `{ event, symbol?, sector?, date?, timestamp, lang }`
- Fire-and-forget

### F11 — i18n (8 Languages)
- next-intl, locale prefix routing
- All UI labels, headings, badges translated
- Languages: en, ko, ja, zh, es, fr, de, pt
- hreflang on all pages

### F12 — Adsterra Ad Slots
- Social Bar in `<head>` (TODO placeholder)
- Native Banner between hero calendar and first result row
- Display Banner below first 5 results on ticker detail page

### F13 — Research History Logging
- `research_history/` folder
- Milestone log after each major milestone

## Tech Stack

- **Framework**: Next.js 14 (App Router, ISR with `revalidate: 86400`)
- **Styling**: Tailwind CSS v3
- **Charts**: Chart.js v4 via `react-chartjs-2`
- **i18n**: next-intl
- **Data**: Alpha Vantage (free), Yahoo Finance (unofficial), static JSON fallback
- **Visitor counter**: Upstash Redis free tier
- **Hosting**: Vercel (free tier)
- **Repo**: GitHub → `taeshin11/earnings-pulse`
- **CI**: GitHub Actions daily data refresh

## Data Sources (Free Only)

| Source | Endpoint / Method | Rate Limit | Notes |
|--------|------------------|------------|-------|
| Alpha Vantage | `EARNINGS_CALENDAR` function | 25 req/day | Free API key required |
| Alpha Vantage | `EARNINGS` function (per ticker) | 25 req/day | Historical EPS |
| Yahoo Finance | `query1.finance.yahoo.com/v8/finance/chart/{symbol}` | Unofficial | No auth needed |
| Yahoo Finance | `query1.finance.yahoo.com/v10/finance/quoteSummary/{symbol}?modules=earningsHistory` | Unofficial | EPS history |
| Static fallback | `public/data/sp500-earnings.json` | — | Updated weekly via GH Actions |
| Alpha Vantage | `OVERVIEW` function | 25 req/day | Company sector/market cap |

### Alpha Vantage Free Tier Strategy
- Batch 25 requests per day via GitHub Actions
- Prioritize S&P 500 tickers reporting in next 7 days
- Cache all responses in `public/data/tickers/{symbol}.json`
- If daily limit hit, use static fallback

## Page Structure & SEO

```
/                                → Homepage calendar (ISR, revalidate 86400)
/tickers/[symbol]                → Ticker detail (ISR, revalidate 86400)
/sectors/[sector]                → Sector calendar (ISR, revalidate 86400)
/dates/[yyyy-mm-dd]              → Date calendar (ISR, revalidate 86400)
/sitemap.xml                     → Auto-generated
/robots.txt                      → Static
```

### Meta Tag Templates

**Homepage:**
```
title: "Earnings Calendar This Week {Month} {Year} — EPS Beat/Miss Tracker | EarningsPulse"
description: "{N} companies report earnings this week. Track EPS estimates, beat/miss rates, and sector trends. Updated daily."
```

**Ticker page:**
```
title: "{Symbol} Earnings Date, EPS History & Beat Rate | EarningsPulse"
description: "{Company} next earnings date is {date}. Historical EPS beat rate: {rate}%. See 8-quarter EPS trend and revenue surprises."
```

**Sector page:**
```
title: "{Sector} Earnings This Week — Beat Rate & Trends | EarningsPulse"
description: "{N} {sector} companies report earnings this week. Sector beat rate: {rate}%. See all tickers and EPS estimates."
```

**Date page:**
```
title: "Earnings on {Date} — Companies Reporting | EarningsPulse"
description: "{N} companies report earnings on {date}. Includes {topCompany}, {topCompany2}, and more. Pre-market and after-hours."
```

### Schema.org

**Ticker page:**
```json
{
  "@type": "Dataset",
  "name": "AAPL Earnings History",
  "description": "Apple Inc. quarterly EPS and revenue earnings history",
  "creator": { "@type": "Organization", "name": "EarningsPulse" },
  "temporalCoverage": "2022-01/2025-12"
}
```

## UI/UX Guidelines

- **Color palette**: Soft mint background `#F0FDF4`, white cards, emerald accents `#10B981`
- **Beat badge**: emerald pill `bg-emerald-100 text-emerald-800`
- **Miss badge**: rose pill `bg-rose-100 text-rose-800`
- **In-line badge**: gray pill `bg-gray-100 text-gray-600`
- **Font**: Inter (Google Fonts, self-hosted)
- **Calendar view**: Grid layout, Mon–Fri columns on desktop; scrollable day tabs on mobile
- **Cards**: Rounded-xl, left border colored by beat/miss/upcoming status
- **Charts**: Combo chart (line EPS trend + bar surprise %), pastel colors
- **Mobile-first**: Stacked day view on mobile, weekly grid on md+
- **Loading skeleton**: Calendar grid with shimmer placeholders
- **Watchlist heart**: Filled emerald when added, outline when not
- **Sector filter**: Horizontal scrollable pill row on mobile

## i18n Requirements

### Translation Keys (minimum required)
- `nav.home`, `nav.watchlist`, `nav.sectors`, `nav.search`
- `hero.title`, `hero.subtitle`, `hero.thisWeek`
- `calendar.bmo`, `calendar.amc`, `calendar.estimate`, `calendar.actual`, `calendar.surprise`
- `ticker.nextEarnings`, `ticker.beatRate`, `ticker.epsHistory`, `ticker.revenueHistory`
- `ticker.beat`, `ticker.miss`, `ticker.inline`, `ticker.upcoming`
- `sector.beatRate`, `sector.topBeaters`, `sector.topMissers`
- `watchlist.add`, `watchlist.remove`, `watchlist.empty`, `watchlist.title`
- `footer.todayVisits`, `footer.totalVisits`, `footer.copyright`
- `common.loading`, `common.noData`, `common.updated`, `common.viewAll`

### hreflang
```html
<link rel="alternate" hreflang="en" href="https://earningspulse.com/" />
<link rel="alternate" hreflang="ko" href="https://earningspulse.com/ko/" />
<!-- ... all 8 + x-default -->
```

## Ad Integration (Adsterra)

### Social Bar (`<head>`)
```html
<!-- TODO: Adsterra Social Bar — insert script tag when key is available -->
<!-- <script async src="//ADSTERRA_SOCIAL_BAR_URL"></script> -->
```

### Native Banner (below hero calendar header, above first row)
```html
<!-- TODO: Adsterra Native Banner -->
<div id="adsterra-native-banner" class="w-full my-4 min-h-[100px] rounded-xl bg-gray-50">
  <!-- Native Banner Ad Placeholder -->
</div>
```

### Display Banner (below first 5 results on detail pages)
```html
<!-- TODO: Adsterra Display Banner (728x90 / 320x50) -->
<div id="adsterra-display-banner" class="flex justify-center my-6">
  <!-- Display Banner Ad Placeholder -->
</div>
```

## Google Sheets Webhook

### Sheet: "EarningsPulse Analytics"
Columns: `timestamp | event | symbol | sector | date | lang | path`

### Events
| Event | Trigger |
|-------|---------|
| `page_view` | Any page load |
| `ticker_view` | `/tickers/[symbol]` load |
| `sector_view` | `/sectors/[sector]` load |
| `date_view` | `/dates/[date]` load |
| `search` | Search submitted |
| `watchlist_add` | Heart clicked to add |
| `watchlist_remove` | Heart clicked to remove |

## Visitor Counter

- **Keys**: `earningspulse:visits:total`, `earningspulse:visits:YYYY-MM-DD`
- **Route**: `GET /api/visits`
- **Placement**: Footer bottom-right, `text-xs text-gray-400`
- **Display**: "Today: 312 | Total: 14,208"

## Milestones

### M1 — Scaffold & Data Pipeline
**Tasks:**
1. `init.sh`: scaffold Next.js 14, install deps
2. Write `scripts/fetch-earnings.js` (Alpha Vantage + Yahoo Finance + fallback logic)
3. Pre-populate `public/data/sp500-earnings.json` with 100 S&P 500 tickers (static seed)
4. Create `feature_list.json`, `claude-progress.txt`
5. `gh repo create taeshin11/earnings-pulse --public`
6. Initial commit + push
7. Log `research_history/milestone-M1.md`

**Commit:** `M1: scaffold, Alpha Vantage + Yahoo Finance pipeline, seed data`

### M2 — Homepage Calendar & UI
**Tasks:**
1. Tailwind mint/emerald theme
2. Weekly calendar grid component (Mon–Fri columns)
3. Sector and market cap filter chips
4. Earnings card with beat/miss badge, BMO/AMC indicator
5. Sticky header + search bar
6. Footer placeholder + Adsterra divs
7. Commit + push

**Commit:** `M2: homepage calendar, filters, Tailwind theme, cards`

### M3 — Ticker & Sector Pages
**Tasks:**
1. `/tickers/[symbol]`: combo chart, 8-quarter table, watchlist heart
2. `/sectors/[sector]`: beat rate badge, sector chart, ticker list
3. `generateStaticParams` for all symbols and sectors
4. Schema.org Dataset markup
5. Open Graph meta per page
6. Commit + push

**Commit:** `M3: ticker pages, sector pages, schema.org, OG meta`

### M4 — Date Pages, Search, Watchlist
**Tasks:**
1. `/dates/[yyyy-mm-dd]`: BMO/AMC grouped list, sector filter
2. `generateStaticParams` for all upcoming earnings dates
3. Client-side search (debounced autocomplete)
4. localStorage watchlist (add/remove, homepage widget)
5. hreflang alternate links
6. i18n scaffold (next-intl + 8 locale JSON stubs)
7. Commit + push

**Commit:** `M4: date pages, search, watchlist, hreflang, i18n scaffold`

### M5 — Visitor Counter, Webhook, Sitemap
**Tasks:**
1. Upstash Redis `/api/visits`
2. Google Sheets analytics webhook
3. `app/sitemap.ts` auto-generation
4. `/robots.txt`
5. Commit + push

**Commit:** `M5: visitor counter, analytics webhook, sitemap`

### M6 — Full i18n & SEO Polish
**Tasks:**
1. Complete translation JSON all 8 languages
2. Language switcher routing
3. Lighthouse ≥ 90 audit
4. Canonical tags audit
5. Commit + push

**Commit:** `M6: full i18n, SEO polish`

### M7 — Deploy & GitHub Actions
**Tasks:**
1. `npx vercel --prod`
2. GitHub Actions: daily data refresh 07:00 UTC, triggers ISR revalidation
3. Set Vercel env vars: `ALPHA_VANTAGE_KEY`, `UPSTASH_REDIS_REST_URL`, `NEXT_PUBLIC_WEBHOOK_URL`
4. Verify production
5. Final commit + push
6. Log `research_history/milestone-M7.md`

**Commit:** `M7: production deploy, GitHub Actions daily refresh`

## File Structure

```
earnings-pulse/
├── init.sh
├── feature_list.json
├── claude-progress.txt
├── research_history/
│   └── milestone-M1.md
├── scripts/
│   ├── fetch-earnings.js          # Alpha Vantage + Yahoo Finance fetch
│   ├── build-static-fallback.js   # Build sp500-earnings.json
│   └── validate-data.js
├── public/
│   └── data/
│       ├── sp500-earnings.json    # 500 tickers with EPS history
│       ├── sectors.json           # Sector → tickers mapping
│       ├── calendar.json          # Next 90 days earnings calendar
│       └── tickers/               # Per-ticker JSON cache
│           └── AAPL.json
├── messages/
│   ├── en.json
│   ├── ko.json
│   ├── ja.json
│   ├── zh.json
│   ├── es.json
│   ├── fr.json
│   ├── de.json
│   └── pt.json
├── app/
│   ├── [locale]/
│   │   ├── layout.tsx
│   │   ├── page.tsx               # Homepage calendar
│   │   ├── tickers/[symbol]/page.tsx
│   │   ├── sectors/[sector]/page.tsx
│   │   └── dates/[date]/page.tsx
│   ├── api/
│   │   └── visits/route.ts
│   └── sitemap.ts
├── components/
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── EarningsCalendar.tsx
│   ├── EarningsCard.tsx
│   ├── FilterChips.tsx
│   ├── BeatMissBadge.tsx
│   ├── EpsComboChart.tsx
│   ├── WatchlistHeart.tsx
│   ├── SearchBar.tsx
│   ├── AdSlot.tsx
│   └── VisitorCounter.tsx
├── lib/
│   ├── data.ts
│   ├── redis.ts
│   ├── webhook.ts
│   ├── watchlist.ts               # localStorage helpers
│   └── i18n.ts
├── tailwind.config.ts
├── next.config.ts
└── .github/
    └── workflows/
        └── refresh-earnings.yml
```

## Harness Files Spec

### `feature_list.json`
```json
{
  "project": "earnings-pulse",
  "version": "1.0.0",
  "features": [
    { "id": "F01", "name": "Weekly Earnings Calendar", "status": "pending" },
    { "id": "F02", "name": "Ticker Detail Page", "status": "pending" },
    { "id": "F03", "name": "Sector Page", "status": "pending" },
    { "id": "F04", "name": "Date Page", "status": "pending" },
    { "id": "F05", "name": "Search Bar", "status": "pending" },
    { "id": "F06", "name": "Data Pipeline", "status": "pending" },
    { "id": "F07", "name": "Beat/Miss Tracker", "status": "pending" },
    { "id": "F08", "name": "Watchlist (localStorage)", "status": "pending" },
    { "id": "F09", "name": "Visitor Counter", "status": "pending" },
    { "id": "F10", "name": "Google Sheets Webhook", "status": "pending" },
    { "id": "F11", "name": "i18n 8 Languages", "status": "pending" },
    { "id": "F12", "name": "Adsterra Ad Slots", "status": "pending" },
    { "id": "F13", "name": "Research History Logging", "status": "pending" }
  ]
}
```

### `claude-progress.txt`
```
PROJECT: earnings-pulse
STARTED: [date]
CURRENT_MILESTONE: M1
STATUS: in_progress

COMPLETED:
- (none yet)

IN_PROGRESS:
- M1: Scaffold and data pipeline

BLOCKED:
- (none)
```

### `init.sh`
```bash
#!/usr/bin/env bash
set -e

PROJECT="earnings-pulse"
GITHUB_USER="taeshin11"

echo "=== Initializing $PROJECT ==="

npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir=false --import-alias="@/*" --yes

npm install next-intl chart.js react-chartjs-2 @upstash/redis next-sitemap

mkdir -p scripts public/data/tickers messages research_history components lib app/api/visits .github/workflows

echo "PROJECT: $PROJECT" > claude-progress.txt
echo "STARTED: $(date -u +%Y-%m-%dT%H:%M:%SZ)" >> claude-progress.txt
echo "CURRENT_MILESTONE: M1" >> claude-progress.txt
echo "STATUS: in_progress" >> claude-progress.txt

git init
gh repo create "$GITHUB_USER/$PROJECT" --public --source=. --remote=origin

echo "=== $PROJECT initialized ==="
```
