import React, { useState } from "react";
import { Trash2, ShoppingCart, ArrowLeft, Check } from "lucide-react";

import { useAppContext } from "../../context/Context";
import { useNavigate } from "react-router-dom";
import CartItem from "../../Componants/Cart/cartItem";
import OrderSummary from "../../Componants/Cart/orderSummery";
import SuccessPage from "../../Componants/Cart/successPage";
import axios from "axios";

const Cart = () => {
  const {
    cart,
    setCart,
    order,
    setOrder,
    productQuantity,
    setProductQuantity,
    ordersData, 
    setOrdersData
  } = useAppContext();
  const navigate = useNavigate();
  const [checkout, setCheckout] = useState(false);
 
  

  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    unit: "kg",
    payment: "COD",
  });

  const [productUnit, setProductUnit] = useState({});

  const handleUnitChange = (id, unit) => {
  setProductUnit({
    ...productUnit,
    [id]: unit,
  });

  // when unit changes for an item, ensure its quantity is set to the unit default
  const defaultQty = unit === "kg" ? 5 : 1;
  setProductQuantity({
    ...(productQuantity || {}),
    [id]: defaultQty,
  });
};

// helper to get quantity for an item (respecting unit defaults)
const getItemQuantity = (item) => {
  const pq = productQuantity || {};
  const pu = productUnit || {};
  const unit = pu[item.id] || "kg";

  return (
    pq[item.id] ?? (unit === "kg" ? 5 : 1)
  );
};

// helper to compute an item's unit price for the current unit
const getItemUnitPrice = (item) => {
  const unit = (productUnit && productUnit[item.id]) || "kg";
  const normalPrice = Number(item.normal_price) || 0;
  const bulkPrice = Number(item.bulk_price) || 0;

  return unit === "quintal"
    ? bulkPrice * 100 // bulk price is stored per kg, so one quintal is 100 kg
    : normalPrice;
};

