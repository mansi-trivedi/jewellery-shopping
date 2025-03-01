import axios, { AxiosError, AxiosRequestConfig } from "axios";
import {
  ProductAPIServerSidePropsTypes,
  ProductSkuAPIServerSidePropTypes,
} from "types/product";
import { BASE_URL } from "@/app/constants/api";
import { resolvePromise } from "../utils/apiUtils";

/** Gets all products with given category name */
const getProductsByCategory = async (categoryName: string) => {
  const requestConfig: AxiosRequestConfig = {
    url: `${BASE_URL}/api/collections?category_name=${categoryName}`,
  };
  const [response, error] = await resolvePromise(axios.request(requestConfig));
  return [response?.data, error];
};

/** Gets all products with pagination */
const getAllProduct = async (
  pageSize: number = 10
): Promise<[ProductAPIServerSidePropsTypes | undefined, AxiosError]> => {
  const requestConfig: AxiosRequestConfig = {
    url: `${BASE_URL}/api/product?page_size=${pageSize}`,
  };
  const [response, error] = await resolvePromise(
    axios.request<ProductAPIServerSidePropsTypes>(requestConfig)
  );
  return [response?.data, error];
};

/** Gets product based on given SKU */
const getProductBySku = async (
  skuId: string
): Promise<[ProductSkuAPIServerSidePropTypes | undefined, AxiosError]> => {
  const requestConfig: AxiosRequestConfig = {
    url: `${BASE_URL}/api/product?sku_id=${skuId}`,
  };
  const [response, error] = await resolvePromise(
    axios.request<ProductSkuAPIServerSidePropTypes>(requestConfig)
  );
  return [response?.data, error];
};

/** Gets list of similar products */
const getSimilarProducts = async (
  categoryId: string
): Promise<[ProductAPIServerSidePropsTypes | undefined, AxiosError]> => {
  const requestConfig: AxiosRequestConfig = {
    url: `${BASE_URL}/api/product?category_id=${categoryId}`,
  };
  const [response, error] = await resolvePromise(
    axios.request<ProductAPIServerSidePropsTypes>(requestConfig)
  );
  return [response?.data, error];
};

export {
  getProductsByCategory,
  getAllProduct,
  getProductBySku,
  getSimilarProducts,
};
