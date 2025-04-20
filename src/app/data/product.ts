import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { ProductAPIProps } from "types/product";
import { BASE_URL } from "constants/api";
import { resolvePromise } from "../utils/apiUtils";

/** Gets all products with given category name */
const getProductsByCategory = async (
  pageNumber: number,
  pageSize: number,
  categoryName: string
): Promise<[ProductAPIProps["getCollectionResponse"], AxiosError]> => {
  const requestConfig: AxiosRequestConfig = {
    url: `${BASE_URL}/api/collections?page_number=${pageNumber}&page_size=${pageSize}&category_name=${categoryName}`,
  };
  const [response, error] = await resolvePromise(
    axios.request<ProductAPIProps["getCollectionResponse"]>(requestConfig)
  );
  return [response?.data, error];
};

/** Gets all products with pagination */
const getAllProduct = async (
  pageSize: number = 10,
  pageNumber: number = 1
): Promise<
  [ProductAPIProps["getAllProductApiResponse"] | undefined, AxiosError]
> => {
  const requestConfig: AxiosRequestConfig = {
    url: `${BASE_URL}/api/product?page_size=${pageSize}&page_number=${pageNumber}`,
  };
  const [response, error] = await resolvePromise(
    axios.request<ProductAPIProps["getAllProductApiResponse"]>(requestConfig)
  );
  return [response?.data, error];
};

/** Gets product based on given SKU */
const getProductBySku = async (
  skuId: string
): Promise<
  [ProductAPIProps["getProductWithSkuOrIdResponse"] | undefined, AxiosError]
> => {
  const requestConfig: AxiosRequestConfig = {
    url: `${BASE_URL}/api/product?sku_id=${skuId}`,
  };
  const [response, error] = await resolvePromise(
    axios.request<ProductAPIProps["getProductWithSkuOrIdResponse"]>(
      requestConfig
    )
  );

  return [response?.data, error];
};

/** Gets product based on given categoryID */
const getProductByCategoryId = async (
  categoryId: string
): Promise<
  [ProductAPIProps["getProductCategoryApiResponse"] | undefined, AxiosError]
> => {
  const requestConfig: AxiosRequestConfig = {
    url: `${BASE_URL}/api/similarProduct/${categoryId}`,
  };
  const [response, error] = await resolvePromise(
    axios.request<ProductAPIProps["getProductCategoryApiResponse"]>(
      requestConfig
    )
  );

  return [response?.data, error];
};

/** Gets products based on given string */
const getProductsBySearchTerm = async (
  searchTerm: string
): Promise<
  [ProductAPIProps["getProductCategoryApiResponse"] | undefined, AxiosError]
> => {
  const requestConfig: AxiosRequestConfig = {
    url: `${BASE_URL}/api/product/search?search_term=${searchTerm}`,
  };
  const [response, error] = await resolvePromise(
    axios.request<ProductAPIProps["getProductCategoryApiResponse"]>(
      requestConfig
    )
  );
  return [response?.data, error];
};

export {
  getProductsByCategory,
  getAllProduct,
  getProductBySku,
  getProductByCategoryId,
  getProductsBySearchTerm,
};
