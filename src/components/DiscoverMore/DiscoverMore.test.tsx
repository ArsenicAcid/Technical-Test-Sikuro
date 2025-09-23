import { describe, it, expect, vi } from "vitest"
import { screen } from "@testing-library/react"
import { render } from "../../test-utils/render"
import DiscoverMore from "./DiscoverMore"
import { productMock } from "../../test-utils/productMock"
import labels from "../../assets/labels"

vi.mock("../ProductCard/ProductCard", () => ({
  default: ({ id }: { id: number }) => (
    <div data-testid={`product-card-${id}`}>Product {id}</div>
  ),
}))

vi.mock("../ui/color-mode", async () => {
  const actual: typeof import("../ui/color-mode") =
    await vi.importActual("../ui/color-mode")
  return {
    ...actual,
    useColorModeValue: vi.fn().mockReturnValue("rgba(255, 255, 255, 0.5)"),
  }
})

describe("DiscoverMore component", () => {
  it("renders all products passed in props", () => {
    const mockProducts = [
      productMock,
      { ...productMock, id: 2 },
      { ...productMock, id: 3 },
    ]

    render(<DiscoverMore products={mockProducts} />)

    mockProducts.forEach((product) => {
      expect(
        screen.getByTestId(`product-card-${product.id}`),
      ).toBeInTheDocument()
    })
  })

  it("renders the Discover More text and button", () => {
    render(<DiscoverMore products={[productMock]} />)

    expect(screen.getByText(labels.DISCOVERMORETEXT)).toBeInTheDocument()
    expect(
      screen.getByRole("link", { name: labels.DISCOVERMORE }),
    ).toHaveAttribute("href", "/store")
  })
})
