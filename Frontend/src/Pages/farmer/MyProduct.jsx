import { Heart } from 'lucide-react'
import React from 'react'

const MyProduct = () => {
  return (
    <div>
         <div className='p-4 sm:p-6'>

          <h2 className='text-2xl font-bold text-emerald-700 mb-6'>
            Fresh Products
          </h2>


          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>

            {/* CARD */}

            <div className='bg-white rounded-2xl shadow-md overflow-hidden'>

              <img
                src='https://images.unsplash.com/photo-1542838132-92c53300491e'
                alt='Tomato'
                className='w-full h-40 object-cover'
              />


              <div className='p-4'>

                <div className='flex items-center justify-between'>

                  <h3 className='font-semibold text-lg'>
                    Tomatoes
                  </h3>

                  <Heart className='text-red-400 cursor-pointer' />

                </div>


                <p className='text-sm text-gray-500 mt-1'>
                  Fresh organic tomatoes directly from farmers.
                </p>


                <div className='flex items-center justify-between mt-4'>

                  <p className='text-emerald-700 font-bold text-lg'>
                    ₹40/kg
                  </p>

                  <button className='bg-emerald-600 text-white px-4 py-2 rounded-lg'>
                    Buy
                  </button>

                </div>

              </div>

            </div>


            {/* CARD */}

            <div className='bg-white rounded-2xl shadow-md overflow-hidden'>

              <img
                src='https://images.unsplash.com/photo-1518977676601-b53f82aba655'
                alt='Potato'
                className='w-full h-40 object-cover'
              />


              <div className='p-4'>

                <div className='flex items-center justify-between'>

                  <h3 className='font-semibold text-lg'>
                    Potatoes
                  </h3>

                  <Heart className='text-red-400 cursor-pointer' />

                </div>


                <p className='text-sm text-gray-500 mt-1'>
                  Natural farm fresh potatoes.
                </p>


                <div className='flex items-center justify-between mt-4'>

                  <p className='text-emerald-700 font-bold text-lg'>
                    ₹30/kg
                  </p>

                  <button className='bg-emerald-600 text-white px-4 py-2 rounded-lg'>
                    Buy
                  </button>

                </div>

              </div>

            </div>
            <div className='bg-white rounded-2xl shadow-md overflow-hidden'>

              <img
                src='https://images.unsplash.com/photo-1518977676601-b53f82aba655'
                alt='Potato'
                className='w-full h-40 object-cover'
              />


              <div className='p-4'>

                <div className='flex items-center justify-between'>

                  <h3 className='font-semibold text-lg'>
                    Potatoes
                  </h3>

                  <Heart className='text-red-400 cursor-pointer' />

                </div>


                <p className='text-sm text-gray-500 mt-1'>
                  Natural farm fresh potatoes.
                </p>


                <div className='flex items-center justify-between mt-4'>

                  <p className='text-emerald-700 font-bold text-lg'>
                    ₹30/kg
                  </p>

                  <button className='bg-emerald-600 text-white px-4 py-2 rounded-lg'>
                    Buy
                  </button>

                </div>

              </div>

            </div>
            <div className='bg-white rounded-2xl shadow-md overflow-hidden'>

              <img
                src='https://images.unsplash.com/photo-1518977676601-b53f82aba655'
                alt='Potato'
                className='w-full h-40 object-cover'
              />


              <div className='p-4'>

                <div className='flex items-center justify-between'>

                  <h3 className='font-semibold text-lg'>
                    Potatoes
                  </h3>

                  <Heart className='text-red-400 cursor-pointer' />

                </div>


                <p className='text-sm text-gray-500 mt-1'>
                  Natural farm fresh potatoes.
                </p>


                <div className='flex items-center justify-between mt-4'>

                  <p className='text-emerald-700 font-bold text-lg'>
                    ₹30/kg
                  </p>

                  <button className='bg-emerald-600 text-white px-4 py-2 rounded-lg'>
                    Buy
                  </button>

                </div>

              </div>

            </div><div className='bg-white rounded-2xl shadow-md overflow-hidden'>

              <img
                src='https://images.unsplash.com/photo-1518977676601-b53f82aba655'
                alt='Potato'
                className='w-full h-40 object-cover'
              />


              <div className='p-4'>

                <div className='flex items-center justify-between'>

                  <h3 className='font-semibold text-lg'>
                    Potatoes
                  </h3>

                  <Heart className='text-red-400 cursor-pointer' />

                </div>


                <p className='text-sm text-gray-500 mt-1'>
                  Natural farm fresh potatoes.
                </p>


                <div className='flex items-center justify-between mt-4'>

                  <p className='text-emerald-700 font-bold text-lg'>
                    ₹30/kg
                  </p>

                  <button className='bg-emerald-600 text-white px-4 py-2 rounded-lg'>
                    Buy
                  </button>

                </div>

              </div>

            </div>

          </div>

        </div>

    </div>
  )
}

export default MyProduct