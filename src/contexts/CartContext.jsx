import { createContext, useState, useEffect } from "react";
import cartApi from "../apis/cartApi";
import useAuth from "../hooks/useAuth";
import { toast } from "react-toastify";

export const CartContext = createContext();

export const CartContextProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const { authUser } = useAuth();

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        if (authUser) {
          const userId = authUser ? authUser.id : null;
          const response = await cartApi.getCart(userId);
          // console.log("resss", response);
          setCartItems(() => response.data.cartItem);
        }
      } catch (err) {
        console.log("Error fetching cart items:", err);
      }
    };
    fetchCartItems();
  }, [authUser]);

  const addToCart = async (productId, amount) => {
    try {
      // ตรวจสอบว่ามีสินค้าชิ้นนี้อยู่ในตะกร้าหรือไม่
      const existingProduct = cartItems.find(
        (item) => item.productId === productId
      );
      if (existingProduct) {
        // ถ้ามี ไม่ให้เพิ่มจำนวน
        return toast.error("product already in cart");
      }

      const res = await cartApi.createCart({ productId, amount });
      setCartItems((pre) => [...pre, res.data.newCart]);
    } catch (err) {
      console.log("Error adding to cart:", err);
    }
  };

  const increaseQuantity = async (productId) => {
    try {
      const cartItem = cartItems.find((item) => item.id === productId);

      const res = await cartApi.updateCart(cartItem.amount + 1, cartItem.id);
      setCartItems((pre) =>
        pre.map((item) => {
          if (item.id === res.data.updateCart.id) {
            return res.data.updateCart;
          } else return item;
        })
      );
    } catch (err) {
      console.log("Error increasing quantity:", err);
    }
  };

  const decreaseQuantity = async (productId) => {
    try {
      // console.log(cartItems);
      const cartItem = cartItems.find((item) => item.id === productId);

      if (cartItem.amount <= 1) {
        removeFromCart(productId)
      }

      const res = await cartApi.updateCart(cartItem.amount - 1, cartItem.id);
      setCartItems((pre) =>
        pre.map((item) => {
          if (item.id === res.data.updateCart.id) {
            return res.data.updateCart;
          } else return item;
        })
      );
    } catch (err) {
      console.log("Error decreasing quantity:", err);
    }
  };

  const removeFromCart = async (cartId) => {
    try {
      await cartApi.deleteCart(cartId);
      setCartItems((prevItems) =>
        prevItems.filter((item) => item.id != cartId)
      );
    } catch (err) {
      console.log("Error removing from cart:", err);
    }
  };

  const clearCart = async () => {
    try {
      setCartItems([]);
      const userId = authUser ? authUser.id : null;
      await cartApi.clearCart(userId);
    } catch (err) {
      console.log(err);
    }
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => {
      return total + item.products.price * item.amount;
    }, 0);
  };
  return (
    <CartContext.Provider
      value={{
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
        getTotalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
