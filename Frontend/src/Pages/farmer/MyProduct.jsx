import { Heart } from 'lucide-react'
import React, { useEffect } from 'react'
import { useAppContext } from '../../context/Context'
import axios from 'axios'

const MyProduct = () => {
  const { farmerProduct, setfarmerProduct } = useAppContext()

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
    
<div className="max-w-5xl mx-auto space-y-5">
  {farmerProduct.map((item) => (
    <div
      key={item.id}
      className="bg-white rounded-2xl shadow-lg p-4 grid md:grid-cols-[220px_1fr] gap-4 hover:shadow-xl transition"
    >
      {/* Image */}
      <img
        src={`http://127.0.0.1:8000${item.product_image}`}
        alt={item.product_name}
        className="w-full md:w-48 h-40 object-cover rounded-xl"
      />

      {/* Content */}
      <div className="flex-1">
       <div className="flex justify-between items-start">
  <div>
    <h3 className="text-xl font-bold text-gray-800">
      {item.product_name}
    </h3>

    <span className="inline-block mt-1 bg-emerald-100 text-emerald-700 text-xs px-3 py-1 rounded-full">
      {item.category}
    </span>
  </div>

  <div className="text-right">
    <p className="text-xs text-gray-500">Price</p>
    <p className="text-2xl font-bold text-emerald-600">
      ₹{item.normal_price}
    </p>
  </div>
</div>

        <p className="text-gray-500 text-sm mt-3">
          {item.description}
        </p>
<div className="grid grid-cols-3 gap-3 mt-4">
          <div className="bg-gray-100 px-3 py-2 rounded-lg">
            <p className="text-xs text-gray-500">Stock</p>
            <p className="font-semibold">
              {item.quantity} {item.unit}
            </p>
          </div>

          <div className="bg-gray-100 px-3 py-2 rounded-lg">
            <p className="text-xs text-gray-500">Bulk Price</p>
            <p className="font-semibold">
              ₹{item.bulk_price}
            </p>
          </div>
      

          <div className="bg-gray-100 px-3 py-2 rounded-lg">
            <p className="text-xs text-gray-500">Variety</p>
            <p className="font-semibold">
              {item.variety}
            </p>
          </div>
        </div>

        <div className="flex gap-3 mt-5">
          <button className="px-5 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700">
            Edit
          </button>

          <button onClick={()=>handleDelete(item.id)} className="px-5 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600">
            Delete
          </button>
        </div>
      </div>
    </div>
  ))}
</div>
  )
}

export default MyProduct