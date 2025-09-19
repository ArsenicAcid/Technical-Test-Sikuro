"use client"

import { Flex, Portal, Select, createListCollection } from "@chakra-ui/react"
import labels from "../../assets/labels"

type ProductSearchProps = {
  searchQuery: string
  setSearchQuery: (query: string) => void
  selectedCategory: string
  setSelectedCategory: (category: string) => void
  categories: string[]
}

const ProductSearch = ({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  categories,
}: ProductSearchProps) => {
  const categoryCollection = createListCollection({
    items: categories.map((cat) => ({
      label: cat,
      value: cat,
    })),
  })

  return (
    <Flex
      gap={4}
      direction={{ base: "column", md: "row" }}
      justify="center"
      alignItems={"flex-end"}
      my={4}
      wrap="nowrap"
    >
      <Select.Root
        collection={categoryCollection}
        width="30%"
        value={[selectedCategory]}
        onValueChange={(e) => setSelectedCategory(e.value[0])}
      >
        <Select.HiddenSelect />
        <Select.Label>{labels.FILTERBYCATEGORY}</Select.Label>
        <Select.Control>
          <Select.Trigger>
            <Select.ValueText placeholder="Select category" />
          </Select.Trigger>
          <Select.IndicatorGroup>
            <Select.Indicator />
          </Select.IndicatorGroup>
        </Select.Control>

        <Portal>
          <Select.Positioner>
            <Select.Content>
              {categoryCollection.items.map((item) => (
                <Select.Item
                  key={item.value}
                  item={item}
                  textTransform={"capitalize"}
                >
                  {item.label}
                  <Select.ItemIndicator />
                </Select.Item>
              ))}
            </Select.Content>
          </Select.Positioner>
        </Portal>
      </Select.Root>
      <input
        type="text"
        placeholder={labels.SEARCHPRODUCTSPLACEHOLDER}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        style={{
          border: "1px solid lightgray",
          borderRadius: "4px",
          padding: "6px",
          width: "70%",
          height: "40px",
        }}
      />
    </Flex>
  )
}

export default ProductSearch
