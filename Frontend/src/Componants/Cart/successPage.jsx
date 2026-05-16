

import React from "react";
import { Check } from "lucide-react";

const SuccessPage = ({
  setSuccess,
  setCheckout,
  navigate
}) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-emerald-50 p-4">

      <div className="bg-white rounded-3xl shadow-xl p-8 text-center w-full max-w-md">

        <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mx-auto">

          <Check size={50} className="text-emerald-600" />

        </div>

        <h1 className="text-3xl font-bold text-emerald-700 mt-6">
          Order Placed
        </h1>

        <button
          onClick={() => {
            setSuccess(false);
            setCheckout(false);
            navigate("/user-dashboard/my-order");
          }}
          className="mt-8 bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-2xl font-semibold"
        >
          See Orders
        </button>

      </div>

    </div>
  );
};

export default SuccessPage;