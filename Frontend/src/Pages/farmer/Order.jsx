 import React from "react";

import {
  Package,
  Clock3,
  CheckCircle,
  Truck,
  Phone,
  MessageCircle
} from "lucide-react";

const Order = () => {
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

      <div className="space-y-5">

        {/* ORDER CARD */}

        <div className="bg-white rounded-2xl shadow-md p-5 border border-gray-100">

          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">

            {/* LEFT */}

            <div className="flex items-start gap-4">

              <div className="bg-emerald-100 p-4 rounded-2xl">

                <Package className="text-emerald-700" />

              </div>

              <div>

                <h2 className="text-xl font-semibold text-gray-800">
                  Fresh Tomatoes
                </h2>

                <p className="text-gray-500 mt-1">
                  Ordered by: Rahul Sharma
                </p>

                <p className="text-gray-500">
                  Quantity: 25 KG
                </p>

                <p className="text-gray-500">
                  Total Amount: ₹1000
                </p>

              </div>

            </div>


            {/* STATUS */}

            <div className="flex flex-wrap gap-3">

              <div className="flex items-center gap-2 bg-yellow-100 text-yellow-700 px-4 py-2 rounded-xl">

                <Clock3 size={18} />

                Pending

              </div>

            </div>

          </div>


          {/* ACTION BUTTONS */}

          <div className="flex flex-wrap gap-3 mt-5">

            <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2 rounded-xl transition">

              Accept Order

            </button>

            <button className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-xl transition">

              Reject

            </button>

            <a
              href="tel:9876543210"
              className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-xl transition"
            >

              <Phone size={18} />

              Call Buyer

            </a>

            <a
              href="https://wa.me/919876543210"
              target="_blank"
              className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-xl transition"
            >

              <MessageCircle size={18} />

              WhatsApp

            </a>

          </div>

        </div>


        {/* ORDER CARD */}

        <div className="bg-white rounded-2xl shadow-md p-5 border border-gray-100">

          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">

            {/* LEFT */}

            <div className="flex items-start gap-4">

              <div className="bg-orange-100 p-4 rounded-2xl">

                <Truck className="text-orange-500" />

              </div>

              <div>

                <h2 className="text-xl font-semibold text-gray-800">
                  Organic Potatoes
                </h2>

                <p className="text-gray-500 mt-1">
                  Ordered by: Priya Patil
                </p>

                <p className="text-gray-500">
                  Quantity: 50 KG
                </p>

                <p className="text-gray-500">
                  Total Amount: ₹1500
                </p>

              </div>

            </div>


            {/* STATUS */}

            <div className="flex flex-wrap gap-3">

              <div className="flex items-center gap-2 bg-emerald-100 text-emerald-700 px-4 py-2 rounded-xl">

                <CheckCircle size={18} />

                Delivered

              </div>

            </div>

          </div>


          {/* ACTIONS */}

          <div className="flex flex-wrap gap-3 mt-5">

            <button className="bg-gray-200 text-gray-700 px-5 py-2 rounded-xl">

              View Details

            </button>

          </div>

        </div>

      </div>

    </div>

  );
};

export default Order;