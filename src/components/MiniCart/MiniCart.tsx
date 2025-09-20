import { Flex, Text, Button } from "@chakra-ui/react"
import { Divider } from "@chakra-ui/layout"
import { useShoppingCart } from "../../context/ShoppingCartContext"
import labels from "../../assets/labels"
import { useProducts } from "../../hooks/fetchProducts/fetchProducts"
import CartItemComponent from "./CartItem/CartItem"
import type { CartItem } from "../../assets/types/CartItem"
import { formatCurrency } from "../../utilities/formatCurrency/formatCurrency"

type MiniCartProps = {
  setIsHovered: (isHovered: boolean) => void
  isHovered: boolean
}

const MiniCart = ({ setIsHovered, isHovered }: MiniCartProps) => {
  const { products, isFetching, error } = useProducts()
  const { cartItems } = useShoppingCart()
  if (error) return <div>Error: {error}</div>

  return (
    <Flex
      direction="column"
      hidden={!isHovered}
      position="absolute"
      top="100%"
      right="4"
      mt={2}
      w="20rem"
      bg="white"
      shadow="lg"
      rounded="md"
      zIndex="popover"
      _dark={{ bg: "gray.800" }}
      maxH="80vh"
      overflowY="auto"
    >
      <Flex
        direction={"row"}
        w={"100%"}
        justify={"space-between"}
        p={1}
        borderBottom={"1px solid lightgray"}
      >
        <Flex align="center" pl={2}>
          <Text>{labels.YOURCART}</Text>
        </Flex>
        <Button
          alignSelf="flex-end"
          width="fit-content"
          onClick={() => setIsHovered(false)}
        >
          ✕
        </Button>
      </Flex>
      {isFetching && (
        <Text p={4} fontSize={"md"}>
          {labels.CARTLOADING}
        </Text>
      )}
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
              isMiniCart={true}
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
              <Text fontWeight="bold" fontSize="md">
                {labels.CART_TOTAL}
              </Text>
              <Text fontSize="md">
                {formatCurrency(
                  cartItems.reduce((total, cartItem) => {
                    const item = products.find((i) => i.id === cartItem.id)
                    return total + (item?.price || 0) * cartItem.quantity
                  }, 0),
                )}
              </Text>
            </Flex>
            <Button w="100%" colorScheme="blue" as="a" href="/cart">
              {labels.VIEW_CART}
            </Button>
          </Flex>
        </>
      )}
    </Flex>
  )
}

export default MiniCart
