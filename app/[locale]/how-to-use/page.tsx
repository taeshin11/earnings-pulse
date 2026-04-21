import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: "How to Use EarningsPulse — Earnings Tracker Guide",
    description:
      "Learn how to read earnings reports, understand EPS beats and misses, interpret revenue guidance, and use EarningsPulse to track stock earnings season.",
    alternates: {
      canonical: `https://earnings-pulse-iota.vercel.app/${locale}/how-to-use`,
      languages: {
        en: "/en/how-to-use",
        ko: "/ko/how-to-use",
        ja: "/ja/how-to-use",
        zh: "/zh/how-to-use",
        es: "/es/how-to-use",
        fr: "/fr/how-to-use",
        de: "/de/how-to-use",
        pt: "/pt/how-to-use",
      },
    },
    openGraph: {
      title: "How to Use EarningsPulse",
      description:
        "A beginner-friendly guide to reading earnings reports, understanding EPS, and tracking earnings season with EarningsPulse.",
      url: `https://earnings-pulse-iota.vercel.app/${locale}/how-to-use`,
    },
  };
}

const faqs = [
  {
    q: "What is an earnings report?",
    a: "An earnings report is a quarterly financial statement that a publicly traded company is required to file with the SEC. It discloses revenue, net income, earnings per share (EPS), expenses, and often forward guidance. Investors closely watch earnings reports because they reveal how well a company is actually performing compared to expectations.",
  },
  {
    q: "What is EPS (Earnings Per Share)?",
    a: "EPS stands for Earnings Per Share. It is calculated by dividing a company's net profit by the number of outstanding shares. For example, if a company earns $1 billion and has 500 million shares outstanding, its EPS is $2.00. Analysts publish EPS estimates before earnings and the actual vs. estimated comparison drives stock price reactions.",
  },
  {
    q: "What is an earnings beat vs. an earnings miss?",
    a: "An earnings beat occurs when a company reports EPS higher than the Wall Street analyst consensus estimate. An earnings miss is when the reported EPS falls short of the estimate. The percentage difference is called the EPS surprise. A large positive surprise often causes a stock to rise after hours; a miss can cause a significant decline.",
  },
  {
    q: "What is revenue guidance?",
    a: "Revenue guidance is management's forward-looking estimate of how much revenue the company expects to generate in the next quarter or fiscal year. Even if a company beats current earnings, weak guidance can cause the stock to fall because investors price in future growth. Strong guidance raises expectations and can push a stock higher.",
  },
  {
    q: "Why do stocks move so much on earnings?",
    a: "Stock prices reflect investor expectations. When earnings are dramatically better or worse than expected, the new information causes investors to reprice the stock immediately. Companies with very high valuations (high P/E ratios) are particularly sensitive because even a small earnings miss can shatter the growth narrative priced into the stock.",
  },
  {
    q: "What is earnings season?",
    a: "Earnings season is the period each quarter when the majority of publicly traded companies release their financial results. It typically runs for 4–6 weeks starting about 2–3 weeks after a quarter ends. The four earnings seasons correspond roughly to: January–February (Q4), April–May (Q1), July–August (Q2), and October–November (Q3).",
  },
  {
    q: "What is a whisper number?",
    a: "A whisper number is an unofficial, informal EPS estimate that circulates among traders — often higher than the published analyst consensus. Because many institutional investors expect companies to beat consensus, the whisper number represents the true hurdle a company must clear to cause a positive stock reaction on earnings day.",
  },
  {
    q: "How do I find earnings call transcripts?",
    a: "Earnings call transcripts are available through several sources: the company's own investor relations website, SEC filings (Form 8-K), financial platforms like Seeking Alpha, Motley Fool, and The Motley Fool. Many brokerages also provide transcripts. EarningsPulse links to investor relations pages where available.",
  },
  {
    q: "What is after-hours trading on earnings?",
    a: "After-hours trading occurs outside normal stock exchange hours (typically 9:30 AM – 4:00 PM ET). Many companies report earnings AMC (After Market Close), meaning results come out when regular trading has ended. Stocks can move dramatically in after-hours trading on earnings news, and those moves often — but not always — carry into the next regular trading session.",
  },
  {
    q: "What is a P/E ratio and why does it matter for earnings?",
    a: "The P/E (Price-to-Earnings) ratio is the stock price divided by EPS. A high P/E means investors are paying a premium for each dollar of earnings, usually because they expect strong future growth. When a high-P/E company misses earnings, the stock can fall sharply because the growth story is called into question. Lower-P/E (value) stocks tend to react less dramatically to individual earnings reports.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.a,
    },
  })),
};

