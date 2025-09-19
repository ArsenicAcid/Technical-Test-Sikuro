import { useProducts } from "../../hooks/fetchProducts/fetchProducts"
import { useState, useMemo, useEffect } from "react"
import PageControl from "../../components/ui/page-control"
import LoadingSpinner from "../../components/ui/spinner"
import ProductGrid from "../../components/ProductGrid/ProductGrid"
import ProductSearch from "../../components/ui/product-search"
import { Flex } from "@chakra-ui/react"

const ITEMS_PER_PAGE = 8

const Store = () => {
  const { products, isFetching, error } = useProducts()
  const [page, setPage] = useState(0)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")

  useEffect(() => {
    setPage(0)
  }, [searchQuery, selectedCategory])

  const categories = useMemo(() => {
    if (!products) return []
    const unique = Array.from(new Set(products.map((p) => p.category)))
    return ["All", ...unique]
  }, [products])

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const query = searchQuery.toLowerCase()

      const matchesSearch =
        product.title.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query)

      const matchesCategory =
        selectedCategory === "All" || product.category === selectedCategory

      return matchesSearch && matchesCategory
    })
  }, [products, searchQuery, selectedCategory])

  const start = page * ITEMS_PER_PAGE
  const end = start + ITEMS_PER_PAGE
  const visibleProducts = filteredProducts.slice(start, end)
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE)

  const handlePrev = () => setPage((prev) => Math.max(prev - 1, 0))
  const handleNext = () => setPage((prev) => Math.min(prev + 1, totalPages - 1))

  if (isFetching) return <LoadingSpinner />
  if (error) return <div>Error: {error}</div>

  return (
    <Flex direction={"column"}>
      <ProductSearch
        {...{
          searchQuery,
          setSearchQuery,
          selectedCategory,
          setSelectedCategory,
          categories,
        }}
      />

      <ProductGrid products={visibleProducts} />

      {totalPages > 1 && (
        <PageControl {...{ page, totalPages, handlePrev, handleNext }} />
      )}
    </Flex>
  )
}

export default Store
