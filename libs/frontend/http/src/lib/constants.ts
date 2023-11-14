import { left, right } from '@sweet-monads/either';
import GlobalFetch from 'alova/GlobalFetch';
import type { AlovaRequestAdapter } from 'alova';
import type { FetchRequestInit } from 'alova/GlobalFetch';

import type { Interceptor, IResponseHooks } from './types';

export const enum MethodMetaKey {
  EXPECTED_ERRORS = 'expectedErrors',
}

export const defaultMeta = {
  [MethodMetaKey.EXPECTED_ERRORS]: [],
};

export const defaultHeaders: HeadersInit = {
  'Content-Type': 'application/json;charset=UTF-8',
};

export const defaultAdapter: AlovaRequestAdapter<
  unknown,
  unknown,
  FetchRequestInit,
  Response,
  Headers
> = GlobalFetch();

export const defaultResponseHooks: IResponseHooks = {
  onSuccess: async (response) => {
    if (!response.body) {
      return right(response.status);
    }

    return right(await response.json());
  },

  onBaseError: (error) => {
    return left(error);
  },

  onExpectedError(error) {
    return left(error);
  },

  onUnexpectedError: (error) => {
    return left(error);
  },
};

/**
 * Set default headers for method
 * @param method Method
 */
export const setDefaultHeaders: Interceptor = (method) => {
  method.config.headers = {
    ...defaultHeaders,
    ...method.config.headers,
  };
};
