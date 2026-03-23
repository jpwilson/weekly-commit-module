import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ST6 | Weekly Commit Module",
  description:
    "Production-ready weekly planning system linking individual commitments to organizational strategic goals.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="font-body antialiased">{children}</body>
    </html>
  );
}
