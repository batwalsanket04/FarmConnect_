

import React from "react";

const OrderSummary = ({
  cart,
  form,
  totalPrice,
  setCheckout
}) => {
  return (
    <div className="bg-white rounded-3xl shadow-md p-6 h-fit">

      <h2 className="text-2xl font-bold text-emerald-700 mb-6">
        Order Summary
      </h2>

      <div className="flex items-center justify-between mb-4">

        <p className="text-gray-600">
          Total Products
        </p>

        <p className="font-semibold">
          {cart.length}
        </p>

      </div>

      <div className="flex items-center justify-between mb-6">

        <p className="text-gray-600">
          Total Price
        </p>

        <p className="text-2xl font-bold text-emerald-700">₹{totalPrice}</p>

      </div>

      <button
        onClick={() => setCheckout(true)}
        className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-2xl font-semibold transition"
      >
        Proceed To Checkout
      </button>

    </div>
  );
};

export default OrderSummary;