import type { Metadata } from "next";
import { Playfair_Display, Jost } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.thecatnbutterfly.com"),
  title: {
    template: "%s | The Cat And Butterfly",
    default: "Home | The Cat And Butterfly",
  },
  description:
    "The Cat and Butterfly — bringing people from different backgrounds around the world to share common stories of humanity.",
  openGraph: {
    type: "website",
    siteName: "The Cat And Butterfly",
    url: "https://www.thecatnbutterfly.com",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${jost.variable}`}
    >
      <body className="min-h-screen flex flex-col bg-brand-cream text-brand-brown">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
