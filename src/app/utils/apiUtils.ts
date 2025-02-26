/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosResponse } from "axios";

export type APIResponse<T> = [AxiosResponse<T>["data"], any];

/**
 * Resolves a promise a returns an array containing [data, error]
 * based on given promise's resolve or reject
 */
export const resolvePromise = async <T>(
  promise: Promise<T>
): Promise<[T | undefined, any]> => {
  try {
    const data = await promise.then((data) => data);
    return [data, undefined];
  } catch (e) {
    return [undefined, e];
  }
};
