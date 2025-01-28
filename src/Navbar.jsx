import { Menu, X, ShoppingCart } from 'lucide-react'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, NavLink } from 'react-router-dom'

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { user } = useSelector((state) => state.user)
  const cartItems = useSelector((state) => state.cart?.cart || [])
  const cartQuantity = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  )

  return (
    <header className="relative px-6 py-4 flex items-center justify-between bg-white shadow-md md:px-10">
      {/* Logo */}
      <Link className="text-2xl font-bold text-gray-800" to="/">
        Food Delivery<span className="text-blue-500">System</span>
      </Link>

      <div className="flex md:hidden items-center gap-4">
        {/* Cart Icon - Always Visible */}
        <Link
          to="/cart"
          className="relative flex items-center gap-2 px-3 py-2 rounded-md transition-all duration-200 text-gray-700 hover:bg-gray-100 hover:text-blue-500"
        >
          <span className="relative">
            <ShoppingCart className="w-6 h-6" />
            {cartQuantity > 0 && (
              <span className="absolute -top-2 -right-2 flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 rounded-full">
                {cartQuantity}
              </span>
            )}
          </span>
        </Link>

        {/* Hamburger Menu Button */}
        <button
          aria-label="Toggle navigation"
          aria-expanded={isMobileMenuOpen}
          onClick={() => setIsMobileMenuOpen((prev) => !prev)}
          className="text-gray-700 md:hidden focus:outline-none"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Navigation Links */}
      <nav
        className={`fixed inset-0 bg-white md:bg-transparent transform ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        } transition-transform duration-300 md:relative md:translate-x-0 md:inset-auto md:flex md:items-center md:w-auto z-50`}
      >
        {/* Close button for mobile */}
        <button
          onClick={() => setIsMobileMenuOpen(false)}
          className="absolute top-4 right-6 text-gray-700 md:hidden focus:outline-none"
          aria-label="Close menu"
        >
          <X size={24} />
        </button>

        <ul className="flex flex-col items-center justify-center h-full space-y-4 md:flex-row md:space-y-0 md:space-x-6">
          <NavItem to="/" setIsMobileMenuOpen={setIsMobileMenuOpen}>
            Home
          </NavItem>
          {!user ? (
            <>
              <NavItem to="/login" setIsMobileMenuOpen={setIsMobileMenuOpen}>
                Login
              </NavItem>
              <NavItem to="/register" setIsMobileMenuOpen={setIsMobileMenuOpen}>
                Register
              </NavItem>
            </>
          ) : null}
          <NavItem to="/menu" setIsMobileMenuOpen={setIsMobileMenuOpen}>
            Menu
          </NavItem>
          <Link
            to="/cart"
            className="relative items-center gap-2 px-3 py-2 rounded-md transition-all duration-200 text-gray-700 hover:bg-gray-100 hover:text-blue-500 hidden md:flex"
          >
            <span className="relative">
              <ShoppingCart className="w-6 h-6" />
              {cartQuantity > 0 && (
                <span className="absolute -top-2 -right-2 flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 rounded-full">
                  {cartQuantity}
                </span>
              )}
            </span>
          </Link>
        </ul>
      </nav>

      {/* Overlay for mobile menu */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </header>
  )
}

function NavItem({ children, to, setIsMobileMenuOpen }) {
  return (
    <li>
      <NavLink
        to={to}
        className={({ isActive }) =>
          `block text-lg px-6 py-2 rounded-md transition-all duration-200 ${
            isActive
              ? 'bg-blue-500 text-white'
              : 'text-gray-700 hover:bg-gray-100 hover:text-blue-500'
          }`
        }
        onClick={() => setIsMobileMenuOpen(false)}
      >
        {children}
      </NavLink>
    </li>
  )
}
