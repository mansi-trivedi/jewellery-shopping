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
import {
  getCartItems,
  addToCart as addToCartAPI,
  removeItemFromCart,
  updateItemQuantity,
} from "../data/cart";
import { CartAPIProps } from "types/cart";
import toast from "react-hot-toast";

type CartProviderPropTypes = {
  children: ReactNode;
};

type CartItemStatus =
  | { inCart: boolean; cartItemId: string }
  | { inCart: boolean; cartItemId: null };

type RemoveCartItemResult = {
  success: boolean;
  error: Error | null;
};

type CartContextType = {
  cartItems: Array<CartAPIProps["cartItem"]>;
  setCartItemsHandler: (cartItems: Array<CartAPIProps["cartItem"]>) => void;
  isItemExistInCart: (productId: string) => boolean;
  addToCart: (productId: string, quantity: number) => Promise<void>;
  removeFromCart: (cartItemId: string) => Promise<RemoveCartItemResult>;
  getCartItemStatus: (productId: string) => CartItemStatus;
  updateCartItemQuantity: (productId: string, quantity: number) => Promise<void>;
};

const DEFAULT_VALUE: CartContextType = {
  cartItems: [],
  setCartItemsHandler: () => null,
  isItemExistInCart: () => false,
  addToCart: async () => { },
  removeFromCart: async () => ({ success: false, error: null }),
  getCartItemStatus: () => ({ inCart: false, cartItemId: null }),
  updateCartItemQuantity: async () => { },
};

const CartContext = createContext(DEFAULT_VALUE);

const CartProvider: FC<CartProviderPropTypes> = ({ children }) => {
  const { isLoggedIn } = useUserContext();
  const [cartItems, setCartItems] = useState<CartContextType["cartItems"]>([]);
  const [productIdsInCart, setProductIdsInCart] = useState<Set<string>>(
    new Set<string>()
  );
  const [, setCartError] = useState<Error | null>(null);

  /** Handlers */

  const addToCart = useCallback(
    async (productId: string, quantity: number) => {
      if (!isLoggedIn) return;
      const [resp, err] = await addToCartAPI(productId, quantity);
      if (err) {
        toast.error("Something went wrong, Please try again after sometime");
        console.error("Failed to add to cart:", err);
        return;
      }
      if (resp?.success) {
        toast.success("Item successfully added to the cart");
        const [updatedCartResp, updatedCartErr] = await getCartItems();
        if (updatedCartErr) return;
        if (updatedCartResp?.success) {
          setCartItems(updatedCartResp.data ?? []);
        }
      }
    },
    [isLoggedIn]
  );

  /** Removes item and gets and sets updated cart */
  const removeFromCart = useCallback(
    async (cartItemId: string) => {
      if (!isLoggedIn) {
        setCartError(new Error("User not logged in"));
        return { success: false, error: new Error("User not logged in") };
      }
      setCartError(null); // Clear previous errors
      const [resp, err] = await removeItemFromCart(cartItemId);
      if (err) {
        setCartError(err);
        return { success: false, error: err };
      }
      if (resp?.success) {
        const [updatedCartResp, updatedCartErr] = await getCartItems();
        if (updatedCartErr) {
          setCartError(updatedCartErr);
          return { success: false, error: updatedCartErr };
        }
        if (updatedCartResp?.success) {
          setCartItems(updatedCartResp.data ?? []);
          return { success: true, error: null };
        } else {
          setCartError(new Error("Failed to get updated cart"));
          return {
            success: false,
            error: new Error("Failed to get updated cart"),
          };
        }
      } else {
        setCartError(new Error("Failed to remove item"));
        return { success: false, error: new Error("Failed to remove item") };
      }
    },
    [isLoggedIn]
  );

  const getCartItemStatus = useCallback(
    (productId: string): CartItemStatus => {
      const foundItem = cartItems.find((item) => item.productId === productId);
      if (foundItem) {
        return { inCart: true, cartItemId: foundItem.cartItemId };
      }
      return { inCart: false, cartItemId: null };
    },
    [cartItems]
  );

  const setCartItemsHandler = useCallback(
    (cartItems: CartContextType["cartItems"]) => {
      setCartItems(cartItems);
    },
    []
  );

  const updateCartItemQuantity = useCallback(
    async (productId: string, quantity: number) => {
      if (!isLoggedIn) return;
      const [resp, err] = await updateItemQuantity(productId, quantity);
      if (err) {
        toast.error("Something went wrong, Please try again after sometime");
        console.error("Failed to add to cart:", err);
        return;
      }
      if (resp?.success) {
        // toast.success("Item  successfully added to the cart");
        const [updatedCartResp, updatedCartErr] = await getCartItems();
        if (updatedCartErr) return;
        if (updatedCartResp?.success) {
          setCartItems(updatedCartResp.data ?? []);
        }
      }
    },
    [isLoggedIn]
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
        setCartItems(cartResp?.data ?? []);
      }
    })();
  }, [isLoggedIn]);

  useEffect(() => {
    const productIds = cartItems.map((cart) => cart.productId);
    setProductIdsInCart(new Set(productIds));
  }, [cartItems]);

  /**
   * add your context values and handlers here
   */
  const providerValue: CartContextType = useMemo(
    () => ({
      cartItems,
      setCartItemsHandler,
      isItemExistInCart: (productId: string) => productIdsInCart.has(productId),
      addToCart,
      removeFromCart,
      getCartItemStatus,
      updateCartItemQuantity
    }),
    [
      cartItems,
      setCartItemsHandler,
      productIdsInCart,
      addToCart,
      removeFromCart,
      getCartItemStatus,
      updateCartItemQuantity
    ] // update dependency as per requirement
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
