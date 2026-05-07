import { useContext, createContext, useState } from "react";
import { products } from "../assets/assets";
const AppContext = createContext();


const AppContextProvider = ({ children }) => {
  const [cart, setCart] = useState([]); 
  console.log(cart);
   


  const addToCart = (product) => {
    const exist = cart.find((item) => item.id === product.id);

    if (exist) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...exist, Quantity: exist.Quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, Quantity: 1 }]); 
    }
  };

  const value = { cart, addToCart };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};

export default AppContextProvider;