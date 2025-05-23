import React, { createContext, useContext, useEffect, useState } from "react";
import Helpers from "../Helper/Helpers";

const CartContext = createContext();

// Custom hook to use the cart context
export const useCart = () => useContext(CartContext);

export const CartConextProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [userDetails, setUserDetails] = useState({});
  const [ProductDetail, setProductDetail] = useState({
    color: "",
    size: [],
    price: "",
  });

  const [cartData, setCartData] = useState([]);

  // const { cart } = useCart();

  useEffect(() => {
    window.scrollTo(0, 0);
    getAllCartData();
    getAllOrder();
  }, []);
  const [allOrder, setAllOrder] = useState([]);

  const getAllOrder = async () => {
    try {
      const res = await Helpers(
        `/user/orders/get/${localStorage.getItem("id")}`,
        "GET",
        null,
        {}
      ); // Pass token as argument
      if (res && res?.status) {
        setAllOrder(res?.data);
      } else {
        console.log("Failed to fetch categories");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getAllCartData = async () => {
    try {
      const res = await Helpers("/user/cart", "GET", null, {}); // Pass token as argument
      if (res && res?.status) {
        setCartData(res?.data);
      } else {
        console.log("Failed to fetch cart");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Add to cart function
  const addToCart = (product) => {
    // check if already product exist in cart
    const existingProduct = cart.find((item) => item.id === product.id);

    if (existingProduct) {
      // if product exist then increase quantity
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      // if product doesnt exist add it to cart
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  // Remove from Cart function
  const removeFromCart = (productId) => {
    setCart(cart.filter((item) => item.id !== productId));
  };

  // Update item quantity in cart
  const updateCartItemQuantity = (productId, quantity) => {
    setCart(
      cart.map((item) =>
        item.id === productId ? { ...item, quantity: quantity } : item
      )
    );
  };

  // Clear Cart function
  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{
        ProductDetail,
        setProductDetail,
        cart,
        addToCart,
        removeFromCart,
        updateCartItemQuantity,
        clearCart,
        cartData,
        setCartData,
        getAllCartData,
        userDetails,
        setUserDetails,
        allOrder,
        setAllOrder,
        getAllOrder,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
