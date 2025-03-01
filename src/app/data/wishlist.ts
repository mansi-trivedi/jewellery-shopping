import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { BASE_URL } from "@/app/constants/api";
import { APIResponse } from "types/api";
import { Product } from "types/product";
import { ServerResponseType } from "types/global";
import { resolvePromise } from "../utils/apiUtils";

const addToWishlist = async (
  productId: string
): Promise<ServerResponseType<"">> => {
  const requestConfig: AxiosRequestConfig = {
    url: `${BASE_URL}/api/wishlist`,
    method: "POST",
    data: JSON.stringify({
      productId,
    }),
  };
  const response = await axios.request(requestConfig);
  return response?.data;
};

const getWishList = async (): Promise<
  [APIResponse<Product[]> | undefined, AxiosError]
> => {
  const requestConfig: AxiosRequestConfig = {
    url: `${BASE_URL}/api/wishlist`,
    method: "get",
  };
  const [response, error] = await resolvePromise(axios.request(requestConfig));
  return [response?.data, error];
};

const removeItemFromWishList = async (
  productId: string
): Promise<ServerResponseType<"">> => {
  const requestConfig: AxiosRequestConfig = {
    url: `${BASE_URL}/api/wishlist?product_id=${productId}`,
    method: "delete",
  };
  const response = await axios.request(requestConfig);
  return response?.data;
};

export { addToWishlist, getWishList, removeItemFromWishList };
