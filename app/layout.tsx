import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "EarningsPulse — Stock Earnings Calendar",
  description: "Track S&P 500 earnings dates, EPS estimates, beat/miss rates, and sector trends. Updated daily.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
