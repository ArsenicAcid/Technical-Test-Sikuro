import "@testing-library/jest-dom/vitest"
import { cleanup } from "@testing-library/react"

const matchMediaMock = vi.fn((query: unknown) => ({
  matches: false,
  media: query,
  onchange: null,
  addListener: vi.fn(),
  removeListener: vi.fn(),
  addEventListener: vi.fn(),
  removeEventListener: vi.fn(),
  dispatchEvent: vi.fn(),
}))
vi.stubGlobal("matchMedia", matchMediaMock)

afterEach(() => {
  cleanup()
})
