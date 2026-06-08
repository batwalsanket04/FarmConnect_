import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const FarmerForms = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const nav=useNavigate();

  const [form, setForm] = useState({
    farmer_name: "",
    phone: "",
    location: "",
    email: "",
    password: "",
    photo: null,
  });

  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setForm({ ...form, [name]: files[0] });
      setPreview(URL.createObjectURL(files[0]));
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const submitForm=async(e)=>{

    e.preventDefault();

      if(!isLogin)
      {
        const PassRegex= /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

        if (!PassRegex.test(form.password))
        {
          setError("Password must be at least 8 characters long and include uppercase, lowercase, number, and special character.");
          return;
        }
      }

      try{
        setLoading(true);

      const url=isLogin?"http://127.0.0.1:8000/api/farmer/login/":"http://127.0.0.1:8000/api/farmer/register/";

      const res=await axios.post(url,form);

      if(res.status===200 || res.status===201)
      {
        alert(res.data.message);

        setForm
        ({

    farmer_name: "",
    phone: "",
    location: "",
    email: "",
    password: "",

        });

        if(!isLogin)
        {
          setIsLogin(true);
        
        }
        else
        {
          // Store auth data in a consistent format
          const authData = {
            token: res.data.access_token || res.data.token,
            role: res.data.role || 'farmer', // Fallback to farmer if backend does not return role
            farmer: res.data.farmer
          };
          
          localStorage.setItem("auth", JSON.stringify(authData));
          localStorage.setItem("farmer_id", res.data.farmer.id);
          
          // Optional: Also store token separately for backward compatibility
          localStorage.setItem("farmerToken", authData.token);
          localStorage.setItem("role", authData.role);
          
          nav("/farmer-dashboard");
        }
      }
   
    }
    catch(error)
    {
      setError(error.response?.data?.error || "Something went wrong");
    }
    finally
    {
      setLoading(false);
    }



  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-green-100 flex items-center justify-center px-4">
      <div className="w-full mt-2 mb-2 max-w-[350px] bg-white shadow-xl rounded-2xl p-4 border border-emerald-100">

        {/* TOP */}
        <div className="text-center mb-5">
          <h1 className="text-2xl font-bold text-emerald-700">Farmer Portal</h1>
          <p className="text-gray-500 mt-2">Sell Products Directly To Buyers</p>
        </div>

        {/* TOGGLE */}
        <div className="flex bg-emerald-100 rounded-xl overflow-hidden mb-6">
          <button
            type="button"
            onClick={() => { setIsLogin(true); setPreview(null); }}
            className={`w-1/2 py-3 font-semibold transition-all duration-300 ${
              isLogin ? "bg-emerald-600 text-white" : "text-emerald-700"
            }`}
          >
            Login
          </button>

          <button
            type="button"
            onClick={() => setIsLogin(false)}
            className={`w-1/2 py-3 font-semibold transition-all duration-300 ${
              !isLogin ? "bg-emerald-600 text-white" : "text-emerald-700"
            }`}
          >
            Register
          </button>
        </div>

        {/* FORM */}
        <form className="space-y-2" onSubmit={submitForm} >

          {!isLogin && (
            <>
              {/* PHOTO UPLOAD */}
              {/* <div className="flex justify-center mb-2">
                <label htmlFor="photo" className="cursor-pointer">
                  {preview ? (
                    <img
                      src={preview}
                      alt="preview"
                      className="w-20 h-20 rounded-full object-cover border-2 border-emerald-400"
                    />
                  ) : (
                    <div className="w-20 h-20 rounded-full bg-emerald-100 border-2 border-dashed border-emerald-400 flex items-center justify-center text-emerald-600 text-3xl font-light">
                      +
                    </div>
                  )}
                </label>
                <input
                  id="photo"
                  type="file"
                  name="photo"
                  accept="image/*"
                  onChange={handleChange}
                  className="hidden"
                />
              </div> */}

              <input
                type="text"
                placeholder="Farmer Name"
                name="farmer_name"
                value={form.farmer_name}
                onChange={handleChange}
                className="w-full border border-emerald-300 p-2 rounded-xl outline-none focus:ring-2 focus:ring-emerald-500"
              />

              <input
                type="text"
                placeholder="Phone Number"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                className="w-full border border-emerald-300 p-2 rounded-xl outline-none focus:ring-2 focus:ring-emerald-500"
              />

              <input
                type="text"
                placeholder="Location"
                name="location"
                value={form.location}
                onChange={handleChange}
                className="w-full border border-emerald-300 p-2 rounded-xl outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </>
          )}

          {/* COMMON FIELDS */}
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="w-full border border-emerald-300 p-2 rounded-xl outline-none focus:ring-2 focus:ring-emerald-500"
          />

          <input
            type="password"
            placeholder="Password"
            name="password"
            value={form.password}
            onChange={handleChange}
            className="w-full border border-emerald-300 p-2 rounded-xl outline-none focus:ring-2 focus:ring-emerald-500"
          />
          {
  error && (
    <p className="text-red-500 text-sm text-center">
      {error}
    </p>
  )
}

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 transition-all duration-300 text-white py-2 rounded-xl font-semibold shadow-lg"
          >
            {loading ? "Processing..." : (isLogin ? "Login" : "Create Account")}
          </button>

        </form>

        {/* BOTTOM */}
        <p className="text-center text-sm text-gray-500 mt-4">
          {isLogin ? (
            <>
              Don&apos;t have an account?
              <span
                onClick={() => setIsLogin(false)}
                className="text-emerald-700 font-semibold cursor-pointer ml-1"
              >
                Register
              </span>
            </>
          ) : (
            <>
              Already have an account?
              <span
                onClick={() => setIsLogin(true)}
                className="text-emerald-700 font-semibold cursor-pointer ml-1"
              >
                Login
              </span>
            </>
          )}
        </p>

      </div>
      
    </div>
   
  );
};

export default FarmerForms;