import { Flex, Spinner, Text } from "@chakra-ui/react"
import labels from "../../assets/labels"

const LoadingSpinner = () => {
  return (
    <Flex
      w="100%"
      h="100vh"
      align="center"
      justify="center"
      direction="column"
      gap={4}
    >
      <Spinner color="blue.500" size="xl" />
      <Text fontSize="lg" fontWeight="medium">
        {labels.LOADING}
      </Text>
    </Flex>
  )
}

export default LoadingSpinner
