import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: "Terms of Use | EarningsPulse",
    description:
      "EarningsPulse terms of use. Earnings data is sourced from public SEC filings and company press releases. Not investment advice.",
    alternates: {
      canonical: `https://earnings-pulse-iota.vercel.app/${locale}/terms`,
      languages: {
        en: "/en/terms",
        ko: "/ko/terms",
        ja: "/ja/terms",
        zh: "/zh/terms",
        es: "/es/terms",
        fr: "/fr/terms",
        de: "/de/terms",
        pt: "/pt/terms",
      },
    },
  };
}

const LAST_UPDATED = "April 13, 2025";

export default async function TermsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const sections = [
    {
      title: "1. Acceptance of Terms",
      content: `By accessing or using EarningsPulse (the "Service"), you agree to be bound by these Terms of Use. If you do not agree to these terms, please do not use the Service. We reserve the right to modify these terms at any time. Continued use of the Service after changes are posted constitutes acceptance of the revised terms.`,
    },
    {
      title: "2. Nature of the Service",
      content: `EarningsPulse is an informational platform that aggregates and displays publicly available earnings data for publicly traded companies. The Service provides:

• Earnings calendars showing upcoming and past quarterly earnings report dates
• EPS (earnings per share) estimates sourced from analyst consensus data
• Actual EPS results compared against estimates (beat/miss analysis)
• Revenue data and surprise percentages
• Sector-level earnings beat rate analysis
• General educational content about earnings reports and financial concepts

The Service is designed for informational and educational purposes only.`,
    },
    {
      title: "3. Data Sources and Accuracy",
      content: `Earnings data displayed on EarningsPulse is sourced from publicly available information including:

• SEC filings (10-Q, 10-K, and 8-K forms) filed by companies with the U.S. Securities and Exchange Commission
• Official company press releases and earnings announcements
• Financial data providers and APIs that aggregate public market data
• Analyst consensus estimates from financial research platforms

While we strive for accuracy, EarningsPulse does not guarantee the completeness, accuracy, timeliness, or reliability of any data displayed on the Service. Financial data can be revised, restated, or updated after initial publication. We strongly recommend verifying critical earnings data directly through SEC EDGAR (https://www.sec.gov/edgar) before relying on it for any purpose.`,
    },
    {
      title: "4. Not Investment Advice",
      content: `IMPORTANT: EarningsPulse does not provide investment advice, financial advice, trading advice, or any other type of financial guidance. Nothing on this Service should be construed as a recommendation to buy, sell, hold, or otherwise transact in any security or financial instrument.

The earnings data, analysis, charts, and commentary provided by EarningsPulse are for informational and educational purposes only. You should not make investment decisions based solely on information from this Service.

Before making any investment decision, you should consult with a qualified financial advisor, broker-dealer, or investment professional who is licensed to provide advice in your jurisdiction. You should also conduct your own independent research and due diligence.`,
    },
    {
      title: "5. Past Earnings Do Not Predict Future Results",
      content: `Historical earnings data, beat/miss records, EPS surprise percentages, and trend patterns displayed on EarningsPulse are historical in nature. Past earnings performance does not guarantee or predict future financial results, stock price performance, or business outcomes.

Investing in stocks and securities involves risk, including the possible loss of principal. Stock prices can and do decline even when companies report strong earnings, and can rise even when companies miss estimates. Many factors influence stock prices beyond earnings results.`,
    },
    {
      title: "6. No Warranties",
      content: `THE SERVICE IS PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE, OR NON-INFRINGEMENT.

EarningsPulse does not warrant that:
• The Service will be uninterrupted, error-free, or free of viruses or other harmful components
• The data displayed is accurate, complete, current, or reliable
• The Service will meet your requirements or expectations
• Results obtained from the Service will be accurate or reliable`,
    },
    {
      title: "7. Limitation of Liability",
      content: `TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, EARNINGSPULSE AND ITS OPERATORS SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO LOSS OF PROFITS, LOSS OF DATA, FINANCIAL LOSSES, OR INVESTMENT LOSSES ARISING FROM YOUR USE OF OR RELIANCE ON THE SERVICE.

In no event shall EarningsPulse's total liability to you for all claims exceed the amount you paid to use the Service (if any) in the twelve months preceding the claim.`,
    },
    {
      title: "8. Intellectual Property",
      content: `The EarningsPulse name, logo, website design, and original content (including written descriptions, educational content, and code) are the intellectual property of EarningsPulse and its operators. You may not reproduce, distribute, or create derivative works from this content without express written permission.

Earnings data derived from public SEC filings and company press releases is in the public domain. Analyst estimates data is provided under license from financial data providers and is not available for commercial redistribution.`,
    },
    {
      title: "9. Third-Party Content and Links",
      content: `EarningsPulse may contain links to third-party websites, including company investor relations pages, SEC EDGAR, and financial data sources. These links are provided for convenience only. EarningsPulse does not endorse, control, or take responsibility for the content, privacy practices, or accuracy of third-party websites. Accessing third-party sites is at your own risk.`,
    },
    {
      title: "10. Prohibited Uses",
      content: `You agree not to use the Service to:

• Scrape, crawl, or systematically download data without our express written permission
• Redistribute or resell earnings data to third parties for commercial purposes
• Attempt to interfere with or disrupt the Service's infrastructure
• Use the Service in any way that violates applicable laws or regulations
• Misrepresent EarningsPulse data as investment advice or official financial recommendations`,
    },
    {
      title: "11. Governing Law",
      content: `These Terms of Use shall be governed by and construed in accordance with applicable laws. Any disputes arising from these terms or your use of the Service shall be resolved through binding arbitration or in courts of competent jurisdiction, as applicable.`,
    },
    {
      title: "12. Contact",
      content: `If you have questions about these Terms of Use, please contact us through the EarningsPulse website. We will make reasonable efforts to address your questions promptly.`,
    },
  ];

  void locale;

  return (
    <>
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
                fontSize: "clamp(1.8rem, 4vw, 2.4rem)",
                fontWeight: 800,
                color: "#fff",
                marginBottom: 12,
              }}
            >
              Terms of Use
            </h1>
            <p style={{ color: "#a5b4fc", fontSize: 14 }}>
              Last Updated: {LAST_UPDATED}
            </p>
          </div>
        </section>

        {/* Important notice */}
        <section style={{ maxWidth: 800, margin: "0 auto", padding: "2rem 1rem 0" }}>
          <div
            style={{
              background: "#fff7ed",
              border: "1px solid #fdba74",
              borderLeft: "4px solid #f97316",
              borderRadius: 10,
              padding: "1.25rem 1.5rem",
            }}
          >
            <p style={{ fontWeight: 700, color: "#9a3412", fontSize: 14, marginBottom: 6 }}>
              Important Notice
            </p>
            <p style={{ color: "#7c2d12", fontSize: 14, lineHeight: 1.7 }}>
              EarningsPulse provides earnings data from public SEC filings and
              company press releases for informational purposes only. This is
              <strong> not investment advice</strong>. Past earnings results do
              not predict future stock performance. Always verify data through{" "}
              <a
                href="https://www.sec.gov/edgar"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#c2410c", fontWeight: 600 }}
              >
                SEC EDGAR
              </a>{" "}
              before making financial decisions.
            </p>
          </div>
        </section>

        {/* Content */}
        <section style={{ maxWidth: 800, margin: "0 auto", padding: "2rem 1rem 4rem" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
            {sections.map((section) => (
              <div key={section.title}>
                <h2
                  style={{
                    fontSize: "1.05rem",
                    fontWeight: 700,
                    color: "#1e1b4b",
                    marginBottom: "0.75rem",
                    paddingBottom: "0.5rem",
                    borderBottom: "1px solid #e0e7ff",
                  }}
                >
                  {section.title}
                </h2>
                <p
                  style={{
                    color: "#374151",
                    fontSize: 14,
                    lineHeight: 1.8,
                    whiteSpace: "pre-line",
                  }}
                >
                  {section.content}
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer locale={locale} />
    </>
  );
}
