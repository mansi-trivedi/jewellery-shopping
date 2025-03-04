"use client";

import {
  createContext,
  FC,
  ReactNode,
  useState,
  useContext,
  useMemo,
  useEffect,
  useCallback,
} from "react";
import { useUserContext } from "./UserContext";
import { getCartItems } from "../data/cart";
import { CartItem } from "types/cart";

type CartProviderPropTypes = {
  children: ReactNode;
};

type CartContextType = {
  cartItems: Array<CartItem>;
  setCartItemsHandler: (cartItems: Array<CartItem>) => void;
};

const DEFAULT_VALUE: CartContextType = {
  cartItems: [],
  setCartItemsHandler: () => null,
};

const CartContext = createContext(DEFAULT_VALUE);

const CartProvider: FC<CartProviderPropTypes> = ({ children }) => {
  const { isLoggedIn } = useUserContext();
  const [cartItems, setCartItems] = useState<CartContextType["cartItems"]>([]);

  const setCartItemsHandler = useCallback(
    (cartItems: CartContextType["cartItems"]) => {
      setCartItems(cartItems);
    },
    []
  );

  /** Effects */

  useEffect(() => {
    if (!isLoggedIn) {
      return;
    }
    (async () => {
      const [cartResp, cartErr] = await getCartItems();
      if (cartErr) {
        return;
      }
      if (cartResp?.success) {
        setCartItems(cartResp?.data);
      }
    })();
  }, [isLoggedIn]);

  /**
   * add your context values and handlers here
   */
  const providerValue: CartContextType = useMemo(
    () => ({
      cartItems,
      setCartItemsHandler,
    }),
    [cartItems, setCartItemsHandler] // update dependency as per requirement
  );

  return (
    <CartContext.Provider value={providerValue}>
      {children}
    </CartContext.Provider>
  );
};

// Context Hook
const useCartContext = (): CartContextType => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCartContext must be used within CartProvider");
  }
  return context;
};

export { useCartContext, CartProvider, CartContext };
export type { CartContextType };
