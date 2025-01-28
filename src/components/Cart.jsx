import { Minus, Plus, ShoppingCart } from 'lucide-react'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { add, remove } from '../redux/reducers/cartSlice'
import { NavLink, useNavigate } from 'react-router-dom'

// export default function Menu() {
//   const { cart } = useSelector((state) => state.cart)
//   let items = 0

//   const totalCost = cart.reduce((total, cartItem) => {
//     const { price, quantity } = cartItem
//     items += quantity
//     return total + quantity * price
//   }, 0)

//   return (
//     <main className="flex flex-col items-center px-10 min-h-screen mb-10">
//       <h1 className="text-3xl font-bold my-5 flex items-center gap-3">
//         Cart <ShoppingCart />
//       </h1>
//       {/* Parent container to manage layout */}
//       <div className="flex flex-col w-full max-w-6xl">
//         {/* Items Section */}
//         <section
//           className={`grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 pb-10`}
//         >
//           {cart.map((cartItem) => (
//             <CartItem cartItem={cartItem} key={cartItem._id} />
//           ))}
//         </section>

//         {/* Summary Section */}
//         <div className="bg-white shadow-lg rounded-lg p-6 mt-10 border">
//           <h2 className="text-2xl font-semibold mb-5">Cart Summary</h2>
//           <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
//             {/* Total Cost */}
//             <div className="flex flex-col">
//               <span className="text-lg font-medium text-gray-500">
//                 Total Cost
//               </span>
//               <span className="text-3xl font-bold text-green-600">
//                 ${totalCost.toFixed(2)}
//               </span>
//             </div>

//             {/* Total Quantity */}
//             <div className="flex flex-col">
//               <span className="text-lg font-medium text-gray-500">
//                 Total Items
//               </span>
//               <span className="text-3xl font-bold">{items}</span>
//             </div>
//           </div>

//           {/* NavLink to Order Page */}
//           <NavLink
//             to="/order"
//             className="mt-6 inline-block w-full py-3 px-4 text-center font-semibold text-white bg-blue-600 rounded-lg shadow-lg hover:bg-blue-700 transition-all duration-200"
//           >
//             Proceed to Order
//           </NavLink>
//         </div>
//       </div>
//     </main>
//   )
// }

export default function Cart() {
  const { cart } = useSelector((state) => state.cart)
  let items = 0

  const totalCost = cart.reduce((total, cartItem) => {
    const { price, quantity } = cartItem
    items += quantity
    return total + quantity * price
  }, 0)

  const { user } = useSelector((state) => state.user)

  const navigate = useNavigate()

  if (!user) {
    navigate('/login')
  }

  // If cart is empty, show a message
  if (cart.length === 0) {
    return (
      <main className="flex flex-col items-center px-10 min-h-screen mb-10">
        <h1 className="text-3xl font-bold my-5 flex items-center gap-3">
          Cart <ShoppingCart />
        </h1>
        <div className="text-center text-xl font-semibold text-gray-600">
          Your cart is empty. Start shopping to add items to your cart!
        </div>
        <NavLink
          to="/menu"
          className="mt-6 inline-block w-full py-3 px-4 text-center font-semibold text-white bg-blue-600 rounded-lg shadow-lg hover:bg-blue-700 transition-all duration-200"
        >
          Go to Menu
        </NavLink>
      </main>
    )
  }

  return (
    <main className="flex flex-col items-center px-10 min-h-screen mb-10">
      <h1 className="text-3xl font-bold my-5 flex items-center gap-3">
        Cart <ShoppingCart />
      </h1>
      {/* Parent container to manage layout */}
      <div className="flex flex-col w-full max-w-6xl">
        {/* Items Section */}
        <section
          className={`grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 pb-10`}
        >
          {cart.map((cartItem) => (
            <CartItem cartItem={cartItem} key={cartItem._id} />
          ))}
        </section>

        {/* Summary Section */}
        <div className="bg-white shadow-lg rounded-lg p-6 mt-10 border">
          <h2 className="text-2xl font-semibold mb-5">Cart Summary</h2>
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            {/* Total Cost */}
            <div className="flex flex-col">
              <span className="text-lg font-medium text-gray-500">
                Total Cost
              </span>
              <span className="text-3xl font-bold text-green-600">
                ${totalCost.toFixed(2)}
              </span>
            </div>

            {/* Total Quantity */}
            <div className="flex flex-col">
              <span className="text-lg font-medium text-gray-500">
                Total Items
              </span>
              <span className="text-3xl font-bold">{items}</span>
            </div>
          </div>

          {/* NavLink to Order Page */}
          <NavLink
            to="/order"
            className="mt-6 inline-block w-full py-3 px-4 text-center font-semibold text-white bg-blue-600 rounded-lg shadow-lg hover:bg-blue-700 transition-all duration-200"
          >
            Proceed to Order Summary
          </NavLink>
        </div>
      </div>
    </main>
  )
}

function CartItem({ cartItem }) {
  const { name, price, category, quantity } = cartItem
  const dispatch = useDispatch()

  // Function to handle manual input of quantity
  const handleQuantityChange = (e) => {
    const newQuantity = Math.max(0, parseInt(e.target.value) || 0) // Prevent negative quantities
    if (newQuantity === 0) {
      dispatch(remove(cartItem)) // Remove the item if the quantity becomes zero
    } else {
      dispatch(update({ ...cartItem, quantity: newQuantity })) // Update the quantity
    }
  }

  return (
    <article className="flex flex-col items-center justify-center gap-3 py-5 px-2 border rounded-lg">
      <h3 className="text-lg font-semibold">{name}</h3>
      <h3 className="font-semibold">${price}</h3>
      <h3>{category}</h3>
      <section className="flex gap-3 items-center">
        {/* Decrease quantity */}
        <button
          className="rounded-full border-1 p-1 cursor-pointer hover:bg-[#1f1f1f] hover:text-[#f5f5f5] duration-200 transition-all"
          onClick={() => dispatch(remove(cartItem))}
        >
          <Minus />
        </button>

        {/* Quantity Input */}
        <input
          type="number"
          name="quantity"
          id="quantity"
          value={quantity}
          onChange={handleQuantityChange}
          className="w-16 text-center py-1.5 border rounded-lg appearance-none focus:outline-none focus:ring focus:ring-indigo-500"
          onWheel={(e) => e.target.blur()} // Prevent scroll from changing the number
          onKeyDown={(e) => e.key === 'e' && e.preventDefault()} // Prevent 'e' key input
        />

        {/* Increase quantity */}
        <button
          className="rounded-full border-1 p-1 cursor-pointer hover:bg-[#1f1f1f] hover:text-[#f5f5f5] duration-200 transition-all"
          onClick={() => dispatch(add(cartItem))}
        >
          <Plus />
        </button>
      </section>
    </article>
  )
}
