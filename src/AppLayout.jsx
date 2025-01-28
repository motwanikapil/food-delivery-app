import React from 'react'
import Navbar from './Navbar'
import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Toaster } from 'react-hot-toast'

export default function AppLayout() {
  const { theme } = useSelector((state) => state.theme)
  return (
    <main
      className={`${
        theme === 'dark' ? 'dark:bg-gray-950 dark:text-gray-100' : ''
      } min-h-screen`}
    >
      <Navbar />
      <Toaster />
      <Outlet />
    </main>
  )
}
