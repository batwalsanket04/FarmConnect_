// UserNav.jsx

import React from 'react'

import {
  Search,
  ShoppingCart,
  Bell,
  User
} from 'lucide-react'
import logo from '../../assets/OIP.webp'

const UserNav = () => {

  return (

    <div
      className='fixed top-0 right-0
      lg:left-[250px]
      left-0
      h-[80px]
      bg-white border-b border-gray-200 shadow-sm
      px-6 flex items-center justify-between
      z-30'
    >

      <h1 className="text-xl md:text-2xl font-semibold tracking-wide flex items-center gap-2">
                <span className="text-amber-300"><img className="w-[60px] rounded-circle " src={logo} alt="" /></span> FarmConnect
       </h1>


      <div className='flex items-center gap-4'>

         
        <div className=' p-2 rounded-full'>
                  <Search />
                </div>

        <div className='bg-emerald-100 p-2 rounded-full'>
          <User className='text-emerald-700' />
        </div>

        

      </div>

    </div>

  )
}

export default UserNav