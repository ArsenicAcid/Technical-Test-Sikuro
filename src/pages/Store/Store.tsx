import { useProducts } from "../../hooks/fetchProducts/fetchProducts"
import { useState } from "react"
import PageControl from "../../components/ui/page-control"
import LoadingSpinner from "../../components/ui/spinner"
import ProductGrid from "../../components/ProductGrid/ProductGrid"

const ITEMS_PER_PAGE = 8

const Store = () => {
  const { products, isFetching, error } = useProducts()
  const [page, setPage] = useState(0)

  if (isFetching) return <LoadingSpinner />
  if (error) return <div>Error: {error}</div>

  const start = page * ITEMS_PER_PAGE
  const end = start + ITEMS_PER_PAGE
  const visibleProducts = products.slice(start, end)

  const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE)

  const handlePrev = () => setPage((prev) => Math.max(prev - 1, 0))
  const handleNext = () => setPage((prev) => Math.min(prev + 1, totalPages - 1))

  return (
    <>
      <ProductGrid products={visibleProducts} />
      <PageControl {...{ page, totalPages, handlePrev, handleNext }} />
    </>
  )
}

export default Store
