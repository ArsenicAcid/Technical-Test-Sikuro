import type { Product } from "../assets/types/Product"
import { useEffect, useState } from "react"

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [isFetching, setIsFetching] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let isMounted = true

    const fetchProducts = async () => {
      setIsFetching(true)
      try {
        const res = await fetch("https://dummyjson.com/products")
        if (!res.ok) throw new Error(`Failed to fetch: ${res.statusText}`)
        const data = await res.json()
        if (isMounted) {
          setProducts(data.products as Product[])
        }
      } catch (err: unknown) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : "Unknown error")
        }
      } finally {
        if (isMounted) setIsFetching(false)
      }
    }

    fetchProducts()

    return () => {
      isMounted = false
    }
  }, [])

  return { products, isFetching, error }
}
