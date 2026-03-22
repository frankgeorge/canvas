import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "safyr — AI Workflow OS",
  description:
    "Build, deploy and discover enterprise AI agent workflows. Visual design environment with a curated marketplace of expert-built playbooks.",
  openGraph: {
    title: "safyr — AI Workflow OS",
    description: "Build, deploy and discover enterprise AI agent workflows.",
    url: "https://safyr.ai",
    siteName: "safyr",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "safyr — AI Workflow OS",
    description: "Build, deploy and discover enterprise AI agent workflows.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;0,9..144,600;0,9..144,700;1,9..144,300;1,9..144,400&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
