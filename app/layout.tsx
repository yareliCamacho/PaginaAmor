import type { Metadata } from "next"
import { Inter, Fraunces } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  axes: ["opsz", "SOFT"],
})

export const metadata: Metadata = {
  title: "Querencia — Nuestro atlas de momentos",
  description:
    "Un diario íntimo para guardar los momentos en pareja: recuerdos, recordatorios, mapa de lugares y lista de deseos compartida.",
  generator: "v0.app",
}

export const viewport = {
  themeColor: "#f4ece0",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className={`${inter.variable} ${fraunces.variable} bg-background`}>
      <body className="font-sans antialiased">
        {children}
        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  )
}
