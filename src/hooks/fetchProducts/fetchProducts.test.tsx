import { describe, it, expect, vi, beforeEach, afterEach } from "vitest"
import { renderHook, waitFor } from "@testing-library/react"
import { useProducts } from "./fetchProducts"
import type { Product } from "../../assets/types/Product"

const mockFetch = vi.fn()

beforeEach(() => {
  vi.stubGlobal("fetch", mockFetch)
})

afterEach(() => {
  vi.restoreAllMocks()
})

describe("useProducts", () => {
  it("should start with isFetching true", () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ products: [] }),
    })

    const { result } = renderHook(() => useProducts())

    expect(result.current.isFetching).toBe(true)
    expect(result.current.products).toEqual([])
    expect(result.current.error).toBeNull()
  })

  it("should fetch and set products successfully", async () => {
    const productsMock: Product[] = [
      {
        id: 1,
        title: "Test Product",
        description: "A test product",
        category: "test",
        price: 100,
        discountPercentage: 0,
        rating: 5,
        stock: 10,
        tags: [],
        brand: "",
        sku: "",
        weight: 0,
        dimensions: {
          width: 0,
          height: 0,
          depth: 0,
        },
        warrantyInformation: "",
        shippingInformation: "",
        availabilityStatus: "",
        reviews: [],
        returnPolicy: "",
        minimumOrderQuantity: 0,
        meta: {
          createdAt: "",
          updatedAt: "",
          barcode: "",
          qrCode: "",
        },
        images: [],
        thumbnail: "",
      },
    ]

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ products: productsMock }),
    })

    const { result } = renderHook(() => useProducts())

    await waitFor(() => expect(result.current.isFetching).toBe(false))

    expect(result.current.products).toEqual(productsMock)
    expect(result.current.error).toBeNull()
  })

  it("should handle fetch error", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      statusText: "Internal Server Error",
    })

    const { result } = renderHook(() => useProducts())

    await waitFor(() => expect(result.current.isFetching).toBe(false))

    expect(result.current.products).toEqual([])
    expect(result.current.error).toContain("Failed to fetch")
  })

  it("should handle thrown error", async () => {
    mockFetch.mockRejectedValueOnce(new Error("Network failure"))

    const { result } = renderHook(() => useProducts())

    await waitFor(() => expect(result.current.isFetching).toBe(false))

    expect(result.current.products).toEqual([])
    expect(result.current.error).toBe("Network failure")
  })
})
