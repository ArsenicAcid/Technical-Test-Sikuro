import { describe, it, expect } from "vitest"
import { screen } from "@testing-library/react"
import { render } from "../../test-utils/render"
import { productMock } from "../../test-utils/productMock"
import ProductCard from "./ProductCard"
import type { Product } from "../../assets/types/Product"

describe("ProductCard", () => {
  const mockProduct: Product = productMock
  it("renders product title, description, and price", () => {
    render(<ProductCard {...mockProduct} />)

    expect(
      screen.getByRole("heading", { name: /Essence Mascara Lash Princess/i }),
    ).toBeInTheDocument()

    expect(
      screen.getByText(
        /A popular mascara known for volumizing and lengthening effects/i,
      ),
    ).toBeInTheDocument()

    expect(screen.getByText(/9.99/)).toBeInTheDocument()
  })

  it("renders product thumbnail image", () => {
    render(<ProductCard {...mockProduct} />)

    const image = screen.getByRole("img", {
      name: /Essence Mascara Lash Princess/i,
    })
    expect(image).toBeInTheDocument()
    expect(image).toHaveAttribute("src", mockProduct.thumbnail)
  })
})
