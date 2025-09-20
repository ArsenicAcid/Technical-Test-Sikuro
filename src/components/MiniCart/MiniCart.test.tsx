import { screen, fireEvent } from "@testing-library/react"
import { render } from "../../test-utils/render"
import MiniCart from "./MiniCart"
import { useShoppingCart } from "../../context/ShoppingCartContext"
import { useProducts } from "../../hooks/fetchProducts/fetchProducts"
import labels from "../../assets/labels"

vi.mock("../../context/ShoppingCartContext", () => ({
  useShoppingCart: vi.fn(),
  ShoppingCartProvider: ({ children }: { children: React.ReactNode }) => (
    <>{children}</>
  ),
}))

vi.mock("../../hooks/fetchProducts/fetchProducts", () => ({
  useProducts: vi.fn(),
}))

vi.mock("./CartItem/CartItem", () => ({
  default: ({ id }: { id: string }) => <div data-testid={`cart-item-${id}`} />,
}))

describe("MiniCart", () => {
  const setIsHovered = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it("renders error message if useProducts returns error", () => {
    ;(useProducts as any).mockReturnValue({
      products: [],
      isFetching: false,
      error: "Failed",
    })
    ;(useShoppingCart as any).mockReturnValue({ cartItems: [] })

    render(<MiniCart setIsHovered={setIsHovered} isHovered={true} />)

    expect(screen.getByText("Error: Failed")).toBeInTheDocument()
  })

  it("renders loading state when isFetching is true", () => {
    ;(useProducts as any).mockReturnValue({
      products: [],
      isFetching: true,
      error: null,
    })
    ;(useShoppingCart as any).mockReturnValue({ cartItems: [] })

    render(<MiniCart setIsHovered={setIsHovered} isHovered={true} />)

    expect(screen.getByText(labels.CARTLOADING)).toBeInTheDocument()
  })

  it("renders empty cart message when cartItems is empty", () => {
    ;(useProducts as any).mockReturnValue({
      products: [],
      isFetching: false,
      error: null,
    })
    ;(useShoppingCart as any).mockReturnValue({ cartItems: [] })

    render(<MiniCart setIsHovered={setIsHovered} isHovered={true} />)

    expect(screen.getByText(labels.CART_EMPTY)).toBeInTheDocument()
  })

  it("renders cart items when cartItems has items", () => {
    const cartItems = [
      { id: "1", name: "Item 1", quantity: 1, price: 10 },
      { id: "2", name: "Item 2", quantity: 2, price: 20 },
    ]
    ;(useProducts as any).mockReturnValue({
      products: [],
      isFetching: false,
      error: null,
    })
    ;(useShoppingCart as any).mockReturnValue({ cartItems })

    render(<MiniCart setIsHovered={setIsHovered} isHovered={true} />)

    expect(screen.getByTestId("cart-item-1")).toBeInTheDocument()
    expect(screen.getByTestId("cart-item-2")).toBeInTheDocument()
    expect(screen.getByText(labels.VIEW_CART)).toBeInTheDocument()
  })

  it("calls setIsHovered(false) when close button is clicked", () => {
    ;(useProducts as any).mockReturnValue({
      products: [],
      isFetching: false,
      error: null,
    })
    ;(useShoppingCart as any).mockReturnValue({ cartItems: [] })

    render(<MiniCart setIsHovered={setIsHovered} isHovered={true} />)
    fireEvent.click(screen.getByText("✕"))

    expect(setIsHovered).toHaveBeenCalledWith(false)
  })
})
