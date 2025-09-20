import { Box, Flex, Text, Button } from "@chakra-ui/react"
import { Divider } from "@chakra-ui/layout"
import { useShoppingCart } from "../../context/ShoppingCartContext"
import labels from "../../assets/labels"
import { useProducts } from "../../hooks/fetchProducts/fetchProducts"
import CartItemComponent from "./CartItem/CartItem"
import type { CartItem } from "../../assets/types/CartItem"

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
            <CartItemComponent key={item.id} {...item} products={products} />
          ))}
          <Divider />
          <Box p={3}>
            <Button w="100%" colorScheme="blue" as="a" href="/cart">
              {labels.VIEW_CART}
            </Button>
          </Box>
        </>
      )}
    </Flex>
  )
}

export default MiniCart
