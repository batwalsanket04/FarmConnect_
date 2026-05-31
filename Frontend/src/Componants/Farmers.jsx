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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-5">
  {AllFarmers.map((farmer) => (
  <div
  key={farmer.id}
  onClick={() => navigate(`/farmer/${farmer.id}`)}
  className="bg-white/70 backdrop-blur-lg border border-white/20 rounded-3xl p-6 shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer"
>
  <div className="flex items-center gap-4 ">
    <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center">
      <User2 size={40} className="text-green-700" />
    </div>

    <div>
  <h2 className="text-xl font-bold text-gray-800">
    {farmer.farmer_name}
  </h2>

  <p className="flex items-center gap-2 text-gray-500 mt-2">
    <MapPin size={16} className="shrink-0 text-green-600" />
    <span>{farmer.location}</span>
  </p>

  <p className="flex items-center gap-2 text-gray-500 mt-1">
    <Phone size={16} className="shrink-0 text-green-600" />
    <span>{farmer.phone}</span>
  </p>

<span className="inline-flex items-center gap-1 mt-3 bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full">
  <Verified size={14} className="shrink-0" />
  Verified Farmer
</span>
</div>
  </div>

  <button onClick={(e)=>{
    e.stopPropagation();
   navigate(`/user-dashboard/farmer/${farmer.id}`)

  }} className="w-full mt-6 bg-green-700 text-white py-3 rounded-xl cursor-pointer">
    View Products
  </button>
</div>
  ))}
</div>

 

);
};

export default Farmers;