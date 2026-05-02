import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Pathway.ai | AI Student Career Copilot",
  description: "Bypass the consultant. Land your dream university with our autonomous AI matching engine.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className="min-h-screen bg-[#061a12] text-[#f6f6e9] antialiased">
        {children}
      </body>
    </html>
  );
}
