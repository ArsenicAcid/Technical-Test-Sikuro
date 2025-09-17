import { Routes, Route } from "react-router-dom"
import { Provider } from "./components/ui/provider"
import { Box } from "@chakra-ui/react"
import { Home } from "./pages/Home"
import { Store } from "./pages/Store"


function App() {
return (
  <Provider>
    <Box mb="10">
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/store" element={<Store />} />
        </Routes>
    </Box>
  </Provider>
  )
}
export default App
