import React from "react";
import {
  Upload,
  Plus
} from "lucide-react";

const AddProduct = () => {
  return (

    <div className="pt-[90px] p-4 bg-gradient-to-br from-emerald-50 to-green-100 min-h-screen">

  {/* PAGE TITLE */}

  <div className="mb-5 text-center">

    <h1 className="text-2xl  font-bold text-emerald-700">
      Add Product
    </h1>

    <p className="text-sm text-gray-500 mt-1">
      Upload your fresh farm products
    </p>

  </div>


  {/* FORM CARD */}

  <div className="bg-white mx-auto rounded-2xl shadow-lg p-5 max-w-2xl">

    {/* IMAGE UPLOAD */}

    <div className="mb-6">

      <label className="text-base font-semibold text-gray-700 mb-3 block">
        Product Image
      </label>

      <div className="flex justify-center">

        <label className="relative w-28 h-28 rounded-2xl border-2 border-dashed border-emerald-400 bg-emerald-50 flex flex-col items-center justify-center cursor-pointer hover:bg-emerald-100 transition">

          <div className="absolute top-2 right-2 bg-emerald-600 text-white p-1 rounded-full">

            <Plus size={14} />

          </div>

          <Upload className="text-emerald-600 mb-1" size={28} />

          <p className="text-xs text-emerald-700 font-medium">
            Upload
          </p>

          <input
            type="file"
            className="hidden"
          />

        </label>

      </div>

    </div>


    {/* FORM GRID */}

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

      <div>

        <label className="block mb-1 text-sm font-medium text-gray-700">
          Product Name
        </label>

        <input
          type="text"
          placeholder="Product name"
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-emerald-500"
        />

      </div>


      <div>

        <label className="block mb-1 text-sm font-medium text-gray-700">
          Category
        </label>

        <select
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-emerald-500"
        >

          <option>Vegetables</option>

          <option>Fruits</option>

          <option>Grains</option>

          <option>Dairy</option>

        </select>

      </div>


      <div>

        <label className="block mb-1 text-sm font-medium text-gray-700">
          Variety
        </label>

        <input
          type="text"
          placeholder="Organic / Hybrid"
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-emerald-500"
        />

      </div>


      <div>

        <label className="block mb-1 text-sm font-medium text-gray-700">
          Quantity
        </label>

        <input
          type="text"
          placeholder="50 KG"
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-emerald-500"
        />

      </div>


      <div>

        <label className="block mb-1 text-sm font-medium text-gray-700">
          Normal Price
        </label>

        <input
          type="number"
          placeholder="₹ / KG"
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-emerald-500"
        />

      </div>


      <div>

        <label className="block mb-1 text-sm font-medium text-gray-700">
          Bulk Price
        </label>

        <input
          type="number"
          placeholder="₹ / KG"
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-emerald-500"
        />

      </div>

    </div>


    {/* DESCRIPTION */}

    <div className="mt-4">

      <label className="block mb-1 text-sm font-medium text-gray-700">
        Description
      </label>

      <textarea
        rows="4"
        placeholder="Write product details..."
        className="w-full border border-gray-300 rounded-xl px-3 py-2 text-sm outline-none focus:border-emerald-500 resize-none"
      ></textarea>

    </div>


    {/* CONTACT */}

    <div className="mt-4">

      <label className="block mb-2 text-sm font-medium text-gray-700">
        Contact Options
      </label>

      <div className="flex gap-3">

        <label className="flex items-center gap-2 bg-emerald-50 px-3 py-2 rounded-lg text-sm cursor-pointer">

          <input type="checkbox" />

          Call

        </label>

        <label className="flex items-center gap-2 bg-emerald-50 px-3 py-2 rounded-lg text-sm cursor-pointer">

          <input type="checkbox" />

          WhatsApp

        </label>

      </div>

    </div>


    {/* BUTTON */}

    <div className="mt-6">

      <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2.5 rounded-lg text-sm font-semibold shadow-md transition">

        Add Product

      </button>

    </div>

  </div>

</div>
  );
};

export default AddProduct;