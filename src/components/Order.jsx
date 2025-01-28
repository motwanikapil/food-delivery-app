import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { remove, update, clear } from '../redux/reducers/cartSlice'
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import axios from 'axios'
import Loader from './Loader'

export default function Order() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { cart } = useSelector((state) => state.cart)
  const { user } = useSelector((state) => state.user)
  const [loading, setLoading] = useState(false)

  const items = []

  const totalPrice = cart.reduce((total, item) => {
    items.push({ menuItem: item._id, quantity: item.quantity })
    return total + item.quantity * item.price
  }, 0)

  const handleQuantityChange = (e, cartItem) => {
    const newQuantity = Math.max(0, parseInt(e.target.value) || 0)
    if (newQuantity === 0) {
      dispatch(remove(cartItem))
    } else {
      dispatch(update({ ...cartItem, quantity: newQuantity }))
    }
  }

  const handleCheckout = async () => {
    if (!user) {
      navigate('/login')
    }

    try {
      setLoading(true)
      let res = await axios.post('/order', {
        userId: user.userId,
        items,
      })
      setLoading(false)

      toast.success('Order placed successfully!', {
        style: {
          background: '#28a745',
          color: '#fff',
          fontWeight: 'bold',
        },
        duration: 3000,
        className: 'toast-notification',
      })

      dispatch(clear())
      navigate('/')
    } catch (error) {
      console.error(error)
      setLoading(false)
    }
  }

  return loading ? (
    <Loader />
  ) : (
    <section className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">
        Order Summary
      </h1>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        {cart.length === 0 ? (
          <div className="p-6 text-center">
            <p className="text-gray-700 text-lg">
              Your cart is empty!{' '}
              <Link to="/menu" className="text-blue-500 hover:underline">
                Browse Menu
              </Link>
            </p>
          </div>
        ) : (
          <>
            {/* Mobile View */}
            <div className="block md:hidden">
              {cart.map((item) => (
                <div
                  key={item._id}
                  className="p-4 border-b border-gray-200 last:border-b-0"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-gray-800">{item.name}</h3>
                    <button
                      className="text-red-500 text-sm"
                      onClick={() => dispatch(remove(item))}
                    >
                      Remove
                    </button>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600">
                      Price: ${item.price.toFixed(2)}
                    </span>
                    <div className="flex items-center space-x-2">
                      <button
                        className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-md hover:bg-gray-300"
                        onClick={() =>
                          handleQuantityChange(
                            { target: { value: item.quantity - 1 } },
                            item
                          )
                        }
                      >
                        -
                      </button>
                      <input
                        type="number"
                        value={item.quantity}
                        className="w-12 h-8 text-center border border-gray-300 rounded-md"
                        onChange={(e) => handleQuantityChange(e, item)}
                      />
                      <button
                        className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-md hover:bg-gray-300"
                        onClick={() =>
                          handleQuantityChange(
                            { target: { value: item.quantity + 1 } },
                            item
                          )
                        }
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="text-right font-medium text-gray-800">
                    Subtotal: ${(item.quantity * item.price).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop View */}
            <div className="hidden md:block">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-100 text-gray-700">
                    <th className="py-3 px-6">Item</th>
                    <th className="py-3 px-6">Price</th>
                    <th className="py-3 px-6">Quantity</th>
                    <th className="py-3 px-6">Subtotal</th>
                    <th className="py-3 px-6"></th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map((item) => (
                    <tr
                      key={item._id}
                      className="border-t border-gray-200 hover:bg-gray-50"
                    >
                      <td className="py-3 px-6">
                        <div className="flex items-center">
                          <p className="text-gray-800 font-semibold">
                            {item.name}
                          </p>
                        </div>
                      </td>
                      <td className="py-3 px-6">${item.price.toFixed(2)}</td>
                      <td className="py-3 px-6">
                        <div className="flex items-center space-x-2">
                          <button
                            className="px-2 py-1 bg-gray-200 rounded-md hover:bg-gray-300"
                            onClick={() =>
                              handleQuantityChange(
                                { target: { value: item.quantity - 1 } },
                                item
                              )
                            }
                          >
                            -
                          </button>
                          <input
                            type="number"
                            value={item.quantity}
                            className="w-12 text-center border border-gray-300 rounded-md"
                            onChange={(e) => handleQuantityChange(e, item)}
                          />
                          <button
                            className="px-2 py-1 bg-gray-200 rounded-md hover:bg-gray-300"
                            onClick={() =>
                              handleQuantityChange(
                                { target: { value: item.quantity + 1 } },
                                item
                              )
                            }
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td className="py-3 px-6">
                        ${(item.quantity * item.price).toFixed(2)}
                      </td>
                      <td className="py-3 px-6 text-right">
                        <button
                          className="text-red-500 hover:underline"
                          onClick={() => dispatch(remove(item))}
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Total Price */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 p-6 bg-gray-100">
              <p className="text-xl font-semibold text-gray-800">
                Total: ${totalPrice.toFixed(2)}
              </p>
              <button
                onClick={handleCheckout}
                className="w-full sm:w-auto px-6 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600"
              >
                Proceed to Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  )
}
