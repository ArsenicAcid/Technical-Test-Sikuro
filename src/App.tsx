import { Routes, Route } from "react-router-dom"
import { Flex } from "@chakra-ui/react"
import Header from "./components/Header/Header"
import Home from "./pages/Home/Home"
import Store from "./pages/Store/Store"
import Cart from "./pages/Cart/Cart"
import { ShoppingCartProvider } from "./context/ShoppingCartContext"

function App() {
  return (
    <ShoppingCartProvider>
      <Header />
      <Flex mb="20" maxW={"1600px"} justify={"center"} mx={"auto"} px={8}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/store" element={<Store />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </Flex>
    </ShoppingCartProvider>
  )
}
export default App
