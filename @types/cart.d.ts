type CartItem = {
  cartItemId: string;
  description: string;
  name: string;
  price: string;
  productId: string;
  quantity: number;
  subtotal: string;
};
type CartItemsAPIServerSidePropsTypes = APIResponse<CartItem>;
type AddToCartAPIServerSidePropsTypes = APIResponse<"">;
type RemoveFromCartAPIServerSidePropsTypes = APIResponse<"">;

export type {
  AddToCartAPIServerSidePropsTypes,
  CartItemsAPIServerSidePropsTypes,
  RemoveFromCartAPIServerSidePropsTypes,
  CartItem,
};
