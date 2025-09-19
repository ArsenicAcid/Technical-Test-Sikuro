import { describe, it, expect } from "vitest"
import { screen } from "@testing-library/react"
import { render } from "../../test-utils/render"
import ProductGrid from "./ProductGrid"
import type { Product } from "../../assets/types/Product"

vi.mock("../../components/ProductCard/ProductCard", () => ({
  default: ({ title }: { title: string }) => (
    <div data-testid="product-card">{title}</div>
  ),
}))

const mockProducts: Product[] = [
  {
    id: 1,
    title: "Product 1",
    description: "Description 1",
    category: "Category 1",
    price: 100,
    discountPercentage: 10,
    rating: 4.5,
    stock: 10,
    tags: ["tag1"],
    brand: "Brand 1",
    sku: "SKU1",
    weight: 1,
    dimensions: { width: 10, height: 20, depth: 5 },
    warrantyInformation: "1 year",
    shippingInformation: "Ships in 3 days",
    availabilityStatus: "In stock",
    reviews: [
      {
        rating: 5,
        comment: "Great!",
        date: "2025-01-01",
        reviewerName: "Alice",
        reviewerEmail: "alice@example.com",
      },
    ],
    returnPolicy: "30 days",
    minimumOrderQuantity: 1,
    meta: {
      createdAt: "2025-01-01",
      updatedAt: "2025-01-01",
      barcode: "12345",
      qrCode: "67890",
    },
    images: ["image1.jpg"],
    thumbnail: "thumb1.jpg",
  },
  {
    id: 2,
    title: "Product 2",
    description: "Description 2",
    category: "Category 2",
    price: 200,
    discountPercentage: 5,
    rating: 4,
    stock: 5,
    tags: ["tag2"],
    brand: "Brand 2",
    sku: "SKU2",
    weight: 2,
    dimensions: { width: 15, height: 25, depth: 10 },
    warrantyInformation: "2 years",
    shippingInformation: "Ships in 5 days",
    availabilityStatus: "In stock",
    reviews: [
      {
        rating: 4,
        comment: "Good",
        date: "2025-01-02",
        reviewerName: "Bob",
        reviewerEmail: "bob@example.com",
      },
    ],
    returnPolicy: "14 days",
    minimumOrderQuantity: 1,
    meta: {
      createdAt: "2025-01-02",
      updatedAt: "2025-01-02",
      barcode: "54321",
      qrCode: "09876",
    },
    images: ["image2.jpg"],
    thumbnail: "thumb2.jpg",
  },
]

describe("ProductGrid", () => {
  it("renders without crashing", () => {
    render(<ProductGrid products={mockProducts} />)
    expect(screen.getAllByTestId("product-card").length).toBe(
      mockProducts.length,
    )
  })

  it("renders the correct product titles", () => {
    render(<ProductGrid products={mockProducts} />)
    mockProducts.forEach((product) => {
      expect(screen.getByText(product.title)).toBeInTheDocument()
    })
  })

  it("renders an empty grid if no products", () => {
    render(<ProductGrid products={[]} />)
    expect(screen.queryByTestId("product-card")).toBeNull()
  })
})
