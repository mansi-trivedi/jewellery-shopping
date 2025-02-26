import { AxiosResponse } from "axios";
import { ServerResponseType } from "types/global";

export type APIResponse<T> = AxiosResponse<ServerResponseType<T>>["data"];
