/* eslint-disable @typescript-eslint/no-explicit-any */
import { screen, fireEvent } from "@testing-library/react"
import { render } from "../../../test-utils/render"
import CartItemComponent from "./CartItem"
import { useShoppingCart } from "../../../context/ShoppingCartContext"
import { vi } from "vitest"
import { productMock } from "../../../test-utils/productMock"

vi.mock("../../../context/ShoppingCartContext", () => ({
  useShoppingCart: vi.fn(),
  ShoppingCartProvider: ({ children }: { children: React.ReactNode }) => (
    <>{children}</>
  ),
}))
describe("CartItemComponent", () => {
  const removeFromCartMock = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
    ;(useShoppingCart as any).mockReturnValue({
      removeFromCart: removeFromCartMock,
    })
  })

  it("renders product title, price, and quantity", () => {
    render(
      <CartItemComponent
        id={1}
        quantity={2}
        products={[productMock]}
        isMiniCart={false}
      />,
    )

    expect(screen.getByText(productMock.title)).toBeInTheDocument()
    expect(screen.getByText(/9,99\s?€/)).toBeInTheDocument()
    expect(screen.getByText("x2")).toBeInTheDocument()
    expect(screen.getByRole("img")).toHaveAttribute(
      "src",
      productMock.thumbnail,
    )
  })

  it("calls removeFromCart when remove button is clicked", () => {
    render(
      <CartItemComponent
        id={1}
        quantity={1}
        products={[productMock]}
        isMiniCart={true}
      />,
    )
    const removeButton = screen.getByRole("button", { name: "✕" })

    fireEvent.click(removeButton)
    expect(removeFromCartMock).toHaveBeenCalledWith(1)
  })

  it("renders nothing if product is not found", () => {
    render(
      <CartItemComponent
        id={999}
        quantity={1}
        products={[productMock]}
        isMiniCart={false}
      />,
    )

    expect(screen.queryByText(productMock.title)).not.toBeInTheDocument()

    expect(screen.queryByRole("button", { name: "✕" })).not.toBeInTheDocument()
  })
})
