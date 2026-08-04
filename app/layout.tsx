import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.SITE_URL || "http://localhost:3001"),
  title: "Looma — Textile supply chain intelligence",
  description: "Compare textile standards, investigate manufacturers, trace supply chains, and see what evidence is still missing.",
  openGraph: {
    title: "Looma — Know what’s behind every thread.",
    description: "Evidence-led background checks for textile certifications and manufacturers.",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Looma textile supply-chain intelligence" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Looma — Know what’s behind every thread.",
    description: "Evidence-led background checks for textile certifications and manufacturers.",
    images: ["/og.png"],
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
