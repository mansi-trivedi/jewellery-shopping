import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { APIResponse } from "types/api";
import {
  AddToCartAPIServerSidePropsTypes,
  CartItemsAPIServerSidePropsTypes,
  RemoveFromCartAPIServerSidePropsTypes,
} from "types/cart";
import { BASE_URL } from "@/app/constants/api";
import { resolvePromise } from "../utils/apiUtils";

const getCartItems = async (): Promise<
  [CartItemsAPIServerSidePropsTypes, AxiosError]
> => {
  const requestConfig: AxiosRequestConfig = {
    method: "get",
    url: `${BASE_URL}/api/cart`,
  };
  const [response, error] =
    await resolvePromise<CartItemsAPIServerSidePropsTypes>(
      axios.request(requestConfig)
    );
  return [response?.data, error];
};

const addToCart = async (
  productId: string,
  quantity: number = 1
): Promise<[AddToCartAPIServerSidePropsTypes | undefined, AxiosError]> => {
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
    axios.request<APIResponse<AddToCartAPIServerSidePropsTypes>>(requestConfig)
  );
  return [response?.data, error];
};

const removeItemFromCart = async (
  cartItemId: string
): Promise<[RemoveFromCartAPIServerSidePropsTypes | undefined, AxiosError]> => {
  /** Getting cart details */
  const requestConfig: AxiosRequestConfig = {
    url: `${BASE_URL}/api/cart?cart_item_id=${cartItemId}`,
    method: "delete",
    headers: {
      "Content-Type": "application/json",
    },
  };
  const [response, error] = await resolvePromise(
    axios.request<RemoveFromCartAPIServerSidePropsTypes>(requestConfig)
  );
  return [response?.data, error];
};

export { addToCart, getCartItems, removeItemFromCart };
