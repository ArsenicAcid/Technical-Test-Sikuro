import { Box, Link, Flex, Stack } from "@chakra-ui/react"
import { ColorModeButton, useColorModeValue } from "../ui/color-mode"
import { ShoppingCartIconBlack, ShoppingCartIconWhite } from "../../styles/icons"

const Header = () => {
  return (
    <Flex
      px="4"
      py="2"
      bg={useColorModeValue("gray.100", "gray.700")}
      justifyContent={"space-between"}
      shadow={"sm"}
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
          Rushop
        </Link>
        <Link href="/">Home</Link>
        <Link href="/store">Store</Link>
      </Stack>
      <Flex gap="2" alignItems={"center"}>
        <ColorModeButton />
        <Box w="1.4rem" h="1.4rem">
        {useColorModeValue(<ShoppingCartIconBlack />, <ShoppingCartIconWhite />)}
        </Box>
      </Flex>
    </Flex>
  )
}

export default Header
