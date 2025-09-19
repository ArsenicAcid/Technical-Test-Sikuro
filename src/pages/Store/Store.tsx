import ProductCard from "../../components/ProductCard/ProductCard"
import { useProducts } from "../../hooks/fetchProducts/fetchProducts"
import { Grid } from "@chakra-ui/react"
import { useState } from "react"
import PageControl from "../../components/ui/page-control"

const ITEMS_PER_PAGE = 8

const Store = () => {
  const { products, isFetching, error } = useProducts()
  const [page, setPage] = useState(0)

  if (isFetching) return <h1>Loading...</h1>
  if (error) return <div>Error: {error}</div>

  const start = page * ITEMS_PER_PAGE
  const end = start + ITEMS_PER_PAGE
  const visibleProducts = products.slice(start, end)

  const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE)

  const handlePrev = () => setPage((prev) => Math.max(prev - 1, 0))
  const handleNext = () => setPage((prev) => Math.min(prev + 1, totalPages - 1))

  return (
    <>
      <Grid
        templateColumns={{
          xl: "repeat(4, 1fr)",
          lg: "repeat(3, 1fr)",
          md: "repeat(2, 1fr)",
          sm: "repeat(1, 1fr)",
        }}
        gap={6}
        py={8}
      >
        {visibleProducts.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </Grid>

      <PageControl {...{ page, totalPages, handlePrev, handleNext }} />
    </>
  )
}

export default Store
