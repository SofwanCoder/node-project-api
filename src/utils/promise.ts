import logger from "../internal/logger";

type PromiseFunc = (...args: any[]) => Promise<any | void>;

export function wrapPromise(func: PromiseFunc) {
  return function (...args: any[]) {
    func(...args)
      .then()
      .catch(logger.error);
  };
}
