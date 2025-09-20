import { screen } from "@testing-library/react"
import { render } from "../../test-utils/render"
import Cart from "./Cart"
import { useProducts } from "../../hooks/fetchProducts/fetchProducts"
import { useShoppingCart } from "../../context/ShoppingCartContext"
import labels from "../../assets/labels"
import { productMock } from "../../test-utils/productMock"
import type { Product } from "../../assets/types/Product"

vi.mock("../../hooks/fetchProducts/fetchProducts")
vi.mock("../../context/ShoppingCartContext", () => ({
  useShoppingCart: vi.fn(),
  ShoppingCartProvider: ({ children }: { children: React.ReactNode }) => (
    <>{children}</>
  ),
}))
vi.mock("../../components/MiniCart/CartItem/CartItem", () => ({
  default: ({ id }: { id: number }) => (
    <div data-testid="cart-item">CartItem-{id}</div>
  ),
}))

describe("Cart Component", () => {
  const mockUseProducts = useProducts as vi.Mock
  const mockUseShoppingCart = useShoppingCart as vi.Mock

  let products: Product[]

  beforeEach(() => {
    vi.clearAllMocks()
    products = [
      { ...productMock, id: 1, price: 100, title: "Test Product 1" },
      { ...productMock, id: 2, price: 200, title: "Test Product 2" },
    ]
  })

  it("renders loading state", () => {
    mockUseProducts.mockReturnValue({
      products: [],
      isFetching: true,
      error: null,
    })
    mockUseShoppingCart.mockReturnValue({ cartItems: [] })

    render(<Cart />)

    expect(screen.getByText(/Loading/i)).toBeInTheDocument()
  })

  it("renders empty cart state", () => {
    mockUseProducts.mockReturnValue({
      products,
      isFetching: false,
      error: null,
    })
    mockUseShoppingCart.mockReturnValue({ cartItems: [] })

    render(<Cart />)

    expect(screen.getByText(labels.CART_EMPTY)).toBeInTheDocument()
  })

  it("renders cart items and total", () => {
    const cartItems = [
      { id: 1, quantity: 2 },
      { id: 2, quantity: 1 },
    ]

    mockUseProducts.mockReturnValue({
      products,
      isFetching: false,
      error: null,
    })
    mockUseShoppingCart.mockReturnValue({ cartItems })

    render(<Cart />)

    expect(screen.getAllByTestId("cart-item")).toHaveLength(2)

    expect(screen.getByText(/400,00/)).toBeInTheDocument()

    expect(screen.getByText(labels.GO_TO_CHECKOUT)).toBeInTheDocument()
  })

  it("renders error state", () => {
    mockUseProducts.mockReturnValue({
      products: [],
      isFetching: false,
      error: "Something went wrong",
    })
    mockUseShoppingCart.mockReturnValue({ cartItems: [] })

    render(<Cart />)

    expect(
      screen.getByText((content) =>
        content.includes("Error: Something went wrong"),
      ),
    ).toBeInTheDocument()
  })
})
