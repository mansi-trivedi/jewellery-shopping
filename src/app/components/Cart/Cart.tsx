"use client";

import React, { FC, useEffect } from "react";

import CartItem from "components/Cart/CartItem";
import CartTotal from "components/Cart/CartTotal";
import Button from "../ui/Button/Button";
import { getCartItems } from "@/app/data/cart";
import { useCartContext } from "context/CartContext";

const Cart: FC = () => {
  const { setCartItemsHandler, cartItems } = useCartContext();

  useEffect(() => {
    (async () => {
      const [cartResp, cartErr] = await getCartItems();
      if (cartErr) {
        return;
      }
      if (cartResp?.success) {
        setCartItemsHandler(cartResp?.data ?? []);
      }
    })();
  }, [setCartItemsHandler]);

  return (
    <div className="grid lg:grid-cols-[70%_30%] py-4 lg:py-8 gap-8">
      <div className="cart-items-container">
        {cartItems?.map((cartItem, index) => {
          return <CartItem key={index} cartItem={cartItem} />;
        })}
      </div>
      <div className="cart-summary-container">
        <CartTotal />
        <div className="mt-6 text-center">
          <Button type="button" className="w-full">
            Checkout
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
