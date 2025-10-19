import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { createContext } from "react";
import { AuthDataContext } from "./AuthContext";
import axios from "axios";
import { UserDataContext } from "./UserContext";
//import toast from "react-toastify";

export const ShopDataContext = createContext();
function ShopContext({ children }) {
  let [search, setSearch] = useState("");
  let { userData } = useContext(UserDataContext);
  let [showSearch, setShowSearch] = useState(false);
  let [products, setProducts] = useState([]);
  let { serverUrl } = useContext(AuthDataContext);
  let [cartItem, setCartItem] = useState({});
  let currency = "₹";
  let delivery_fee = 40;

  const getProducts = async () => {
    try {
      let result = await axios.get(serverUrl + "/api/product/list", {
        withCredentials: true,
      });
      console.log(result.data);
      //console.log("shopcontext" + products.data);
      setProducts(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  const addtoCart = async (itemId, size) => {
    if (!size) {
      console.log("select product size");
      return;
    }
    let cartData = structuredClone(cartItem); //clone the product
    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }

    setCartItem(cartData);
    console.log(cartData);
    //toast.success("Item addtocart");

    if (userData) {
      try {
        let result = await axios.post(
          serverUrl + "/api/cart/add",
          { itemId, size },
          { withCredentials: true }
        );
        console.log(result.data);
      } catch (error) {
        console.log(error);
      }
    }
  };
  const getUserCart = async () => {
    try {
      const result = await axios.post(
        serverUrl + "/api/cart/get",
        {},
        { withCredentials: true }
      );
      setCartItem(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  //product increase krenge product add hoga werna minus hoga
  const updateQuantity = async (itemId, size, quantity) => {
    let cartData = structuredClone(cartItem);
    cartData[itemId][size] = quantity; //size increase kerenge to product increase hoga
    setCartItem(cartData);

    if (userData) {
      try {
        let result = await axios.post(
          serverUrl + "/api/cart/update",
          { itemId, size, quantity },
          { withCredentials: true }
        );
        console.log(result.data);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const getCartCount = () => {
    let totalCount = 0;
    for (const items in cartItem) {
      //item size h and items product h
      for (const item in cartItem[items]) {
        //item ek hi h but size alag h
        try {
          if (cartItem[items][item] > 0) {
            totalCount += cartItem[items][item];
          }
        } catch (error) {
          console.log(error);
        }
      }
    }
    return totalCount;
  };

  const getCartAmount = () => {
    let totalAmount = 0;
    for (const items in cartItem) {
      let itemInfo = products.find((product) => product._id === items);
      for (const item in cartItem[items]) {
        //size ko nikala
        try {
          if (cartItem[items][item] > 0) {
            totalAmount += itemInfo.price * cartItem[items][item];
          }
        } catch (error) {
          console.log(error);
        }
      }
    }
    return totalAmount;
  };

  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    getCartCount();
  }, []);

  let value = {
    products,
    currency,
    delivery_fee,
    getProducts,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItem,
    setCartItem,
    addtoCart,
    getUserCart,
    getCartCount,
    updateQuantity,
    getCartAmount,
  };
  return (
    <div>
      <ShopDataContext.Provider value={value}>
        {children}
      </ShopDataContext.Provider>
    </div>
  );
}

export default ShopContext;
