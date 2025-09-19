import { Flex, Button } from "@chakra-ui/react"
import { FaArrowLeft, FaArrowRight } from "react-icons/fa"
import { useColorModeValue } from "./color-mode"
import labels from "../../assets/labels"

type PageControlProps = {
  page: number
  totalPages: number
  handlePrev: () => void
  handleNext: () => void
}

const PageControl: React.FC<PageControlProps> = ({
  page,
  totalPages,
  handlePrev,
  handleNext,
}) => {
  return (
    <Flex w={"100%"} justify="center" position="fixed" bottom="3" left={0}>
      <Flex
        align="center"
        gap={4}
        p={2}
        shadow={"sm"}
        background={useColorModeValue(
          "rgba(237, 242, 247, 0.2)",
          "rgba(45, 55, 72, 0.2)",
        )}
        backdropFilter="blur(1px)"
      >
        <Button
          aria-label="Previous page"
          onClick={handlePrev}
          disabled={page === 0}
          variant={"ghost"}
        >
          <FaArrowLeft />
        </Button>
        <span>
          {labels.PAGE} {page + 1} {labels.OF} {totalPages}
        </span>
        <Button
          aria-label="Next page"
          onClick={handleNext}
          disabled={page === totalPages - 1}
          variant={"ghost"}
        >
          <FaArrowRight />
        </Button>
      </Flex>
    </Flex>
  )
}

export default PageControl
