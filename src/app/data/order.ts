import axios, { AxiosRequestConfig } from "axios";

import { BASE_URL } from "constants/api";
import { resolvePromise } from "../utils/apiUtils";
import { CartAPIProps } from "types/cart";

type InsertOrderFn = {
  totalPrice: number;
  paypalOrderId: string;
  userId: string;
  paymentStatus: string;
};

const insertOrder = async (params: InsertOrderFn) => {
  const requestConfig: AxiosRequestConfig = {
    method: "post",
    url: `${BASE_URL}/api/order`,
    data: JSON.stringify({ ...params }),
    headers: {
      "Content-Type": "application/json",
    },
  };
  const [response, error] = await resolvePromise(axios.request(requestConfig));
  return [response?.data, error];
};

type CompleteOrderAndCreateItemsParams = {
  orderId: string;
  paymentStatus: string;
  orderItems: Array<CartAPIProps["cartItem"]>;
  paymentId: string;
  paymentDate: string;
  paymentMethod: string;
  amount: number;
};

const completeOrderAndCreateItems = async (
  params: CompleteOrderAndCreateItemsParams
) => {
  const requestConfig: AxiosRequestConfig = {
    method: "post",
    url: `${BASE_URL}/api/order/order-item`,
    headers: {
      "Content-Type": "application/json",
    },
    data: {
      orderId: params.orderId,
      paymentStatus: params.paymentStatus,
      orderItems: params.orderItems,
      paymentId: params.paymentId,
      paymentDate: params.paymentDate,
      paymentMethod: params.paymentMethod,
      amount: params.amount,
    },
  };
  const [response, error] = await resolvePromise(axios.request(requestConfig));
  console.log(response, "response");
  console.log(error, "error");
  return [response?.data, error];
};

/** Delete order */
const deleteOrder = async (orderId: string) => {
  const requestConfig: AxiosRequestConfig = {
    method: "delete",
    url: `${BASE_URL}/api/order`,
    data: JSON.stringify({ orderId: orderId }),
    headers: {
      "Content-Type": "application/json",
    },
  };
  const [response, error] = await resolvePromise(axios.request(requestConfig));
  return [response?.data, error];
};

export type { CompleteOrderAndCreateItemsParams };
export { insertOrder, deleteOrder, completeOrderAndCreateItems };
