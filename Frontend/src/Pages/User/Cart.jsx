import React from "react";

import {
  Minus,
  Plus,
  Trash2,
  ShoppingCart
} from "lucide-react";

import { useAppcontext } from "../../Context/AppContext";

const Cart = () => {

  const { cart, setCart } = useAppcontext();


  /* INCREASE QTY */

  const increaseQty = (id) => {

    setCart(

      cart.map(item =>

        item.id === id

          ? { ...item, qty: item.qty + 1 }

          : item

      )

    )

  }


  /* DECREASE QTY */

  const decreaseQty = (id) => {

    setCart(

      cart
        .map(item =>

          item.id === id

            ? { ...item, qty: item.qty - 1 }

            : item

        )

        .filter(item => item.qty > 0)

    )

  }


  /* REMOVE ITEM */

  const removeItem = (id) => {

    setCart(

      cart.filter(item => item.id !== id)

    )

  }


  /* TOTAL */

  const totalPrice = cart.reduce(

    (total, item) => total + item.price * item.qty,

    0

  )


  return (

    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-green-100 p-4 sm:p-6">

      {/* TITLE */}

      <div className="flex items-center gap-3 mb-8">

        <ShoppingCart
          className="text-emerald-700"
          size={32}
        />

        <h1 className="text-3xl font-bold text-emerald-700">
          My Cart
        </h1>

      </div>


      {/* EMPTY CART */}

      {cart.length === 0 ? (

        <div className="bg-white rounded-3xl shadow-md p-10 text-center">

          <ShoppingCart
            className="mx-auto text-gray-300"
            size={60}
          />

          <h2 className="text-2xl font-semibold text-gray-600 mt-4">
            Cart is Empty
          </h2>

        </div>

      ) : (

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* CART ITEMS */}

          <div className="lg:col-span-2 space-y-5">

            {

              cart.map(item => (

                <div
                  key={item.id}
                  className="bg-white rounded-3xl shadow-md p-4 flex flex-col sm:flex-row gap-5"
                >

                  {/* IMAGE */}

                  <img
                    src={item.image}
                    alt=""
                    className="w-full sm:w-40 h-40 object-cover rounded-2xl"
                  />


                  {/* DETAILS */}

                  <div className="flex-1">

                    <div className="flex items-start justify-between">

                      <div>

                        <h2 className="text-2xl font-bold text-gray-800">
                          {item.name}
                        </h2>

                        <p className="text-emerald-700 font-semibold mt-1">
                          ₹{item.price}/kg
                        </p>

                      </div>


                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-red-500 hover:bg-red-100 p-2 rounded-full"
                      >

                        <Trash2 size={20} />

                      </button>

                    </div>


                    {/* QUANTITY */}

                    <div className="flex items-center gap-4 mt-6">

                      <button
                        onClick={() => decreaseQty(item.id)}
                        className="bg-gray-200 p-2 rounded-lg"
                      >

                        <Minus size={18} />

                      </button>


                      <span className="text-lg font-semibold">
                        {item.qty}
                      </span>


                      <button
                        onClick={() => increaseQty(item.id)}
                        className="bg-emerald-600 text-white p-2 rounded-lg"
                      >

                        <Plus size={18} />

                      </button>

                    </div>


                    {/* ITEM TOTAL */}

                    <p className="text-xl font-bold text-emerald-700 mt-5">

                      ₹{item.price * item.qty}

                    </p>

                  </div>

                </div>

              ))

            }

          </div>


          {/* SUMMARY */}

          <div className="bg-white rounded-3xl shadow-md p-6 h-fit">

            <h2 className="text-2xl font-bold text-emerald-700 mb-6">
              Order Summary
            </h2>


            <div className="flex items-center justify-between mb-4">

              <p className="text-gray-600">
                Total Items
              </p>

              <p className="font-semibold">
                {cart.length}
              </p>

            </div>


            <div className="flex items-center justify-between mb-6">

              <p className="text-gray-600">
                Total Price
              </p>

              <p className="text-2xl font-bold text-emerald-700">

                ₹{totalPrice}

              </p>

            </div>


            <button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-2xl font-semibold transition">

              Proceed to Checkout

            </button>

          </div>

        </div>

      )}

    </div>

  )

}

export default Cart