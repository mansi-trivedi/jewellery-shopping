import React, { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { FaTrashCan } from "react-icons/fa6";
import { CartAPIProps } from "types/cart";
import { useCartContext } from "context/CartContext";
// import { fetchProductImages } from "@/app/utils/imageUtils";

type CartItemPropsTypes = {
  cartItem: CartAPIProps["cartItem"];
};

const CartItem: React.FC<CartItemPropsTypes> = (props) => {
  const { cartItem } = props;
  const { name, description, quantity, productId, price, cartItemId } =
    cartItem ?? {};
  const [itemQuantity, setItemQuantity] = useState<number>(quantity);
  // const [inputValue, setInputValue] = useState<number>(quantity);
  const { updateCartItemQuantity, removeFromCart } = useCartContext();

  // const productImage = useMemo(() => {
  //   if (!images) {
  //     return [];
  //   }
  //   return fetchProductImages(images);
  // }, [images]);

  const handleOnIncreaseQtyBtn = useCallback(async () => {
    const updatedQuantity = itemQuantity + 1;
    setItemQuantity(updatedQuantity);
    await updateCartItemQuantity(productId, updatedQuantity);
  }, [itemQuantity, updateCartItemQuantity, productId]);

  const handleOnDecreaseQtyBtn = useCallback(async () => {
    if (itemQuantity > 1) {
      const updatedQuantity = itemQuantity - 1;
      setItemQuantity(updatedQuantity);
      await updateCartItemQuantity(productId, updatedQuantity);
    }
  }, [itemQuantity, updateCartItemQuantity, productId]);

  // const handleOnChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
  //   const val = e.target.value;

  //   // Allow only numeric input
  //   if (/^\d*$/.test(val)) {
  //     setInputValue(+val);
  //   }
  //   // setItemQuantity(+e.target.value);
  // }, []);

  // const handleOnBlur = useCallback(async () => {
  //   if (isNaN(inputValue) || inputValue <= 0) {
  //     // Reset to previous valid quantity if input is empty or invalid
  //     setInputValue(itemQuantity);
  //   } else {
  //     await updateCartItemQuantity(productId, itemQuantity);
  //   }
  // }, [inputValue, itemQuantity, updateCartItemQuantity, productId]);

  const handleRemoveCartItem = useCallback(async () => {
    await removeFromCart(cartItemId);
  }, [cartItemId, removeFromCart]);

  useEffect(() => {
    setItemQuantity(quantity);
  }, [quantity]);

  return (
    <div className="px-2 bg-cloudGray relative p-2">
      <div className="grid lg:grid-cols-[40%_55%] xl:grid-cols-[40%_55%] 2xl:grid-cols-[40%_55%] 3xl:grid-cols-[40%_55%]p-2 items-center">
        <div className="flex flex-col lg:flex-row xl:flex-row 2xl:flex-row 3xl:flex-row">
          <Image
            className="max-w-full rounded-lg object-cover m-2"
            src="https://shop.southindiajewels.com/wp-content/uploads/2024/04/219.a.jpg"
            // src={productImage[0]}
            width={80}
            height={80}
            alt="Product Image"
          />
          <div className="product-information px-2 my-2">
            <p className="font-semibold text-darkBlue">{name}</p>
            <p className="mx-0 mt-1 mb-0 text-sm text-darkBlue">
              {description}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-[35%_32%_35%] py-2">
          <div className=" pl-2 ">
            <p className="font-semibold text-darkBlue">
              Rs. {Number(price).toFixed(2)}
            </p>
          </div>

          <div className="flex text-darkBlue pr-2 justify-center">
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
              className="w-10 bg-badgeShade font-semibold text-center border-darkGreen border"
              readOnly
            // onChange={handleOnChange}
            // onBlur={handleOnBlur}
            />
            <button
              className="flex items-center justify-center !rounded-none bg-darkGreen px-3 text-white font-semibold"
              onClick={handleOnIncreaseQtyBtn}
            >
              +
            </button>
          </div>

          <div className="text-end mr-4">
            <p className="font-semibold text-darkBlue">
              Rs. {(Number(price) * itemQuantity).toFixed(2)}
            </p>
          </div>
        </div>
      </div>
      <div className="absolute top-11 right-4">
        <button
          type="button"
          className="text-darkGreen"
          onClick={handleRemoveCartItem}
        >
          <FaTrashCan />
        </button>
      </div>
    </div>
  );
};

export default CartItem;
