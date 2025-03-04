import React from "react";
import Image from "next/image";
import { FaTrashCan } from "react-icons/fa6";
import { CartItem as CartItemType } from "types/cart";

type CartItemPropsTypes = {
  cartItem: CartItemType;
};
const CartItem: React.FC<CartItemPropsTypes> = (props) => {
  const { cartItem } = props;
  const { name, description } = cartItem ?? {};

  return (
    <>
      <div className="col-span-2 border">
        <div className="w-full grid gap-4 lg:grid-cols-[60%_20%_20%] bg-badgeShade">
          <div className="product-information">
            <Image
              className="rounded-lg"
              src="https://shop.southindiajewels.com/wp-content/uploads/2024/04/219.a.jpg"
              width={50}
              height={50}
              alt="Product Image"
            />
            <div>
              <p className="font-semibold text-xs md:text-sm">{name}</p>
              <p className="text-xs md:text-sm text-gray-500">{description}</p>
            </div>
          </div>
          <div className="quantity-selector">
            <div className="flex items-center justify-center">
              <button className="border px-2 bg-cloudGray text-xs md:text-sm">
                -
              </button>
              <span className="px-2 md:px-3 border text-xs md:text-sm">1</span>
              <button className="border px-2 bg-cloudGray text-xs md:text-sm">
                +
              </button>
            </div>
          </div>
          <div className="action-container">
            <button className="text-darkGreen">
              <FaTrashCan size={16} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartItem;
