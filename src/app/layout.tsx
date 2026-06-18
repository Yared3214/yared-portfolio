import type { Metadata, Viewport } from "next";
import { Inter, Instrument_Serif, JetBrains_Mono } from "next/font/google";
import "./globals.css";

import { meta, site, socials } from "@/content/site";
import { SiteHeader } from "@/components/chrome/SiteHeader";
import { SiteFooter } from "@/components/sections/SiteFooter";
import { BackToTop } from "@/components/chrome/BackToTop";
import { Cursor } from "@/components/chrome/Cursor";
import { EasterEgg } from "@/components/chrome/EasterEgg";
import { Loader } from "@/components/chrome/Loader";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const instrument = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: meta.title,
    template: `%s — ${site.name}`,
  },
  description: meta.description,
  keywords: [...meta.keywords],
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  publisher: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: site.url,
    siteName: site.name,
    title: meta.title,
    description: meta.description,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: meta.title,
    description: meta.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  category: "technology",
} as Metadata;

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  colorScheme: "dark light",
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#06060b" },
    { media: "(prefers-color-scheme: light)", color: "#f4f1ea" },
  ],
};

const themeScript = `(function(){try{var stored=localStorage.getItem('yb-theme');var theme=stored==='light'||stored==='dark'?stored:'dark';document.documentElement.dataset.theme=theme;}catch(e){document.documentElement.dataset.theme='dark';}})();`;

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  jobTitle: site.title,
  description: meta.description,
  url: site.url,
  email: `mailto:${site.email}`,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Addis Ababa",
    addressCountry: "ET",
  },
  sameAs: socials
    .filter((social) => social.href.startsWith("http"))
    .map((social) => social.href),
  knowsAbout: [
    "Full-stack development",
    "Mobile development",
    "React",
    "Next.js",
    "React Native",
    "TypeScript",
    "Supabase",
    "Firebase",
    "PostgreSQL",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      data-theme="dark"
      suppressHydrationWarning
      className={`${inter.variable} ${instrument.variable} ${jetbrains.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
      </head>
      <body className="font-sans antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-full focus:bg-accent focus:px-4 focus:py-2 focus:text-[0.8rem] focus:text-accent-fg"
        >
          Skip to content
        </a>

        <Loader />
        <Cursor />
        <SiteHeader />

        <main id="main" className="relative">
          {children}
        </main>

        <SiteFooter />
        <BackToTop />
        <EasterEgg />

        <div aria-hidden="true" className="grain-overlay" />
      </body>
    </html>
  );
}
