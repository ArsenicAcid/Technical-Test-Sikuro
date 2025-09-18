import { Box, Link, Flex } from "@chakra-ui/react"
import { ColorModeButton, useColorModeValue } from "../ui/color-mode"

const Header = () => {
  return (
    <Flex
      px="4"
      py="2"
      bg={useColorModeValue("gray.100", "gray.700")}
      justifyContent={"space-between"}
      shadow={"sm"}
    >
      <Flex gap="4" w={"100%"} justifyContent={"flex-start"}>
        <Link href="/">Home</Link>
        <Link href="/store">Store</Link>
        <Link href="/cart">Cart</Link>
      </Flex>
      <Box css={{ justifySelf: "flex-end" }}>
        <ColorModeButton />
      </Box>
    </Flex>
  )
}

export default Header
