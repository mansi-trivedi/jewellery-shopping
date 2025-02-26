type Cart = {
  Total: string;
  cartId: string;
  dateCreated: string;
  dateModified: string;
  userId: string;
};

type AddToCart = {
  message: string;
  status: number;
  success: boolean;
};

export type { Cart, AddToCart };
