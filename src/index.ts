import LinkNode from "./linkedList/LinkNode";
import LinkedList from "./linkedList";
import Middleware, { MiddlewareFn } from "./middleware";

export interface EventHubListener {
  id: string;
  key: string;
  registrant: string;
  callback: Function;
}

export interface ListenerDictionaryEntry extends EventHubListener {
  linkNode: LinkNode;
}

export interface ListenerDictionary {
  [listenerKey: string]: ListenerDictionaryEntry;
}

export interface EventHubEvent {
  key: string;
  description: string;
  arguments: string[];
  registrant: string;
}

export interface EventDictionaryEntry extends EventHubEvent {
  listeners: LinkedList;
}

export interface EventDictionary {
  [eventKey: string]: EventDictionaryEntry;
}

export interface EventHubConstructorArgument {
  middleware?: Function[];
}

export interface EventHubMessage {
  payload: any;
  meta: {
    key: string;
    sender: string;
  };
}

class EventHub {
  private _eventDictionary: EventDictionary;
  private _listenerDictionary: ListenerDictionary;
  private _middleware: Middleware;

  public constructor({ middleware = [] }: EventHubConstructorArgument = {}) {
    this._eventDictionary = {};
    this._listenerDictionary = {};
    this._middleware = new Middleware([this._logPreMiddlewareMessage.bind(this), ...middleware, this._send.bind(this)])
  }

  public registerEvent(eventHubEvent: EventHubEvent): void {
    const eventListenersList = new LinkedList();
    this._eventDictionary[eventHubEvent.key] = {
      ...eventHubEvent,
      listeners: eventListenersList,
    };
  }

  public registerListener(eventHubListener: EventHubListener): void {
    const event = this._eventDictionary[eventHubListener.key];
    const linkNode = event.listeners.push(eventHubListener).last();
    this._listenerDictionary[eventHubListener.id] = {
      ...eventHubListener,
      linkNode,
    }
  }

  public deregisterListener(id: string): void {
    const listener = this._listenerDictionary[id];
    listener.linkNode.remove();
    delete this._listenerDictionary[id];
  }

  public deregisterEvent(key: string): void {
    delete this._eventDictionary[key];
  }

  public broadcast(message: EventHubMessage): void {
    this._middleware.chain(message);
  }

  public pushMiddleware(fn: MiddlewareFn): void {
    this._middleware.push(fn);
  }

  public unshiftMiddleware(fn: MiddlewareFn): void {
    this._middleware.unshift(fn);
  }

  private _logPreMiddlewareMessage(msg: EventHubMessage): EventHubMessage {
    return msg;
  }

  private _send(msg: EventHubMessage): EventHubMessage {
    const event = this._eventDictionary[msg.meta.key];
    event.listeners.forEachAsync((linkNode): void => {
      linkNode.val.callback(msg);
    });
    return msg;
  }
}

export default EventHub;
