import React, { useEffect } from "react";

import {
  Package,
  Clock3,
  CheckCircle,
  Truck,
} from "lucide-react";

import { useAppContext } from "../../context/Context";

const Order = () => {

  const { ordersData, setOrdersData } = useAppContext();

  useEffect(() => {
    localStorage.setItem("orders", JSON.stringify(ordersData));
  }, [ordersData]);

  // UPDATE STATUS
  const updateStatus = (id, newStatus) => {

    const updatedOrders = ordersData.map((item) =>
      item.id === id
        ? { ...item, status: newStatus }
        : item
    );

    setOrdersData(updatedOrders);
  };

  return (

    <div className="p-4 sm:p-6">

      <div className="mb-6">

        <h1 className="text-3xl font-bold text-emerald-700">
          Orders
        </h1>

        <p className="text-gray-500 mt-1">
          Manage all buyer orders here
        </p>

      </div>

      {
        ordersData.map((item) => (

          <div key={item.id} className="space-y-5 mb-5">

            <div className="bg-white rounded-2xl shadow-md p-5 border border-gray-100">

              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">

                <div className="flex items-start gap-4">

                  <div className="bg-emerald-100 p-4 rounded-2xl">
                    <Package className="text-emerald-700" />
                  </div>

                  <div>

                    <h2 className="text-xl font-semibold text-gray-800">
                      {item.name}
                    </h2>

                    <p className="text-gray-500 mt-1">
                      Phone: {item.phone}
                    </p>

                    <p className="text-gray-500">
                      Address: {item.address}
                    </p>

                    <p className="text-gray-500">
                      Unit: {item.unit}
                    </p>

                    <p className="text-gray-500">
                      Total Amount: ₹{item.totalPrice}
                    </p>

                    <p className="text-gray-500">
                      Date: {item.orderdate}
                    </p>

                  </div>

                </div>

                {/* STATUS */}
                <div className="flex flex-wrap gap-3 items-center">

                  {item.status === "pending" && (
                    <>
                      <div className="flex items-center gap-2 bg-yellow-100 text-yellow-700 px-4 py-2 rounded-xl">

                        <Clock3 size={18} />
                        Pending

                      </div>

                      <button
                        onClick={() => updateStatus(item.id, "accepted")}
                        className="bg-green-600 text-white px-4 py-2 rounded-xl hover:bg-green-700"
                      >
                        Accept
                      </button>

                      <button
                        onClick={() => updateStatus(item.id, "rejected")}
                        className="bg-red-600 text-white px-4 py-2 rounded-xl hover:bg-red-700"
                      >
                        Reject
                      </button>
                    </>
                  )}

                  {item.status === "accepted" && (
                    <>
                      <div className="flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-xl">

                        <CheckCircle size={18} />
                        Accepted

                      </div>

                      <button
                        onClick={() => updateStatus(item.id, "delivered")}
                        className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700"
                      >
                        Delivered
                      </button>
                    </>
                  )}

                  {item.status === "delivered" && (
                    <div className="flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-xl">

                      <Truck size={18} />
                      Delivered

                    </div>
                  )}

                  {item.status === "rejected" && (
                    <div className="flex items-center gap-2 bg-red-100 text-red-700 px-4 py-2 rounded-xl">

                      <Clock3 size={18} />
                      Rejected

                    </div>
                  )}

                </div>

              </div>

              {/* PRODUCTS */}
              <div className="mt-5">

                <h3 className="font-semibold mb-3">
                  Products
                </h3>

                {
                  item.cart?.map((product) => (

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
                          ₹{product.normal_price}
                        </p>

                        <p className="text-gray-500">
                          Qty: {product.buyQty} {item.unit}
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