import { Provider } from "../components/ui/provider"
import { ShoppingCartProvider } from "../context/ShoppingCartContext"
import { render as rtlRender } from "@testing-library/react"

export function render(ui: React.ReactNode) {
  return rtlRender(<>{ui}</>, {
    wrapper: (props: React.PropsWithChildren) => (
      <Provider>
        <ShoppingCartProvider>{props.children}</ShoppingCartProvider>
      </Provider>
    ),
  })
}
