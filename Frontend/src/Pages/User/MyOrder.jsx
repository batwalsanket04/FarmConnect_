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

   <div className="in-h-screen bg-slate-50 px-6 py-8">
  {/* Header */}
  <div className="flex items-center justify-between mb-8">
    <div>
      <h1 className="text-3xl font-bold tracking-tight text-slate-900">My Orders</h1>
      <p className="text-gray-500 text-sm">
        {orders.length} Orders
      </p>
    </div>
  </div>

  {loading ? (
    <div className="text-center py-20 text-gray-500">
      Loading Orders...
    </div>
  ) : orders.length === 0 ? (
    <div className="bg-white rounded-xl border p-10 text-center">
      <Package className="mx-auto text-gray-400 mb-3" size={40} />
      <h2 className="font-semibold text-lg">No Orders Found</h2>
      <p className="text-gray-500 text-sm mt-1">
        You haven't placed any orders yet.
      </p>
    </div>
  ) : (
    <div className="space-y-4">
      {orders.map((item) => {
        const product = item.product || {};

        return (
          <div
            key={item.id}
            className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300"
          >
            <div className="flex flex-col md:flex-row gap-4">
              {/* Image */}
              <img
                src={
                  product.product_image
                    ? `http://127.0.0.1:8000${product.product_image}`
                    : "https://via.placeholder.com/100"
                }
                alt={product.product_name}
                className="w-24 h-24 rounded-2xl object-cover shadow-sm"
              />

              {/* Details */}
              <div className="flex-1">
                <div className="flex justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-slate-800">
                      {product.product_name}
                    </h2>

                    <p className="text-sm text-slate-500">
                      Order #{item.id}
                    </p>

                    <p className="text-sm text-slate-500">
                      {item.created_at || item.orderdate}
                    </p>
                  </div>
<span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 text-emerald-700 font-medium">
  <span className="flex items-center justify-center w-5 h-5 rounded-full bg-emerald-100">
    <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse"></span>
  </span>
  {item.status}
</span>
                </div>

                {/* Info */}
             <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                 <div className="bg-slate-50 rounded-xl p-4">
                   <p className="text-xs uppercase tracking-wide text-slate-400">Price</p>
                  <p className="font-bold text-slate-800 mt-1">
                      ₹
                      {item.unit === "quintal"
                        ? item.total_price /
                          Math.max(item.quantity || 1, 1)
                        : product.normal_price ||
                          item.total_price /
                            Math.max(item.quantity || 1, 1)}
                    </p>
                  </div>

                   <div className="bg-slate-50 rounded-xl p-4">
                    <p className="text-xs uppercase tracking-wide text-slate-400">Quantity</p>
                    <p className="font-bold text-slate-800 mt-1">
                      {item.quantity} {item.unit}
                    </p>
                  </div>

                   <div className="bg-slate-50 rounded-xl p-4">
                    <p className="text-xs uppercase tracking-wide text-slate-400">Payment</p>
                    <p className="font-bold text-slate-800 mt-1">{item.payment}</p>
                  </div>

                   <div className="bg-slate-50 rounded-xl p-4">
                    <p className="text-xs uppercase tracking-wide text-slate-400">Total</p>
                    <p className="font-semibold text-green-600">
                      ₹{item.total_price}
                    </p>
                  </div>
                </div>

                {/* Address */}
                <div className="mt-6 pt-5 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-600">
                  <div className="space-y-1">
                    <p className="flex items-center gap-2">
                      <Phone size={15} />
                      {item.phone}
                    </p>

                    <p className="flex items-center gap-2">
                      <MapPin size={15} />
                      {item.address}
                    </p>
                  </div>

                  <a
                    href={`tel:${item.phone}`}
                    className="self-start md:self-center bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-xl shadow-sm transition-all duration-300"
                  >
                    Call
                  </a>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  )}
</div>

  );
};

export default MyOrder;