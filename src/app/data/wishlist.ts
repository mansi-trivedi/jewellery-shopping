import axios, { AxiosRequestConfig } from "axios";
import { BASE_URL } from "@/app/constants/api";

const addToWishlist = async (productId: string) => {
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

const getWishlist = async () => {
  const requestConfig: AxiosRequestConfig = {
    url: `${BASE_URL}/api/wishlist`,
    method: "get",
  };
  const response = await axios.request(requestConfig);
  console.log(response?.data, "response getWishList");
  return response?.data;
};

export { addToWishlist, getWishlist };
