import React, { useState } from 'react'

const FarmerForms = () => {

  const [isLogin, setIsLogin] = useState(true)

  const [form, setForm] = useState({

    farmer_name: '',
    phone: '',
    location: '',
    email: '',
    password: ''

  })

  const handleChange = (e) => {

    const { name, value } = e.target

    setForm({
      ...form,
      [name]: value
    })

  }

  return (

    <div className='min-h-screen bg-gradient-to-br from-emerald-50 to-green-100 flex items-center justify-center px-4'>

      <div className='w-full mt-2 mb-2 max-w-[350px] bg-white shadow-xl rounded-2xl p-4 border border-emerald-100'>

        {/* TOP */}

        <div className='text-center mb-5'>

          <h1 className='text-2xl font-bold text-emerald-700'>
            Farmer Portal
          </h1>

          <p className='text-gray-500 mt-2'>
            Sell Products Directly To Buyers
          </p>

        </div>


        {/* TOGGLE */}

        <div className='flex bg-emerald-100 rounded-xl overflow-hidden mb-6'>

          <button
            onClick={() => setIsLogin(true)}
            className={`w-1/2 py-3 font-semibold transition-all duration-300 ${
              isLogin
                ? 'bg-emerald-600 text-white'
                : 'text-emerald-700'
            }`}
          >
            Login
          </button>

          <button
            onClick={() => setIsLogin(false)}
            className={`w-1/2 py-3 font-semibold transition-all duration-300 ${
              !isLogin
                ? 'bg-emerald-600 text-white'
                : 'text-emerald-700'
            }`}
          >
            Register
          </button>

        </div>


        {/* FORM */}

        <form className='space-y-2'>

          {!isLogin && (

            <>

              <input
                type='text'
                placeholder='Farmer Name'
                name='farmer_name'
                value={form.farmer_name}
                onChange={handleChange}
                className='w-full border border-emerald-300 p-2 rounded-xl outline-none focus:ring-2 focus:ring-emerald-500'
              />


              <input
                type='text'
                placeholder='Phone Number'
                name='phone'
                value={form.phone}
                onChange={handleChange}
                className='w-full border border-emerald-300 p-2 rounded-xl outline-none focus:ring-2 focus:ring-emerald-500'
              />


              <input
                type='text'
                placeholder='Location'
                name='location'
                value={form.location}
                onChange={handleChange}
                className='w-full border border-emerald-300 p-2 rounded-xl outline-none focus:ring-2 focus:ring-emerald-500'
              />

            </>

          )}


          {/* COMMON FIELDS */}

          <input
            type='email'
            placeholder='Email Address'
            name='email'
            value={form.email}
            onChange={handleChange}
            className='w-full border border-emerald-300 p-2 rounded-xl outline-none focus:ring-2 focus:ring-emerald-500'
          />


          <input
            type='password'
            placeholder='Password'
            name='password'
            value={form.password}
            onChange={handleChange}
            className='w-full border border-emerald-300 p-2 rounded-xl outline-none focus:ring-2 focus:ring-emerald-500'
          />


          {/* BUTTON */}

          <button
            className='w-full bg-emerald-600 hover:bg-emerald-700 transition-all duration-300 text-white py-2 rounded-xl font-semibold shadow-lg'
          >
            {isLogin ? 'Login' : 'Create Account'}
          </button>

        </form>


        {/* BOTTOM */}

        <p className='text-center text-sm text-gray-500 mt-4'>

          {isLogin ? (

            <>

              Don&apos;t have an account?

              <span
                onClick={() => setIsLogin(false)}
                className='text-emerald-700 font-semibold cursor-pointer ml-1'
              >
                Register
              </span>

            </>

          ) : (

            <>

              Already have an account?

              <span
                onClick={() => setIsLogin(true)}
                className='text-emerald-700 font-semibold cursor-pointer ml-1'
              >
                Login
              </span>

            </>

          )}

        </p>

      </div>

    </div>

  )
}

export default FarmerForms