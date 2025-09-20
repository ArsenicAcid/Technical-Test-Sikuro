import { Box, Button, Flex, Image, Text } from "@chakra-ui/react"
import { formatCurrency } from "../../../utilities/formatCurrency/formatCurrency"
import { useShoppingCart } from "../../../context/ShoppingCartContext"
import type { CartItem } from "../../../assets/types/CartItem"
import type { Product } from "../../../assets/types/Product"

type CartItemComponentProps = CartItem & {
  products: Product[]
}

const CartItemComponent = ({
  id,
  quantity,
  products,
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
        boxSize="3rem"
        objectFit="cover"
        rounded="md"
      />

      <Box flex="1" minW="0">
        <Text fontWeight="medium" fontSize="sm" truncate>
          {filteredItem.title}
        </Text>
        <Text fontSize="xs" color="gray.500" _dark={{ color: "gray.400" }}>
          {formatCurrency(filteredItem.price)}
        </Text>
      </Box>

      <Flex align="center" gap={2}>
        <Text fontWeight="bold" fontSize="sm">
          x{quantity}
        </Text>
        <Text fontSize="sm">
          {formatCurrency(quantity * filteredItem.price)}
        </Text>
        <Button
          size="xs"
          colorScheme="red"
          variant="outline"
          onClick={() => removeFromCart(id)}
        >
          ✕
        </Button>
      </Flex>
    </Flex>
  )
}

export default CartItemComponent
