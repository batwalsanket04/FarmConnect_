// UserNav.jsx

import React, { useEffect, useState } from 'react'

import {
  Search,
  User
} from 'lucide-react'
import logo from '../../assets/OIP.webp'
import { useAppContext } from '../../context/Context'

const UserNav = () => {
  const { searchTerm, setSearchTerm } = useAppContext();
  const [localQuery, setLocalQuery] = useState(searchTerm);

  useEffect(() => {
    setLocalQuery(searchTerm)
  }, [searchTerm])

  useEffect(() => {
    const timer = setTimeout(() => {
      if (localQuery !== searchTerm) {
        setSearchTerm(localQuery)
      }
    }, 300)

    return () => clearTimeout(timer)
  }, [localQuery, searchTerm, setSearchTerm])

  const storedUser = localStorage.getItem("userData");

  const user = storedUser
    ? JSON.parse(storedUser)
    : null;

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

        <div className='flex items-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-3 py-2 w-48 md:w-64'>
          <Search className='h-4 w-4 text-gray-500' />
          <input
            type='text'
            value={localQuery}
            onChange={(e) => setLocalQuery(e.target.value)}
            placeholder='Search products'
            className='w-full bg-transparent text-sm outline-none text-emerald-900'
          />
        </div>
          
          <h2 className="text-lg font-semibold text-emerald-700">
      {user?.name || "Guest"}
    </h2>


        <div className='bg-emerald-100 p-2 rounded-full'>
          <User className='text-emerald-700' />
        </div>

        

      </div>

    </div>

  )
}

export default UserNav