"use client";

import React, { FC, useEffect } from "react";

import CartItem from "components/Cart/CartItem";
import CartTotal from "components/Cart/CartTotal";
import Button from "../ui/Button/Button";
import { getCartItems } from "@/app/data/cart";
import { useCartContext } from "context/CartContext";
import AddressCard from "../Address/AddressCard";

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
    <div className="grid lg:grid-cols-[calc(70%-1rem)_calc(30%-1rem)] py-4 lg:py-8 relative min-h-screen w-full max-w-full gap-8">
      <div className="cart-items-container flex flex-col gap-5">
        {cartItems.length ? cartItems.map((cartItem, index) => {
          return <CartItem key={index} cartItem={cartItem} />;
        }) : <div className="text-xl text-darkBlue text-center my-20 font-semiboldS">Empty Cart</div>
        }
      </div>
      <div className="cart-summary-container sticky top-8 self-start w-full">
        <AddressCard />
        <CartTotal />
        <div className="text-center">
          <Button type="button" className="w-full">
            Checkout
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
