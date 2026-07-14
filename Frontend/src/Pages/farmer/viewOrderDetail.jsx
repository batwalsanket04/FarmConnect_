import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL, assetUrl } from '../../utils/api';
import {
  User,
  Phone,
  MapPin,
  Package,
  CreditCard,
  Calendar,
  IndianRupee,
  ArrowLeft,
  AlertTriangle,
} from "lucide-react";

const ViewOrderDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [viewOrder, setViewOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;

    const loadOrder = async () => {
      setLoading(true);
      setError("");

      try {
        const res = await axios.get(
          `${API_BASE_URL}/api/farmer/orders/view-order/${id}/`
        );
        console.log("Order details loaded:", res.data);
        setViewOrder(res.data);
      } catch (err) {
        console.error("Error loading order:", err);
        setError(
          err?.response?.data?.error || err?.response?.data?.detail || "Unable to load order details."
        );
      } finally {
        setLoading(false);
      }
    };

    loadOrder();
  }, [id]);

  const statusClasses = {
    pending: "bg-yellow-100 text-yellow-800",
    accepted: "bg-emerald-100 text-emerald-800",
    declined: "bg-rose-100 text-rose-800",
    completed: "bg-sky-100 text-sky-800",
  };

  const orderStatus = viewOrder?.status || "unknown";
  const statusColor = statusClasses[orderStatus] || "bg-slate-100 text-slate-800";

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-sm font-medium text-emerald-700 hover:text-emerald-900 mb-6"
        >
          <ArrowLeft className="h-4 w-4" /> Back to orders
        </button>

        <div className="bg-white rounded-[28px] shadow-2xl p-6 sm:p-8 mb-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-emerald-600">
                Farmer order details
              </p>
              <h1 className="mt-3 text-3xl font-semibold text-slate-900">
                Order #{viewOrder?.id ?? id}
              </h1>
              <p className="mt-2 text-sm text-slate-500">
                Review the full summary including customer, payment, and items.
              </p>
            </div>

            <span
              className={`inline-flex items-center rounded-full px-4 py-2 text-sm font-semibold ${statusColor}`}
            >
              {orderStatus}
            </span>
          </div>
        </div>

        {loading ? (
          <div className="rounded-[28px] border border-dashed border-slate-300 bg-white p-10 text-center text-slate-500 shadow-sm">
            Loading order details...
          </div>
        ) : error ? (
          <div className="rounded-[28px] border border-rose-200 bg-rose-50 p-8 text-center text-rose-700 shadow-sm">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-rose-100 text-rose-700">
              <AlertTriangle className="h-6 w-6" />
            </div>
            <h2 className="text-lg font-semibold">Unable to load order</h2>
            <p className="mt-2 text-sm text-rose-700">{error}</p>
          </div>
        ) : !viewOrder ? (
          <div className="rounded-[28px] border border-slate-200 bg-white p-8 shadow-sm text-center text-slate-600">
            No order found for this ID.
          </div>
        ) : (
          <>
            <div className="grid gap-6 xl:grid-cols-[1.4fr_0.8fr] mb-6">
              <div className="rounded-[28px] bg-white p-6 shadow-lg">
                <h2 className="text-xl font-semibold text-slate-900 mb-5">
                  Customer details
                </h2>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 rounded-3xl bg-slate-50 px-4 py-4">
                    <User className="h-5 w-5 text-emerald-600" />
                    <div>
                      <p className="text-sm text-slate-500">Customer</p>
                      <p className="font-medium text-slate-900">{viewOrder.name}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 rounded-3xl bg-slate-50 px-4 py-4">
                    <Phone className="h-5 w-5 text-emerald-600" />
                    <div>
                      <p className="text-sm text-slate-500">Phone</p>
                      <p className="font-medium text-slate-900">{viewOrder.phone}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 rounded-3xl bg-slate-50 px-4 py-4">
                    <MapPin className="mt-1 h-5 w-5 text-emerald-600" />
                    <div>
                      <p className="text-sm text-slate-500">Delivery address</p>
                      <p className="font-medium text-slate-900">{viewOrder.address}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-[28px] bg-white p-6 shadow-lg">
                <h2 className="text-xl font-semibold text-slate-900 mb-5">
                  Order summary
                </h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between rounded-3xl bg-slate-50 px-4 py-4">
                    <div className="flex items-center gap-3">
                      <Package className="h-5 w-5 text-emerald-600" />
                      <span className="text-sm text-slate-600">Order ID</span>
                    </div>
                    <span className="font-medium text-slate-900">#{viewOrder.id}</span>
                  </div>
                  <div className="flex items-center justify-between rounded-3xl bg-slate-50 px-4 py-4">
                    <div className="flex items-center gap-3">
                      <CreditCard className="h-5 w-5 text-emerald-600" />
                      <span className="text-sm text-slate-600">Payment method</span>
                    </div>
                    <span className="font-medium text-slate-900">{viewOrder.payment}</span>
                  </div>
                  <div className="flex items-center justify-between rounded-3xl bg-slate-50 px-4 py-4">
                    <div className="flex items-center gap-3">
                      <IndianRupee className="h-5 w-5 text-emerald-600" />
                      <span className="text-sm text-slate-600">Total</span>
                    </div>
                    <span className="font-semibold text-slate-900">₹{viewOrder.totalPrice}</span>
                  </div>
                  <div className="flex items-center justify-between rounded-3xl bg-slate-50 px-4 py-4">
                    <div className="flex items-center gap-3">
                      <Calendar className="h-5 w-5 text-emerald-600" />
                      <span className="text-sm text-slate-600">Order date</span>
                    </div>
                    <span className="font-medium text-slate-900">
                      {new Date(viewOrder.orderdate).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-[28px] bg-white p-6 shadow-lg">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-semibold text-slate-900">Ordered products</h2>
                  <p className="mt-2 text-sm text-slate-500">
                    Review the product details and totals for this order.
                  </p>
                </div>
                <div className="rounded-3xl bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
                  {viewOrder.cart?.length ?? 0} items
                </div>
              </div>

              <div className="space-y-5">
                {viewOrder.cart?.map((item) => (
                  <div
                    key={item.id}
                    className="flex flex-col gap-4 rounded-[24px] border border-slate-200 bg-slate-50 p-5 sm:flex-row sm:items-center"
                  >
                    {item.image ? (
                      <img
                        src={assetUrl(item.image)}
                        alt={item.name}
                        className="h-28 w-full shrink-0 rounded-3xl object-cover sm:w-32"
                        onError={(e) => {
                          e.target.src = 'https://via.placeholder.com/128?text=No+Image';
                        }}
                      />
                    ) : (
                      <div className="h-28 w-full shrink-0 rounded-3xl bg-gray-300 sm:w-32 flex items-center justify-center">
                        <Package size={32} className="text-gray-500" />
                      </div>
                    )}
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-slate-900">{item.name}</h3>
                      <p className="mt-2 text-sm text-slate-600">{item.product_description || item.description || "Fresh produce from the farm."}</p>
                      <div className="mt-4 grid gap-3 sm:grid-cols-2">
                        <div className="rounded-3xl bg-white px-4 py-3 shadow-sm">
                          <p className="text-xs uppercase tracking-[0.16em] text-slate-500">Quantity</p>
                          <p className="mt-1 font-semibold text-slate-900">{item.buyQty} {item.unit}</p>
                        </div>
                        <div className="rounded-3xl bg-white px-4 py-3 shadow-sm">
                          <p className="text-xs uppercase tracking-[0.16em] text-slate-500">Total price</p>
                          <p className="mt-1 font-semibold text-slate-900">₹{item.price}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex flex-col gap-4 rounded-[24px] border border-slate-200 bg-slate-50 p-6 sm:flex-row sm:justify-between sm:items-center">
                <div>
                  <p className="text-sm text-slate-600">Estimated revenue from this order</p>
                  <p className="mt-1 text-3xl font-semibold text-slate-900">₹{viewOrder.totalPrice}</p>
                </div>
                <div className="rounded-3xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white shadow-lg">
                  View complete order breakdown
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ViewOrderDetail;