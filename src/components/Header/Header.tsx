import { Link, Flex, Stack, Button } from "@chakra-ui/react"
import { ColorModeButton, useColorModeValue } from "../ui/color-mode"
import {
  ShoppingCartIconBlack,
  ShoppingCartIconWhite,
} from "../../assets/styles/icons"
import { useShoppingCart } from "../../context/ShoppingCartContext"
import labels from "../../assets/labels"

const Header = () => {
  const { cartQuantity } = useShoppingCart()
  return (
    <Flex
      px="4"
      py="2"
      bg={useColorModeValue("gray.100", "gray.700")}
      justifyContent={"space-between"}
      shadow={"sm"}
      position={"sticky"}
      top="0"
      zIndex={"sticky"}
    >
      <Stack
        gap="4"
        direction={"row"}
        w={"100%"}
        justifyContent={"flex-start"}
        me={"auto"}
      >
        <Link
          textDecor={"none"}
          href="/"
          fontSize={"2xl"}
          fontWeight={"bold"}
          borderRight={"1px solid lightgray"}
          pr="4"
        >
          {labels.STORENAME}
        </Link>
        <Link href="/">{labels.HOME}</Link>
        <Link href="/store">{labels.STORE}</Link>
      </Stack>
      <Flex gap="2" alignItems={"center"}>
        <ColorModeButton variant={"ghost"} />
        <Button w="1.2rem" h="100%" variant={"ghost"}>
          {useColorModeValue(
            <ShoppingCartIconBlack />,
            <ShoppingCartIconWhite />,
          )}
          <Flex
            position={"absolute"}
            bg={"red.500"}
            hidden={cartQuantity === 0}
            w={"1rem"}
            h={"1rem"}
            borderRadius={"full"}
            bottom={"0"}
            left={"0"}
            translate={"20% -20%"}
            justifyContent={"center"}
            placeItems={"center"}
            fontSize={"xs"}
            color={"white"}
          >
            {cartQuantity}
          </Flex>
        </Button>
      </Flex>
    </Flex>
  )
}

export default Header
