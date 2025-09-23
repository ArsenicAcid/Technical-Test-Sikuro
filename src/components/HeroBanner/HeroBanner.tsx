import { Flex, Heading, Text } from "@chakra-ui/react"
import labels from "../../assets/labels"
import { useColorModeValue } from "../../components/ui/color-mode"

const HeroBanner = () => {
  return (
    <Flex
      w={"100%"}
      minH={{ base: "200px", md: "300px" }}
      direction="column"
      align="center"
      justify="center"
      textAlign="center"
      color={useColorModeValue("gray.700", "gray.100")}
      borderBottom={"1px solid lightgray"}
    >
      <Heading fontSize={{ base: "3xl", md: "5xl" }} mb={4}>
        {labels.WELCOMETO}
        {labels.STORENAME}
        {labels.EXMARK}
      </Heading>
      <Text fontSize={{ base: "md", md: "lg" }} maxW="600px" mb={6}>
        {labels.HERODESCRIPTION}
      </Text>
    </Flex>
  )
}

export default HeroBanner
