import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";
import { PwaRegistry } from "@/components/providers/PwaRegistry";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BuatinCSV — Multi-Microstock Metadata Studio",
  description: "Prepare, validate, and export metadata CSV files for multiple microstock contributor platforms from one organized workspace.",
  keywords: ["microstock", "csv", "metadata", "shutterstock", "adobe stock", "contributor"],
  authors: [{ name: "BuatinCSV" }],
  creator: "BuatinCSV",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://microstock-csv-studio.vercel.app/",
    title: "BuatinCSV — Multi-Microstock Metadata Studio",
    description: "Prepare, validate, and export metadata CSV files for multiple microstock contributor platforms from one organized workspace.",
    siteName: "BuatinCSV",
  },
  twitter: {
    card: "summary_large_image",
    title: "BuatinCSV — Multi-Microstock Metadata Studio",
    description: "Prepare, validate, and export metadata CSV files for multiple microstock contributor platforms from one organized workspace.",
  },
  icons: {
    icon: "/favicon.ico",
  },
  manifest: "/manifest.json",
};

export default async function RootLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={locale} className="dark" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <PwaRegistry />
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
