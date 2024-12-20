import type { Metadata } from "next";
import "./globals.css";
import { SnowEffect } from '@/components/SnowEffect'
import { ChristmasMusic } from '@/components/ChristmasMusic'

export const metadata: Metadata = {
  title: "Christmas App",
  description: "A festive application",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <SnowEffect />
        <ChristmasMusic />
        <main>
          {children}
        </main>
      </body>
    </html>
  )
}
