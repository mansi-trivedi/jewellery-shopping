import axios, { AxiosRequestConfig } from "axios";

import { BASE_URL } from "@/app/constants/api";
import { resolvePromise } from "../utils/apiUtils";

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

export { insertOrder };
