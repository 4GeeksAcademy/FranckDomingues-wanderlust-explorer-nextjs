import type { Metadata } from "next";
import { SharedAppShell } from "@/components/shared-app-shell";
import "./globals.css";

export const metadata: Metadata = {
  title: "Wanderlust Explorer",
  description: "A travel exploration project.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-stone-50 text-stone-900 antialiased">
        <SharedAppShell>{children}</SharedAppShell>
      </body>
    </html>
  );
}
