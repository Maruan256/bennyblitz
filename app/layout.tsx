import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import localFont from "next/font/local"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Analytics } from '@vercel/analytics/next'

const inter = Inter({ subsets: ["latin"] })

const courierPrime = localFont({
  src: "../public/fonts/CourierPrime-Regular.ttf",
  variable: "--font-courier-prime",
  display: "swap",
})

const ibmPlexMono = localFont({
  src: "../public/fonts/IBMPlexMono-Regular.ttf",
  variable: "--font-ibm-plex-mono",
  display: "swap",
})

const orbitron = localFont({
  src: "../public/fonts/Orbitron-Regular.ttf",
  variable: "--font-orbitron",
  display: "swap",
})

const dotGothic16 = localFont({
  src: "../public/fonts/DotGothic16-Regular.ttf",
  variable: "--font-dotgothic16",
  display: "swap",
})

const pixelifySans = localFont({
  src: "../public/fonts/PixelifySans-Regular.ttf",
  variable: "--font-pixelify-sans",
  display: "swap",
})

const shareTechMono = localFont({
  src: "../public/fonts/ShareTechMono-Regular.ttf",
  variable: "--font-share-tech-mono",
  display: "swap",
})

const vt323 = localFont({
  src: "../public/fonts/VT323-Regular.ttf",
  variable: "--font-vt323",
  display: "swap",
})

const spaceMono = localFont({
  src: "../public/fonts/SpaceMono-Regular.ttf",
  variable: "--font-space-mono",
  display: "swap",
})

const pressStart2P = localFont({
  src: "../public/fonts/PressStart2P-Regular.ttf",
  variable: "--font-press-start-2p",
  display: "swap",
})

const silkscreen = localFont({
  src: "../public/fonts/Silkscreen-Regular.ttf",
  variable: "--font-silkscreen",
  display: "swap",
})

const inconsolata = localFont({
  src: "../public/fonts/Inconsolata-Regular.ttf",
  variable: "--font-inconsolata",
  display: "swap",
})

const firaCode = localFont({
  src: "../public/fonts/FiraCode-Regular.ttf",
  variable: "--font-fira-code",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Benny Blitz's Portfolio",
  description: "A showcase of Benny Blitz's work and skills",
  icons: {
    icon: "/favicon.svg",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className={`bg-background text-foreground`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  )
}

