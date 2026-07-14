import React from 'react'
import logo from '../assets/OIP.webp'

const Footer = () => {
  return (
    <div>
       <footer id="contact" className="bg-slate-900 py-10 text-center text-slate-300">
          <h1 className="text-xl md:text-2xl font-semibold tracking-wide flex align-center justify-center items-center gap-2">
                  <span className="text-amber-300"><img className="w-[60px] rounded-full " src={logo} alt="" /></span> FarmConnect
                </h1>

        <p className="mt-3">
          Connecting Farmers and Buyers Through Technology.
        </p>

        <p className="mt-6 text-sm">
          © 2026 FarmConnect. All Rights Reserved.
        </p>
      </footer>
    </div>
  )
}

export default Footer