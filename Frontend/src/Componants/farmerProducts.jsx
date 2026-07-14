import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { API_BASE_URL, assetUrl } from '../utils/api';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, BadgeCheck, Leaf, Package, ShoppingCart, Sparkles, User2 } from 'lucide-react';
import { useAppContext } from '../context/Context';

const FarmerProducts = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useAppContext();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [addedProductId, setAddedProductId] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${API_BASE_URL}/api/farmer/products/${id}/`);
        setProducts(res.data || []);
      } catch (error) {
        console.log(error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [id]);

  const handleAddToCart = (product) => {
    addToCart(product);
    setAddedProductId(product.id);
    window.setTimeout(() => setAddedProductId(null), 1200);
  };

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#f8fff8_0%,#ffffff_100%)] p-6 lg:p-8">
      <div className="mx-auto max-w-7xl">
        <button
          onClick={() => navigate(-1)}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white px-4 py-2 text-sm font-semibold text-emerald-700 shadow-sm transition hover:bg-emerald-50"
        >
          <ArrowLeft size={18} />
          Back to farmers
        </button>

        <div className="mb-8 overflow-hidden rounded-[30px] border border-emerald-100 bg-white shadow-[0_15px_45px_-20px_rgba(5,150,105,0.35)]">
          <div className="bg-gradient-to-r from-emerald-700 via-emerald-600 to-lime-500 p-8 text-white">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div className="flex items-center gap-5">
                <div className="flex h-24 w-24 items-center justify-center rounded-full border border-white/70 bg-white/90 text-emerald-700 shadow-lg">
                  <User2 size={46} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h1 className="text-3xl font-semibold">
                      {products[0]?.farmer_name || 'Trusted Farmer'}
                    </h1>
                    <BadgeCheck size={20} />
                  </div>
                  <p className="mt-2 text-sm text-emerald-50">
                    Fresh produce, fair prices, and fast delivery.
                  </p>
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                <div className="rounded-2xl bg-white/15 px-4 py-3 text-center backdrop-blur">
                  <p className="text-xl font-semibold">{products.length}</p>
                  <p className="text-xs uppercase tracking-[0.25em] text-emerald-50">Products</p>
                </div>
                <div className="rounded-2xl bg-white/15 px-4 py-3 text-center backdrop-blur">
                  <p className="text-xl font-semibold">4.8</p>
                  <p className="text-xs uppercase tracking-[0.25em] text-emerald-50">Rating</p>
                </div>
                <div className="rounded-2xl bg-white/15 px-4 py-3 text-center backdrop-blur">
                  <p className="text-xl font-semibold">Fast</p>
                  <p className="text-xs uppercase tracking-[0.25em] text-emerald-50">Delivery</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-1 text-sm font-medium text-emerald-700">
              <Sparkles size={16} /> Fresh from the farm
            </div>
            <h2 className="mt-3 text-2xl font-semibold text-slate-900">Available products</h2>
          </div>
          <div className="inline-flex items-center gap-2 rounded-full bg-emerald-600 px-4 py-2 text-sm font-medium text-white">
            <Package size={16} /> {products.length} items
          </div>
        </div>

        {loading ? (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="animate-pulse rounded-[24px] border border-emerald-100 bg-white p-4 shadow-sm">
                <div className="h-40 rounded-[18px] bg-emerald-100" />
                <div className="mt-4 h-4 w-24 rounded bg-slate-100" />
                <div className="mt-3 h-5 w-20 rounded bg-slate-100" />
                <div className="mt-4 h-10 rounded-xl bg-emerald-100" />
              </div>
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="rounded-[24px] border border-dashed border-emerald-200 bg-white p-10 text-center shadow-sm">
            <p className="text-lg font-semibold text-slate-700">No products available right now.</p>
            <p className="mt-2 text-sm text-slate-500">Please check back later for fresh farm produce.</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {products.map((product) => (
              <div
                key={product.id}
                className="overflow-hidden rounded-[24px] border border-emerald-100 bg-white shadow-[0_10px_35px_-18px_rgba(5,150,105,0.35)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_45px_-20px_rgba(5,150,105,0.45)]"
              >
                <div className="relative">
                  <img
                    src={product.product_image ? assetUrl(product.product_image) : 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=900&q=80'}
                    alt={product.product_name}
                    className="h-44 w-full object-cover"
                  />
                  <div className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-emerald-700 backdrop-blur">
                    <Leaf size={14} /> Fresh
                  </div>
                </div>

                <div className="p-5">
                  <h3 className="text-lg font-semibold text-slate-900">{product.product_name}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    Premium quality produce sourced directly from the farm.
                  </p>

                  <div className="mt-4 flex items-center justify-between">
                    <div>
                      <p className="text-xs uppercase tracking-[0.25em] text-slate-400">Price</p>
                      <p className="text-xl font-bold text-emerald-700">₹{product.normal_price}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs uppercase tracking-[0.25em] text-slate-400">Available</p>
                      <p className="text-sm font-semibold text-slate-700">{product.quantity} {product.unit}</p>
                    </div>
                  </div>

                  <button
                    onClick={() => handleAddToCart(product)}
                    className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 font-medium text-white transition hover:bg-emerald-700"
                  >
                    <ShoppingCart size={18} />
                    {addedProductId === product.id ? 'Added to cart' : 'Add to cart'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FarmerProducts;