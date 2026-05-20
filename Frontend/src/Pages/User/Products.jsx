import { Heart } from 'lucide-react'
import React from 'react'
import { useAppContext } from '../../context/Context';
import { products } from '../../assets/assets';

const Products = () => {
  const { addToCart,farmerProduct } = useAppContext();

  
  const data=JSON.parse(localStorage.getItem("farmerProducts"))
  


 

  return (
    <div>
      <div className='p-4 sm:p-6'>

        <h2 className='text-2xl font-bold text-emerald-700 mb-6'>
          Fresh Products
        </h2>

        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>

          {farmerProduct.map((product) => (   
            <div key={product.id} className='bg-white rounded-2xl shadow-md overflow-hidden'>

              <img
                src={product.image}
                alt={product.name}
                className='w-full h-40 object-cover'
              />

              <div className='p-4'>
                <div className='flex items-center justify-between'>
                  <h3 className='font-semibold text-lg'>{product.name}</h3>
                  <Heart className='text-red-400 cursor-pointer' />
                </div>

                <p className='text-sm text-gray-500 mt-1'>{product.description}</p>

                <div className='mt-4 space-y-1'>
          
          <p className='text-sm text-gray-600'>
            Available:
            <span className='font-bold text-emerald-700 ml-1'>
              {product.available}/kg
            </span>
          </p>


          <p className='text-sm text-gray-600'>
            Normal Price:
            <span className='font-bold text-emerald-700 ml-1'>
              ₹{product.normal_price}/kg
            </span>
          </p>

          <p className='text-sm text-gray-600'>
            Bulk Price:
            <span className='font-bold text-emerald-700 ml-1'>
              ₹{product.bulk_price}/kg
            </span>
          </p>

        </div>

                <div className='flex items-center justify-between mt-4'>
                  <p className='text-emerald-700 font-bold text-lg'>₹{(product.normal_price || 0)}/kg</p>

                  <button
                    onClick={() => {
                      addToCart(product);        
                      console.log(product);      
                    }}
                    className='bg-emerald-600 text-white px-4 py-2 rounded-lg'
                  >
                    add to cart
                  </button>
                </div>
              </div>

            </div>
          ))}

        </div>
      </div>
    </div>
  )
}

export default Products