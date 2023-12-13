import type EventEmitter from "events";

type Emitter = (event: string | symbol, ...args: unknown[]) => void;

export function getEmitter(eventEmitter: EventEmitter): Emitter {
  return function (event: string | symbol, ...args: unknown[]) {
    eventEmitter.emit(event, ...args);
  };
}
