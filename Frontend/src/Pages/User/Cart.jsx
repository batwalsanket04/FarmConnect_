import React, { useState } from "react";
import { Trash2, ShoppingCart, ArrowLeft, Check } from "lucide-react";

import { useAppContext } from "../../context/Context";
import { useNavigate } from "react-router-dom";
import CartItem from "../../Componants/Cart/cartItem";
import OrderSummary from "../../Componants/Cart/orderSummery";
import SuccessPage from "../../Componants/Cart/successPage";

const Cart = () => {
  const {
    cart,
    setCart,
    order,
    setOrder,
    productQuantity,
    setProductQuantity,
  } = useAppContext();
  const navigate = useNavigate();
  const [checkout, setCheckout] = useState(false);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    unit: "",
    payment: "",
  });

  const [success, setSuccess] = useState(false);

  const [unit, setUnit] = useState("kg");

  const quintalPrice = cart.reduce((total, item) => {
    return total + item.price * (productQuantity[item.id] || 1) * 100;
  }, 0);

  // REMOVE ITEM
  const removeItem = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  // TOTAL PRICE
  const totalPrice = cart.reduce(
    (total, item) => total + item.price * (productQuantity[item.id] ||1 ),
    0,
  );

  const quantityHandle = (id, value) => {
    setProductQuantity({
      ...productQuantity,
      [id]: Number(value),
    });
  };

  // FORM HANDLE

  const formHandle = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // SUCCESS PAGE
  if (success) {
    return (
      <SuccessPage
        setSuccess={setSuccess}
        setCheckout={setCheckout}
        navigate={navigate}
      />
    );
  }

  // CHECKOUT PAGE
  if (checkout) {
    return (
      <form className="min-h-screen bg-gradient-to-br from-emerald-50 to-green-100 p-4 sm:p-6">
        {/* BACK BUTTON */}
        <button
          onClick={() => setCheckout(false)}
          className="flex items-center gap-2 text-emerald-700 font-semibold mb-6"
        >
          <ArrowLeft size={20} />
          Back
        </button>

        <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-md p-6 sm:p-8">
          <h1 className="text-3xl font-bold text-emerald-700 mb-8">
            Checkout Details
          </h1>

          {/* BUYER NAME */}
          <div className="mb-5">
            <label className="block mb-2 font-semibold text-gray-700">
              Buyer Name
            </label>

            <input
              type="text"
              onChange={formHandle}
              value={form.name}
              name="name"
              placeholder="Enter your name"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-emerald-500"
            />
          </div>

          {/* PHONE */}
          <div className="mb-5">
            <label className="block mb-2 font-semibold text-gray-700">
              Phone Number
            </label>

            <input
              type="text"
              value={form.phone}
              onChange={formHandle}
              name="phone"
              placeholder="Enter phone number"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-emerald-500"
            />
          </div>

          {/* ADDRESS */}
          <div className="mb-5">
            <label className="block mb-2 font-semibold text-gray-700">
              Delivery Address
            </label>

            <textarea
              rows="4"
              onChange={formHandle}
              name="address"
              value={form.address}
              placeholder="Enter full address"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none resize-none focus:border-emerald-500"
            ></textarea>
          </div>

          {/* QUANTITY + UNIT */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
            {/* QUANTITY */}
            {cart.map((item) => (
              <div key={item.id} className="mt-4 flex items-center gap-3">
                <input
                  type="number"
                  min="1"
                  placeholder="Qty"
                  value={productQuantity[item.id] || ""}
                  onChange={(e) => quantityHandle(item.id, e.target.value)}
                  className="border border-gray-300 rounded-xl px-3 py-2 w-24 outline-none focus:border-emerald-500"
                />

                <span className="font-semibold text-gray-600">
                  {item.name} ({form.unit || "kg"})
                </span>
              </div>
            ))}
            {/* UNIT */}
            <div>
              <label className="block mb-2 font-semibold text-gray-700">
                Unit
              </label>

              <select
               
                name="unit"
                value={form.unit}
                onChange={formHandle}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-emerald-500"
              >
                <option value="kg">Kilogram (KG)</option>

                <option value="quintal">Quintal</option>
              </select>
            </div>
          </div>

          {/* PAYMENT */}
          <div name className="mb-6">
            <label className="block mb-3 font-semibold text-gray-700">
              Payment Method
            </label>

            <div className="space-y-3">
              <label className="flex items-center gap-3 border rounded-xl p-4 cursor-pointer hover:border-emerald-500">
                <input
                  type="radio"
                  name="payment"
                  onChange={formHandle}
                  value="COD"
                />
                Cash On Delivery
              </label>

              <label className="flex items-center gap-3 border rounded-xl p-4 cursor-pointer hover:border-emerald-500">
                <input
                  type="radio"
                  name="payment"
                  onChange={formHandle}
                  value="UPI"
                />
                UPI Payment
              </label>
            </div>
          </div>

          {/* ORDER FLOW */}
          <div className="bg-emerald-50 rounded-2xl p-5 mb-6 space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-gray-600 font-medium">Products</p>

             <p className="font-semibold">
  {
    Object.values(productQuantity).reduce(
      (total, qty) => total + qty,
      0
    )
  }
</p>
            </div>

            <div className="flex items-center justify-between">
              <p className="text-gray-600 font-medium">Buying Unit</p>

              {form.unit === "kg" ? (
                <p className="font-semibold uppercase">{form.unit}</p>
              ) : (
                <p className="font-semibold uppercase">{form.unit}</p>
              )}
            </div>

            <div className="flex items-center justify-between">
              <p className="text-gray-600 font-medium">Delivery</p>

              <p className="font-semibold text-emerald-700">Free</p>
            </div>

            <hr />

            <div className="flex items-center justify-between">
              <p className="text-xl font-bold text-gray-800">Total Amount</p>

              {form.unit == "quintal" ? (
                <h2 className="text-3xl font-bold text-emerald-700">
                  ₹{quintalPrice}
                </h2>
              ) : (
                <h2 className="text-3xl font-bold text-emerald-700">
                  ₹{totalPrice}
                </h2>
              )}
            </div>
          </div>

          {/* PLACE ORDER */}
          <button
          type="submit"
            onClick={(e) => {
              e.preventDefault();

              const orderData = {
                id: Date.now(),
                ...form,
                cart: cart.map((item) => ({
                  ...item,
                  buyQty: productQuantity[item.id] || 0,
                })),
                totalPrice,
                status: "pending",
                orderdate: new Date().toLocaleDateString(),
              };
              console.log(orderData);
             setOrder((prev) => [...prev, orderData]);
             setSuccess(true)
               
            }}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-4 rounded-2xl font-semibold text-lg transition"
          >
            Place Order
          </button>
        </div>
      </form>
    );
  }

  // CART PAGE
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-green-100 p-4 sm:p-6">
      {/* TITLE */}
      <div className="flex items-center gap-3 mb-8">
        <ShoppingCart className="text-emerald-700" size={32} />

        <h1 className="text-3xl font-bold text-emerald-700">My Cart</h1>
      </div>

      {/* EMPTY CART */}
      {cart.length === 0 ? (
        <div className="bg-white rounded-3xl shadow-md p-10 text-center">
          <ShoppingCart className="mx-auto text-gray-300" size={60} />

          <h2 className="text-2xl font-semibold text-gray-600 mt-4">
            Cart is Empty
          </h2>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* PRODUCTS */}
          <div className="lg:col-span-2 space-y-5">
            {cart.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                totalPrice={item.price * (productQuantity[item.id] || 1)}
                removeItem={removeItem}
                productQuantity={productQuantity}
              />
            ))}
          </div>

          {/* ORDER SUMMARY */}
          <div className="bg-white rounded-3xl shadow-md p-6 h-fit">
            <OrderSummary

            cart={cart}
form={form}
totalPrice={totalPrice}
quintalPrice={quintalPrice}
setCheckout={setCheckout}
            
            
            />

          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
