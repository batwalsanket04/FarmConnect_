import React from 'react'
import banner from '../assets/main_banner_bg.png'
import bannerMobile from '../assets/main_banner_bg_sm.png'
import arrow2 from '../assets/black_arrow_icon.svg'
import arrow1 from '../assets/white_arrow_icon.svg'

import { Link } from 'react-router-dom'

const MainBanner = () => {
  return (

    <div className="relative p-3 sm:p-5 md:p-7">

      {/* Background Images */}

      <img
        src={banner}
        alt="banner"
        className="w-full hidden md:block object-cover rounded-2xl"
      />

      <img
        src={bannerMobile}
        alt="banner"
        className="w-full md:hidden object-cover rounded-2xl"
      />


      {/* Content */}

      <div
        className="absolute inset-0 flex flex-col items-center md:items-start justify-end md:justify-center
                   pb-10 sm:pb-16 md:pb-0 px-6 sm:px-8 md:pl-16 lg:pl-24"
      >

        <h1
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl
                     font-bold text-center md:text-left
                     max-w-full sm:max-w-md md:max-w-lg lg:max-w-2xl
                     leading-snug md:leading-tight"
        >
          Freshness You Can Trust, Saving You Will Love!
        </h1>


        {/* Buttons */}

        <div className="flex flex-col sm:flex-row items-center md:items-start gap-4 mt-6">

          {/* Shop Now */}

          <Link
            to="/products"
            className="group flex items-center gap-2 px-8 py-3
                       bg-green-700 hover:bg-green-600 transition
                       rounded text-white"
          >

            Shop Now

            <img
              className='w-4 transition group-hover:translate-x-1'
              src={arrow1}
              alt=""
            />

          </Link>


          {/* Explore Deals */}

          <Link
            to="/products"
            className="group hidden sm:flex items-center gap-2 px-8 py-3 transition"
          >

            Explore Deals

            <img
              className="w-4 transition group-hover:translate-x-1"
              src={arrow2}
              alt="arrow"
            />

          </Link>

        </div>

      </div>

    </div>
  )
}

export default MainBanner