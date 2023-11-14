import type { Either } from '@sweet-monads/either';
import type { AlovaOptions, Method, RequestBody } from 'alova';

import type {
  APIError,
  BaseErrorCode,
  ExpectedErrorCode,
} from '@strelitzia/contracts/v2';

export type MethodMeta = Record<string, unknown>;

/** Template for API Contract */
export interface IContractAPI {
  /** Path to send request */
  path: string;
  /** Request which wait API */
  request: Exclude<RequestBody, string>;
  /** Response from API */
  response: unknown;
  /** Possible error */
  error: APIError<ExpectedErrorCode>;
}

/** Interceptor is executed before request is sent */
export type Interceptor = (method: Method) => void;

type DefaultAlovaOptions = AlovaOptions<
  unknown,
  unknown,
  RequestInit,
  Response,
  Headers
>;

export type ResponseHandler = DefaultAlovaOptions['responded'];

export interface IResponseHooks {
  /**
   * Function to handle success response
   *
   * Success response is response with field `ok: true`
   *
   * @param response Response
   * @returns response
   */
  onSuccess: (
    response: Response,
  ) =>
    | Promise<Either<never, IContractAPI['response']>>
    | Either<never, IContractAPI['response']>;
  /**
   * Function to handle base error response
   *
   * Base error response is response with field `ok: false` and status code which is base error code
   *
   * @param error Error which status code defined in contract base error codes
   * @returns Base API Error
   */
  onBaseError: (
    error: APIError<BaseErrorCode>,
  ) => Either<APIError<BaseErrorCode>, never>;
  /**
   * Function to handle expected error
   *
   * Expected error is response with field `ok: false` and status code which is expected error code
   *
   * @param error Error which status code defined in expectedErrors of method meta
   * @returns Expected API Error
   */
  onExpectedError: (
    error: APIError<ExpectedErrorCode>,
  ) => Either<APIError<ExpectedErrorCode>, never>;

  /**
   * Function to handle unexpected error
   *
   * Unexpected error is response with field `ok: false` and status code which is not expected error code
   *
   * @param error Unexpected error
   * @returns Unexpected error
   */
  onUnexpectedError: (error: Response) => Either<Response, never>;
}
