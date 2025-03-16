import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { BASE_URL } from "@/app/constants/api";
import { APIResponse } from "types/api";
import { ServerResponseType } from "types/global";
import { resolvePromise } from "../utils/apiUtils";
import { ProductReviewType } from "types/review";

const addProductReview = async (
    productSku: string,
    review: string,
    rating: number,
    images: string | null
): Promise<[ServerResponseType<""> | undefined, AxiosError<{
    error: string;
}>]> => {
    const requestConfig: AxiosRequestConfig = {
        url: `${BASE_URL}/api/review`,
        method: "POST",
        data: JSON.stringify({
            productSku,
            review,
            rating,
            images
        }),
    };
    const [response, error] = await resolvePromise(axios.request(requestConfig));
    return [response?.data, error];
};

const getProductReview = async (productSku: string): Promise<
    [APIResponse<ProductReviewType[]> | undefined, AxiosError]
> => {
    const requestConfig: AxiosRequestConfig = {
        url: `${BASE_URL}/api/review?product_sku=${productSku}`,
        method: "get",
    };
    const [response, error] = await resolvePromise(axios.request(requestConfig));
    return [response?.data, error];
};

export { getProductReview, addProductReview };