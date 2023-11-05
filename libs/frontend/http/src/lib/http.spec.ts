import { describe, it, expect, beforeEach, beforeAll } from 'vitest';
import type { MockWrapper } from '@alova/mock';
import { defineMock, createAlovaMockAdapter } from '@alova/mock';
import { left, right } from '@sweet-monads/either';

import { createHTTPCore, createHTTPClient } from './http';
import { MethodMetaKey, defaultAdapter, defaultHeaders } from './defaults';

describe('HTTP Client', () => {
  const path = '/path';
  let mock: MockWrapper = defineMock({});

  const baseURL = 'http://xxx.xxx';
  let core: ReturnType<typeof createHTTPCore>;
  let http: ReturnType<typeof createHTTPClient>;

  beforeEach(() => {
    const mockAdapter = createAlovaMockAdapter([mock], {
      httpAdapter: defaultAdapter,
      delay: 5,
    });

    core = createHTTPCore(baseURL, mockAdapter);

    http = createHTTPClient(core.instance);
  });

  it('BaseURL', () => {
    const method = http.get([], path);

    expect(method.baseURL).toBe(baseURL);
  });

  it('Default Meta', () => {
    const method = http.get([], path);

    expect(method.meta).toMatchObject({
      [MethodMetaKey.EXPECTED_ERRORS]: [],
    });
  });

  describe('Interceptors', () => {
    const defaultInterceptorsCount = 1;

    it('Count of default interceptors', () => {
      expect(core.interceptors.length).toBe(defaultInterceptorsCount);
    });

    it('Add Interceptor', () => {
      const token = 'token';

      core.interceptors.push((method) => {
        method.config.headers['Authorization'] = token;
      });

      const method = http.get([], path);

      expect(core.interceptors.length).toBe(defaultInterceptorsCount + 1);

      method.context.options.beforeRequest?.(method);
      expect(method.config.headers['Authorization']).toBe(token);
    });

    it('Set default headers by default interceptor', () => {
      const method = http.get([], path);

      method.context.options.beforeRequest?.(method);

      expect(method.config.headers).toMatchObject(defaultHeaders);
    });
  });

  describe('Error Handling', () => {
    describe('Base Errors', () => {
      beforeAll(() => {
        mock = defineMock({
          '/internal-server-error': () => {
            return {
              status: 500,
              statusText: 'any text',
            };
          },
          '/too-many-requests': () => {
            return {
              status: 429,
              statusText: 'any text',
            };
          },
          '/request-timeout': () => {
            return {
              status: 408,
              statusText: 'any text',
            };
          },
        });
      });

      it('500', async () => {
        const response = await http.get([], '/internal-server-error').send();

        expect(response).toStrictEqual(
          left({
            message: 'any text',
            statusCode: 500,
          }),
        );
      });

      it('429', async () => {
        const response = await http.get([], '/too-many-requests').send();

        expect(response).toStrictEqual(
          left({
            message: 'any text',
            statusCode: 429,
          }),
        );
      });

      it('408', async () => {
        const response = await http.get([], '/request-timeout').send();

        expect(response).toStrictEqual(
          left({
            message: 'any text',
            statusCode: 408,
          }),
        );
      });
    });

    describe('Non-Base Errors', () => {
      const errorResponse = {
        status: 409,
        statusText: 'any text',
      };

      beforeAll(() => {
        mock = defineMock({
          '/http-throw-error': () => {
            throw new Error('any error');
          },
          '/error': () => {
            return errorResponse;
          },
        });
      });

      it('HTTP Internal Error', async () => {
        const method = http.get([], '/http-throw-error');

        await expect(method.send()).rejects.toThrowError(
          new RegExp('^any error$', 'i'),
        );
      });

      it('Unexpected Error', async () => {
        const result = await http.get([], '/error').send();

        expect(result).toMatchObject(left(errorResponse));
      });

      it('Expected Error', async () => {
        const result = await http.get([409], '/error').send();

        expect(result).toStrictEqual(
          left({
            message: 'any text',
            statusCode: 409,
          }),
        );
      });
    });
  });

  describe('Methods', () => {
    const response = {
      id: 0,
      title: 'any title',
    };

    const expectedResult = right(response);

    const noContentStatus = 204;

    beforeAll(() => {
      mock = defineMock({
        ['[GET]' + path]: response,
        ['[POST]' + path]: response,
        ['[PATCH]' + path]: response,
        ['[DELETE]' + path]: {
          status: noContentStatus,
          statusText: 'No Content',
        },
      });
    });

    describe('GET', () => {
      it('[GET] Invoke', async () => {
        const result = await http.get([], path).send();

        expect(result).toMatchObject(expectedResult);
      });

      it('[GET] Query Parameters', () => {
        const queryParameters = {
          test: 'test',
          query: 'query',
        };

        const method = http.get([], path, queryParameters);

        expect(method.config.params).toMatchObject(queryParameters);
      });

      it('[GET] Meta', () => {
        const method = http.get([], path, {}, { meta: { someInfo: 1 } });

        method.context.options.beforeRequest?.(method);

        expect(method.meta).toMatchObject({ someInfo: 1 });
      });

      describe('[GET] Headers', () => {
        it('[GET] Default Headers', () => {
          const method = http.get([], path);

          method.context.options.beforeRequest?.(method);

          expect(method.config.headers).toMatchObject(defaultHeaders);
        });

        it('[GET] Custom Headers', () => {
          const headers = {
            'Content-Type': 'application/x-www-form-urlencoded',
          };

          const method = http.get(
            [],
            path,
            {},
            {
              headers,
            },
          );

          method.context.options.beforeRequest?.(method);

          expect(method.config.headers).toMatchObject(headers);
        });
      });
    });

    describe('POST', () => {
      it('[POST] Invoke', async () => {
        const result = await http.post([], path, response).send();

        expect(result).toMatchObject(expectedResult);
      });

      it('[POST] Body', () => {
        const data = {
          test: 'test',
          query: 'query',
        };

        const method = http.post([], path, data);

        expect(method.data).toMatchObject(data);
      });

      it('[POST] Meta', () => {
        const method = http.post([], path, {}, { meta: { someInfo: 1 } });

        method.context.options.beforeRequest?.(method);

        expect(method.meta).toMatchObject({ someInfo: 1 });
      });

      describe('[POST] Headers', () => {
        it('[POST] Default Headers', () => {
          const method = http.post([], path, {});

          method.context.options.beforeRequest?.(method);

          expect(method.config.headers).toMatchObject(defaultHeaders);
        });

        it('[POST] Custom Headers', () => {
          const headers = {
            'Content-Type': 'application/x-www-form-urlencoded',
          };

          const method = http.post(
            [],
            path,
            {},
            {
              headers,
            },
          );

          method.context.options.beforeRequest?.(method);

          expect(method.config.headers).toMatchObject(headers);
        });
      });
    });

    describe('PATCH', () => {
      it('[PATCH] Invoke', async () => {
        const result = await http.patch([], path, response).send();

        expect(result).toMatchObject(expectedResult);
      });

      it('[PATCH] Body', () => {
        const data = {
          test: 'test',
          query: 'query',
        };

        const method = http.patch([], path, data);

        expect(method.data).toMatchObject(data);
      });

      it('[PATCH] Meta', () => {
        const method = http.post([], path, {}, { meta: { someInfo: 1 } });

        method.context.options.beforeRequest?.(method);

        expect(method.meta).toMatchObject({ someInfo: 1 });
      });

      describe('[PATCH] Headers', () => {
        it('[PATCH] Default Headers', () => {
          const method = http.patch([], path, {});

          method.context.options.beforeRequest?.(method);

          expect(method.config.headers).toMatchObject(defaultHeaders);
        });

        it('[PATCH] Custom Headers', () => {
          const headers = {
            'Content-Type': 'application/x-www-form-urlencoded',
          };

          const method = http.patch(
            [],
            path,
            {},
            {
              headers,
            },
          );

          method.context.options.beforeRequest?.(method);

          expect(method.config.headers).toMatchObject(headers);
        });
      });
    });

    describe('DELETE', () => {
      const expectedResult = right(noContentStatus);

      it('[DELETE] Invoke', async () => {
        const result = await http.delete([], path, response).send();

        expect(result).toMatchObject(expectedResult);
      });

      it('[DELETE] Body', () => {
        const data = {
          test: 'test',
          query: 'query',
        };

        const method = http.delete([], path, data);

        expect(method.data).toMatchObject(data);
      });

      it('[DELETE] Meta', () => {
        const method = http.post([], path, {}, { meta: { someInfo: 1 } });

        method.context.options.beforeRequest?.(method);

        expect(method.meta).toMatchObject({ someInfo: 1 });
      });

      describe('[DELETE] Headers', () => {
        it('[DELETE] Default Headers', () => {
          const method = http.delete([], path, {});

          method.context.options.beforeRequest?.(method);

          expect(method.config.headers).toMatchObject(defaultHeaders);
        });

        it('[DELETE] Custom Headers', () => {
          const headers = {
            'Content-Type': 'application/x-www-form-urlencoded',
          };

          const method = http.delete(
            [],
            path,
            {},
            {
              headers,
            },
          );

          method.context.options.beforeRequest?.(method);

          expect(method.config.headers).toMatchObject(headers);
        });
      });
    });
  });
});
