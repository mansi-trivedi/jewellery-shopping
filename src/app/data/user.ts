import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { BASE_URL } from "@/app/constants/api";
import { resolvePromise } from "../utils/apiUtils";
import { ServerResponseType } from "types/global";

/** Service to login user */
const performLoginOperation = async (
  email: string,
  password: string
): Promise<[ServerResponseType<""> | undefined, AxiosError]> => {
  const requestConfig: AxiosRequestConfig = {
    url: `${BASE_URL}/api/user/login`,
    method: "post",
    data: JSON.stringify({
      email: email,
      password: password,
    }),
  };
  const [response, error] = await resolvePromise(
    axios.request<ServerResponseType<"">>(requestConfig)
  );
  return [response?.data, error];
};

/** Registers user */
const performUserRegistration = async (email: string, password: string) => {
  const requestConfig: AxiosRequestConfig = {
    url: `${BASE_URL}/api/user/register`,
    method: "post",
    data: JSON.stringify({
      email: email,
      password: password,
    }),
  };
  const [response, error] = await resolvePromise(axios.request(requestConfig));
  return [response?.data, error];
};

/** Logout user */
const performUserLogout = async (): Promise<
  [ServerResponseType<""> | undefined, AxiosError]
> => {
  const requestConfig: AxiosRequestConfig = {
    url: `${BASE_URL}/api/user/logout`,
    method: "post",
  };
  const [response, error] = await resolvePromise(axios.request(requestConfig));
  return [response?.data, error];
};

export { performLoginOperation, performUserRegistration, performUserLogout };
