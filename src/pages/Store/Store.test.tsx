/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, expect, vi, beforeEach } from "vitest"
import { screen, fireEvent } from "@testing-library/react"
import { render } from "../../test-utils/render"
import Store from "./Store"
import { productMock } from "../../test-utils/productMock"
import type { Product } from "../../assets/types/Product"

vi.mock("../../components/ui/spinner", () => ({
  default: () => <div data-testid="spinner">Loading...</div>,
}))
vi.mock("../../components/ProductGrid/ProductGrid", () => ({
  default: ({ products }: { products: Product[] }) => (
    <div data-testid="product-grid">
      {products.map((p) => (
        <span key={p.id}>{p.title}</span>
      ))}
    </div>
  ),
}))
vi.mock("../../components/ui/page-control", () => ({
  default: ({ page, totalPages, handlePrev, handleNext }: any) => (
    <div data-testid="page-control">
      <button onClick={handlePrev}>Prev</button>
      <span>
        {page + 1} / {totalPages}
      </span>
      <button onClick={handleNext}>Next</button>
    </div>
  ),
}))
vi.mock("../../components/ui/product-search", () => ({
  default: ({
    searchQuery,
    setSearchQuery,
    categories,
    setSelectedCategory,
  }: any) => (
    <div>
      <input
        data-testid="search-input"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <select
        data-testid="category-select"
        onChange={(e) => setSelectedCategory(e.target.value)}
      >
        {categories.map((c: string) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>
    </div>
  ),
}))

vi.mock("../../hooks/fetchProducts/fetchProducts", () => ({
  useProducts: vi.fn(),
}))
import { useProducts } from "../../hooks/fetchProducts/fetchProducts"

describe("<Store />", () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it("renders the mocked product in the grid", () => {
    ;(useProducts as any).mockReturnValue({
      products: [productMock],
      isFetching: false,
      error: null,
    })

    render(<Store />)

    expect(screen.getByTestId("product-grid")).toHaveTextContent(
      productMock.title,
    )
  })

  it("filters products by search input", () => {
    ;(useProducts as any).mockReturnValue({
      products: [productMock],
      isFetching: false,
      error: null,
    })

    render(<Store />)

    const searchInput = screen.getByTestId("search-input")

    fireEvent.change(searchInput, { target: { value: "Essence" } })

    expect(screen.getByTestId("product-grid")).toHaveTextContent("Essence")
    fireEvent.change(searchInput, { target: { value: "Nonexistent" } })
    expect(screen.getByTestId("product-grid")).not.toHaveTextContent("Essence")
  })

  it("filters products by category", () => {
    ;(useProducts as any).mockReturnValue({
      products: [productMock],
      isFetching: false,
      error: null,
    })

    render(<Store />)

    const select = screen.getByTestId("category-select")
    fireEvent.change(select, { target: { value: productMock.category } })

    expect(screen.getByTestId("product-grid")).toHaveTextContent(
      productMock.title,
    )
  })
})
