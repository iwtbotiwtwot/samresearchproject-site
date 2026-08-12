import "./globals.css";
import { site } from "../index.js";

export const metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "SAM Research Project — Substrate, Matter, and Exact Computation",
    template: "%s | SAM Research Project",
  },
  description:
    "Sean Brady's public three-volume SAM Research Project: substrate accumulation, finite matter grammar, the Substrate Ledger Computer, Starbreaker, reciprocal history, the Riemann Hypothesis program, and Mersenne search.",
  applicationName: site.name,
  authors: [{ name: site.author }],
  creator: site.author,
  publisher: site.name,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "/",
    siteName: site.name,
    title: "SAM Research Project — Substrate, Matter, and Exact Computation",
    description:
      "A public three-volume research system connecting substrate, finite matter, and exact computation.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "SAM Research Project — Matter displaces the substrate. Displacement accumulates.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SAM Research Project — Substrate, Matter, and Exact Computation",
    description:
      "A public three-volume research system connecting substrate, finite matter, and exact computation.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#071411",
  colorScheme: "dark light",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
