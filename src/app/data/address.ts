import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { BASE_URL } from "constants/api";
import { APIResponse } from "types/api";
import { resolvePromise } from "../utils/apiUtils";
import { AddressAPIProps } from "types/address";

const addNewAddress = async (
  name: string,
  phone: string,
  addressline: string,
  area: string,
  landmark: string,
  city: string,
  state: string,
  country: string,
  postalcode: string
): Promise<
  [
    AddressAPIProps["addAddressResponse"],
    AxiosError<{
      error: string;
    }>
  ]
> => {
  const requestConfig: AxiosRequestConfig = {
    url: `${BASE_URL}/api/address`,
    method: "POST",
    data: JSON.stringify({
      phone,
      addressline,
      area,
      landmark,
      city,
      state,
      country,
      postalcode,
      name,
    }),
  };
  const [response, error] = await resolvePromise(
    axios.request<AddressAPIProps["addAddressResponse"]>(requestConfig)
  );
  return [response?.data, error];
};

const getAddresses = async (): Promise<
  [
    APIResponse<Array<AddressAPIProps["addressType"]>> | undefined,
    AxiosError<{
      error: string;
    }>
  ]
> => {
  const requestConfig: AxiosRequestConfig = {
    url: `${BASE_URL}/api/address`,
    method: "get",
  };
  const [response, error] = await resolvePromise(axios.request(requestConfig));
  return [response?.data, error];
};

const deleteAddresses = async (
  addressId: string
): Promise<
  [
    APIResponse<Array<AddressAPIProps["addressType"]>> | undefined,
    AxiosError<{
      error: string;
    }>
  ]
> => {
  const requestConfig: AxiosRequestConfig = {
    url: `${BASE_URL}/api/address?address_id=${addressId}`,
    method: "delete",
  };
  const [response, error] = await resolvePromise(axios.request(requestConfig));
  return [response?.data, error];
};

export { addNewAddress, getAddresses, deleteAddresses };
