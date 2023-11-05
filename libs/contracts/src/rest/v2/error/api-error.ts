/** Base error code that may come from any endpoint */
export type BaseErrorCode = 408 | 429 | 500;

/** Expected error code that may come from API */
export type ExpectedErrorCode = 400 | 401 | 403 | 404 | 409;

/** All possible error codes */
export type ErrorCode = ExpectedErrorCode | BaseErrorCode;

export type MessageByCode<Code extends ErrorCode> = Code extends 400
  ? string[]
  : string;

export type APIError<Code extends ErrorCode> = {
  statusCode: Code | BaseErrorCode;
  message: MessageByCode<Code>;
};
