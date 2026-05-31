import React, { useContext, useState } from "react";
import {
  Upload,
  Plus
} from "lucide-react";
import { useAppContext } from "../../context/Context";
import axios from "axios";

const AddProduct = () => {

  const{farmerProduct,setfarmerProduct}=useAppContext();

    const [addfarmerProduct,setaddfarmerProduct]=useState({
   product_image: null,
    product_name: '',
    category:'',
    variety: '',
    quantity: '',
    normal_price: '',
    bulk_price: '',
    description: '',
    call: false,
    whatsapp: false

  })

    const [preview, setPreview] = useState(null);

  



 const handleForm = (e) => {
  const { name, value, files, type, checked } = e.target;

  if (type === "file") {

  console.log(files[0]);

  setaddfarmerProduct({
    ...addfarmerProduct,
    [name]: files[0],
  });

  setPreview(URL.createObjectURL(files[0]));
}

  else if (type === "checkbox") {
    setaddfarmerProduct({
      ...addfarmerProduct,
      [name]: checked,
    });
  }

  else {
    setaddfarmerProduct({
      ...addfarmerProduct,
      [name]: value,
    });
  }
  console.log(addfarmerProduct)
};

const url= "http://127.0.0.1:8000/api/farmer/add-product/"

const submitForm = async (e) => {

  e.preventDefault();

 

  try {

    const formData = new FormData();

    Object.entries(addfarmerProduct).forEach(([key, value]) => {

  if (typeof value === "boolean") {
    formData.append(key, value ? "True" : "False");
  }

  else {
    formData.append(key, value);
  }

});


      
    // send farmer id
    const farmerId =
      localStorage.getItem("farmer_id") ||
      JSON.parse(localStorage.getItem("auth"))?.farmer?.id;

    formData.append("farmer", farmerId);
    console.log(farmerId); // showing id correctly in console

    const res = await axios.post(url, formData);
    if (res.data.product) {
      setfarmerProduct([...farmerProduct, res.data.product]);
    }
    console.log(res.data);
    window.alert(res.data.message);
    setaddfarmerProduct({

       product_image: null,
    product_name: '',
    category:'',
    variety: '',
    quantity: '',
    normal_price: '',
    bulk_price: '',
    description: '',
    call: false,
    whatsapp: false

    })

  } catch (error) {

  console.log(error.response?.data);

  window.alert(
    error.response?.data?.error || "Something went wrong"
  );

}
};

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

  <form onSubmit={submitForm} className="bg-white mx-auto rounded-2xl shadow-lg p-5 max-w-2xl">
    {/* IMAGE UPLOAD */}

    <div className="mb-6">

      

      <div className="flex justify-center">

        <label className="relative w-28 h-28 rounded-2xl border-2 border-dashed border-emerald-400 bg-emerald-50 flex flex-col items-center justify-center cursor-pointer hover:bg-emerald-100 transition overflow-hidden">

  {preview ? (
    <img
      src={preview}
      alt="preview"
      className="w-full h-full object-cover"  
    />
  ) : (
    <>
      <div className="absolute top-2 right-2 bg-emerald-600 text-white p-1 rounded-full">
        <Plus size={14} />
      </div>
      <Upload className="text-emerald-600 mb-1" size={28} />
      <p className="text-xs text-emerald-700 font-medium">Upload</p>
    </>
  )}

  <input
    id="product_image"
    name="product_image"
    type="file"
    accept="image/*"
    onChange={handleForm}
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
            onChange={handleForm}
          name="product_name"
          value={addfarmerProduct.product_name}
          placeholder="Product name"
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-emerald-500"
        />

      </div>


      <div>

        <label className="block mb-1 text-sm font-medium text-gray-700">
          Category
        </label>

        <select
        name="category"
            onChange={handleForm}
        value={addfarmerProduct.category}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-emerald-500"
        >
          <option value="">Select Category</option>
          <option >Vegetables</option>

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
        name="variety"
            onChange={handleForm}
          type="text"
          value={addfarmerProduct.variety}
          placeholder="Organic / Hybrid"
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-emerald-500"
        />

      </div>


      <div>

        <label className="block mb-1 text-sm font-medium text-gray-700">
          Quantity
        </label>

        <input
        name="quantity"
          type="number"
            onChange={handleForm}
          value={addfarmerProduct.quantity}
          placeholder="50 Kg"
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-emerald-500"
        />

      </div>


      <div>

        <label className="block mb-1 text-sm font-medium text-gray-700">
          Normal Price
        </label>

        <input
        name="normal_price"
          type="number"
            onChange={handleForm}
          value={addfarmerProduct.normal_price}
          placeholder="₹ / KG"
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-emerald-500"
        />

      </div>


      <div>

        <label className="block mb-1 text-sm font-medium text-gray-700">
          Bulk Price
        </label>

        <input
        name="bulk_price"
        value={addfarmerProduct.bulk_price}
            onChange={handleForm}
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
      name="description"
      value={addfarmerProduct.description}
            onChange={handleForm}
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

          <input name="call" type="checkbox" checked={addfarmerProduct.call} onChange={handleForm} />

          Call

        </label>

        <label className="flex items-center gap-2 bg-emerald-50 px-3 py-2 rounded-lg text-sm cursor-pointer">

          <input name="whatsapp"  type="checkbox" checked={addfarmerProduct.whatsapp} onChange={handleForm} />

          WhatsApp

        </label>

      </div>

    </div>


    {/* BUTTON */}

    <div className="mt-6">

      <button type="submit" className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2.5 rounded-lg text-sm font-semibold shadow-md transition">

        Add Product

      </button>

    </div>

  </form>

</div>
  );
};

export default AddProduct;