import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const EditFarmerProduct = () => {
    const { id } = useParams();
    const nav=useNavigate();
    const [product, setProduct] = useState({
        product_name: "",
        category: "",
        normal_price: "",
        bulk_price: "",
        quantity: "",
        unit: "",
        variety: "",
        description: "",
        product_image: null
    })
    const [imagePreview, setImagePreview] = useState("")

   useEffect(() => {
     const fetchProductDetails = async () => {
        try {
            const res = await axios.get(`http://127.0.0.1:8000/api/farmer/product/${id}/`);
            const data = res.data || {};
            setProduct({
                product_name: data.product_name || "",
                category: data.category || "",
                normal_price: data.normal_price || "",
                bulk_price: data.bulk_price || "",
                quantity: data.quantity || "",
                unit: data.unit || "",
                variety: data.variety || "",
                description: data.description || "",
                product_image: data.product_image || null
            });
            setImagePreview(data.product_image ? `http://127.0.0.1:8000${data.product_image}` : "");
            console.log("Fetched product details:", data);
        } catch (error) {
          console.error("Error fetching product details:", error);
        }
     }

     if (id) {
        fetchProductDetails();
     }

   }, [id])

   const handleChange = (e) => {
    const { name, value, files, type } = e.target;

    if (type === "file" && files && files[0]) {
      const selectedFile = files[0];
      setProduct((prev) => ({
        ...prev,
        [name]: selectedFile,
      }));
      setImagePreview(URL.createObjectURL(selectedFile));
      return;
    }

    setProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
   }

   const editForm = async (e) => {
  e.preventDefault();

  try {
    const formData = new FormData();

    formData.append("product_name", product.product_name);
    formData.append("category", product.category);
    formData.append("normal_price", product.normal_price);
    formData.append("bulk_price", product.bulk_price);
    formData.append("quantity", product.quantity);
    formData.append("unit", product.unit);
    formData.append("variety", product.variety);
    formData.append("description", product.description);

    if (product.product_image instanceof File) {
      formData.append("product_image", product.product_image);
    }

    const res = await axios.put(
      `http://127.0.0.1:8000/api/farmer/product/edit/${id}/`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    console.log(res.data);
    alert("Product updated successfully");
    nav(-1);

  } catch (error) {
    console.error(error.response?.data || error);
  }
};

    
  return (
    <div className="min-h-screen bg-slate-50 px-6 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
          Edit Product
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Update your product information
        </p>
      </div>

      {/* Form Card */}
      <form onSubmit={editForm} className="bg-white rounded-2xl shadow-md p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Product Name */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Product Name
            </label>
            <input
              type="text"
              name="product_name"
              value={product.product_name}
              onChange={handleChange}
              placeholder="Enter product name"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Category
            </label>
            <input
              type="text"
              name="category"
              value={product.category}
              onChange={handleChange}
              placeholder="Enter category"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          {/* Normal Price */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Normal Price
            </label>
            <input
              type="number"
              name="normal_price"
              onChange={handleChange}
              value={product.normal_price}
              placeholder="₹ 0"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          {/* Bulk Price */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Bulk Price
            </label>
            <input
              type="number"
              name="bulk_price"
              onChange={handleChange}
              value={product.bulk_price}
              placeholder="₹ 0"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          {/* Quantity */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Quantity
            </label>
            <input
              type="number"
              name="quantity"
              onChange={handleChange}
              value={product.quantity}
              placeholder="Enter quantity"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          {/* Unit */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Unit
            </label>
            <input
              type="text"
              name="unit"
              onChange={handleChange}
              value={product.unit}
              placeholder="Kg / Litre"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          {/* Variety */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Variety
            </label>
            <input
              type="text"
              name="variety"
              onChange={handleChange}
              value={product.variety}
              placeholder="Enter variety"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          {/* Product Image */}
         {/* Product Image */}
<div className="md:col-span-2">
  <label className="block text-sm font-medium text-slate-700 mb-2">
    Product Image
  </label>

  <div className="flex flex-col md:flex-row items-start gap-6 rounded-xl border border-slate-200 bg-slate-50 p-5">

    {/* Image Preview */}
    <div className="flex-shrink-0">
      {imagePreview ? (
        <img
          src={imagePreview}
          alt="Product Preview"
          className="h-40 w-40 rounded-xl border border-slate-300 object-cover shadow-sm"
        />
      ) : (
        <div className="flex h-40 w-40 items-center justify-center rounded-xl border-2 border-dashed border-slate-300 bg-white text-sm text-slate-500">
          No Image
        </div>
      )}
    </div>

    {/* Upload Section */}
    <div className="flex-1">
      <input
        type="file"
        accept="image/*"
        name="product_image"
        onChange={handleChange}
        className="block w-full rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm file:mr-4 file:rounded-md file:border-0 file:bg-green-700 file:px-4 file:py-2 file:text-white hover:file:bg-green-800"
      />

      <p className="mt-3 text-sm text-slate-500">
        Upload a new image to replace the existing one.
      </p>
    </div>

  </div>
</div>
        </div>

        {/* Description */}
        <div className="mt-6">
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Description
          </label>

          <textarea
            rows="5"
            name="description"
            onChange={handleChange}
            value={product.description}
            placeholder="Enter product description..."
            className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          ></textarea>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3 mt-8 pt-6 border-t">
          <button
            onClick={() => nav(-1)}
            type="button"
            className="px-6 py-2.5 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-700 transition"
          >
            Cancel
          </button>

          <button
          
            type="submit"
            className="px-6 py-2.5 rounded-xl bg-green-700 hover:bg-green-800 text-white transition"
          >
            Update Product
          </button>
        </div>
      </form>
    </div>
  )
}

export default EditFarmerProduct