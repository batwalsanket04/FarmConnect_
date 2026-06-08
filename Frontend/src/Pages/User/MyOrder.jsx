import React, { useEffect, useState } from "react";
import {
  BadgeCheck,
  Phone,
  MapPin,
  Package,
  CalendarDays,
  PhoneCall
} from "lucide-react";
import axios from "axios";

const MyOrder = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const auth = JSON.parse(localStorage.getItem("auth"));
        const userId = auth?.user?.id;
        console.log("Fetching orders for user ID:", userId);

        if (!userId) {
          console.error("No logged-in user found for order fetch.");
          setOrders([]);
          setLoading(false);
          return;
        }

        const res = await axios.get(
          `http://127.0.0.1:8000/api/user/products/${userId}/`
        );

        console.log("Fetched orders:", res.data);
        setOrders(res.data || []);
      } catch (error) {
        console.error("Failed to fetch orders:", error);
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);


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
            {orders.length} Orders
          </span>

        </div>

      </div>

      {/* ORDERS */}
      <div className="space-y-4">
        {loading ? (
          <div className="text-center text-gray-500">Loading orders...</div>
        ) : orders.length === 0 ? (
          <div className="bg-white rounded-3xl shadow-md p-10 text-center">
            <p className="text-xl font-semibold text-gray-700">No orders found</p>
            <p className="text-sm text-gray-500">You haven't placed any orders yet.</p>
          </div>
        ) : (
          orders.map((item) => {
            const product = item.product || {};
            return (
              <div
                key={item.id}
                className="bg-white rounded-2xl shadow-md overflow-hidden border border-emerald-100"
              >
                {/* TOP */}
                <div className="bg-emerald-600 text-white px-4 py-3 flex items-center justify-between">
                  <div>
                    <h2 className="font-bold text-lg">Order #{item.id}</h2>
                    <div className="flex items-center gap-2 text-xs text-emerald-100 mt-1">
                      <CalendarDays size={14} />
                      {item.created_at || item.orderdate || "Unknown date"}
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="bg-white text-emerald-700 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                      <BadgeCheck size={14} />
                      {item.status}
                    </span>
                    <a
                      href={`tel:${item.phone}`}
                      className="bg-white text-emerald-700 p-2 rounded-full hover:bg-emerald-100 transition"
                    >
                      <PhoneCall size={16} />
                    </a>
                  </div>
                </div>

                {/* PRODUCT */}
                <div className="p-4 space-y-3">
                  <div className="flex items-center gap-3 border rounded-2xl p-3 hover:bg-emerald-50 transition">
                    <img
                      src={
                        product.product_image
                          ? `http://127.0.0.1:8000${product.product_image}`
                          : "https://via.placeholder.com/80"
                      }
                      alt={product.product_name || "Product image"}
                      className="w-20 h-20 rounded-xl object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h2 className="font-bold text-gray-800">
                            {product.product_name || `Product #${product.id || item.product}`}
                          </h2>
                          <p className="text-xs text-gray-500 mt-1">
                            Product ID : {product.id || item.product}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-5 mt-3 text-sm flex-wrap">
                        <div>
                          <p className="text-gray-500">Price</p>
                          <h3 className="font-semibold text-gray-800">
                            ₹{
                              item.unit === "quintal"
                                ? item.total_price / Math.max(item.quantity || 1, 1)
                                : product.normal_price || item.total_price / Math.max(item.quantity || 1, 1)
                            }
                            /{item.unit || product.unit || "unit"}
                          </h3>
                        </div>
                        <div>
                          <p className="text-gray-500">Qty</p>
                          <h3 className="font-semibold text-gray-800">
                            {item.quantity} {item.unit}
                          </h3>
                        </div>
                        <div>
                          <p className="text-gray-500">Payment</p>
                          <h3 className="font-semibold text-gray-800">{item.payment}</h3>
                        </div>
                      </div>
                    </div>
                  </div>

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
                      <p className="text-xs text-gray-500">Total Amount</p>
                      <h1 className="text-3xl font-bold text-emerald-700">₹{item.total_price}</h1>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

    </div>

  );
};

export default MyOrder;