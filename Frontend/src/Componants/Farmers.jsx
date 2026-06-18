import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Badge, Contact, Locate, LocateFixedIcon, MapIcon, MapPin, Phone, User2, User2Icon, UserCircle, UserCircleIcon, UserCog2Icon, UserPlus2, Verified } from "lucide-react";

const Farmers = () => {
  const [AllFarmers, setAllFarmers] = useState([]);
  const navigate = useNavigate();

const [selectedFarmer, setSelectedFarmer] = useState(null);
const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchFarmers = async () => {
      try {
        const res = await axios.get(
          "http://127.0.0.1:8000/api/farmer/all-farmers/"
        );

        setAllFarmers(res.data);
      } catch (error) {
        console.log(error);
      }
    };

   

    fetchFarmers();
    
  }, []);
  
  return (
<div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
  {AllFarmers.map((farmer) => (
    <div
      key={farmer.id}
      onClick={() => navigate(`/farmer/${farmer.id}`)}
      className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer overflow-hidden border border-emerald-100"
    >
      <div className="flex">

        {/* Left Section */}
        <div className="w-32 bg-gradient-to-b from-emerald-600 to-green-500 flex flex-col items-center justify-center p-4">

          <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center shadow-lg">
            <User2 size={40} className="text-emerald-700" />
          </div>

          <div className="mt-3 bg-white/20 text-white text-xs px-3 py-1 rounded-full">
            Verified
          </div>

        </div>

        {/* Right Section */}
        <div className="flex-1 p-5">

          <h2 className="text-2xl font-bold text-gray-800">
            {farmer.farmer_name}
          </h2>

          <p className="text-sm text-emerald-600 font-medium mt-1">
            Trusted Farmer
          </p>

          <div className="mt-5 space-y-3">

            <div className="flex items-center gap-3">
              <MapPin size={18} className="text-emerald-600" />
              <span className="text-gray-600">
                {farmer.location}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <Phone size={18} className="text-emerald-600" />
              <span className="text-gray-600">
                {farmer.phone}
              </span>
            </div>

          </div>

          {/* Footer */}
          <div className="flex justify-between items-center mt-6">

            <div>
              <p className="text-xs text-gray-400">
                Fresh Farm Products
              </p>

              <h4 className="font-semibold text-emerald-700">
                Direct From Farmer
              </h4>
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/user-dashboard/farmer/${farmer.id}`);
              }}
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2 rounded-xl font-medium transition"
            >
              View Store →
            </button>

          </div>

        </div>

      </div>
    </div>
  ))}
</div>
 

);
};

export default Farmers;