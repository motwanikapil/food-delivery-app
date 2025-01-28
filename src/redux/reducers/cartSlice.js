import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  cart: JSON.parse(localStorage.getItem('cart')) || [],
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    add(state, action) {
      let flag = false
      state.cart = state.cart.map((item) => {
        if (item._id === action.payload._id) {
          flag = true
          return { ...item, quantity: item.quantity + 1 }
        } else {
          return item
        }
      })

      if (!flag) {
        state.cart.push({ ...action.payload, quantity: 1 })
      }

      localStorage.setItem('cart', JSON.stringify(state.cart))
    },
    remove(state, action) {
      state.cart = state.cart.map((menuItem) => {
        if (menuItem._id === action.payload._id) {
          return { ...menuItem, quantity: menuItem.quantity - 1 }
        }

        return menuItem
      })

      state.cart = state.cart.filter((menuItem) => menuItem.quantity > 0)

      localStorage.setItem('cart', JSON.stringify(state.cart))
    },
    update(state, action) {
      state.cart = state.cart.map((item) => {
        if (item._id === action.payload._id) {
          return { ...item, ...action.payload }
        } else {
          return item
        }
      })

      localStorage.setItem('cart', JSON.stringify(state.cart))
    },
    clear(state, _) {
      state.cart = []
      localStorage.setItem('cart', JSON.stringify(state.cart))
    },
  },
})

export const { add, remove, update, clear } = cartSlice.actions

export default cartSlice.reducer
