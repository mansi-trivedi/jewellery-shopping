import axios, { AxiosError, AxiosRequestConfig } from "axios";

import { CartAPIProps } from "types/cart";
import { BASE_URL } from "constants/api";
import { resolvePromise } from "../utils/apiUtils";

const getCartItems = async (): Promise<
  [CartAPIProps["getCartItemsResponse"] | undefined, AxiosError]
> => {
  const requestConfig: AxiosRequestConfig = {
    method: "get",
    url: `${BASE_URL}/api/cart`,
  };
  const [response, error] = await resolvePromise(
    axios.request<CartAPIProps["getCartItemsResponse"]>(requestConfig)
  );
  return [response?.data, error];
};

const addToCart = async (
  productId: string,
  quantity: number = 1
): Promise<[CartAPIProps["addCartItemResponse"] | undefined, AxiosError]> => {
  /** Getting cart details */
  const requestData = {
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
  const [response, error] = await resolvePromise(
    axios.request<CartAPIProps["addCartItemResponse"]>(requestConfig)
  );
  return [response?.data, error];
};

const removeItemFromCart = async (cartItemId: string) => {
  /** Getting cart details */
  const requestConfig: AxiosRequestConfig = {
    url: `${BASE_URL}/api/cart?cart_item_id=${cartItemId}`,
    method: "delete",
    headers: {
      "Content-Type": "application/json",
    },
  };
  const [response, error] = await resolvePromise(axios.request(requestConfig));
  return [response?.data, error];
};

const updateItemQuantity = async (productId: string, quantity: number) => {
  /** Getting cart details */
  const requestData = {
    productId,
    quantity,
  };
  const requestConfig: AxiosRequestConfig = {
    url: `${BASE_URL}/api/cart/cartitems`,
    method: "post",
    data: JSON.stringify(requestData),
    headers: {
      "Content-Type": "application/json",
    },
  };
  const [response, error] = await resolvePromise(axios.request(requestConfig));
  return [response?.data, error];
};

const getCart = async (): Promise<
  [CartAPIProps["getCartResponse"] | undefined, AxiosError]
> => {
  const requestConfig: AxiosRequestConfig = {
    method: "get",
    url: `${BASE_URL}/api/cart/total`,
  };
  const [response, error] = await resolvePromise(
    axios.request<CartAPIProps["getCartResponse"]>(requestConfig)
  );
  return [response?.data, error];
};

const removeCartAndCartItems = async (cartId: string) => {
  const requestConfig: AxiosRequestConfig = {
    url: `${BASE_URL}/api/cart/cartitems?cart_id=${cartId}`,
    method: "delete",
    headers: {
      "Content-Type": "application/json",
    },
  };
  const [response, error] = await resolvePromise(axios.request(requestConfig));
  return [response?.data, error];
};

export {
  addToCart,
  getCartItems,
  removeItemFromCart,
  updateItemQuantity,
  getCart,
  removeCartAndCartItems,
};
