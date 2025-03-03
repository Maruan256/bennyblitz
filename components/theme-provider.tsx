"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider, useTheme } from "next-themes"
import type { ThemeProviderProps } from "next-themes"

const themeFonts = {
  light: { sans: "Courier Prime", mono: "VT323" },
  dark: { sans: "IBM Plex Mono", mono: "Space Mono" },
  "neon-nights": { sans: "Orbitron", mono: "Press Start 2P" },
  "pastel-dreams": { sans: "DotGothic16", mono: "Silkscreen" },
  "forest-green": { sans: "Pixelify Sans", mono: "Inconsolata" },
  "ocean-blue": { sans: "Share Tech Mono", mono: "Fira Code" },
}

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider
      {...props}
      attribute="class"
      defaultTheme="system"
      enableSystem
      themes={["light", "dark", "neon-nights", "pastel-dreams", "forest-green", "ocean-blue"]}
    >
      <ThemeWrapper>{children}</ThemeWrapper>
    </NextThemesProvider>
  )
}

function ThemeWrapper({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme()

  React.useEffect(() => {
    if (theme) {
      const fonts = themeFonts[theme as keyof typeof themeFonts]
      if (fonts) {
        document.documentElement.style.setProperty("--font-sans", fonts.sans)
        document.documentElement.style.setProperty("--font-mono", fonts.mono)
        document.documentElement.className = document.documentElement.className.replace(/font-\S+/g, "").trim()
        document.documentElement.classList.add(`font-${fonts.sans.toLowerCase().replace(/\s+/g, "-")}`)
      }
    }
  }, [theme])

  return <>{children}</>
}

export { useTheme } from "next-themes"

