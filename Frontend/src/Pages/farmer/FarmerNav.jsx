import React from 'react'
import { Bell, User } from 'lucide-react'

const FarmerNav = () => {
  return (

    <div
      className='
        fixed top-0 right-0 left-0
        lg:left-[250px]
        z-40
        bg-white border-b border-gray-200 shadow-sm
        px-16 lg:px-6 py-4
        flex items-center justify-between
      '
    >

      <h1 className='text-xl lg:text-2xl font-bold text-emerald-700'>
        Farmer Dashboard
      </h1>


      <div className='flex items-center gap-4'>

         

        <div className='bg-emerald-100 p-2 rounded-full'>
          <User className='text-emerald-700' />
        </div>

      </div>

    </div>

  )
}

export default FarmerNav