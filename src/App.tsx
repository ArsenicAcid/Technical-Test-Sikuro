import { Routes, Route } from "react-router-dom"
import { Box } from "@chakra-ui/react"
import Header from "./components/Header"
import Home from "./pages/Home"
import Store from "./pages/Store"
import Cart from "./pages/Cart"


function App() {
  return (
    <>
      <Header />
      <Box mb="10">
          <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/store" element={<Store />} />
              <Route path="/cart" element={<Cart />} />
          </Routes>
      </Box>
    </>
    )
  }
export default App
