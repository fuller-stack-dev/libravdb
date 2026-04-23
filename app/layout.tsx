import type { Metadata } from "next";
import { Space_Grotesk, Space_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "./components/navbar";
import { Footer } from "./components/footer";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "LibraVDB — Local-First Memory Engine for AI",
    template: "%s | LibraVDB",
  },
  description:
    "LibraVDB is a local-first, three-tier memory engine for the OpenClaw AI assistant. Persistent scoped memory with hybrid vector + keyword retrieval — fully offline, no cloud required.",
  keywords: [
    "LibraVDB",
    "vector database",
    "AI memory",
    "OpenClaw",
    "local-first",
    "embedding",
    "ONNX",
    "memory plugin",
    "AI agent memory",
    "semantic search",
    "hybrid retrieval",
  ],
  authors: [{ name: "xDarkicex" }],
  creator: "xDarkicex",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://libravdb.com",
    siteName: "LibraVDB",
    title: "LibraVDB — Local-First Memory Engine for AI",
    description:
      "Persistent, scoped AI memory with hybrid vector + keyword retrieval. Fully local, zero cloud dependencies.",
    images: [
      {
        url: "/logo-discord.png",
        width: 512,
        height: 512,
        alt: "LibraVDB Logo",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "LibraVDB — Local-First Memory Engine for AI",
    description:
      "Persistent, scoped AI memory with hybrid vector + keyword retrieval. Fully local, zero cloud dependencies.",
    images: ["/logo-discord.png"],
  },
  metadataBase: new URL("https://libravdb.com"),
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  alternates: {
    canonical: "https://libravdb.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${spaceMono.variable} dark antialiased`}
    >
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              name: "LibraVDB",
              applicationCategory: "DeveloperApplication",
              operatingSystem: "macOS, Linux, Windows",
              description:
                "Local-first, three-tier memory engine for the OpenClaw AI assistant. Hybrid vector + keyword retrieval, fully offline.",
              url: "https://libravdb.com",
              downloadUrl:
                "https://github.com/xDarkicex/openclaw-memory-libravdb",
              softwareHelp: {
                "@type": "CreativeWork",
                url: "https://libravdb.com/docs",
              },
              author: {
                "@type": "Person",
                name: "xDarkicex",
                url: "https://github.com/xDarkicex",
              },
              codeRepository:
                "https://github.com/xDarkicex/openclaw-memory-libravdb",
              programmingLanguage: ["Go", "TypeScript"],
              license: "https://opensource.org/licenses/MIT",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "USD",
              },
            }),
          }}
        />
      </head>
      <body className="min-h-full flex flex-col font-body">
        <Navbar />
        <main className="pt-20 flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
