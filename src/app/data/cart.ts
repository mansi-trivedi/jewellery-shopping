import axios, { AxiosRequestConfig } from "axios";
import { APIResponse } from "types/api";
import { Cart, AddToCart } from "types/cart";
import { BASE_URL } from "@/app/constants/api";

const getCartInternal = async (): Promise<APIResponse<Cart>> => {
  const requestConfig: AxiosRequestConfig = {
    url: `${BASE_URL}/api/cart`,
  };
  const response = await axios.request<APIResponse<Cart>>(requestConfig);
  return response?.data;
};

const addToCart = async (
  productId: string,
  quantity: number = 1
): Promise<APIResponse<AddToCart>> => {
  /** Getting cart details */
  const cart = await getCartInternal();
  const requestData = {
    cartId: cart?.data?.cartId,
    productId,
    quantity,
  };
  const requestConfig: AxiosRequestConfig = {
    url: `${BASE_URL}/api/cart`,
    method: "post",
    data: JSON.stringify(requestData),
    headers: {
      "Content-Type": "application/json",
    },
  };
  const response = await axios.request<APIResponse<AddToCart>>(requestConfig);
  return response?.data;
};

export { addToCart, getCartInternal };
