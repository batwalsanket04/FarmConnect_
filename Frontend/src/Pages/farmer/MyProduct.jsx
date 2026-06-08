import { Heart } from 'lucide-react'
import React, { useEffect } from 'react'
import { useAppContext } from '../../context/Context'
import axios from 'axios'

const MyProduct = () => {
  const { farmerProduct, setfarmerProduct } = useAppContext()

  useEffect(() => {
    const fetchProducts = async () => {
      const auth = JSON.parse(localStorage.getItem('auth'))
      const farmerId = auth?.farmer?.id
      if (!farmerId) {
        console.error('Farmer auth not found')
        return
      }

      try {
        const res = await axios.get(
          `http://127.0.0.1:8000/api/farmer/products/${farmerId}/`,
        )
        if (res.status === 200) {
          setfarmerProduct(res.data)
          console.log('Fetched products:', res.data)
        }
      } catch (error) {
        console.error('Error fetching products:', error)
      }
    }

    fetchProducts()
  }, [setfarmerProduct])
  const product_length=farmerProduct.length;



  return (
    
    <div>
         <div className='p-4 sm:p-6'>

          <h2 className='text-2xl font-bold text-emerald-700 mb-6'>
            Fresh Products
          </h2>


          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>

  {farmerProduct.map((item) => (

    <div
      key={item.id}
      className='bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition'
    >

      <img
  src={`http://127.0.0.1:8000${item.product_image}`}
  alt={item.product_name}
  className='w-full h-44 object-cover'
/>

      <div className='p-4'>

        <div className='flex items-center justify-between mb-2'>

          <h3 className='font-semibold text-lg text-gray-800'>
            {item.name}
          </h3>

          <Heart className='text-red-400 cursor-pointer' size={20} />

        </div>

        <p className='text-sm text-gray-600'>
            category:
            <span className='font-bold text-emerald-700 ml-1'>
              {item.category}
            </span>
          </p>

        <p className='text-sm text-gray-500 line-clamp-2'>
          {item.description}
        </p>

        <div className='mt-4 space-y-1'>
          
          <p className='text-sm text-gray-600'>
            Available:
            <span className='font-bold text-emerald-700 ml-1'>
              {item.quantity}/kg
            </span>
          </p>


          <p className='text-sm text-gray-600'>
            Normal Price:
            <span className='font-bold text-emerald-700 ml-1'>
              ₹{item.normal_price}/kg
            </span>
          </p>

          <p className='text-sm text-gray-600'>
            Bulk Price:
            <span className='font-bold text-emerald-700 ml-1'>
              ₹{item.bulk_price}/kg
            </span>
          </p>

        </div>

        {/* <button className='w-full mt-4 bg-emerald-600 hover:bg-emerald-700 text-white py-2 rounded-xl font-medium transition'>
          Buy Now
        </button> */}

      </div>

    </div>

  ))}

</div>

        </div>

    </div>
  )
}

export default MyProduct