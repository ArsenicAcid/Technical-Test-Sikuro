import { createContext, useContext, useState } from "react"
import type { ReactNode } from "react"
import type { ShoppingCartContext } from "../assets/types/ShoppingCartContext"
import type { CartItem } from "../assets/types/CartItem"

type ShoppingCartProviderProps = {
  children: ReactNode
}

const ShoppingCartContext = createContext({} as ShoppingCartContext)

export function useShoppingCart() {
  return useContext(ShoppingCartContext)
}

export function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [isOpen, setIsOpen] = useState(false)

  const cartQuantity = cartItems.reduce(
    (quantity, item) => item.quantity + quantity,
    0,
  )
  function openCart() {
    setIsOpen(true)
  }
  function closeCart() {
    setIsOpen(false)
  }
  function getItemQuantity(id: number) {
    return cartItems.find((item) => item.id === id)?.quantity ?? 0
  }
  function increaseCartQuantity(id: number) {
    setCartItems((currentItems) => {
      if (currentItems.find((item) => item.id === id) == null) {
        return [...currentItems, { id, quantity: 1 }]
      } else {
        return currentItems.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity + 1 }
          } else {
            return item
          }
        })
      }
    })
  }
  function decreaseCartQuantity(id: number) {
    setCartItems((currentItems) => {
      if (currentItems.find((item) => item.id === id)?.quantity === 1) {
        return currentItems.filter((item) => item.id !== id)
      } else {
        return currentItems.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity - 1 }
          } else {
            return item
          }
        })
      }
    })
  }
  function removeFromCart(id: number) {
    setCartItems((currentItems) =>
      currentItems.filter((item) => item.id !== id),
    )
  }
  function clearCart() {
    setCartItems([])
  }
  return (
    <ShoppingCartContext.Provider
      value={{
        cartQuantity,
        getItemQuantity,
        increaseCartQuantity,
        decreaseCartQuantity,
        removeFromCart,
        openCart,
        closeCart,
        clearCart,
        cartItems,
        isOpen,
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  )
}
