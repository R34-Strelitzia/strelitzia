import type {
  APIError,
  BaseErrorCode,
  ErrorCode,
  ExpectedErrorCode,
  MessageByCode,
} from '@strelitzia/contracts/v2';

import { includes } from './helpers';

/**
 * Checks if the given error status is one of the expected error codes
 *
 * @param errorStatus The error status to check
 * @param expectedErrors The array of expected error codes
 * @return true if the error status is one of the expected error codes, otherwise false
 */
export const isExpectedError = (
  errorStatus: number,
  expectedErrors: ExpectedErrorCode[],
): errorStatus is ExpectedErrorCode => {
  return includes(expectedErrors, errorStatus);
};

/**
 * Creates an API error
 * @param statusCode Status code
 * @param message Message
 * @returns API error
 */
export const createAPIError = <S extends ErrorCode>(
  statusCode: S,
  message: MessageByCode<S>,
): APIError<S> => {
  return {
    statusCode,
    message,
  };
};

const baseErrorCodes: BaseErrorCode[] = [408, 429, 500];

/**
 * Checks whether the error code is included in the base error codes
 * @param errorCode Status code of error
 * @returns `true` if the errorCode is among the base error codes else `false`
 */
export const isBaseError = (errorCode: number): errorCode is BaseErrorCode => {
  return includes(baseErrorCodes, errorCode);
};
