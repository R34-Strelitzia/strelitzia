import type { Either } from '@sweet-monads/either';
import { createAlova } from 'alova';
import VueHook from 'alova/vue';

import type {
  BaseErrorCode,
  ExpectedErrorCode,
} from '@strelitzia/contracts/v2';

import { createAPIError, isBaseError, isExpectedError } from './errors';
import {
  setDefaultHeaders,
  defaultAdapter,
  defaultMeta,
  defaultResponseHooks,
  MethodMetaKey,
} from './constants';
import type {
  IContractAPI,
  Interceptor,
  ResponseHandler,
  IResponseHooks,
  MethodMeta,
} from './types';

/**
 * Create meta for method
 *
 * if meta is not provided, default meta will be used,
 * otherwise, default meta will be merged with provided meta
 *
 * @param meta Meta information for method
 * @returns Method meta
 */
const createMeta = (meta?: MethodMeta) => {
  return meta ? { ...defaultMeta, ...meta } : defaultMeta;
};

/**
 * Create response handler
 * @param responseHooks Hooks for handling the responses
 * @returns Response handler
 */
const createResponseHandler = ({
  onSuccess,
  onBaseError,
  onExpectedError,
  onUnexpectedError,
}: IResponseHooks): ResponseHandler => ({
  onSuccess: (response, method) => {
    const expectedErrors: ExpectedErrorCode[] =
      method.meta[MethodMetaKey.EXPECTED_ERRORS];

    if (response.ok) {
      return onSuccess(response);
    }

    if (isBaseError(response.status)) {
      const error = createAPIError(response.status, response.statusText);

      return onBaseError(error);
    }

    if (isExpectedError(response.status, expectedErrors)) {
      const error = createAPIError(response.status, response.statusText);

      return onExpectedError(error);
    }

    return onUnexpectedError(response);
  },
  onError: (error: unknown) => {
    throw error;
  },
});

/**
 * Create HTTP core which provide instance for HTTP Client and interceptors
 * @param baseURL The base URL for the HTTP requests
 * @param requestAdapter An adapter for handling the requests
 * @param responseHooks Hooks for handling the responses
 * @returns An instance that can be used for making HTTP requests and interceptors
 */
export const createHTTPCore = (
  baseURL: string,
  requestAdapter = defaultAdapter,
  responseHooks = defaultResponseHooks,
) => {
  const interceptors: Interceptor[] = [setDefaultHeaders];

  const instance = createAlova({
    baseURL,
    requestAdapter,
    statesHook: VueHook,
    beforeRequest: (method) => {
      for (const interceptor of interceptors) {
        interceptor(method);
      }
    },
    responded: createResponseHandler(responseHooks),
  });

  return { instance, interceptors };
};

/**
 * Create HTTP Client
 * @param instance core of HTTP Client
 * @returns HTTP Client contains 4 methods:
 * - GET
 * - POST
 * - PATCH
 * - DELETE
 */
export const createHTTPClient = (
  instance: ReturnType<typeof createHTTPCore>['instance'],
) => {
  return Object.freeze({
    /**
     * Sends an HTTP GET request
     * @param expectedErrors Expected error codes which will be handled by `onExpectedError` response hook
     * @param path Path
     * @param parameters Query parameters
     * @param options Options
     * @returns Method
     */
    get: <T extends IContractAPI>(
      expectedErrors: Exclude<T['error']['statusCode'], BaseErrorCode>[],
      path: T['path'],
      parameters?: T['request'],
      options?: {
        meta?: MethodMeta;
        headers?: HeadersInit;
      },
    ) => {
      const method = instance.Get<
        Either<T['error']['statusCode'] | Response, T['response']>,
        T['request']
      >(path, { params: parameters, headers: options?.headers });

      method.meta = createMeta({
        ...options?.meta,
        [MethodMetaKey.EXPECTED_ERRORS]: expectedErrors,
      });

      return method;
    },

    /**
     * Sends an HTTP POST request
     * @param expectedErrors Expected error codes which will be handled by `onExpectedError` response hook
     * @param path Path
     * @param data Body
     * @param options Options
     * @returns Method
     */
    post: <T extends IContractAPI>(
      expectedErrors: Exclude<T['error']['statusCode'], BaseErrorCode>[],
      path: T['path'],
      data: T['request'],
      options?: {
        meta?: MethodMeta;
        headers?: HeadersInit;
      },
    ) => {
      const method = instance.Post<
        Either<T['error']['statusCode'], T['response']>,
        T['request']
      >(path, data, { headers: options?.headers });

      method.meta = createMeta({
        ...options?.meta,
        [MethodMetaKey.EXPECTED_ERRORS]: expectedErrors,
      });

      return method;
    },

    /**
     * Sends an HTTP PATCH request
     * @param expectedErrors Expected error codes which will be handled by `onExpectedError` response hook
     * @param path Path
     * @param data Body
     * @param options Options
     * @returns Method
     */
    patch: <T extends IContractAPI>(
      expectedErrors: Exclude<T['error']['statusCode'], BaseErrorCode>[],
      path: T['path'],
      data: T['request'],
      options?: {
        meta?: MethodMeta;
        headers?: HeadersInit;
      },
    ) => {
      const method = instance.Patch<
        Either<T['error']['statusCode'], T['response']>,
        T['request']
      >(path, data, { headers: options?.headers });

      method.meta = createMeta({
        ...options?.meta,
        [MethodMetaKey.EXPECTED_ERRORS]: expectedErrors,
      });

      return method;
    },

    /**
     * Sends an HTTP DELETE request
     * @param expectedErrors Expected error codes which will be handled by `onExpectedError` response hook
     * @param path Path
     * @param data Body
     * @param options Options
     * @returns Method
     */
    delete: <T extends IContractAPI>(
      expectedErrors: Exclude<T['error']['statusCode'], BaseErrorCode>[],
      path: T['path'],
      data: T['request'],
      options?: {
        meta?: MethodMeta;
        headers?: HeadersInit;
      },
    ) => {
      const method = instance.Delete<
        Either<T['error']['statusCode'], T['response']>,
        T['request']
      >(path, data, { headers: options?.headers });

      method.meta = createMeta({
        ...options?.meta,
        [MethodMetaKey.EXPECTED_ERRORS]: expectedErrors,
      });

      return method;
    },
  });
};
