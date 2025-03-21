// import React, { useState, useCallback, ChangeEvent } from "react";
// import Image from "next/image";
// import { FaTrashCan } from "react-icons/fa6";
// import { CartAPIProps } from "types/cart";
// import { useCartContext } from "context/CartContext";
// import Button from "../ui/Button/Button";

// type CartItemPropsTypes = {
//   cartItem: CartAPIProps["cartItem"];
// };

// const CartItem: React.FC<CartItemPropsTypes> = (props) => {
//   const { cartItem } = props;
//   const { name, description, quantity, productId } = cartItem ?? {};
//   const [itemQuantity, setItemQuantity] = useState<number>(quantity);
//   const { addToCart } = useCartContext();

//   const handleOnIncreaseQtyBtn = useCallback(async () => {
//     const updatedQuantity = itemQuantity + 1;
//     setItemQuantity(updatedQuantity);
//     await addToCart(productId, updatedQuantity);
//   }, [itemQuantity, addToCart, productId]);

//   const handleOnDecreaseQtyBtn = useCallback(async () => {
//     const updatedQuantity = itemQuantity - 1;
//     setItemQuantity(updatedQuantity);
//     await addToCart(productId, updatedQuantity);
//   }, [itemQuantity, addToCart, productId]);

//   const handleOnChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
//     setItemQuantity(Number(e.target.value));
//   }, []);

//   const handleOnBlur = useCallback(async () => {
//     await addToCart(productId, itemQuantity);
//   }, [productId, addToCart, itemQuantity]);

//   return (
//     <div
//       className="w-full grid lg:grid-cols-[70%_15%_15%] rounded-lg border border-badgeShade
//      bg-cloudGray py-5"
//     >
//       <div className="product-information flex space-x-5 items-center">
//         <Image
//           className="rounded-lg"
//           src="https://shop.southindiajewels.com/wp-content/uploads/2024/04/219.a.jpg"
//           width={80}
//           height={80}
//           alt="Product Image"
//         />
//         <div>
//           <p className="font-semibold text-fluid-micro-lg leading-fluid-micro-lg text-darkGreen">
//             {name}
//           </p>
//           <p className="text-darkGreen font-medium">{description}</p>
//         </div>
//       </div>
//       <div className="quantity-selector flex self-center justify-center">
//         <div className="quantity-selector">
//           <div className="flex border border-darkGreen overflow-hidden rounded-lg">
//             <Button
//               className="min-w-0 !px-6 !py-3 !border-none !rounded-none"
//               onClick={handleOnDecreaseQtyBtn}
//               outline
//             >
//               -
//             </Button>
//             <input
//               type="text"
//               name="quantity"
//               value={itemQuantity}
//               className="quantity-field text-center max-w-full w-full min-w-14 bg-badgeShade font-semibold"
//               onChange={handleOnChange}
//               onBlur={handleOnBlur}
//             />
//             <Button
//               className="min-w-0 !px-6 !py-3 !border-none !rounded-none"
//               onClick={handleOnIncreaseQtyBtn}
//               outline
//             >
//               +
//             </Button>
//           </div>
//         </div>
//       </div>
//       <div className="action-container flex self-center justify-center">
//         <button className="text-darkGreen">
//           <FaTrashCan size={16} />
//         </button>
//       </div>
//     </div>
//   );
// };

// export default CartItem;

// import React, { useState, useCallback, ChangeEvent } from "react";
// import Image from "next/image";
// import { FaTrashCan } from "react-icons/fa6";
// import { CartAPIProps } from "types/cart";
// import { useCartContext } from "context/CartContext";

// type CartItemPropsTypes = {
//   cartItem: CartAPIProps["cartItem"];
// };

// const CartItem: React.FC<CartItemPropsTypes> = (props) => {
//   const { cartItem } = props;
//   const { name, description, quantity, productId, price } = cartItem ?? {};
//   const [itemQuantity, setItemQuantity] = useState<number>(quantity);
//   const { addToCart } = useCartContext();

//   const handleOnIncreaseQtyBtn = useCallback(async () => {
//     const updatedQuantity = itemQuantity + 1;
//     setItemQuantity(updatedQuantity);
//     await addToCart(productId, updatedQuantity);
//   }, [itemQuantity, addToCart, productId]);

//   const handleOnDecreaseQtyBtn = useCallback(async () => {
//     const updatedQuantity = itemQuantity - 1;
//     setItemQuantity(updatedQuantity);
//     await addToCart(productId, updatedQuantity);
//   }, [itemQuantity, addToCart, productId]);

