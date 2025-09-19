import type { CartItem } from "./CartItem"
export type ShoppingCartContext = {
  openCart: () => void
  closeCart: () => void
  cartQuantity: number
  getItemQuantity: (id: number) => number
  increaseCartQuantity: (id: number) => void
  decreaseCartQuantity: (id: number) => void
  removeFromCart: (id: number) => void
  clearCart: () => void
  cartItems: CartItem[]
  isOpen: boolean
}
