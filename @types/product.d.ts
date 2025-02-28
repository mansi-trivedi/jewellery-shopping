import { APIResponse } from "types/api";

type Product = {
  productId: string;
  SKU: string;
  description: string;
  stock: string;
  price: string;
  categoryId: string;
  name: string;
  warranty: string;
  discount: string;
  images: string;
};

type ProductAPIResponse = Partial<{
  products: Product[];
  totalProducts: number | null;
  currentPage: number | null;
}>;

type ProductAPIServerSidePropsTypes = APIResponse<ProductAPIResponse | null>;

type SingleProductAPIResponse = {
  products: Product[];
};
type ProductSkuAPIServerSidePropTypes =
  APIResponse<SingleProductAPIResponse | null>;

export type {
  Product,
  ProductAPIResponse,
  ProductAPIServerSidePropsTypes,
  ProductSkuAPIServerSidePropTypes,
};
