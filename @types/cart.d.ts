import type { ServerResponseType } from "types/global";
import { APIResponse } from "./api";

type CartItemData = {
  cartItemId: string;
  description: string;
  name: string;
  images: string;
  price: string;
  productId: string;
  quantity: number;
  subtotal: string;
};

type CartData = {
  Total: string;
  cartId: string;
};

type GetCartItemsResponse = APIResponse<Array<CartItemData>>;
type AddCartItemResponse = ServerResponseType<void>;
type DeleteCartItemResponse = ServerResponseType<void>;
type GetCartResponse = APIResponse<CartData>;

type CartAPIProps = {
  cartItem: CartItemData;
  getCartItemsResponse: GetCartItemsResponse;
  addCartItemResponse: AddCartItemResponse;
  deleteCartItemResponse: DeleteCartItemResponse;
  getServerSideProps: never;
  cart: CartData;
  getCartResponse: GetCartResponse;
};

export type { CartAPIProps };
