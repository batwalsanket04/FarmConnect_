import React from "react";
import { Link } from "react-router-dom";
import { Home, ArrowLeft, Leaf } from "lucide-react";

const FallbackPage = () => {
  return (

    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 to-green-100 px-4">

      <div className="bg-white shadow-2xl rounded-3xl p-8 sm:p-12 max-w-lg w-full text-center">

        {/* ICON */}

        <div className="w-24 h-24 mx-auto bg-emerald-100 rounded-full flex items-center justify-center mb-6">

          <Leaf className="text-emerald-700" size={45} />

        </div>

        {/* ERROR */}

        <h1 className="text-7xl font-extrabold text-emerald-700">
          404
        </h1>

        <h2 className="text-3xl font-bold text-gray-800 mt-3">
          Page Not Found
        </h2>

        <p className="text-gray-500 mt-4 leading-relaxed">
          Sorry, the page you are looking for does not exist
          or may have been moved.
        </p>

        {/* BUTTONS */}

        <div className="flex flex-col sm:flex-row gap-4 mt-8">

          <Link
            to="/"
            className="flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white py-3 px-6 rounded-2xl font-semibold transition w-full"
          >
            <Home size={20} />
            Go Home
          </Link>

          <button
            onClick={() => window.history.back()}
            className="flex items-center justify-center gap-2 border border-emerald-600 text-emerald-700 hover:bg-emerald-50 py-3 px-6 rounded-2xl font-semibold transition w-full"
          >
            <ArrowLeft size={20} />
            Go Back
          </button>

        </div>

      </div>

    </div>

  );
};

export default FallbackPage;