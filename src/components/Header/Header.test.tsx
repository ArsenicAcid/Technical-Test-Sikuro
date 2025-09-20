import { render } from "../../test-utils/render"
import { screen, fireEvent } from "@testing-library/react"
import { describe, it, vi, expect } from "vitest"
import Header from "./Header"

vi.mock("../../../context/ShoppingCartContext", async () => {
  const actual = await vi.importActual("../../../context/ShoppingCartContext")
  return {
    ...actual,
    useShoppingCart: vi.fn(),
  }
})

vi.mock("../MiniCart/MiniCart", () => ({
  default: ({ isHovered }: { isHovered: boolean }) => (
    <div>MiniCart {isHovered ? "visible" : ""}</div>
  ),
}))

vi.mock("../../../assets/labels", () => ({
  STORENAME: "Test Store",
  HOME: "Home",
  STORE: "Store",
}))

describe("Header Component", () => {
  it("shows cart quantity badge when cartQuantity > 0", () => {
    vi.mock("../../../context/ShoppingCartContext", async () => {
      const actual = await vi.importActual(
        "../../../context/ShoppingCartContext",
      )
      return {
        ...actual,
        useShoppingCart: vi.fn(),
      }
    })
    render(<Header />)

    const badge = screen.getByTestId("cart-quantity-badge")
    expect(badge).not.toHaveAttribute("display", "none")
  })

  it("shows MiniCart on hover", () => {
    vi.mock("../../../context/ShoppingCartContext", async () => {
      const actual = await vi.importActual(
        "../../../context/ShoppingCartContext",
      )
      return {
        ...actual,
        useShoppingCart: vi.fn(),
      }
    })
    render(<Header />)

    const button = screen.getByTestId("cart-button")
    fireEvent.mouseEnter(button)

    expect(screen.getByText("MiniCart visible")).toBeInTheDocument()
  })
})
