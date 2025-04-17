import { APIResponse } from "types/api";

type Product = {
  productId: string;
  SKU: string;
  description: string;
  stock: string;
  price: number;
  categoryId: string;
  name: string;
  warranty: string;
  discount: string;
  images: string;
} | null;

type ProductAPIProps = {
  product: Product | null;
  getCollectionResponse: APIResponse<ProductAPIResponse | null> | undefined;
  getProductWithSkuOrIdResponse: APIResponse<Product | null>;
  getAllProductApiResponse: APIResponse<{
    products: Product[];
    totalProducts: number;
    currentPage: number;
  }>;
  getProductCategoryApiResponse: APIResponse<{
    products: Array<Product>;
  }>;
};

export type { ProductAPIProps };
