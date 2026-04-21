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
    title: "Privacy Policy | EarningsPulse",
    description:
      "EarningsPulse privacy policy. Learn how we collect, use, and protect your data when you use our stock earnings tracking platform.",
    alternates: {
      canonical: `https://earnings-pulse-iota.vercel.app/${locale}/privacy`,
      languages: {
        en: "/en/privacy",
        ko: "/ko/privacy",
        ja: "/ja/privacy",
        zh: "/zh/privacy",
        es: "/es/privacy",
        fr: "/fr/privacy",
        de: "/de/privacy",
        pt: "/pt/privacy",
      },
    },
  };
}

const LAST_UPDATED = "April 13, 2025";

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const sections = [
    {
      title: "1. Information We Collect",
      content: `We collect minimal information necessary to provide the EarningsPulse service. This includes:

• **Usage Data**: Pages visited, time spent, referring URLs, browser type, operating system, and general geographic location (country/region level). This data is collected through standard server logs and analytics tools.

• **Visit Counts**: We track aggregate daily and total visit counts to our pages. This data is anonymized and not associated with individual users.

• **Cookies**: We use essential cookies required to operate the site. We may also use analytics cookies (e.g., from Google Analytics) to understand traffic patterns. You can disable cookies in your browser settings.

• **Information You Provide**: If you contact us via email or a contact form, we collect the information you provide (name, email address, message content) solely to respond to your inquiry.

We do not require account registration and do not collect personal information such as your name or email address unless you voluntarily provide it.`,
    },
    {
      title: "2. How We Use Your Information",
      content: `We use the information collected to:

• Operate and improve the EarningsPulse platform
• Analyze traffic patterns and popular content to enhance the user experience
• Monitor site performance and diagnose technical issues
• Respond to inquiries you send us
• Display aggregate visit statistics on the site

We do not sell, rent, or trade your personal information to third parties for marketing purposes.`,
    },
    {
      title: "3. Advertising",
      content: `EarningsPulse may display advertisements served by Google AdSense and other advertising networks. These third-party ad networks may use cookies and web beacons to serve ads based on your prior visits to this and other websites.

Google's use of advertising cookies enables it and its partners to serve ads based on your visit to EarningsPulse and/or other sites on the internet. You may opt out of personalized advertising by visiting Google's Ads Settings at https://www.google.com/settings/ads.

We do not have access to or control over the cookies used by third-party advertisers.`,
    },
    {
      title: "4. Third-Party Services",
      content: `We use the following third-party services that may collect data according to their own privacy policies:

• **Vercel**: Our hosting provider. Vercel may collect server logs and usage data. See Vercel's privacy policy at https://vercel.com/legal/privacy-policy.

• **Google Analytics**: We may use Google Analytics to analyze site traffic. Google Analytics uses cookies and collects anonymized usage data. See Google's privacy policy at https://policies.google.com/privacy.

• **Google AdSense**: For advertising. See Google's privacy policy.

• **Financial Data Providers**: We display earnings data sourced from public financial data APIs. These providers operate under their own privacy policies.`,
    },
    {
      title: "5. Data Retention",
      content: `Server logs and anonymized analytics data are retained for up to 90 days. Aggregate statistics (total visit counts) are retained indefinitely. If you contact us directly, we retain correspondence for up to 2 years.

We do not store personal financial information, account credentials, or sensitive personal data.`,
    },
    {
      title: "6. Your Rights",
      content: `Depending on your location, you may have rights under applicable privacy laws including:

• The right to access personal data we hold about you
• The right to request deletion of your personal data
• The right to opt out of certain data processing activities
• The right to lodge a complaint with a data protection authority

To exercise any of these rights, please contact us at the email address listed at the bottom of this page. We will respond within 30 days.`,
    },
    {
      title: "7. Children's Privacy",
      content: `EarningsPulse is not directed to children under the age of 13. We do not knowingly collect personal information from children under 13. If you believe we have inadvertently collected such information, please contact us immediately and we will take steps to delete it.`,
    },
    {
      title: "8. Security",
      content: `We implement reasonable technical and organizational measures to protect the information we collect from unauthorized access, disclosure, or destruction. Our site is served over HTTPS. However, no method of transmission over the internet or electronic storage is 100% secure. We cannot guarantee absolute security.`,
    },
    {
      title: "9. Changes to This Policy",
      content: `We may update this Privacy Policy from time to time. When we make material changes, we will update the "Last Updated" date at the top of this page. Your continued use of EarningsPulse after any changes constitutes your acceptance of the updated policy. We encourage you to review this page periodically.`,
    },
    {
      title: "10. Contact Us",
      content: `If you have questions about this Privacy Policy or our data practices, please contact us by visiting the EarningsPulse website. We are committed to addressing your concerns promptly and transparently.`,
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
              Privacy Policy
            </h1>
            <p style={{ color: "#a5b4fc", fontSize: 14 }}>
              Last Updated: {LAST_UPDATED}
            </p>
          </div>
        </section>

        {/* Content */}
        <section style={{ maxWidth: 800, margin: "0 auto", padding: "3rem 1rem 4rem" }}>
          <div
            style={{
              background: "#fffbeb",
              border: "1px solid #fcd34d",
              borderRadius: 10,
              padding: "1rem 1.25rem",
              marginBottom: "2rem",
              fontSize: 14,
              color: "#92400e",
              lineHeight: 1.6,
            }}
          >
            By using EarningsPulse, you agree to the collection and use of information
            in accordance with this Privacy Policy.
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
            {sections.map((section) => (
              <div key={section.title}>
                <h2
                  style={{
                    fontSize: "1.1rem",
                    fontWeight: 700,
                    color: "#1e1b4b",
                    marginBottom: "0.75rem",
                    paddingBottom: "0.5rem",
                    borderBottom: "1px solid #e0e7ff",
                  }}
                >
                  {section.title}
                </h2>
                <div
                  style={{
                    color: "#374151",
                    fontSize: 14,
                    lineHeight: 1.8,
                    whiteSpace: "pre-line",
                  }}
                >
                  {section.content.split("**").map((part, i) =>
                    i % 2 === 1 ? (
                      <strong key={i} style={{ color: "#1e1b4b" }}>
                        {part}
                      </strong>
                    ) : (
                      part
                    )
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer locale={locale} />
    </>
  );
}
