import EventEmitter from "events";

type Emitter = (event: string | symbol, ...args: any[]) => void;

export function getEmitter(eventEmitter: EventEmitter): Emitter {
  return function (event: string | symbol, ...args: any[]) {
    eventEmitter.emit(event, ...args);
  };
}
