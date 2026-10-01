import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sanskrit Path",
  description: "Learn Sanskrit with beginner lessons, quizzes, tutor conversations, and speaking practice.",
  other: {
    "codex-preview": "development",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
