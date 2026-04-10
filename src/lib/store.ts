import { Store } from "@tanstack/react-store"
import { useStore } from "@tanstack/react-store"

// Define the shape of your state
export const navbarStore = new Store({
  isVisible: true,
})

// Helper functions (Actions)
export const hideNavbar = () => {
  navbarStore.setState((state) => ({
    ...state,
    isVisible: false,
  }))
}

export const showNavbar = () => {
  navbarStore.setState((state) => ({
    ...state,
    isVisible: true,
  }))
}
