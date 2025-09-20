import { Box, Button, Flex, Image, Text } from "@chakra-ui/react"
import { formatCurrency } from "../../../utilities/formatCurrency/formatCurrency"
import { useShoppingCart } from "../../../context/ShoppingCartContext"
import type { CartItem } from "../../../assets/types/CartItem"
import type { Product } from "../../../assets/types/Product"
import labels from "../../../assets/labels"

type CartItemComponentProps = CartItem & {
  products: Product[]
  isMiniCart: boolean
}

const CartItemComponent = ({
  id,
  quantity,
  products,
  isMiniCart,
}: CartItemComponentProps) => {
  const { removeFromCart } = useShoppingCart()
  const filteredItem = products.find((product) => product.id === id)
  if (!filteredItem) {
    return null
  }
  return (
    <Flex
      key={id}
      align="center"
      justify="space-between"
      p={2}
      gap={3}
      _hover={{ bg: "gray.100", _dark: { bg: "gray.700" } }}
    >
      <Image
        src={filteredItem.thumbnail}
        alt={filteredItem.title}
        boxSize={isMiniCart ? "3rem" : "8rem"}
        objectFit="cover"
        rounded="md"
      />

      <Box flex="1" minW="0">
        <Text fontWeight="medium" fontSize={isMiniCart ? "sm" : "lg"} truncate>
          {filteredItem.title}
        </Text>
        <Text
          fontSize={isMiniCart ? "xs" : "md"}
          color="gray.500"
          _dark={{ color: "gray.400" }}
        >
          {formatCurrency(filteredItem.price)}
        </Text>
      </Box>

      <Flex align="center" gap={2}>
        <Text fontWeight="bold" fontSize={isMiniCart ? "sm" : "lg"}>
          x{quantity}
        </Text>
        <Text fontSize={isMiniCart ? "sm" : "lg"}>
          {formatCurrency(quantity * filteredItem.price)}
        </Text>
        <Button
          size={isMiniCart ? "xs" : "sm"}
          colorPalette="red"
          variant={isMiniCart ? "outline" : "solid"}
          onClick={() => removeFromCart(id)}
        >
          {isMiniCart ? "✕" : labels.REMOVE_FROM_CART}
        </Button>
      </Flex>
    </Flex>
  )
}

export default CartItemComponent
