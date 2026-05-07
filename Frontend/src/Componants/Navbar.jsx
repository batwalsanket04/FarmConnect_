import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from '../assets/OIP.webp'

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const navigate=useNavigate()

  return (
    <nav className="bg-emerald-600 text-white shadow-md">
      <div className="flex items-center justify-between px-4 py-3 md:px-10">

        {/* LOGO */}
        <h1 className="text-xl md:text-2xl font-semibold tracking-wide flex items-center gap-2">
          <span className="text-amber-300"><img className="w-[60px] rounded-circle " src={logo} alt="" /></span> FarmConnect
        </h1>

        {/* HAMBURGER */}
        <button
          className="md:hidden text-2xl focus:outline-none"
          onClick={() => setOpen(!open)}
        >
          ☰
        </button>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex items-center space-x-6 font-medium">

         <button
         onClick={()=>navigate('/farmer')}
 
  className="hover:text-amber-300 transition duration-200"
>
  I am Farmer
</button>

<button
  onClick={() => navigate('/')}
  className="bg-amber-400 text-emerald-900 px-4 py-2 rounded-lg hover:bg-amber-300 transition duration-200 shadow"
>
  I am Buyer
</button>

        </div>
      </div>

      {/* MOBILE MENU */}
      {open && (
        <div className="md:hidden bg-emerald-700 px-4 pb-4 pt-2 space-y-3 animate-fadeIn">

          <button onClick={()=>navigate('/farmer')}   className="block w-full text-left py-2 border-b border-emerald-500 hover:text-amber-300">
            I am Farmer
          </button>

          <button
  onClick={() => navigate('/')}
  className="block w-full text-left py-2 bg-amber-400 text-emerald-900 rounded-md px-2"
>
  I am Buyer
</button>

        </div>
      )}
    </nav>
  );
}