//   const handleOnChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
//     setItemQuantity(Number(e.target.value));
//   }, []);

//   const handleOnBlur = useCallback(async () => {
//     await addToCart(productId, itemQuantity);
//   }, [productId, addToCart, itemQuantity]);

//   return (
//     <div
//       className="flex flex-col space-y-3 py-6 text-left sm:flex-row sm:space-x-5 sm:space-y-0 px-5
//      bg-cloudGray"
//     >
//       <div className="shrink-0">
//         <Image
//           className="max-w-full rounded-lg object-cover"
//           src="https://shop.southindiajewels.com/wp-content/uploads/2024/04/219.a.jpg"
//           width={80}
//           height={80}
//           alt="Product Image"
//         />
//       </div>

//       <div className="relative flex flex-1 flex-col justify-between">
//         <div className="sm:col-gap-5 sm:grid sm:grid-cols-2">
//           <div className="sm:pr-5">
//             <p className="font-semibold text-darkBlue">
//               {name}
//             </p>
//             <p className="mx-0 mt-1 mb-0 text-sm text-darkBlue">{description}</p>
//           </div>

//           <div className="mt-4 flex items-end justify-between sm:mt-0 sm:items-start sm:justify-end">
//             <div className="sm:order-1">
//               <div className="mx-auto flex h-8 text-darkBlue">
//                 <button
//                   className="flex items-center justify-center !rounded-none bg-darkGreen px-3 text-white font-semibold"
//                   onClick={handleOnDecreaseQtyBtn}
//                 >
//                   -
//                 </button>
//                 <input
//                   type="text"
//                   name="quantity"
//                   value={itemQuantity}
//                   className="w-full max-w-full min-w-14 bg-badgeShade font-semibold text-center border-darkGreen border"
//                   onChange={handleOnChange}
//                   onBlur={handleOnBlur}
//                 />
//                 <button
//                   className="flex items-center justify-center !rounded-none bg-darkGreen px-3 text-white font-semibold"
//                   onClick={handleOnIncreaseQtyBtn}
//                 >
//                   +
//                 </button>
//               </div>
//             </div>
//             <p className="shrink-0 w-20 font-semibold text-darkBlue sm:order-2 sm:ml-8 sm:text-right px-2">
//               Rs. {(Number(price) * itemQuantity).toFixed(2)}
//             </p>
//           </div>
//         </div>
//         <div className="absolute top-0 right-0 flex sm:bottom-0 sm:top-auto">
//           <button
//             type="button"
//             className="text-darkGreen"
//           >
//             <FaTrashCan />
//           </button>
//         </div>
//       </div >
//     </div >
//   );
// };

// export default CartItem;


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
  const { name, description, quantity, productId, price, cartItemId } = cartItem ?? {};
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
    await removeFromCart(cartItemId)
  }, [cartItemId, removeFromCart]);

  return (
    <div className="flex flex-col space-y-2 py-6 sm:flex-row sm:space-x-5 sm:space-y-0 px-3 bg-cloudGray">
      <div className="shrink-0">
        <Image
          className="max-w-full rounded-lg object-cover"
          src="https://shop.southindiajewels.com/wp-content/uploads/2024/04/219.a.jpg"
          width={80}
          height={80}
          alt="Product Image"
        />
      </div>

      <div className="relative flex flex-col">
        <div className="sm:col-gap-5 sm:grid sm:grid-cols-2 ">
          <div className="sm:pr-5 ">
            <p className="font-semibold text-darkBlue">{name}</p>
            <p className="mx-0 mt-1 mb-0 text-sm text-darkBlue">{description}</p>
          </div>

          <div className=" mt-4 flex justify-between sm:mt-0 sm:items-start sm:justify-end">
            <div className="sm:order-1 flex items-center">
              <p className="shrink-0 font-semibold text-darkBlue sm:text-right px-4">
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
              <p className="shrink-0 w-20 font-semibold text-darkBlue sm:text-right px-4 ">
                Rs. {(Number(price) * itemQuantity).toFixed(2)}
              </p>
            </div>
          </div>
        </div>
        <div className="absolute top-0 right-0 flex sm:bottom-0 sm:top-auto">
          <button type="button" className="text-darkGreen" onClick={handleRemoveCartItem}>
            <FaTrashCan />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
