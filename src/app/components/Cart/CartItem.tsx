import React, { useState, useCallback, ChangeEvent } from "react";
import Image from "next/image";
import { FaTrashCan } from "react-icons/fa6";
import { CartAPIProps } from "types/cart";
import { useCartContext } from "context/CartContext";

type CartItemPropsTypes = {
  cartItem: CartAPIProps["cartItem"];
};

const CartItem: React.FC<CartItemPropsTypes> = (props) => {
  const { cartItem } = props;
  const { name, description, quantity, productId, price, cartItemId } =
    cartItem ?? {};
  const [itemQuantity, setItemQuantity] = useState<number>(quantity);
  const { updateCartItemQuantity, removeFromCart } = useCartContext();

  const handleOnIncreaseQtyBtn = useCallback(async () => {
    const updatedQuantity = itemQuantity + 1;
    setItemQuantity(updatedQuantity);
    await updateCartItemQuantity(productId, updatedQuantity);
  }, [itemQuantity, updateCartItemQuantity, productId]);

  const handleOnDecreaseQtyBtn = useCallback(async () => {
    const updatedQuantity = itemQuantity - 1;
    setItemQuantity(updatedQuantity);
    await updateCartItemQuantity(productId, updatedQuantity);
  }, [itemQuantity, updateCartItemQuantity, productId]);

  const handleOnChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setItemQuantity(Number(e.target.value));
  }, []);

  const handleOnBlur = useCallback(async () => {
    await updateCartItemQuantity(productId, itemQuantity);
  }, [productId, updateCartItemQuantity, itemQuantity]);

  const handleRemoveCartItem = useCallback(async () => {
    await removeFromCart(cartItemId);
  }, [cartItemId, removeFromCart]);

  return (
    <div className="px-3 bg-cloudGray">
      <div className="grid grid-cols-1 md:grid-cols-4 md:place-items-center">
        <div className="flex">
          <Image
            className="max-w-full rounded-lg object-cover"
            src="https://shop.southindiajewels.com/wp-content/uploads/2024/04/219.a.jpg"
            width={80}
            height={80}
            alt="Product Image"
          />
          <div className="product-information">
            <p className="font-semibold text-darkBlue">{name}</p>
            <p className="mx-0 mt-1 mb-0 text-sm text-darkBlue">
              {description}
            </p>
          </div>
        </div>

        <p className="font-semibold text-darkBlue">
          Rs. {Number(price).toFixed(2)}
        </p>

        <div className="mx-auto flex h-8 text-darkBlue">
          <button
            className="flex items-center justify-center !rounded-none bg-darkGreen px-3 text-white font-semibold"
            onClick={handleOnDecreaseQtyBtn}
          >
            -
          </button>
          <input
            type="text"
            name="quantity"
            value={itemQuantity}
            className="w-full max-w-full min-w-14 bg-badgeShade font-semibold text-center border-darkGreen border"
            onChange={handleOnChange}
            onBlur={handleOnBlur}
          />
          <button
            className="flex items-center justify-center !rounded-none bg-darkGreen px-3 text-white font-semibold"
            onClick={handleOnIncreaseQtyBtn}
          >
            +
          </button>
        </div>

        <div className="flex">
          <p className="font-semibold text-darkBlue">
            Rs. {(Number(price) * itemQuantity).toFixed(2)}
          </p>
          <button
            type="button"
            className="text-darkGreen"
            onClick={handleRemoveCartItem}
          >
            <FaTrashCan />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
