import type { ServerResponseType } from "types/global";

type CartItemData = {
  cartItemId: string;
  description: string;
  name: string;
  price: string;
  productId: string;
  quantity: number;
  subtotal: string;
};

type GetCartItemsResponse = ServerResponseType<Array<CartItem>>;
type AddCartItemResponse = ServerResponseType<void>;
type DeleteCartItemResponse = ServerResponseType<void>;

type CartAPIProps = {
  cartItem: CartItemData;
  getCartItemsResponse: GetCartItemsResponse;
  addCartItemResponse: AddCartItemResponse;
  deleteCartItemResponse: DeleteCartItemResponse;
  getServerSideProps: never;
};

export type { CartAPIProps };
