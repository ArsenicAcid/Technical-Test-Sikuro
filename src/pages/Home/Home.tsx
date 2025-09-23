import { Flex } from "@chakra-ui/react"
import DiscoverMore from "../../components/DiscoverMore/DiscoverMore"
import HeroBanner from "../../components/HeroBanner/HeroBanner"
import { useProducts } from "../../hooks/fetchProducts/fetchProducts"
import LoadingSpinner from "../../components/ui/spinner"

const Home = () => {
  const { products, isFetching, error } = useProducts()

  if (isFetching) return <LoadingSpinner />
  if (error) return <div>Error: {error}</div>
  return (
    <Flex w={"100%"} direction={"column"} gap={16} mb={8}>
      <HeroBanner />
      <DiscoverMore products={products.slice(0, 7)} />
    </Flex>
  )
}

export default Home
