import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { Frown, Minus, Plus } from 'lucide-react'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { add, remove, update } from '../redux/reducers/cartSlice'
import Loader from './Loader'

export default function Menu() {
  const [page, setPage] = useState(1)
  const [limit] = useState(8)

  const {
    isPending,
    isError,
    isLoading,
    error,
    data: res,
  } = useQuery({
    queryKey: ['menuItems', page],
    queryFn: async () => {
      return axios.get('/menu', {
        params: {
          skip: (page - 1) * limit,
          limit,
        },
      })
    },
  })

  const { cart } = useSelector((state) => state.cart)

  if (isLoading || isPending) {
    return <Loader />
  }

  if (isError) {
    console.log(error)
  }

  let menuItems
  let totalPages = 1
  if (!isError && !isPending && !isLoading) {
    menuItems = res.data.menuItems
    totalPages = Math.ceil(res.data.totalCount / limit)
  }

  return (
    <main className="flex flex-col items-center px-10 min-h-screen mb-10">
      <h1 className="text-3xl my-5">Main Menu</h1>
      <section className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 h-auto pb-10">
        {menuItems &&
          menuItems.map((menuItem) => {
            const cartItem = cart.find((item) => item._id === menuItem._id)
            return <MenuItem menuItem={menuItem} key={menuItem._id} />
          })}
      </section>

      <section className="flex justify-center items-center gap-2 mt-5">
        <button
          onClick={() => setPage((prev) => Math.max(1, prev - 1))}
          className="px-3 py-2 rounded-lg border-2 hover:bg-gray-300"
        >
          Previous
        </button>

        {Array.from({ length: totalPages }, (_, index) => index + 1).map(
          (pageNumber) => (
            <button
              key={pageNumber}
              onClick={() => setPage(pageNumber)}
              className={`px-3 py-2 rounded-lg border-2 ${
                page === pageNumber
                  ? 'bg-blue-500 text-white'
                  : 'hover:bg-gray-200'
              }`}
            >
              {pageNumber}
            </button>
          )
        )}

        <button
          onClick={() => setPage((prev) => Math.min(totalPages, prev + 1))}
          className="px-3 py-2 rounded-lg border-2 hover:bg-gray-300"
        >
          Next
        </button>
      </section>
    </main>
  )
}

function MenuItem({ menuItem }) {
  const dispatch = useDispatch()

  const { name, price, category, availability, _id } = menuItem

  const item = useSelector((state) =>
    state.cart.cart.find((menuItem) => menuItem._id === _id)
  )

  let quantity

  if (item) {
    quantity = item.quantity ?? 0
  }

  function handleAddToCart() {
    dispatch(add(menuItem))
  }

  return (
    <article
      className={`flex flex-col items-center justify-center gap-3 py-5 px-2 border-1 ${
        !availability ? 'bg-gray-300' : ''
      }`}
    >
      <h3 className="text-lg font-semibold">{name}</h3>
      <h3 className="font-semibold">${price}</h3>
      <h3>{category}</h3>
      <section className="flex gap-3 items-center">
        {availability ? (
          <>
            {quantity > 0 ? (
              <QuantityChange menuItem={menuItem} quantity={quantity} />
            ) : (
              <button
                onClick={handleAddToCart}
                className="text-md bg-transparent border-2 text-[#1f1f1f] px-3 py-2 flex gap-3 items-center hover:bg-[#1f1f1f] hover:text-[#f5f5f5] duration-200 rounded-lg cursor-pointer"
                disabled={!availability}
              >
                Add to Cart <Plus size={24} />
              </button>
            )}
          </>
        ) : (
          <p className="text-red-500 flex items-center gap-2">
            <Frown /> Not available
          </p>
        )}
      </section>
    </article>
  )
}

function QuantityChange({ menuItem, quantity }) {
  const dispatch = useDispatch()

  const handleQuantityChange = (e) => {
    const newQuantity = Math.max(0, parseInt(e.target.value) || 0)
    if (newQuantity === 0) {
      dispatch(remove(menuItem))
    } else {
      dispatch(update({ ...menuItem, quantity: newQuantity }))
    }
  }

  const { availability } = menuItem

  return (
    <section
      className={`flex gap-3 items-center ${!availability ? 'disabled' : ''}`}
    >
      <button
        className="rounded-full border-1 p-1 cursor-pointer hover:bg-[#1f1f1f] hover:text-[#f5f5f5] duration-200 transition-all"
        onClick={handleQuantityChange}
      >
        <Minus />
      </button>

      <input
        type="number"
        name="quantity"
        id="quantity"
        value={quantity}
        onChange={handleQuantityChange}
        className="w-16 text-center py-1.5 border rounded-lg appearance-none focus:outline-none focus:ring focus:ring-indigo-500"
        onWheel={(e) => e.target.blur()}
        onKeyDown={(e) => e.key === 'e' && e.preventDefault()}
      />

      <button
        className="rounded-full border-1 p-1 cursor-pointer hover:bg-[#1f1f1f] hover:text-[#f5f5f5] duration-200 transition-all"
        onClick={() => dispatch(add(menuItem))}
      >
        <Plus />
      </button>
    </section>
  )
}
