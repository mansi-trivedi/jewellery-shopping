import axios, { AxiosRequestConfig } from "axios";
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
const getAllProduct =
  async (): Promise<ProductAPIServerSidePropsTypes | null> => {
    const requestConfig: AxiosRequestConfig = {
      url: `${BASE_URL}/api/product`,
    };
    const response = await axios.request<ProductAPIServerSidePropsTypes>(
      requestConfig
    );
    return response?.data;
  };

/** Gets product based on given SKU */
const getProductBySku = async (
  skuId: string
): Promise<ProductSkuAPIServerSidePropTypes | null> => {
  const requestConfig: AxiosRequestConfig = {
    url: `${BASE_URL}/api/product?sku_id=${skuId}`,
  };
  const response = await axios.request<ProductSkuAPIServerSidePropTypes>(
    requestConfig
  );
  return response?.data;
};

/** Gets list of similar products */
const getSimilarProducts = async (
  categoryId: string
): Promise<ProductAPIServerSidePropsTypes | null> => {
  const requestConfig: AxiosRequestConfig = {
    url: `${BASE_URL}/api/product?category_id=${categoryId}`,
  };
  const response = await axios.request<ProductAPIServerSidePropsTypes>(
    requestConfig
  );
  return response?.data;
};

export {
  getProductsByCategory,
  getAllProduct,
  getProductBySku,
  getSimilarProducts,
};
