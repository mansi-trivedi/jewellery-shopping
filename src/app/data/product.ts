import axios, { AxiosError, AxiosRequestConfig } from "axios";
import {
  ProductAPIServerSidePropsTypes,
  ProductSkuAPIServerSidePropTypes,
} from "types/product";
import { BASE_URL } from "@/app/constants/api";
import { resolvePromise } from "../utils/apiUtils";

/** Gets all products with given category name */
const getProductsByCategory = async (
  pageNumber: number,
  pageSize: number,
  categoryName: string
): Promise<[ProductAPIServerSidePropsTypes | undefined, AxiosError]> => {
  const requestConfig: AxiosRequestConfig = {
    url: `${BASE_URL}/api/collections?page_number=${pageNumber}&page_size=${pageSize}&category_name=${categoryName}`,
  };
  const [response, error] = await resolvePromise(axios.request(requestConfig));
  return [response?.data, error];
};

/** Gets all products with pagination */
const getAllProduct = async (
  pageSize: number = 10,
  pageNumber: number = 1
): Promise<[ProductAPIServerSidePropsTypes | undefined, AxiosError]> => {
  const requestConfig: AxiosRequestConfig = {
    url: `${BASE_URL}/api/product?page_size=${pageSize}&page_number=${pageNumber}`,
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

/** Gets product based on given categoryID */
const getProductByCategoryId = async (
  categoryId: string
): Promise<[ProductSkuAPIServerSidePropTypes | undefined, AxiosError]> => {
  const requestConfig: AxiosRequestConfig = {
    url: `${BASE_URL}/api/similarProduct/${categoryId}`,
  };
  const [response, error] = await resolvePromise(
    axios.request<ProductSkuAPIServerSidePropTypes>(requestConfig)
  );

  return [response?.data, error];
};

/** Gets products based on given string */
const getProductsBySearchTerm = async (
  searchTerm: string
): Promise<[ProductSkuAPIServerSidePropTypes | undefined, AxiosError]> => {
  const requestConfig: AxiosRequestConfig = {
    url: `${BASE_URL}/api/product/search?search_term=${searchTerm}`,
  };
  const [response, error] = await resolvePromise(
    axios.request<ProductSkuAPIServerSidePropTypes>(requestConfig)
  );
  return [response?.data, error];
};

export {
  getProductsByCategory,
  getAllProduct,
  getProductBySku,
  getSimilarProducts,
  getProductByCategoryId,
  getProductsBySearchTerm,
};
