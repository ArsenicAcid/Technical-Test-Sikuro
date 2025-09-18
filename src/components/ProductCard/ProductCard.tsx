import type { Product } from "../../assets/types/Product"
import { Image, Text, Flex } from "@chakra-ui/react"
import { formatCurrency } from "../../utilities/formatCurrency/formatCurrency.ts"

const ProductCard = (product: Product) => {
  return (
    <Flex
      key={product.id}
      p={4}
      borderWidth="1px"
      borderRadius="md"
      direction={"column"}
    >
      <Image
        src={product.thumbnail}
        alt={product.title}
        maxH={"200px"}
        objectFit={"cover"}
        maxW={"200px"}
      />
      <Text as={"h2"} fontWeight={"bold"} fontSize={"xl"}>
        {product.title}
      </Text>
      <Text>{product.description}</Text>
      <Text>{formatCurrency(product.price)}</Text>
    </Flex>
  )
}

export default ProductCard
