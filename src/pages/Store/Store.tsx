import ProductCard from "../../components/ProductCard/ProductCard"
import { useProducts } from "../../hooks/fetchProducts/fetchProducts"
import { Grid } from "@chakra-ui/react"

const Store = () => {
  const { products, isFetching, error } = useProducts()
  if (isFetching) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>
  return (
    <Grid
      templateColumns={{
        lg: "repeat(3, 1fr)",
        md: "repeat(2, 1fr)",
        sm: "repeat(1, 1fr)",
      }}
      gap={6}
      p={8}
    >
      {products.map((product) => (
        <ProductCard key={product.id} {...product} />
      ))}
    </Grid>
  )
}

export default Store
