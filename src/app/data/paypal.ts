import axios, { AxiosRequestConfig } from "axios";
import { BASE_URL } from "constants/api";
import { resolvePromise } from "../utils/apiUtils";

const createOrder = async () => {
  /** Getting cart details */
  const requestData = {};
  const requestConfig: AxiosRequestConfig = {
    url: `${BASE_URL}/api/paypal`,
    method: "post",
    data: JSON.stringify(requestData),
    headers: {
      "Content-Type": "application/json",
    },
  };
  const [response, error] = await resolvePromise(axios.request(requestConfig));
  console.log("response?.data", response?.data);
  return [response?.data, error];
};

export { createOrder };
