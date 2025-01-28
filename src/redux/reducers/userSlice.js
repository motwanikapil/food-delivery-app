import { createSlice } from '@reduxjs/toolkit'
import { jwtDecode } from 'jwt-decode'
import { redirect } from 'react-router-dom'

const token = localStorage.getItem('token') || null

let initialState

try {
  initialState = {
    user: token ? jwtDecode(token) : null,
  }
} catch (error) {
  console.error(error)
  localStorage.removeItem('token')
  initialState = {
    user: null,
  }
} finally {
  redirect('/')
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login(state, action) {
      // pass the jwt token to add the user to the redux store
      state.user = jwtDecode(action.payload)
      localStorage.setItem('token', action.payload)
    },
    logout(state) {
      state.user = null
      localStorage.removeItem('token')
    },
  },
})

export const { login, logout } = userSlice.actions

export default userSlice.reducer
