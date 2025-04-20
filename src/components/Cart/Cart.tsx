import React, { FC, useEffect, useState } from "react";
import CartItem from "components/Cart/CartItem";
import CartTotal from "components/Cart/CartTotal";
import { useCartContext } from "context/CartContext";
// import AddressCard from "../Address/AddressCard";
import { getCartItems } from "@/app/data/cart";
import { PayPalButtons } from "@paypal/react-paypal-js";
import {
  completeOrderAndCreateItems,
  CompleteOrderAndCreateItemsParams,
  deleteOrder,
} from "@/app/data/order";

const Cart: FC = () => {
  const { cartItems, setCartItemsHandler, cart } = useCartContext();
  const [orderId, setOrderId] = useState<string>("");

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
            {/* <AddressCard /> */}
            <CartTotal />
            <div className="text-center">
              <PayPalButtons
                style={{
                  color: "gold",
                  shape: "rect",
                  label: "pay",
                  height: 50,
                }}
                createOrder={async () => {
                  const response = await fetch(
                    "http://localhost:3000/api/paypal/create-order",
                    {
                      headers: {
                        "Content-Type": "application/json",
                      },
                      method: "POST",
                      body: JSON.stringify({
                        order_price: Number(cart?.total ?? 0),
                      }),
                    }
                  );
                  const responseData = await response.json();
                  setOrderId(responseData.data.order_id);
                  return responseData?.data?.id + "";
                }}
                onApprove={async (data) => {
                  await fetch(
                    "http://localhost:3000/api/paypal/capture-order",
                    {
                      headers: {
                        "Content-Type": "application/json",
                      },
                      method: "POST",
                      body: JSON.stringify({
                        orderID: data.orderID,
                      }),
                    }
                  )
                    .then((response) => response.json())
                    .then((response) => {
                      if (response.approvedData.result.status === "COMPLETED") {
                        // 1. Extract the necessary data from the PayPal response
                        const paypalResult = response.approvedData.result;
                        const paymentStatus = paypalResult.status;

                        const paymentId =
                          paypalResult.purchase_units[0]?.payments?.captures[0]
                            ?.id;
                        const paymentDate =
                          paypalResult.purchase_units[0]?.payments?.captures[0]
                            ?.create_time;
                        const paymentMethod = "PayPal";
                        const amount = parseFloat(
                          paypalResult.purchase_units[0]?.payments?.captures[0]
                            ?.amount?.value
                        );

                        // 2. Construct the parameters object
                        const params: CompleteOrderAndCreateItemsParams = {
                          orderId,
                          paymentStatus,
                          orderItems: cartItems,
                          paymentId,
                          paymentDate,
                          paymentMethod,
                          amount,
                        };

                        (async () => {
                          await completeOrderAndCreateItems(params);
                        })();
                      }
                    })
                    .catch((e) => console.error(e));
                }}
                onCancel={async () => {
                  const [, cancelErr] = await deleteOrder(orderId);
                  if (cancelErr) {
                    console.log(cancelErr);
                    return;
                  }
                }}
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="text-xl text-darkBlue text-center my-20 font-semiboldS">
          Empty Cart
        </div>
      )}
    </>
  );
};

export default Cart;
