"use client"

import { ChakraProvider } from "@chakra-ui/react"
import { ColorModeProvider, type ColorModeProviderProps } from "./color-mode"
import { ThemeProvider } from "next-themes"
import { system } from "../../styles/theme"

export function Provider(props: ColorModeProviderProps) {
  return (
    <ChakraProvider value={system}>
      <ThemeProvider attribute="class">
        <ColorModeProvider {...props} />
      </ThemeProvider>
    </ChakraProvider>
  )
}
