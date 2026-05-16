

import React from "react";
import { Trash2 } from "lucide-react";

const CartItem = ({
  item,
  removeItem,
  productQuantity,
  totalPrice
}) => {
  return (
    <div className="bg-white rounded-3xl shadow-md p-4 flex flex-col sm:flex-row gap-5">

      <img
        src={item.image}
        alt=""
        className="w-full sm:w-40 h-40 object-cover rounded-2xl"
      />

      <div className="flex-1">

        <div className="flex items-start justify-between">

          <div>

            <h2 className="text-2xl font-bold text-gray-800">
              {item.name}
            </h2>

            <p className="text-emerald-700 font-semibold mt-1">
              ₹{totalPrice}/kg
            </p>

          </div>

          <button
            onClick={() => removeItem(item.id)}
            className="text-red-500 hover:bg-red-100 p-2 rounded-full"
          >
            <Trash2 size={20} />
          </button>

        </div>

        <div className="mt-5 flex items-center justify-between">

          <p className="text-xl font-bold text-emerald-700">
            ₹{item.price * (productQuantity[item.id] || 1)}
          </p>

        </div>

      </div>

    </div>
  );
};

export default CartItem;