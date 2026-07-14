import { useContext, createContext, useState, useEffect } from "react";
import { products } from "../assets/assets";
const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(null);

// order from user and save it in local storage
  const [order, setOrder] = useState(() => {
    const savedOrders = localStorage.getItem("orders");

    return savedOrders ? JSON.parse(savedOrders) : [];
  });


  // quantity of products in cart
  const [productQuantity, setProductQuantity] = useState({});
  // farmer forms
  const [farmerForm,setfarmerForms]=useState([])

  //Add product by Farmer
   const [farmerProduct, setfarmerProduct] = useState([]);
    


  
  useEffect(() => {
    localStorage.setItem("orders", JSON.stringify(order));
     
  }, [order,]);

  useEffect(() => {
  const user = localStorage.getItem("user");

  if (user) {
    setUser(JSON.parse(user));
  }
}, []);


  // update order 
  const [ordersData, setOrdersData] = useState(order);

  // global search term (used by navbar search)
  const [searchTerm, setSearchTerm] = useState('');



   

  const addToCart = (product) => {
    const exist = cart.find((item) => item.id === product.id);

    // normalize product fields for cart consumers (cartItem expects `image` and `name`)
    const normalized = {
      id: product.id,
      name: product.product_name || product.name || product.title || "",
      // store image as a path without duplicate leading slash so cart components can prefix the host
      image: product.product_image
        ? String(product.product_image).replace(/^\//, "")
        : product.image
        ? String(product.image).replace(/^\//, "")
        : "",
      normal_price: product.normal_price || product.price || 0,
      // keep original product data available
      ...product,
    };

    if (exist) {
      setCart(
        cart.map((item) =>
          item.id === product.id ? { ...item, Quantity: (item.Quantity || 1) + 1 } : item,
        ),
      );
    } else {
      setCart([...cart, { ...normalized, Quantity: 1 }]);
    }
  };

  const value = {
    cart,
    setCart,
    addToCart,
    order,
    setOrder,
    productQuantity,
    setProductQuantity,
    farmerForm,
    setfarmerForms,
    farmerProduct,
    setfarmerProduct,
    ordersData,
    setOrdersData
    ,searchTerm,setSearchTerm
   
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  return useContext(AppContext);
};

export default AppContextProvider;
