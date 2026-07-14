import React, { useEffect, useState } from "react";

import {
  Package,
  Clock3,
  CheckCircle,
  Truck,
  XCircle,
} from "lucide-react";

import { useAppContext } from "../../context/Context";
import axios from "axios";
import { toast } from "react-toastify";
import { API_BASE_URL, assetUrl } from '../../utils/api';

const Order = () => {

  const { ordersData, setOrdersData } = useAppContext();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updating, setUpdating] = useState({});

  // useEffect(() => {
  //   localStorage.setItem("orders", JSON.stringify(ordersData));
  // }, [ordersData]);

  // UPDATE STATUS - WITH API PERSISTENCE
  const updateStatus = async (id, newStatus) => {
    setUpdating(prev => ({ ...prev, [id]: true }));
    
    try {
      const res = await axios.patch(
        `${API_BASE_URL}/api/farmer/orders/update-status/${id}/`,
        { status: newStatus }
      );
      
      if (res.status === 200) {
        // Update local state with the response data
        const updatedOrders = ordersData.map((item) =>
          item.id === id ? res.data.order : item
        );
        setOrdersData(updatedOrders);
        console.log('Order status updated:', res.data);
      }
    } catch (error) {
      console.error('Failed to update order status:', error);
      toast.error('Failed to update order status. Please try again.');
    } finally {
      setUpdating(prev => ({ ...prev, [id]: false }));
    }
  };

 
  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const auth = JSON.parse(localStorage.getItem('auth'));
        const farmerId = auth?.farmer?.id;
        
        if (!farmerId) {
          setError('Farmer authentication not found. Please login again.');
          console.error('Farmer auth not found');
          setLoading(false);
          return;
        }

        const res = await axios.get(
          `${API_BASE_URL}/api/farmer/orders/${farmerId}/`
        );
        
        if (res.status === 200) {
          console.log('Fetched orders:', res.data);
          setOrdersData(res.data);
          
          if (res.data.length === 0) {
            setError(null); // No error, just no orders yet
          }
        }
      } catch (error) {
        console.error('Failed to fetch orders:', error);
        setError('Failed to fetch orders. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [setOrdersData]);
     

  // LOADING STATE
  if (loading) {
    return (
      <div className="p-4 sm:p-6 flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-700 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading orders...</p>
        </div>
      </div>
    );
  }

  // ERROR STATE
  if (error) {
    return (
      <div className="p-4 sm:p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-emerald-700">Orders</h1>
          <p className="text-gray-500 mt-1">Manage all buyer orders here</p>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-2xl p-6 text-center">
          <p className="text-red-700 font-semibold">{error}</p>
        </div>
      </div>
    );
  }

  // EMPTY STATE
  if (!ordersData || ordersData.length === 0) {
    return (
      <div className="p-4 sm:p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-emerald-700">Orders</h1>
          <p className="text-gray-500 mt-1">Manage all buyer orders here</p>
        </div>
        <div className="bg-gray-50 border border-gray-200 rounded-2xl p-12 text-center">
          <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 text-lg font-medium">No orders yet</p>
          <p className="text-gray-500 mt-2">Orders from buyers will appear here</p>
        </div>
      </div>
    );
  }

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
                      Total Amount: ₹{item.total_price}
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
                        disabled={updating[item.id]}
                        className="bg-green-600 text-white px-4 py-2 rounded-xl hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {updating[item.id] ? 'Accepting...' : 'Accept'}
                      </button>

                      <button
                        onClick={() => updateStatus(item.id, "rejected")}
                        disabled={updating[item.id]}
                        className="bg-red-600 text-white px-4 py-2 rounded-xl hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {updating[item.id] ? 'Rejecting...' : 'Reject'}
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
                        onClick={() => updateStatus(item.id, "shipped")}
                        disabled={updating[item.id]}
                        className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {updating[item.id] ? 'Shipping...' : 'Mark Shipped'}
                      </button>
                    </>
                  )}

                  {item.status === "shipped" && (
                    <>
                      <div className="flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-xl">

                        <Truck size={18} />
                        Shipped

                      </div>

                      <button
                        onClick={() => updateStatus(item.id, "delivered")}
                        disabled={updating[item.id]}
                        className="bg-purple-600 text-white px-4 py-2 rounded-xl hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {updating[item.id] ? 'Delivering...' : 'Mark Delivered'}
                      </button>
                    </>
                  )}

                  {item.status === "delivered" && (
                    <div className="flex items-center gap-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-xl">

                      <CheckCircle size={18} />
                      Delivered

                    </div>
                  )}

                  {item.status === "rejected" && (
                    <div className="flex items-center gap-2 bg-red-100 text-red-700 px-4 py-2 rounded-xl">

                      <XCircle size={18} />
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
                  item.cart && item.cart.length > 0 ? (
                    item.cart.map((product) => (

                      <div
                        key={product.id}
                        className="flex items-center gap-4 border-b py-3"
                      >

                        {product.image ? (
                          <img
                            src={assetUrl(product.image)}
                            alt={product.name}
                            className="w-16 h-16 rounded-xl object-cover"
                            onError={(e) => {
                              e.target.src = 'https://via.placeholder.com/64?text=No+Image';
                            }}
                          />
                        ) : (
                          <div className="w-16 h-16 rounded-xl bg-gray-200 flex items-center justify-center">
                            <Package size={24} className="text-gray-400" />
                          </div>
                        )}

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
                  ) : (
                    <p className="text-gray-500 py-4">No products in this order</p>
                  )
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