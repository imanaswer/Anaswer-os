import type { Metadata } from "next";
import { Silkscreen, Pixelify_Sans, VT323 } from "next/font/google";
import "./globals.css";
import { profile } from "@/lib/content";

const pixel = Silkscreen({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-pixel",
  display: "swap",
});
const body = Pixelify_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});
const mono = VT323({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const title = `${profile.name} — ${profile.role}`;
const description = `${profile.tagline} Step inside my desktop and look around.`;

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    images: ["/og.png"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/og.png"],
  },
};

export const viewport = {
  themeColor: "#02656A",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${pixel.variable} ${body.variable} ${mono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
