export type APIError<S = 500> = {
  statusCode: S | 500;
  message: string;
};
