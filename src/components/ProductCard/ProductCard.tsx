import type { Product } from "../../assets/types/Product"
import { Image, Text, Flex, Button } from "@chakra-ui/react"
import { formatCurrency } from "../../utilities/formatCurrency/formatCurrency.ts"
import { useShoppingCart } from "../../context/ShoppingCartContext.tsx"
import labels from "../../assets/labels.ts"

const ProductCard = (product: Product) => {
  const { increaseCartQuantity, decreaseCartQuantity, getItemQuantity } =
    useShoppingCart()
  const productQuantity = getItemQuantity(product.id)
  return (
    <Flex
      key={product.id}
      gap={4}
      p={4}
      shadow={"sm"}
      direction={"column"}
      minH={"490px"}
    >
      <Image
        src={product.thumbnail}
        alt={product.title}
        objectFit={"cover"}
        w={"100%"}
        borderBottom={"1px solid lightgray"}
      />
      <Flex
        direction="column"
        minH={"160px"}
        h={"100%"}
        justify={"space-between"}
        gap={8}
      >
        <Flex direction={"column"}>
          <Text as={"h2"} fontWeight={"bold"} fontSize={"xl"}>
            {product.title}
          </Text>
          <Text fontSize={"sm"} lineClamp={4}>
            {product.description}
          </Text>
        </Flex>
        <Flex
          direction={"row"}
          justify={"space-between"}
          alignItems={"center"}
          gap={4}
        >
          <Text>{formatCurrency(product.price)}</Text>
          {productQuantity === 0 ? (
            <Button
              disabled={product.stock === 0}
              variant={"outline"}
              color={"blue.500"}
              size={"lg"}
              onClick={() => increaseCartQuantity(product.id)}
            >
              {labels.ADDTOCART}
            </Button>
          ) : (
            <Flex direction={"row"} gap={2} alignItems={"center"}>
              <Button
                variant={"outline"}
                color={"blue.500"}
                size={"lg"}
                onClick={() => decreaseCartQuantity(product.id)}
              >
                {labels.MINUS}
              </Button>
              <Flex minW={"20px"} justifyContent={"center"}>
                {productQuantity}
              </Flex>
              <Button
                variant={"outline"}
                color={"blue.500"}
                size={"lg"}
                onClick={() => increaseCartQuantity(product.id)}
              >
                {labels.PLUS}
              </Button>
            </Flex>
          )}
        </Flex>
      </Flex>
    </Flex>
  )
}

export default ProductCard
