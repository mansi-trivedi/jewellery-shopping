import React from "react";

const CartTotal = () => {
  return (
    <div className="">
      <table className="w-full border-collapse border border-gray-200">
        <tbody>
          <tr className="border-b border-gray-200">
            <td className="py-2 px-4 text-lg text-darkBlue">Subtotal</td>
            <td className="py-2 px-4 text-lg font-semibold text-darkBlue text-right">
              Rs. 399.00
            </td>
          </tr>

          {/* Shipping Row */}
          <tr className="border-b border-gray-200">
            <td className="py-2 px-4 text-lg text-darkBlue">Shipping</td>
            <td className="py-2 px-4 text-lg font-semibold text-darkBlue text-right">
              Rs. 8.00
            </td>
          </tr>

          {/* Total Row */}
          <tr className="bg-offWhite">
            <td className="py-2 px-4 text-lg font-medium text-darkBlue">
              Total
            </td>
            <td className="py-2 px-4 text-2xl font-semibold text-darkBlue text-right">
              Rs. 408.00
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default CartTotal;
