import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "GARUDA — Graph-Aware Autonomous Risk Understanding & Detection Architecture",
  description:
    "AI-powered real-time cyber vendor intelligence and propagation simulation platform.",
  icons: { icon: "/favicon.ico" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ffffff",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="h-full" style={{ colorScheme: "light" }}>
      {/*
        Google Fonts are imported via @import in globals.css.
        Preconnect hints speed up the connection.
      */}
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body className="h-full overflow-hidden bg-cyber-bg text-cyber-text antialiased">
        {children}
      </body>
    </html>
  );
}
