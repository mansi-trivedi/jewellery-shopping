import React, { FC, useEffect, useState } from "react";

import CartItem from "components/Cart/CartItem";
import CartTotal from "components/Cart/CartTotal";
import Button from "../ui/Button/Button";
import { useCartContext } from "context/CartContext";
import AddressCard from "../Address/AddressCard";
import { getCartItems } from "@/app/data/cart";
import toast from "react-hot-toast";
import { createOrder } from "@/app/data/paypal";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import { useRouter } from "next/router";

const Cart: FC = () => {
  const { cartItems, setCartItemsHandler } = useCartContext();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

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

  const handlePaymentSubmit = async () => {
    setIsLoading(true);
    const [, err] = await createOrder();
    if (err) {
      toast.error(
        err.response
          ? err.response.data?.error
          : "Not able to register at this moment. Please try again later"
      );
      setIsLoading(false);
      return;
    }
    setIsLoading(false);
    toast.success("User registered successfully", {
      duration: 1000,
    });
    router.push(`/paymentPage?amount=1`);
  };

  if (!cartItems?.length) {
    return (
      <>
        <div className="flex content-center justify-between">
          <h1 className="text-xl font-bold text-darkBlue">My Cart</h1>
        </div>
        <div className="text-xl text-darkBlue text-center my-20 font-semiboldS">
          Empty Cart
        </div>
      </>
    );
  }

  return (
    <>
      <div className="flex content-center justify-between mt-4">
        <h1 className="text-xl font-bold text-darkBlue">My Cart</h1>
      </div>
      {cartItems?.length ? (
        <div className="grid lg:grid-cols-[calc(70%-1rem)_calc(30%-1rem)] py-4 lg:py-8 relative min-h-screen w-full max-w-full gap-8">
          <div className="cart-items-container flex flex-col gap-5">
            {cartItems.map((cartItem, index) => {
              return <CartItem key={index} cartItem={cartItem} />;
            })}
          </div>
          <div className="cart-summary-container sticky top-8 self-start w-full">
            <AddressCard />
            <CartTotal />
            <div className="text-center">
              <Button
                type="button"
                className="w-full"
                onClick={handlePaymentSubmit}
                disabled={isLoading}
              >
                Checkout
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-xl text-darkBlue text-center my-20 font-semiboldS">
          Empty Cart
        </div>
      )}
      <LoadingSpinner isLoading={isLoading} />
    </>
  );
};

export default Cart;
