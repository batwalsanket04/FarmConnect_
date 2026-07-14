import { Heart } from 'lucide-react'
import React, { useEffect, useMemo, useState } from 'react'
import { useAppContext } from '../../context/Context';
import Pegination from '../../Componants/Pegination'
import axios from 'axios';
import { API_BASE_URL, assetUrl } from '../../utils/api';

const Products = ({ selectedCategory, currentPage, setCurrentpage }) => {
  const { addToCart, farmerProduct, setfarmerProduct, searchTerm } = useAppContext();
  const [likedProducts, setLikedProducts] = useState(new Set());

  const toggleLike = (productId, event) => {
    event.stopPropagation();
    setLikedProducts((prev) => {
      const next = new Set(prev);
      if (next.has(productId)) {
        next.delete(productId);
      } else {
        next.add(productId);
      }
      return next;
    });
  }

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/farmer/get-products/`)
        setfarmerProduct(res.data);
      } catch (error) {
        console.log(error)
      }
    }

    fetchProduct();
  }, [setfarmerProduct])

  useEffect(() => {
    if (typeof setCurrentpage === 'function') {
      setCurrentpage(0)
    }
  }, [searchTerm, selectedCategory, setCurrentpage])

  
   


 

  const Page_size = 4;
  const start = (currentPage || 0) * Page_size
  const end = start + Page_size

  const filteredProducts = useMemo(() => {
    const q = (searchTerm || '').toString().trim().toLowerCase();
    const categoryFilter = (selectedCategory || 'All').toString().toLowerCase();

    const matchesCategory = (itemCategory) => {
      if (categoryFilter === 'all') return true;
      return itemCategory.includes(categoryFilter);
    }

    const rangeMatch = q.match(/(\d+)\s*-\s*(\d+)/);
    let min = null;
    let max = null;
    if (rangeMatch) {
      min = Number(rangeMatch[1]);
      max = Number(rangeMatch[2]);
    }

    return (farmerProduct || []).filter((item) => {
      const name = (item.product_name || item.name || '').toString().toLowerCase();
      const category = (item.category || '').toString().toLowerCase();
      const location = (item.location || item.farmer_location || (item.farmer && item.farmer.location) || '').toString().toLowerCase();
      const price = Number(item.normal_price || item.price || 0);

      if (!matchesCategory(category)) {
        return false;
      }

      if (!q) {
        return true;
      }

      if (rangeMatch) {
        if (isNaN(price)) return false;
        return price >= min && price <= max;
      }

      if (!isNaN(Number(q)) && q !== '') {
        return price <= Number(q) || name.includes(q) || category.includes(q) || location.includes(q);
      }

      return name.includes(q) || category.includes(q) || location.includes(q);
    });
  }, [farmerProduct, searchTerm, selectedCategory]);


  const paginatedProduct = filteredProducts.slice(start, end)

  return (
    <div>
      <div className='p-4 sm:p-6'>

        <h2 className='text-2xl font-bold text-emerald-700 mb-6'>
          Fresh Products
        </h2>

        {/* Search handled in navbar */}

        {paginatedProduct.length === 0 ? (
          <div className='rounded-2xl border border-dashed border-emerald-300 bg-emerald-50 p-8 text-center text-emerald-800'>
            <p className='text-lg font-semibold'>No products found.</p>
            <p className='mt-2 text-sm text-emerald-700'>Try a different keyword or clear the search field.</p>
          </div>
        ) : (
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
            {paginatedProduct.map((product) => (   
              <div key={product.id} className='bg-white rounded-2xl shadow-md overflow-hidden'>

               <img
  src={assetUrl(product.product_image)}
  alt={product.product_name}
  className='w-full h-44 object-cover'
/>

              <div className='p-4'>
                <div className='flex items-center justify-between'>
                  <h3 className='font-semibold text-lg'>{product.name}</h3>
                  <Heart
                    className={`cursor-pointer ${likedProducts.has(product.id) ? 'text-red-500' : 'text-red-400'}`}
                    onClick={(event) => toggleLike(product.id, event)}
                  />
                </div>

                <p className='text-sm text-gray-500 mt-1'>{product.description}</p>

                <div className='mt-4 space-y-1'>
          
          <p className='text-sm text-gray-600'>
            Available:
            <span className='font-bold text-emerald-700 ml-1'>
              {product.quantity}{product.unit}
            </span>
          </p>


          <p className='text-sm text-gray-600'>
            Normal Price:
            <span className='font-bold text-emerald-700 ml-1'>
              ₹{product.normal_price}/kg
            </span>
          </p>

          <p className='text-sm text-gray-600'>
            Bulk Price:
            <span className='font-bold text-emerald-700 ml-1'>
              ₹{product.bulk_price}/kg
            </span>
          </p>

        </div>

                <div className='flex items-center justify-between mt-4'>
                  <p className='text-emerald-700 font-bold text-lg'>₹{(product.normal_price || 0)}/kg</p>

                  <button
                    onClick={() => {
                      addToCart(product);        
                      console.log(product);      
                    }}
                    className='bg-emerald-600 text-white px-4 py-2 rounded-lg'
                  >
                    add to cart
                  </button>
                </div>
              </div>

            </div>
            ))}
          </div>
        )}
      </div>
      <Pegination
        itemCount={filteredProducts.length}
        currentPage={currentPage}
        setCurrentpage={setCurrentpage}
      />
    </div>
  )
}

export default Products