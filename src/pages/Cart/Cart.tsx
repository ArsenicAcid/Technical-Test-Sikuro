import { Flex, Text, Button } from "@chakra-ui/react"
import { Divider } from "@chakra-ui/layout"
import { useShoppingCart } from "../../context/ShoppingCartContext"
import labels from "../../assets/labels"
import { useProducts } from "../../hooks/fetchProducts/fetchProducts"
import type { CartItem } from "../../assets/types/CartItem"
import { formatCurrency } from "../../utilities/formatCurrency/formatCurrency"
import CartItemComponent from "../../components/MiniCart/CartItem/CartItem"
import LoadingSpinner from "../../components/ui/spinner"

const Cart = () => {
  const { products, isFetching, error } = useProducts()
  const { cartItems } = useShoppingCart()
  if (error) return <div>Error: {error}</div>

  return (
    <Flex
      direction="column"
      mt={2}
      bg="white"
      shadow="lg"
      rounded="md"
      _dark={{ bg: "gray.800" }}
      w={"100%"}
    >
      {isFetching && <LoadingSpinner />}
      {cartItems.length === 0 ? (
        <Flex p={4} justify="center">
          <Text>{labels.CART_EMPTY}</Text>
        </Flex>
      ) : (
        <>
          {cartItems.map((item: CartItem) => (
            <CartItemComponent
              key={item.id}
              {...item}
              products={products}
              isMiniCart={false}
            />
          ))}
          <Divider />
          <Flex
            direction="column"
            p={3}
            gap={2}
            borderTop={"1px solid lightgray"}
          >
            <Flex direction="row" justify="space-between">
              <Text fontWeight="bold" fontSize="xl">
                {labels.CART_TOTAL}
              </Text>
              <Text fontSize="xl">
                {formatCurrency(
                  cartItems.reduce((total, cartItem) => {
                    const item = products.find((i) => i.id === cartItem.id)
                    return total + (item?.price || 0) * cartItem.quantity
                  }, 0),
                )}
              </Text>
            </Flex>
            <Button
              w="100%"
              as="a"
              variant={"solid"}
              colorPalette="green"
              fontSize={"lg"}
            >
              {labels.GO_TO_CHECKOUT}
            </Button>
          </Flex>
        </>
      )}
    </Flex>
  )
}

export default Cart
