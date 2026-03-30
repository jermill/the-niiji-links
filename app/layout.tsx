import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "The Niiji's Links",
  description: "All paths lead here.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
