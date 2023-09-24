/* eslint-disable @typescript-eslint/no-explicit-any */
type Constructor<T = object> = new (...args: any[]) => T;
type Wrapper<T = object> = { new (): T & any; prototype: T };
type DecoratorOptions = { name: string };
type ApiSchemaDecorator = <T extends Constructor>(
  options: DecoratorOptions,
) => (constructor: T) => Wrapper<T>;

/**
 *   TODO: Replace by native implementation, @see https://github.com/nestjs/swagger/pull/2427
 */
export const ApiSchema: ApiSchemaDecorator = ({ name }) => {
  return (constructor) => {
    const wrapper = class extends constructor {};
    Object.defineProperty(wrapper, 'name', {
      value: name,
      writable: false,
    });
    return wrapper;
  };
};
