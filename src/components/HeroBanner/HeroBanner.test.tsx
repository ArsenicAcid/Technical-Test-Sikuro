import { screen } from "@testing-library/react"
import { render } from "../../test-utils/render"
import { describe, it, expect, vi } from "vitest"
import HeroBanner from "./HeroBanner"
import labels from "../../assets/labels"

vi.mock("../../components/ui/color-mode", async (importOriginal) => {
  const actual =
    await importOriginal<typeof import("../../components/ui/color-mode")>()
  return {
    ...actual,
    useColorModeValue: vi.fn().mockImplementation((light: string) => light),
  }
})

describe("HeroBanner", () => {
  it("renders the heading with correct labels", () => {
    render(<HeroBanner />)

    const heading = screen.getByRole("heading", {
      name: `${labels.WELCOMETO}${labels.STORENAME}${labels.EXMARK}`,
    })

    expect(heading).toBeInTheDocument()
  })

  it("renders the description text", () => {
    render(<HeroBanner />)

    const description = screen.getByText(labels.HERODESCRIPTION)
    expect(description).toBeInTheDocument()
  })
})
