import type { Product } from "../../assets/types/Product"
import { Image, Text, Flex } from "@chakra-ui/react"
import { formatCurrency } from "../../utilities/formatCurrency/formatCurrency.ts"

const ProductCard = (product: Product) => {
  return (
    <Flex key={product.id} gap={4} p={4} shadow={"sm"} direction={"column"}>
      <Image
        src={product.thumbnail}
        alt={product.title}
        objectFit={"cover"}
        w={"100%"}
        borderBottom={"1px solid lightgray"}
      />
      <Flex direction="column" minH={"160px"} justify={"space-between"} gap={2}>
        <Flex direction={"column"}>
          <Text as={"h2"} fontWeight={"bold"} fontSize={"xl"}>
            {product.title}
          </Text>
          <Text fontSize={"sm"} lineClamp={4}>
            {product.description}
          </Text>
        </Flex>
        <Flex>
          <Text>{formatCurrency(product.price)}</Text>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default ProductCard
