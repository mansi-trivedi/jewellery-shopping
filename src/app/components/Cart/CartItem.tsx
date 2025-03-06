import React, { useState, useCallback, ChangeEvent } from "react";
import Image from "next/image";
import { FaTrashCan } from "react-icons/fa6";
import { CartAPIProps } from "types/cart";
import { useCartContext } from "context/CartContext";
import Button from "../ui/Button/Button";

type CartItemPropsTypes = {
  cartItem: CartAPIProps["cartItem"];
};

const CartItem: React.FC<CartItemPropsTypes> = (props) => {
  const { cartItem } = props;
  const { name, description, quantity, productId } = cartItem ?? {};
  const [itemQuantity, setItemQuantity] = useState<number>(quantity);
  const { addToCart } = useCartContext();

  const handleOnIncreaseQtyBtn = useCallback(async () => {
    const updatedQuantity = itemQuantity + 1;
    setItemQuantity(updatedQuantity);
    await addToCart(productId, updatedQuantity);
  }, [itemQuantity, addToCart, productId]);

  const handleOnDecreaseQtyBtn = useCallback(async () => {
    const updatedQuantity = itemQuantity - 1;
    setItemQuantity(updatedQuantity);
    await addToCart(productId, updatedQuantity);
  }, [itemQuantity, addToCart, productId]);

  const handleOnChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setItemQuantity(Number(e.target.value));
  }, []);

  const handleOnBlur = useCallback(async () => {
    await addToCart(productId, itemQuantity);
  }, [productId, addToCart, itemQuantity]);

  return (
    <div
      className="w-full grid lg:grid-cols-[70%_15%_15%] rounded-lg border border-badgeShade 
     bg-cloudGray py-5"
    >
      <div className="product-information flex space-x-5 items-center">
        <Image
          className="rounded-lg"
          src="https://shop.southindiajewels.com/wp-content/uploads/2024/04/219.a.jpg"
          width={80}
          height={80}
          alt="Product Image"
        />
        <div>
          <p className="font-semibold text-fluid-micro-lg leading-fluid-micro-lg text-darkGreen">
            {name}
          </p>
          <p className="text-darkGreen font-medium">{description}</p>
        </div>
      </div>
      <div className="quantity-selector flex self-center justify-center">
        <div className="quantity-selector">
          <div className="flex border border-darkGreen overflow-hidden rounded-lg">
            <Button
              className="min-w-0 !px-6 !py-3 !border-none !rounded-none"
              onClick={handleOnDecreaseQtyBtn}
              outline
            >
              -
            </Button>
            <input
              type="text"
              name="quantity"
              value={itemQuantity}
              className="quantity-field text-center max-w-full w-full min-w-14 bg-badgeShade font-semibold"
              onChange={handleOnChange}
              onBlur={handleOnBlur}
            />
            <Button
              className="min-w-0 !px-6 !py-3 !border-none !rounded-none"
              onClick={handleOnIncreaseQtyBtn}
              outline
            >
              +
            </Button>
          </div>
        </div>
      </div>
      <div className="action-container flex self-center justify-center">
        <button className="text-darkGreen">
          <FaTrashCan size={16} />
        </button>
      </div>
    </div>
  );
};

export default CartItem;
