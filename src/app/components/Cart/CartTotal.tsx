import { getCart } from "@/app/data/cart";
import React, { useEffect, useState } from "react";
import { CartAPIProps } from "types/cart";

const CartTotal = () => {
  const [userCart, setUserCart] = useState<CartAPIProps["cart"]>();
  useEffect(() => {
    (async () => {
      const [cartResp, cartErr] = await getCart();
      if (cartErr) {
        return;
      }
      if (cartResp?.success) {
        console.log("cartResp?.data", cartResp?.data?.[0])
        setUserCart(cartResp?.data?.[0] ?? {});
      }
    })();
  }, [setUserCart]);
  return (
    <div className="relative py-2">
      <table className="w-full border-collapse border border-gray-200 bg-cloudGray">
        <tbody>
          <tr>
            <td className="py-2 px-4 text-lg text-darkBlue">Subtotal</td>
            <td className="py-2 px-4 text-lg font-semibold text-darkBlue text-right">
              Rs. {userCart?.total}
            </td>
          </tr>

          {/* Shipping Row */}
          <tr>
            <td className="py-2 px-4 text-lg text-darkBlue">Shipping</td>
            <td className="py-2 px-4 text-lg font-semibold text-darkBlue text-right">
              Rs. 8.00
            </td>
          </tr>

          {/* Total Row */}
          <tr>
            <td className="py-2 px-4 text-lg font-medium text-darkBlue">
              Total
            </td>
            <td className="py-2 px-4 text-2xl font-semibold text-darkBlue text-right">
              Rs. {userCart?.total ?? 0 + 8.00}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default CartTotal;
