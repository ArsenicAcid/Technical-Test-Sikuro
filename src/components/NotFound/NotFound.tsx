import { Box, Heading, Text, Button, Link } from "@chakra-ui/react"
import labels from "../../assets/labels"

function NotFound() {
  return (
    <Box textAlign="center" py={20}>
      <Heading as="h1" size="2xl" mb={4}>
        {labels.PAGENOTFOUND404}
      </Heading>
      <Text fontSize="lg" color="gray.600" mb={6}>
        {labels.PAGENOTFOUNDOHNO}
      </Text>
      <Link href="/store">
        <Button colorPalette="blue">{labels.GOHOME}</Button>
      </Link>
    </Box>
  )
}

export default NotFound
