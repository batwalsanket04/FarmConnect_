import React, { useEffect, useState } from 'react'
import { Search, User } from 'lucide-react'
import { useAppContext } from '../../context/Context'
import logo from '../../assets/OIP.webp'

const FarmerNav = () => {
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

  const storedFarmer = localStorage.getItem("auth");
  console.log("Stored farmer data:", storedFarmer);

   const name= JSON.parse(storedFarmer)?.farmer?.farmer_name || "Farmer";
  
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

       <h1 className="text-xl md:text-2xl font-semibold tracking-wide flex items-center gap-2">
                      <span className="text-amber-300"><img className="w-[60px] rounded-circle " src={logo} alt="" /></span> Farmer Dashboard
             </h1>


      <div className='flex items-center gap-4'>

        <div className='flex items-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-3 py-2 w-36 md:w-56'>
          <Search className='h-4 w-4 text-gray-500' />
          <input
            type='text'
            value={localQuery}
            onChange={(e) => setLocalQuery(e.target.value)}
            placeholder='Search'
            className='w-full bg-transparent text-sm outline-none text-emerald-900'
          />
        </div>

        <h2 className="text-lg font-semibold text-emerald-700">
      Welcome, {name}
        
    </h2>
        <div className='bg-emerald-100 p-2 rounded-full'>

          <User className='text-emerald-700' />
        </div>
         

      </div>

    </div>

  )
}

export default FarmerNav