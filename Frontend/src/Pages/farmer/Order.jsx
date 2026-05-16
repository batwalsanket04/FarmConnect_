 import React, { useEffect } from "react";

import {
  Package,
  Clock3,
  CheckCircle,
  Truck,
  Phone,
  MessageCircle
} from "lucide-react";
import { useAppContext } from "../../context/Context";

const Order = () => {
  const { order,productQuantity,cart } = useAppContext();

  

  useEffect(() => {
    console.log(localStorage.getItem("orders"))
  }, [order]);
 

  return (

    <div className="p-4 sm:p-6">

      {/* PAGE TITLE */}

      <div className="mb-6">

        <h1 className="text-3xl font-bold text-emerald-700">
          Orders
        </h1>

        <p className="text-gray-500 mt-1">
          Manage all buyer orders here
        </p>

      </div>


      {/* ORDER LIST */}

 
{
  order.map((item) => (
    

    <div key={item.id} className="space-y-5">

      <div className="bg-white rounded-2xl shadow-md p-5 border border-gray-100">

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">

          {/* LEFT */}

          <div className="flex items-start gap-4">

            <div className="bg-emerald-100 p-4 rounded-2xl">

              <Package className="text-emerald-700" />

            </div>

            <div>

              {/* BUYER NAME */}

              <h2 className="text-xl font-semibold text-gray-800">
                {item.name}
              </h2>

              {/* PHONE */}

              <p className="text-gray-500 mt-1">
                Phone: {item.phone}
              </p>

              {/* ADDRESS */}

              <p className="text-gray-500">
                Address: {item.address}
              </p>

              {/* UNIT */}

              <p className="text-gray-500">
                Unit: {item.unit}
              </p>

              {/* TOTAL */}

              <p className="text-gray-500">
                Total Amount: ₹{item.totalPrice}
              </p>

              {/* DATE */}

              <p className="text-gray-500">
                Date: {item.orderdate}
              </p>

            </div>

          </div>

          {/* STATUS */}

          <div className="flex flex-wrap gap-3">

            <div className="flex items-center gap-2 bg-yellow-100 text-yellow-700 px-4 py-2 rounded-xl">

              <Clock3 size={18} />

              {item.status}

            </div>

          </div>

        </div>


        {/* CART ITEMS */}

        <div className="mt-5">

          <h3 className="font-semibold mb-3">
            Products
          </h3>

          {
            item.cart.map((product) => (

              <div
                key={product.id}
                className="flex items-center gap-4 border-b py-3"
              >

                <img
                  src={product.image}
                  alt={product.name}
                  className="w-16 h-16 rounded-xl object-cover"
                />

                <div>

                  <p className="font-medium">
                    {product.name}
                  </p>

                  <p className="text-gray-500">
                    ₹{product.price}
                  </p>

                  <p className="text-gray-500">
                    Qty: {product.buyQty}
                  </p>

                </div>

              </div>

            ))
          }

        </div>

      </div>

    </div>

  ))
}
      

    </div>

  );
};

export default Order;