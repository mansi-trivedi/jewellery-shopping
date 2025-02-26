type ValidationError = {
  field: string;
  message: string;
};

type ServerResponseType<T> = {
  success: boolean;
  message?: string | undefined;
  error?: string | undefined | ValidationError[];
  data?: T | undefined;
  status?: number | undefined;
};

export type { ServerResponseType };
