import { describe, it, expect, vi } from "vitest"
import { screen } from "@testing-library/react"
import { render } from "../../test-utils/render"
import Home from "./Home"
import { productMock } from "../../test-utils/productMock"
import type { Product } from "../../assets/types/Product"

vi.mock("../../hooks/fetchProducts/fetchProducts", () => ({
  useProducts: vi.fn(),
}))

vi.mock("../../components/DiscoverMore/DiscoverMore", () => ({
  default: ({ products }: { products: Product[] }) => (
    <div data-testid="discover-more">Products: {products.length}</div>
  ),
}))
vi.mock("../../components/HeroBanner/HeroBanner", () => ({
  default: () => <div data-testid="hero-banner">HeroBanner</div>,
}))
vi.mock("../../components/ui/spinner", () => ({
  default: () => <div data-testid="loading-spinner">Loading...</div>,
}))

import { useProducts } from "../../hooks/fetchProducts/fetchProducts"

describe("Home component", () => {
  it("renders loading spinner while fetching", () => {
    useProducts.mockReturnValue({
      products: [],
      isFetching: true,
      error: null,
    })

    render(<Home />)
    expect(screen.getByTestId("loading-spinner")).toBeInTheDocument()
  })

  it("renders error message if there is an error", () => {
    useProducts.mockReturnValue({
      products: [],
      isFetching: false,
      error: "Something went wrong",
    })

    render(<Home />)
    expect(screen.getByText(/Error: Something went wrong/i)).toBeInTheDocument()
  })

  it("renders HeroBanner and DiscoverMore with products when data is fetched", () => {
    const mockProducts = Array(10).fill(productMock)

    useProducts.mockReturnValue({
      products: mockProducts,
      isFetching: false,
      error: null,
    })

    render(<Home />)

    expect(screen.getByTestId("hero-banner")).toBeInTheDocument()
    expect(screen.getByTestId("discover-more")).toHaveTextContent("Products: 7")
  })
})
