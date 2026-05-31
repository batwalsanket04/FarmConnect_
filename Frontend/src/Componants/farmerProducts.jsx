import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ArrowLeft, Package, User2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
 


const FarmerProducts = () => {
    const {id}=useParams();
    const [products,setProducts]=useState([]);

    useEffect(()=>{
        const fetchProducts=async() => {
            try {
                const res = await axios.get(`http://127.0.0.1:8000/api/farmer/products/${id}/`)
                setProducts(res.data)
                console.log(res.data)
            } catch (error) {
                console.log(error)
            }
        }

        fetchProducts();
    },[id])

   return (
<div className="min-h-screen bg-slate-100 p-6">

  {/* Back */}
  <button
    onClick={() => navigate(-1)}
    className="flex items-center gap-2 text-green-700 font-medium mb-6"
  >
    <ArrowLeft size={20} />
    Farmers
  </button>

  {/* Farmer Profile */}
  <div className="bg-white rounded-3xl shadow-md p-6 mb-8">

    <div className="flex flex-col md:flex-row md:items-center md:justify-between">

      <div className="flex items-center gap-5">

        <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center">
          <User2 size={50} className="text-green-700" />
        </div>

        <div>
          <h1 className="text-3xl font-bold">
            {products[0]?.farmer_name}
          </h1>

          <p className="text-green-600">
            {products[0]?.farmer_name}
          </p>
        </div>

      </div>

      <div className="grid grid-cols-3 gap-4 mt-5 md:mt-0">

        <div className="bg-green-50 rounded-xl p-4 text-center">
          <p className="font-bold text-xl">
            {products.length}
          </p>
          <p className="text-xs text-gray-500">
            Products
          </p>
        </div>

        <div className="bg-yellow-50 rounded-xl p-4 text-center">
          <p className="font-bold text-xl">
            4.8
          </p>
          <p className="text-xs text-gray-500">
            Rating
          </p>
        </div>

        <div className="bg-blue-50 rounded-xl p-4 text-center">
          <p className="font-bold text-xl">
            Fast
          </p>
          <p className="text-xs text-gray-500">
            Delivery
          </p>
        </div>

      </div>

    </div>

  </div>

  {/* Products Heading */}
  <div className="flex justify-between items-center mb-5">

    <h2 className="text-2xl font-bold">
      Products
    </h2>

    <span className="bg-green-600 text-white px-4 py-2 rounded-full text-sm">
      {products.length} Items
    </span>

  </div>

  {/* Product Cards */}
  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">

    {products.map((product) => (
      <div
        key={product.id}
        className="bg-white rounded-3xl shadow-md p-3 hover:-translate-y-1 transition"
      >

        <div className="relative">
          <img
            src={`http://127.0.0.1:8000${product.product_image}`}
            alt=""
            className="w-full h-36 rounded-2xl object-cover"
          />

          <span className="absolute top-2 right-2 bg-green-600 text-white text-xs px-2 py-1 rounded-full">
            Fresh
          </span>
        </div>

        <h3 className="font-semibold mt-3">
          {product.product_name}
        </h3>

        <p className="text-green-700 text-xl font-bold mt-1">
          ₹{product.normal_price}
        </p>

        <p className="text-xs text-gray-500">
          Available: {product.quantity}
        </p>

        <button className="w-full mt-3 bg-green-700 text-white py-2 rounded-xl">
          Add To Cart
        </button>

      </div>
    ))}

  </div>

</div>
);
}

export default FarmerProducts