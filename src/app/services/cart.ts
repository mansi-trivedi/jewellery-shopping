/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { APIResponse, resolvePromise } from "@/app/utils/apiUtils";

const cartApiInstance = axios.create({
  baseURL: process.env.BASE_URL,
});

/** Adds a product to cart */
const addToCart = async (productId: string): Promise<APIResponse<any>> => {
  const [response, error] = await resolvePromise<any>(
    cartApiInstance.request({
      url: `/api/cart`,
      method: "post",
      data: {
        productId: productId,
      },
    })
  );
  return [response?.data, error];
};

/** Gets user cart based on given user id */
const getCart = async (userId: string): Promise<APIResponse<any>> => {
  const [response, error] = await resolvePromise<any>(
    cartApiInstance.request({
      url: `/api/cart/${userId}`,
      method: "get",
    })
  );
  return [response?.data, error];
};

export { addToCart, getCart };
