import type React from "react"
import type { Metadata } from "next"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import "./globals.css"

export const metadata: Metadata = {
  title: "BoostACart – Add-to-Cart Lead Capture Tool to Recover Lost Sales",
  description:
    "BoostACart helps online stores capture email and phone numbers at add-to-cart to recover lost sales via WhatsApp, SMS, and email follow-ups.",
  generator: "v0.app",
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
  },
  verification: {
    google: "ekQwd8q6kLE6rTEI5JtM4oK6qbEErm3JWIIHucbbkRk",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
        <Analytics />
      </body>
    </html>
  )
}