export default async function HowToUsePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <main style={{ minHeight: "80vh" }}>
        {/* Hero */}
        <section
          style={{
            background: "linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)",
            padding: "4rem 1rem 3rem",
          }}
        >
          <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center" }}>
            <h1
              style={{
                fontSize: "clamp(1.8rem, 4vw, 2.6rem)",
                fontWeight: 800,
                color: "#fff",
                marginBottom: 16,
                lineHeight: 1.2,
              }}
            >
              How to Use EarningsPulse
            </h1>
            <p
              style={{
                fontSize: "clamp(1rem, 2vw, 1.15rem)",
                color: "#a5b4fc",
                maxWidth: 600,
                margin: "0 auto",
                lineHeight: 1.7,
              }}
            >
              Get up to speed on earnings reports, EPS beats, revenue guidance,
              and how to navigate stock earnings season like a pro.
            </p>
          </div>
        </section>

        {/* 3-Step Guide */}
        <section style={{ maxWidth: 900, margin: "0 auto", padding: "3rem 1rem" }}>
          <h2
            style={{
              fontSize: "1.5rem",
              fontWeight: 700,
              color: "#1e1b4b",
              marginBottom: "2rem",
              textAlign: "center",
            }}
          >
            Get Started in 3 Steps
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: "1.25rem",
            }}
          >
            {[
              {
                step: "1",
                title: "Check the Earnings Calendar",
                desc: "Visit the Earnings Calendar to see which companies are reporting this week. Each entry shows the report date, timing (BMO or AMC), analyst EPS estimate, and sector.",
                link: `/${locale}/calendar`,
                linkLabel: "Open Calendar",
                color: "#4f46e5",
              },
              {
                step: "2",
                title: "Browse Individual Stocks",
                desc: "Click any ticker to see a full earnings history: past EPS actuals vs. estimates, surprise percentages, revenue data, and trend charts across multiple quarters.",
                link: `/${locale}/stocks`,
                linkLabel: "Browse Stocks",
                color: "#7c3aed",
              },
              {
                step: "3",
                title: "Analyze Sector Beat Rates",
                desc: "Use the Sectors view to see which industries are consistently beating or missing analyst estimates this earnings season — useful context for broader portfolio decisions.",
                link: `/${locale}/sectors`,
                linkLabel: "View Sectors",
                color: "#2563eb",
              },
            ].map((item) => (
              <div
                key={item.step}
                style={{
                  background: "#fff",
                  borderRadius: 12,
                  border: "1px solid #e0e7ff",
                  borderTop: `4px solid ${item.color}`,
                  padding: "1.5rem",
                }}
              >
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: "50%",
                    background: item.color,
                    color: "#fff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: 800,
                    fontSize: 16,
                    marginBottom: 12,
                  }}
                >
                  {item.step}
                </div>
                <h3
                  style={{
                    fontSize: 15,
                    fontWeight: 700,
                    color: "#1e1b4b",
                    marginBottom: 8,
                  }}
                >
                  {item.title}
                </h3>
                <p style={{ fontSize: 13, color: "#6b7280", lineHeight: 1.6, marginBottom: 14 }}>
                  {item.desc}
                </p>
                <Link
                  href={item.link}
                  style={{
                    color: item.color,
                    fontSize: 13,
                    fontWeight: 600,
                    textDecoration: "none",
                  }}
                >
                  {item.linkLabel} &rarr;
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* Reading an earnings card */}
        <section style={{ background: "#f0f4ff", padding: "3rem 1rem" }}>
          <div style={{ maxWidth: 800, margin: "0 auto" }}>
            <h2
              style={{
                fontSize: "1.5rem",
                fontWeight: 700,
                color: "#1e1b4b",
                marginBottom: "1.25rem",
              }}
            >
              How to Read an Earnings Entry
            </h2>
            <div
              style={{
                background: "#fff",
                borderRadius: 12,
                border: "1px solid #e0e7ff",
                borderLeft: "4px solid #10b981",
                padding: "1.25rem 1.5rem",
                marginBottom: "1.5rem",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                  gap: 8,
                  marginBottom: 10,
                }}
              >
                <span style={{ fontWeight: 800, fontSize: 18, color: "#1e1b4b" }}>AAPL</span>
                <span
                  style={{
                    fontSize: 12,
                    fontWeight: 700,
                    padding: "3px 10px",
                    borderRadius: 12,
                    background: "#d1fae5",
                    color: "#065f46",
                  }}
                >
                  Beat +8.2%
                </span>
              </div>
              <p style={{ fontSize: 13, color: "#6b7280", marginBottom: 8 }}>Apple Inc. &mdash; Technology</p>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
                  gap: 8,
                }}
              >
                {[
                  { label: "Report Date", value: "Jan 30, 2025" },
                  { label: "Timing", value: "AMC" },
                  { label: "EPS Estimate", value: "$2.35" },
                  { label: "EPS Actual", value: "$2.54" },
                ].map((item) => (
                  <div key={item.label}>
                    <div style={{ fontSize: 11, color: "#9ca3af", marginBottom: 2 }}>{item.label}</div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: "#1e1b4b" }}>{item.value}</div>
                  </div>
                ))}
              </div>
            </div>
            <ul style={{ color: "#374151", lineHeight: 1.9, fontSize: 14, paddingLeft: "1.25rem" }}>
              <li><strong>Green border / Beat</strong> — EPS actual was higher than the analyst estimate.</li>
              <li><strong>Red border / Miss</strong> — EPS actual was lower than the analyst estimate.</li>
              <li><strong>+8.2%</strong> — The EPS surprise percentage (how much the actual beat or missed the estimate).</li>
              <li><strong>AMC</strong> — Results released After Market Close. BMO means Before Market Open.</li>
              <li><strong>EPS Estimate</strong> — The Wall Street analyst consensus forecast before the report.</li>
            </ul>
          </div>
        </section>

        {/* FAQ */}
        <section style={{ maxWidth: 800, margin: "0 auto", padding: "3rem 1rem" }}>
          <h2
            style={{
              fontSize: "1.5rem",
              fontWeight: 700,
              color: "#1e1b4b",
              marginBottom: "1.5rem",
            }}
          >
            Frequently Asked Questions
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {faqs.map((faq, i) => (
              <details
                key={i}
                style={{
                  background: "#fff",
                  borderRadius: 10,
                  border: "1px solid #e0e7ff",
                  padding: "1rem 1.25rem",
                }}
              >
                <summary
                  style={{
                    fontWeight: 600,
                    color: "#1e1b4b",
                    cursor: "pointer",
                    fontSize: 15,
                    lineHeight: 1.4,
                  }}
                >
                  {faq.q}
                </summary>
                <p
                  style={{
                    marginTop: 12,
                    color: "#4b5563",
                    fontSize: 14,
                    lineHeight: 1.75,
                  }}
                >
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section
          style={{
            background: "linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)",
            padding: "3rem 1rem",
            textAlign: "center",
          }}
        >
          <h2 style={{ fontSize: "1.5rem", fontWeight: 700, color: "#fff", marginBottom: 12 }}>
            Ready to Track Earnings?
          </h2>
          <p style={{ color: "#a5b4fc", marginBottom: "1.5rem", fontSize: 15 }}>
            Check this week&apos;s calendar and see which companies are reporting.
          </p>
          <Link
            href={`/${locale}/calendar`}
            style={{
              background: "#4f46e5",
              color: "#fff",
              padding: "0.75rem 1.75rem",
              borderRadius: 8,
              textDecoration: "none",
              fontWeight: 600,
              fontSize: 15,
            }}
          >
            View Earnings Calendar
          </Link>
        </section>
      </main>
      <Footer locale={locale} />
    </>
  );
}
