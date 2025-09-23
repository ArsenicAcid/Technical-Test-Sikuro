import { useParams } from "react-router-dom"
import { useProducts } from "../../hooks/fetchProducts/fetchProducts"
import { Divider } from "@chakra-ui/layout"
import {
  Box,
  Heading,
  Text,
  Image,
  Stack,
  Flex,
  Badge,
  Button,
  Link,
} from "@chakra-ui/react"
import labels from "../../assets/labels"
import { useShoppingCart } from "../../context/ShoppingCartContext"
import LoadingSpinner from "../ui/spinner"

function ProductPage() {
  const { productId } = useParams<{ productId: string }>()
  const { products, isFetching, error } = useProducts()
  const { increaseCartQuantity, decreaseCartQuantity, getItemQuantity } =
    useShoppingCart()

  if (isFetching) {
    return (
      <Flex justify="center" align="center" minH="50vh">
        <LoadingSpinner />
      </Flex>
    )
  }

  if (error) return <div>Error: {error}</div>

  const product = products.find((p) => p.id === Number(productId))

  if (!product) {
    return (
      <Flex direction={"column"} gap={4} mt={8} align={"center"}>
        <Text fontSize={"l"}>{labels.PRODUCTNOTFOUND}</Text>
        <Link href="/store" w={"fit-content"}>
          <Button size={"lg"} colorPalette="blue">
            {labels.SHOPNOW}
          </Button>
        </Link>
      </Flex>
    )
  }

  const productQuantity = getItemQuantity(product.id)
  return (
    <Box maxW="1200px" mx="auto" p={8}>
      <Flex gap={10} direction={{ base: "column", md: "row" }}>
        <Box flex="1">
          <Image
            src={product.thumbnail}
            alt={product.title}
            borderRadius="lg"
            mb={4}
          />
          <Flex gap={2} wrap="wrap">
            {product.images.map((img, idx) => (
              <Image
                key={idx}
                src={img}
                alt={`${product.title} ${idx}`}
                boxSize="100px"
                objectFit="cover"
                borderRadius="md"
              />
            ))}
          </Flex>
        </Box>

        <Box flex="2">
          <Heading mb={2}>{product.title}</Heading>
          <Text fontSize="lg" color="gray.600" mb={4}>
            {product.brand} {labels.DIVIDERDOT} {product.category}
          </Text>
          <Text fontSize="2xl" fontWeight="bold" mb={4}>
            ${product.price}{" "}
            <Badge colorScheme="green" ml={2}>
              {labels.MINUS}
              {product.discountPercentage}
              {labels.PERCENT}
            </Badge>
          </Text>
          {productQuantity === 0 ? (
            <Button
              disabled={product.stock === 0}
              variant={"solid"}
              colorPalette="green"
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
          <Text my={6}>{product.description}</Text>

          <Divider mb={4} />

          <Stack gap={3}>
            <Text>
              <strong>{labels.RATING}</strong> {product.rating} {labels.STAR}
            </Text>
            <Text>
              <strong>{labels.STOCK}</strong> {product.stock}
            </Text>
            <Text>
              <strong>{labels.WEIGHT}</strong> {product.weight}
              {labels.G}
            </Text>
            <Text>
              <strong>{labels.DIMENSIONS}</strong> {product.dimensions.width}{" "}
              {labels.X} {product.dimensions.height} {labels.X}{" "}
              {product.dimensions.depth} {labels.CM}
            </Text>
            <Text>
              <strong>{labels.WARRANTY}</strong> {product.warrantyInformation}
            </Text>
            <Text>
              <strong>{labels.SHIPPING}</strong> {product.shippingInformation}
            </Text>
            <Text>
              <strong>{labels.AVAILABILITY}</strong>{" "}
              {product.availabilityStatus}
            </Text>
            <Text>
              <strong>{labels.RETURNPOLICY}</strong> {product.returnPolicy}
            </Text>
            <Text>
              <strong>{labels.MINIMUMORDER}</strong>{" "}
              {product.minimumOrderQuantity}
            </Text>
            <Flex wrap="wrap" gap={2}>
              {product.tags.map((tag, idx) => (
                <Badge key={idx} colorScheme="blue">
                  {tag}
                </Badge>
              ))}
            </Flex>
          </Stack>

          <Divider my={6} />

          <Box>
            <Heading size="md" mb={3}>
              {labels.REVIEWS}
            </Heading>
            <Stack gap={4}>
              {product.reviews.map((review, idx) => (
                <Box
                  key={idx}
                  p={4}
                  borderWidth="1px"
                  borderRadius="md"
                  shadow="sm"
                >
                  <Text fontWeight="bold">{review.reviewerName}</Text>
                  <Text fontSize="sm" color="gray.500">
                    {review.date.slice(0, 10)}
                  </Text>
                  <Text mt={2}>{review.comment}</Text>
                  <Text mt={1}>
                    {labels.RATING} {review.rating} {labels.STAR}
                  </Text>
                </Box>
              ))}
            </Stack>
          </Box>
        </Box>
      </Flex>
    </Box>
  )
}

export default ProductPage
