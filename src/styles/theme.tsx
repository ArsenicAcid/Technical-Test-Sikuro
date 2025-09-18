import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react"

const config = defineConfig({
  theme: {
    tokens: {
      fonts: {
        body: { value: "Inter, sans-serif" },
        heading: { value: "Inter, sans-serif" },
      },
    },
  },
})

export const system = createSystem(defaultConfig, config)
