import { describe, it, expect } from "vitest"
import { screen } from "@testing-library/react"
import { render } from "../../test-utils/render"
import ProductCard from "./ProductCard"
import type { Product } from "../../assets/types/Product"

describe("ProductCard", () => {
  const mockProduct: Product = {
    id: 1,
    title: "Essence Mascara Lash Princess",
    description:
      "A popular mascara known for volumizing and lengthening effects.",
    category: "beauty",
    price: 9.99,
    discountPercentage: 10.48,
    rating: 2.56,
    stock: 99,
    tags: ["beauty", "mascara"],
    brand: "Essence",
    sku: "BEA-ESS-ESS-001",
    weight: 4,
    dimensions: { width: 15.14, height: 13.08, depth: 22.99 },
    warrantyInformation: "1 week warranty",
    shippingInformation: "Ships in 3-5 business days",
    availabilityStatus: "In Stock",
    reviews: [],
    returnPolicy: "No return policy",
    minimumOrderQuantity: 48,
    meta: {
      createdAt: "2025-04-30T09:41:02.053Z",
      updatedAt: "2025-04-30T09:41:02.053Z",
      barcode: "5784719087687",
      qrCode: "https://dummy.com/qrcode.png",
    },
    images: [
      "https://cdn.dummyjson.com/product-images/beauty/essence-mascara.webp",
    ],
    thumbnail:
      "https://cdn.dummyjson.com/product-images/beauty/essence-mascara-thumb.webp",
  }

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
