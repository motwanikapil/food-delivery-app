import { configureStore } from '@reduxjs/toolkit'
import themeSlice from './reducers/themeSlice'
import userSlice from './reducers/userSlice'
import cartSlice from './reducers/cartSlice'

const store = configureStore({
  reducer: {
    theme: themeSlice,
    user: userSlice,
    cart: cartSlice,
  },
})

export default store
