import { Heart } from 'lucide-react'
import React, { useEffect } from 'react'
import { useAppContext } from '../../context/Context'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const MyProduct = () => {
  const { farmerProduct, setfarmerProduct } = useAppContext()
  const nav=useNavigate();

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


  const handleDelete=async(product_id)=>
  {
    const confirmDelete=window.confirm("Are you sure..?")

    if(!confirmDelete) return;

    try
    {
      const res=await axios.delete(`http://127.0.0.1:8000/api/farmer/product/delete/${product_id}/`)

      if(res.status === 200)
      {
        setfarmerProduct((prev)=>prev.filter((item)=>item.id!==product_id))
        alert("Product deleted successfully")
      }
      else
      {
        throw new Error(`Unexpected status ${res.status}`)
      }
    }
    catch(error)
    {
      console.error("Error deleting product:",error)
      alert("Failed to delete product. Please try again.")
    }

  }



  return (
    
<div className="min-h-screen bg-slate-50 px-6 py-8">
  {/* Header */}
  <div className="flex items-center justify-between mb-8">
    <div>
      <h1 className="text-3xl font-bold tracking-tight text-slate-900">
        My Products
      </h1>
      <p className="text-gray-500 text-sm">
        {farmerProduct.length} Products
      </p>
    </div>
  </div>

  {farmerProduct.length === 0 ? (
    <div className="bg-white rounded-xl border p-10 text-center">
      <h2 className="font-semibold text-lg">No Products Found</h2>
      <p className="text-gray-500 text-sm mt-1">
        Start adding products to your store.
      </p>
    </div>
  ) : (
    <div className="space-y-5">
      {farmerProduct.map((item) => (
        <div
          key={item.id}
          className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300"
        >
          <div className="flex flex-col md:flex-row gap-5">
            {/* Image */}
            <img
              src={`http://127.0.0.1:8000${item.product_image}`}
              alt={item.product_name}
              className="w-28 h-28 rounded-2xl object-cover shadow-sm"
            />

            {/* Content */}
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-bold text-slate-800">
                    {item.product_name}
                  </h2>

                  <p className="text-sm text-slate-500 mt-1">
                    Product ID #{item.id}
                  </p>

                  <span className="inline-flex items-center gap-2 mt-3 px-4 py-2 rounded-full bg-emerald-50 text-emerald-700 font-medium">
                    <span className="flex items-center justify-center w-5 h-5 rounded-full bg-emerald-100">
                      <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse"></span>
                    </span>
                    Available
                  </span>
                </div>

                <div className="text-right">
                  <p className="text-xs uppercase tracking-wide text-slate-400">
                    Price
                  </p>

                  <p className="text-3xl font-bold text-emerald-600 mt-1">
                    ₹{item.normal_price}
                  </p>
                </div>
              </div>

              {/* Description */}
              <p className="text-slate-500 mt-5">
                {item.description}
              </p>

              {/* Product Info */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                <div className="bg-slate-50 rounded-xl p-4">
                  <p className="text-xs uppercase tracking-wide text-slate-400">
                    Category
                  </p>

                  <p className="font-semibold text-slate-800 mt-1">
                    {item.category}
                  </p>
                </div>

                <div className="bg-slate-50 rounded-xl p-4">
                  <p className="text-xs uppercase tracking-wide text-slate-400">
                    Stock
                  </p>

                  <p className="font-semibold text-slate-800 mt-1">
                    {item.quantity} {item.unit}
                  </p>
                </div>

                <div className="bg-slate-50 rounded-xl p-4">
                  <p className="text-xs uppercase tracking-wide text-slate-400">
                    Bulk Price
                  </p>

                  <p className="font-semibold text-slate-800 mt-1">
                    ₹{item.bulk_price}
                  </p>
                </div>

                <div className="bg-slate-50 rounded-xl p-4">
                  <p className="text-xs uppercase tracking-wide text-slate-400">
                    Variety
                  </p>

                  <p className="font-semibold text-slate-800 mt-1">
                    {item.variety}
                  </p>
                </div>
              </div>

              {/* Buttons */}
              <div className="mt-6 pt-5  flex justify-end gap-3">
                <button onClick={()=>nav(`/farmer-dashboard/edit-product/${item.id}`)} className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition">
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(item.id)}
                  className="px-6 py-2.5 bg-red-500 hover:bg-red-600 text-white rounded-xl transition"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )}
</div>
  )
}

export default MyProduct