import { useContext, createContext, useState, useEffect } from "react";
import { products } from "../assets/assets";
const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const [cart, setCart] = useState([]);


  const [order, setOrder] = useState(() => {
    const savedOrders = localStorage.getItem("orders");

    return savedOrders ? JSON.parse(savedOrders) : [];
  });

  useEffect(() => {
    localStorage.setItem("orders", JSON.stringify(order));
  }, [order]);

  const [productQuantity, setProductQuantity] = useState({});
  const [farmerForm,setfarmerForms]=useState([])
   

  const addToCart = (product) => {
    const exist = cart.find((item) => item.id === product.id);

    if (exist) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...exist, Quantity: exist.Quantity + 1 }
            : item,
        ),
      );
    } else {
      setCart([...cart, { ...product, Quantity: 1 }]);
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
    setfarmerForms
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  return useContext(AppContext);
};

export default AppContextProvider;
