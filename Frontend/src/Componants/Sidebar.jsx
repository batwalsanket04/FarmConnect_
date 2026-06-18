import React, { useState } from 'react'

import {
  LayoutDashboard,
  Package,
  Plus,
  ShoppingCart,
  Users,
  LogOut,
  Menu,
  X,
  Bell,
  Search,
  Home,
  ShoppingBag,
  HomeIcon
} from 'lucide-react'

import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/Context'

const Sidebar = ({ type = "farmer" }) => {
  const {cart ,productQuantity}=useAppContext();

  const [open, setOpen] = useState(false)

  const navigate = useNavigate()


  const logout = () => {

  localStorage.removeItem("farmerToken");
  localStorage.removeItem("userToken");
  localStorage.removeItem("auth");

  navigate("/");

}

  return (

    <>

      {/* MOBILE MENU BUTTON */}

      <button
        onClick={() => setOpen(true)}
        className='lg:hidden fixed top-4 left-4 z-50 bg-emerald-700 text-white p-2 rounded-lg shadow-lg'
      >

        <Menu size={22} />

      </button>


      {/* OVERLAY */}

      {open && (

        <div
          onClick={() => setOpen(false)}
          className='fixed inset-0 bg-black/40 z-40 lg:hidden'
        />

      )}


      {/* SIDEBAR */}

      <div
        className={`fixed top-0 left-0 z-50
        h-screen w-[250px]
        bg-emerald-700 text-white
        shadow-2xl
        p-5
        transform transition-transform duration-300

        ${open ? 'translate-x-0' : '-translate-x-full'}

        lg:translate-x-0`}
      >

        {/* TOP */}

        <div className='flex items-center justify-between mb-10'>

          <p className='text-xl text-emerald-100'>
            Menu
          </p>

          <button
            onClick={() => setOpen(false)}
            className='lg:hidden text-white'
          >

            <X size={24} />

          </button>

        </div>


        {/* MENU */}

        <div className='space-y-3'>

          {/* DASHBOARD */}

          <button
          onClick={() => navigate(type === 'farmer' ? '/farmer-dashboard' : '/user-dashboard')}
            className='w-full flex items-center gap-3 bg-white text-emerald-700 px-4 py-3 rounded-xl font-semibold shadow-md'
          >

            <LayoutDashboard size={20} />

            Dashboard

          </button>


          {/* FARMER MENU */}

          {type === "farmer" && (
            <>

            <button
                onClick={() => navigate('/farmer-dashboard')}
                className='w-full flex items-center gap-3 hover:bg-emerald-600 px-4 py-3 rounded-xl transition-all duration-300'
              >

                <HomeIcon size={20} />

                Home

              </button>

              <button
                onClick={() => navigate('/farmer-dashboard/my-product')}
                className='w-full flex items-center gap-3 hover:bg-emerald-600 px-4 py-3 rounded-xl transition-all duration-300'
              >

                <Package size={20} />

                My Products

              </button>


             <Link
  to="/farmer-dashboard/add"
  className='w-full flex items-center gap-3 hover:bg-emerald-600 px-4 py-3 rounded-xl transition-all duration-300'
>

  <Plus size={20} />

  Add Product

</Link>


              <button
              onClick={() => navigate('/farmer-dashboard/order')}
                className='w-full flex items-center gap-3 hover:bg-emerald-600 px-4 py-3 rounded-xl transition-all duration-300'
              >

                <ShoppingCart size={20} />

                Orders

              </button>

            </>
          )}


          {/* USER MENU */}

          {type === "user" && (
            <>
             <button  onClick={()=>navigate("/user-dashboard")} className='w-full flex items-center gap-3 hover:bg-emerald-600 px-4 py-3 rounded-xl transition-all duration-300'>

                <Home size={20} />

                Home

              </button>

            

              <button onClick={()=>navigate('/user-dashboard/cart')} className='w-full flex items-center gap-3 hover:bg-emerald-600 px-4 py-3 rounded-xl transition-all duration-300'>

                <ShoppingCart size={20} />

                Cart
                {cart.length > 0 && (
  <span className='ml-auto bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center'>
    {cart.length}
  </span>
)}

              </button>

              <button className='w-full flex items-center gap-3 hover:bg-emerald-600 px-4 py-3 rounded-xl transition-all duration-300'>

                <Bell size={20} />

                Notifications

              </button>
              <button  onClick={()=>navigate('/user-dashboard/my-order')}  className='w-full flex items-center gap-3 hover:bg-emerald-600 px-4 py-3 rounded-xl transition-all duration-300'>

                <ShoppingBag size={20} />

                My Order

              </button>


              


              <button onClick={()=>navigate('/user-dashboard/farmers')} className='w-full flex items-center gap-3 hover:bg-emerald-600 px-4 py-3 rounded-xl transition-all duration-300'>

                <Users size={20} />

                Farmers

              </button>

            </>
          )}


          {/* LOGOUT */}

          <div className='pt-6'>

            <button onClick={logout} className='w-full flex items-center gap-3 text-red-200 hover:bg-red-500 hover:text-white px-4 py-3 rounded-xl transition-all duration-300'>

              <LogOut size={20} />

              Logout

            </button>

          </div>

        </div>

      </div>

    </>

  )
}

export default Sidebar