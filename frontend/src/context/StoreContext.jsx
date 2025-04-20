import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { url } from "../assets/url";

export const storeContext = createContext(null);

export const StoreProvider = ({ children }) => {
  const [token, setToken] = useState("");

  const [cartitems, setCartItems] = useState([]);
  //{id,name,price,quantity,total}
  const [total, setTotal] = useState(0);



  const addToCart = async (items) => {
    //items = {productId,quantity}

    try {
      const res = await axios.post(`${url}cart/add`, items, {
        headers: { token: token },
      });
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  const removeFromCart = async (productId) => {
    try {
        const res = await axios.patch(
            `${url}cart/remove`,
            { productId: productId },
            {
            headers: { token: token },
            }
        );
     
        
    } catch (error) {
        console.error("Error removing from cart:", error);
        
    }
  };

  const getCart = async () => {
    try {
      const res = await axios.get(`${url}cart/get`, {
        headers: { token: localStorage.getItem("token") },
      });

    //   console.log(res.data.data.items);

       const cartElems = await res.data.data.items

       cartElems.forEach((item) => {
        // console.log(item);
        setCartItems((prev) => [
          ...prev,
          {
            id: item.product._id,
            name: item.product.name,
            price: item.product.price,
            quantity: item.quantity,
            total: item.product.price * item.quantity,
          },
        ]);
        
       })

      

      

      
       



      
      
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  };

  const data = {
    token,
    setToken,
    addToCart,
    removeFromCart,
    cartitems,
    total
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setToken(token);
    }

   
    getCart();

    
   
   
    
    
  }, []);
 
  

  return <storeContext.Provider value={data}>{children}</storeContext.Provider>;
};
