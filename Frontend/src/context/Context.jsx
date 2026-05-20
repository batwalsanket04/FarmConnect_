import { useContext, createContext, useState, useEffect } from "react";
import { products } from "../assets/assets";
const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

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
  const [farmerProduct,setfarmerProduct]=useState(()=>{

  const saveproducts=localStorage.getItem("farmerProducts");
  
   return saveproducts ? JSON.parse(saveproducts) :[];

  })


  
  useEffect(() => {
    localStorage.setItem("orders", JSON.stringify(order));
    localStorage.setItem("farmerProducts",JSON.stringify(farmerProduct))
  }, [order,farmerProduct]);


  // update order 
  const [ordersData, setOrdersData] = useState(order);



   

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
    setfarmerForms,
    farmerProduct,
    setfarmerProduct,
    ordersData,
    setOrdersData
   
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  return useContext(AppContext);
};

export default AppContextProvider;
