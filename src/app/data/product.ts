import axios, { AxiosRequestConfig } from "axios";
import { APIResponse } from "types/api";
import { Product } from "types/product";
import { BASE_URL } from "@/app/constants/api";

const getProductByCategory = async (category: string) => {
  const requestConfig: AxiosRequestConfig = {
    url: `${BASE_URL}/api/collections/${category}`,
  };
  const response = await axios.request(requestConfig);
  return response?.data;
};

const getAllProduct = async (): Promise<APIResponse<Product[]>> => {
  const requestConfig: AxiosRequestConfig = {
    url: `${BASE_URL}/api/product`,
  };
  const response = await axios.request<APIResponse<Product[]>>(requestConfig);
  return response?.data;
};

const getProductBySku = async (
  skuId: string
): Promise<APIResponse<Product>> => {
  const requestConfig: AxiosRequestConfig = {
    url: `${BASE_URL}/api/product?sku_id=${skuId}`,
  };
  const response = await axios.request<APIResponse<Product>>(requestConfig);
  return response?.data;
};

const getSimilarProducts = async (
  categoryId: string
): Promise<APIResponse<Product>> => {
  const requestConfig: AxiosRequestConfig = {
    url: `${BASE_URL}/api/product?category_id=${categoryId}`,
  };
  const response = await axios.request<APIResponse<Product>>(requestConfig);
  return response?.data;
};

export {
  getProductByCategory,
  getAllProduct,
  getProductBySku,
  getSimilarProducts,
};
