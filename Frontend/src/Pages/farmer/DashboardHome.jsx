import axios from 'axios'
import { IndianRupee, Package, ShoppingCart, TrendingUp } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
 

const DashboardHome = () => {

const [product,setProduct]=useState([])
const [orders,setOrders]=useState([])
const [pendingOrders,setPendingOrder]=useState(0);
const [earnings,setEarnings]=useState(0);
const nav=useNavigate();


useEffect(()=>{

  const fetchData=async()=>{

try{
  const auth= JSON.parse(localStorage.getItem("auth"));
  const farmerId=auth?.farmer?.id;
      if (!farmerId) {
        console.error('Farmer auth not found')
        return
      }

  // Fetch products
  const productRes=await axios.get(`http://127.0.0.1:8000/api/farmer/products/${farmerId}/`);
  setProduct(productRes.data);

  // Fetch dashboard stats
  const statsRes = await axios.get(
    `http://127.0.0.1:8000/api/farmer/orders/dashboard-stats/${farmerId}/`
  );

  const stats = statsRes.data || {};
  const ordersData = Array.isArray(stats.orders) ? stats.orders : [];

  setOrders(ordersData);
  setPendingOrder(stats.pending_count || 0);
  setEarnings(stats.total_earnings || 0);

  console.log('Dashboard stats:', stats);
  




  }
  catch(error)
{
  console.log(error)
  
}
}

fetchData();


},[])





 
  return (
    <div>
        <div className=' pt-[80px] p-6'>

        {/* WELCOME */}
        <div className='flex items-center justify-between mb-8'>

          <div>

            <h1 className='text-3xl font-bold text-emerald-700'>
              Welcome Farmer 👋
            </h1>

            <p className='text-gray-500 mt-1'>
              Manage your products and orders easily
            </p>

          </div>

        </div>


        {/* STATS */}
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5'>

          <div className='bg-white rounded-2xl shadow-md p-5'>

            <div className='flex items-center justify-between'>

              <div>

                <h2 className='text-gray-500 text-sm'>
                  Total Products
                </h2>

                <p className='text-3xl font-bold text-emerald-700 mt-2'>
                  {product.length}
                </p>

              </div>

              <div className='bg-emerald-100 p-3 rounded-xl'>
                <Package className='text-emerald-700' />
              </div>

            </div>

          </div>


          <div className='bg-white rounded-2xl shadow-md p-5'>

            <div className='flex items-center justify-between'>

              <div>

                <h2 className='text-gray-500 text-sm'>
                  Orders Received
                </h2>

                <p className='text-3xl font-bold text-emerald-700 mt-2'>
                  {orders.length}
                </p>

              </div>

              <div className='bg-emerald-100 p-3 rounded-xl'>
                <ShoppingCart className='text-emerald-700' />
              </div>

            </div>

          </div>


          <div className='bg-white rounded-2xl shadow-md p-5'>

            <div className='flex items-center justify-between'>

              <div>

                <h2 className='text-gray-500 text-sm'>
                  Total Earnings
                </h2>

                <div className='flex items-center mt-2'>

                  <IndianRupee
                    className='text-emerald-700'
                    size={24}
                  />

                  <p className='text-3xl font-bold text-emerald-700'>
                    {earnings}
                  </p>

                </div>

              </div>

              <div className='bg-emerald-100 p-3 rounded-xl'>
                <TrendingUp className='text-emerald-700' />
              </div>

            </div>

          </div>


          <div className='bg-white rounded-2xl shadow-md p-5'>

            <div className='flex items-center justify-between'>

              <div>

                <h2 className='text-gray-500 text-sm'>
                  Pending Orders
                </h2>

                <p className='text-3xl font-bold text-orange-500 mt-2'>
                  {pendingOrders}
                </p>

              </div>

              <div className='bg-orange-100 p-3 rounded-xl'>
                <ShoppingCart
                 className='text-orange-500' />
              </div>

            </div>

          </div>

        </div>


        {/* BOTTOM SECTION */}
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8'>

          {/* PRODUCTS */}
          <div className='bg-white rounded-2xl shadow-md p-5'>

            <div className='flex items-center justify-between mb-5'>

              <h2 className='text-xl font-semibold text-emerald-700'>
                Recent Orders
              </h2>

              <button onClick={()=>nav('/farmer-dashboard/add')} className='bg-emerald-600 text-white px-4 py-2 rounded-lg cursor-pointer '>
                Add Product
              </button>

            </div>

           { (orders.length===0)?(
              <div className='text-center text-gray-500'>No orders received yet</div>
            )
            :(
              <div className='space-y-4'>
                {orders.slice(0, 2).map((item) => (
                  <div key={item.id} className='flex items-center justify-between border-b pb-4'>
                    <div>
                    <h3 className='font-semibold'>
                      Order #{item.id} - {item.product?.product_name || 'Unknown Product'}
                    </h3>
                    <p className='text-sm text-gray-500'>
                      Ordered {item.quantity} {item.unit || ''}
                    </p>
                  </div>
                  <button onClick={()=>nav(`/farmer-dashboard/view-order/${item.id}`)} className='bg-emerald-600 text-white px-4 py-2 rounded-lg'>
                    View
                  </button>
                </div>
              ))}
            </div>)}

          </div>


          {/* ACTIVITY */}
          <div className='bg-white rounded-2xl shadow-md p-5'>

            <h2 className='text-xl font-semibold text-emerald-700 mb-5'>
              Recent Activity
            </h2>

            <div className='space-y-5'>

              <div className='flex items-start gap-4'>

                <div className='w-3 h-3 bg-emerald-600 rounded-full mt-2'></div>

                <div>

                  <p className='font-medium'>
                    New order received
                  </p>

                  <span className='text-sm text-gray-500'>
                    2 minutes ago
                  </span>

                </div>

              </div>


              <div className='flex items-start gap-4'>

                <div className='w-3 h-3 bg-orange-500 rounded-full mt-2'></div>

                <div>

                  <p className='font-medium'>
                    Product stock updated
                  </p>

                  <span className='text-sm text-gray-500'>
                    1 hour ago
                  </span>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
 
  )
}


export default DashboardHome