// helper to compute an item's total price
const getItemTotal = (item) => {
  const qty = getItemQuantity(item);
  const unitPrice = getItemUnitPrice(item);

  return unitPrice * qty;
};




  const [success, setSuccess] = useState(false);
 

  // REMOVE ITEM
  const removeItem = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const totalPrice = cart.reduce((total, item) => {
    return total + getItemTotal(item);
  }, 0);
   
  const quantityHandle = (id, value) => {
    const num = Number(value);
    const unit = (productUnit && productUnit[id]) || "kg";
    const min = unit === "kg" ? 5 : 1;

    setProductQuantity({
      ...(productQuantity || {}),
      [id]: isNaN(num) ? min : Math.max(min, num),
    });
  };

  //upi payment handle razorpay

  const handleUPIPayment = async (orderData) => {
    try {
      const res = await axios.post(
        "http://127.0.0.1:8000/api/order/upi-order/",
        {
          amount: totalPrice,
        }
      );

      const payment = res.data.payment;

      const options = {
        key: "rzp_test_Sw1AUUWTp2q8vV",
        amount: payment.amount,
        currency: "INR",
        order_id: payment.id,
        name: "Farm Connect",
        handler: async function (response) {
          console.log("Razorpay response:", response);
          setCart([]);
          setProductQuantity({});
          setOrder((prev) => [...prev, orderData]);
          setSuccess(true);
        },
      };

      if (!window.Razorpay) {
        console.error("Razorpay checkout script is not loaded.");
        return;
      }

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.log(error);
    }
    
     
  };

   

  


  // FORM HANDLE

 const formHandle = (e) => {
  const { name, value } = e.target;

  if (name === "unit") {
    setForm({
      ...form,
      unit: value,
    });

    // Set default quantity
    const defaultQty = value === "kg" ? 5 : 1;

    const updatedQty = {};

    cart.forEach((item) => {
      updatedQty[item.id] = defaultQty;
    });

    setProductQuantity(updatedQty);
  } else {
    setForm({
      ...form,
      [name]: value,
    });
  }
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

  const submitForm = async (e) => {
    e.preventDefault();

    const auth = JSON.parse(localStorage.getItem('auth')) || {};
    const userId = auth.user?.id;

    const orderData = {
      user: userId,
      id: Date.now(),
      name: form.name,
      phone: form.phone,
      email: auth.user?.email || form.email,
      address: form.address,
      payment: form.payment,
      status: 'pending',
      orderdate: new Date().toLocaleDateString(),
      cart: cart.map((item) => ({
        id: item.id,
        buyQty:
          productQuantity[item.id] ??
          ((productUnit[item.id] || 'kg') === 'kg' ? 5 : 1),
        unit: productUnit[item.id] || 'kg',
      })),
      totalPrice,
    };

    if (form.payment === 'UPI') {
      handleUPIPayment(orderData);
      return;
    }

    try {
     const res= await axios.post('http://127.0.0.1:8000/api/order/create/', orderData);
      alert(res.data.message || 'Order placed successfully!');
    } catch (backendError) {
      console.error('COD order creation failed:', backendError);
      return;
    }

    setOrder((prev) => [...prev, orderData]);
    setCart([]);
    setProductQuantity({});
    setSuccess(true);
  };

  // CHECKOUT PAGE
  if (checkout) {
    return (
      <form onSubmit={submitForm} className="min-h-screen bg-gradient-to-br from-emerald-50 to-green-100 p-4 sm:p-6">
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
  <div key={item.id} className="flex items-center gap-3">

    <input
  type="number"
  min={
    (productUnit[item.id] || "kg") === "kg"
      ? 5
      : 1
  }
  value={
    productQuantity[item.id] ??
    (
      (productUnit[item.id] || "kg") === "kg"
        ? 5
        : 1
    )
  }
  onChange={(e) =>
    quantityHandle(item.id, e.target.value)
  }
  className="border border-gray-300 rounded-xl px-3 py-2 w-24 outline-none focus:border-emerald-500"
/>

    <select
  value={productUnit[item.id] || "kg"}
  onChange={(e) =>
    handleUnitChange(item.id, e.target.value)
  }
  className="border border-gray-300 rounded-xl px-3 py-2"
>
  <option value="kg">KG</option>
  <option value="quintal">Quintal</option>
</select>

    <span>{item.product_name}</span>

  </div>
))}
            {/* UNIT */}
             
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
  value="COD"
  checked={form.payment === "COD"}
  onChange={formHandle}
/>
                Cash On Delivery
              </label>

              <label className="flex items-center gap-3 border rounded-xl p-4 cursor-pointer hover:border-emerald-500">
                <input
  type="radio"
  name="payment"
  value="UPI"
  checked={form.payment === "UPI"}
  onChange={formHandle}
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
    cart.reduce((total, item) => {
  const unit = productUnit[item.id] || "kg";

  return (
    total +
    (
      productQuantity[item.id] ??
      (unit === "kg" ? 5 : 1)
    )
  );
}, 0)
  }
</p>
            </div>

            <div>
  <p className="text-gray-600 font-medium mb-2">
    Order Units
  </p>

  {cart.map((item) => (
    <div
      key={item.id}
      className="flex justify-between text-sm"
    >
      <span>{item.product_name}</span>

      <span>
        {getItemQuantity(item)}
        {" "}
        {productUnit[item.id] || "kg"}
      </span>
    </div>
  ))}
</div>

            <div className="flex items-center justify-between">
              <p className="text-gray-600 font-medium">Delivery</p>

              <p className="font-semibold text-emerald-700">Free</p>
            </div>

            <hr />

            <div className="flex items-center justify-between">
              <p className="text-xl font-bold text-gray-800">Total Amount</p>
              <h2 className="text-3xl font-bold text-emerald-700">₹{totalPrice}</h2>
            </div>
          </div>

          {/* PLACE ORDER */}
         <button
  type="submit"
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
                totalPrice={getItemTotal(item)}
                unit={productUnit[item.id] || "kg"}
                unitPrice={getItemUnitPrice(item)}
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
              setCheckout={setCheckout}
            />

          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
