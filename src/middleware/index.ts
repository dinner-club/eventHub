import { EventHubMessage } from "..";
import LinkedList from "../linkedList";

export type MiddlewareFn = (message: EventHubMessage) => EventHubMessage;

class Middleware {
  private _middlewareList: LinkedList;

  public constructor(middlewares: MiddlewareFn[]) {
    this._middlewareList = new LinkedList(middlewares);
  }

  public push(fn: MiddlewareFn): void {
    this._middlewareList.insertBefore(this._middlewareList.last(), fn);
  }

  public unshift(fn: MiddlewareFn): void {
    this._middlewareList.insertAfter(this._middlewareList.first(), fn);
  }

  public chain(message: EventHubMessage): EventHubMessage {
    let currentMessage = message;
    this._middlewareList.forEach((node): void => {
      currentMessage = node.val(currentMessage);
    });
    return currentMessage;
  }
}

export default Middleware;
