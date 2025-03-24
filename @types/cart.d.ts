import type { ServerResponseType } from "types/global";

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
  cartId: string;
  total: number;
  userId: string;
};

type GetCartItemsResponse = ServerResponseType<Array<CartItem>>;
type AddCartItemResponse = ServerResponseType<void>;
type DeleteCartItemResponse = ServerResponseType<void>;
type GetCartResponse = ServerResponseType<cart>;

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
