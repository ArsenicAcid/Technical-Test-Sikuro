import { Flex, Text, Button, Link } from "@chakra-ui/react"
import type { Product } from "../../assets/types/Product"
import ProductCard from "../ProductCard/ProductCard"
import { useColorModeValue } from "../ui/color-mode"
import labels from "../../assets/labels"

type DiscoverMoreProps = {
  products: Product[]
}
const isMobile = window.innerWidth < 768

const DiscoverMore = ({ products }: DiscoverMoreProps) => {
  return (
    <Flex
      position="relative"
      w="100%"
      direction={{ base: "column-reverse", md: "row" }}
      gap={4}
    >
      {!isMobile && (
        <Flex
          gap={4}
          overflowX="auto"
          py={4}
          w="100%"
          pr={{ base: 2, md: 322 }}
          pl={2}
        >
          {products.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </Flex>
      )}
      <Flex
        position={{ base: "relative", md: "absolute" }}
        right={0}
        top={4}
        h={{ base: "auto", md: "490px" }}
        w={{ base: "100%", md: "20%" }}
        p={4}
        flexDirection="column"
        justifyContent="space-between"
        backdropFilter="blur(5px)"
        bg={useColorModeValue("rgba(255, 255, 255, 0.5)", "rgba(0, 0, 0, 0.5)")}
        zIndex={2}
        shadow={"sm"}
        borderRadius={"md"}
      >
        <Text fontSize="lg" fontWeight="bold">
          {labels.DISCOVERMORETEXT}
        </Text>

        {isMobile && (
          <Flex
            gap={4}
            overflowX="auto"
            py={4}
            w="100%"
            pr={{ base: 2, md: 322 }}
            pl={2}
          >
            {products.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </Flex>
        )}
        <Link color="white" href="/store" mt={4}>
          <Button
            as="a"
            colorPalette="blue"
            alignSelf="flex-start"
            w="100%"
            size={"2xl"}
          >
            {labels.DISCOVERMORE}
          </Button>
        </Link>
      </Flex>
    </Flex>
  )
}

export default DiscoverMore
