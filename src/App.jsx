import React from 'react'
import axios from 'axios'
import { Provider } from 'react-redux'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import AppLayout from './AppLayout'
import Login from './components/Login'
import Register from './components/Register'
import Menu from './components/Menu'
import Cart from './components/Cart'
import Order from './components/Order'
import Home from './components/Home'
import store from './redux/store'

const queryClient = new QueryClient()

axios.defaults.headers.common['Authorization'] =
  localStorage.getItem('token') || null

axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<AppLayout />}>
              <Route index element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/menu" element={<Menu />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/order" element={<Order />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </QueryClientProvider>
  )
}
