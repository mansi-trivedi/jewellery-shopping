import React from "react";
import { RxCross2 } from "react-icons/rx";
import Quantity from "components/Quantity/Quantity";
import Image from "next/image";

interface CartItemProps {
  image: string;
  price: string;
  name: string;
}
const CartItem: React.FC<CartItemProps> = ({
  image = "https://shop.southindiajewels.com/wp-content/uploads/2024/04/219.a.jpg",
  price,
  name,
}) => {
  return (
    <>
      <div className="shrink-0">
        <Image
          className="rounded-lg"
          src={image}
          width={80}
          height={80}
          alt=""
        />
      </div>

      <div className="relative flex flex-1 flex-col justify-between">
        <div className="sm:col-gap-5 sm:grid sm:grid-cols-2">
          <div className="pr-8 sm:pr-5">
            <p className="text-base font-semibold text-darkBlue">{name}</p>
            <p className="mx-0 mt-1 mb-0 text-sm text-gray-400">Rs. {price}</p>
          </div>

          <div className="mt-4 flex items-end justify-between sm:mt-0 sm:items-start sm:justify-end">
            <p className="shrink-0 w-20 text-base font-semibold text-darkBlue sm:order-2 sm:ml-8 sm:text-right">
              Rs. {price}
            </p>

            <div className="sm:order-1">
              <Quantity />
            </div>
          </div>
          <div className="absolute top-0 right-0 flex sm:bottom-0 sm:top-auto cursor-pointer">
            <RxCross2 size={20} />
          </div>
        </div>
      </div>
    </>
  );
};

export default CartItem;
