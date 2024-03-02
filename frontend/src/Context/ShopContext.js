import React, { createContext, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export const ShopContext = createContext(null);

const ShopContextProvider = (props) => {
  const [data, setData] = useState([]);


  useEffect(() => {
    fetch("http://localhost:3200/getdata")
      .then((res) => res.json())
      .then((json) => setData(json));
  }, []);

  //Creating empty cart
  const getDefaultCart = () => {
    let cart = {};
    for (let index = 0; index < data.length + 1; index++) {
      cart[index] = 0;
    }
    return cart;
  };


  const [cartItems, setCartItems] = useState(getDefaultCart());
  // console.log(cartItems);

  const addToCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));

    toast.success("Add to cart successfully");
  };
  // console.log(cartItems);


  const removeFromCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    toast.error("Remove from cart successfully");
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = data.find((product) => product._id === item);
        totalAmount += itemInfo.new_price * cartItems[item];
      }
    }
    return totalAmount;
  };

  const getTotalCartItems = () => {
    let totalItem = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        totalItem += cartItems[item];
      }
    }
    // console.log(totalItem);
    return totalItem;
  };

  const contextValue = {
    getTotalCartItems,
    getTotalCartAmount,
    data,
    cartItems,
    addToCart,
    removeFromCart,
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
      <Toaster />
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
