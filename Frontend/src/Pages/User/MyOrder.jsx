import React from "react";
import {
  BadgeCheck,
  Phone,
  MapPin,
  Package,
  CalendarDays
} from "lucide-react";

import { useAppContext } from "../../context/Context";

const MyOrder = () => {

  const { order,productQuantity,cart } = useAppContext();

  return (

    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-green-100 p-4">

      {/* HEADER */}
      <div className="flex items-center justify-between mb-5">

        <div>

          <h1 className="text-3xl font-bold text-emerald-700">
            My Orders
          </h1>

          <p className="text-sm text-gray-600 mt-1">
            Recent Orders
          </p>

        </div>

        <div className="bg-emerald-600 text-white px-4 py-2 rounded-xl flex items-center gap-2 shadow">

          <Package size={18} />

          <span className="font-semibold text-sm">
            {order.length} Orders
          </span>

        </div>

      </div>

      {/* ORDERS */}
      <div className="space-y-4">

        {order.map((item) => (

          <div
            key={item.id}
            className="bg-white rounded-2xl shadow-md overflow-hidden border border-emerald-100"
          >

            {/* TOP */}
            <div className="bg-emerald-600 text-white px-4 py-3 flex items-center justify-between">

              <div>

                <h2 className="font-bold text-lg">
                  Order #{item.id}
                </h2>

                <div className="flex items-center gap-2 text-xs text-emerald-100 mt-1">

                  <CalendarDays size={14} />

                  {item.orderdate}

                </div>

              </div>

              <div className="flex items-center gap-2">

                <span className="bg-white text-emerald-700 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">

                  <BadgeCheck size={14} />

                  {item.status}

                </span>

              </div>

            </div>

            {/* PRODUCT */}
            <div className="p-4 space-y-3">

              {item.cart.map((product) => (

                <div
                  key={product.id}
                  className="flex items-center gap-3 border rounded-2xl p-3 hover:bg-emerald-50 transition"
                >

                  {/* IMAGE */}
                  <img
                    src={product.image}
                    alt=""
                    className="w-20 h-20 rounded-xl object-cover"
                  />

                  {/* INFO */}
                  <div className="flex-1">

                    <div className="flex items-start justify-between gap-2">

                      <div>

                        <h2 className="font-bold text-gray-800">
                          {product.name}
                        </h2>

                        <p className="text-xs text-gray-500 mt-1">
                          Product ID : {product.id}
                        </p>

                      </div>

                      <h2 className="text-xl font-bold text-emerald-700">
                        ₹{product.price * product.buyQty}
                      </h2>

                    </div>

                    <div className="flex gap-5 mt-3 text-sm">

                      <div>

                        <p className="text-gray-500">
                          Price
                        </p>

                        <h3 className="font-semibold text-gray-800">
                          ₹{product.price}/kg
                        </h3>

                      </div>

                      <div>

                        <p className="text-gray-500">
                          Qty
                        </p>

                        <h3 className="font-semibold text-gray-800">
                          {productQuantity[product.id]} {item.unit}
                        </h3>

                      </div>

                      <div>

                        <p className="text-gray-500">
                          Payment
                        </p>

                        <h3 className="font-semibold text-gray-800">
                          {item.payment}
                        </h3>

                      </div>

                    </div>

                  </div>

                </div>

              ))}

              {/* FOOTER */}
              <div className="border-t pt-3 flex flex-col md:flex-row md:items-center md:justify-between gap-3">

                <div className="space-y-1 text-sm text-gray-600">

                  <p className="flex items-center gap-2">

                    <Phone size={15} className="text-emerald-600" />

                    {item.phone}

                  </p>

                  <p className="flex items-center gap-2">

                    <MapPin size={15} className="text-emerald-600" />

                    {item.address}

                  </p>

                </div>

                <div className="text-left md:text-right">

                  <p className="text-xs text-gray-500">
                    Total Amount
                  </p>

                  <h1 className="text-3xl font-bold text-emerald-700">
                    ₹{item.totalPrice}
                  </h1>

                </div>

              </div>

            </div>

          </div>

        ))}

      </div>

    </div>

  );
};

export default MyOrder;