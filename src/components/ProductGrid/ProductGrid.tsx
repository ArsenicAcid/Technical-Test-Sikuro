import { Grid } from "@chakra-ui/react"
import ProductCard from "../../components/ProductCard/ProductCard"
import type { Product } from "../../assets/types/Product"

type ProductGridProps = {
  products: Product[]
}

const ProductGrid = ({ products }: ProductGridProps) => {
  return (
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
      {products.map((product) => (
        <ProductCard key={product.id} {...product} />
      ))}
    </Grid>
  )
}

export default ProductGrid
