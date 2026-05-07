import React from 'react'
import {
  Heart,
  ShoppingCart,
  Users,
  IndianRupee,
  Package
} from 'lucide-react'

import Sidebar from '../../Componants/Sidebar'
import UserNav from './UserNav'
import MainBanner from '../../Componants/MainBanner'
import Products from './Products'
import { Outlet } from 'react-router-dom'

const UserDashboard = () => {

  return (

    <div className='min-h-screen bg-gradient-to-br from-emerald-50 to-green-100'>

      {/* SIDEBAR */}
      <Sidebar type="user" />

      {/* NAVBAR */}
      <UserNav />

      {/* MAIN CONTENT */}
      <div className='lg:ml-[250px] pt-[80px]'>

        {/* BANNER */}
        <div className='p-4 sm:p-6'>
          <MainBanner />
        </div>
 

        {/* PRODUCTS */}

       <Products/>


        <div className="lg:ml-[250px] pt-[80px] p-6">

  <div className="max-w-7xl mx-auto">

    <Outlet/>

  </div>

</div>

      </div>

    </div>

  )
}

export default UserDashboard