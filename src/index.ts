import LinkNode from "./linkedList/LinkNode";
import LinkedList from "./linkedList";
import Middleware from "./middleware";

interface EventHubListener {
  id: string;
  key: string;
  registrant: string;
  callback: Function;
}

interface ListenerDictionaryEntry extends EventHubListener {
  linkNode: LinkNode;
}

interface ListenerDictionary {
  [listenerKey: string]: ListenerDictionaryEntry;
}

interface EventHubEvent {
  key: string;
  description: string;
  arguments: string[];
  registrant: string;
}

interface EventDictionaryEntry extends EventHubEvent {
  listeners: LinkedList;
}

interface EventDictionary {
  [eventKey: string]: EventDictionaryEntry;
}

interface EventHubConstructorArgument {
  middleware?: Function[];
}

interface EventHubMessage {
  payload: any;
  meta: {
    key: string;
    sender: string;
  }
}

class EventHub {
  private _eventDictionary: EventDictionary;
  private _listenerDictionary: ListenerDictionary;
  private _middleware: Middleware[];

  public constructor({ middleware = [] }: EventHubConstructorArgument = {}) {
    this._eventDictionary = {};
    this._listenerDictionary = {};
    this._middleware = [];
    this._setMiddleware([this._logPreMiddlewareMessage.bind(this), ...middleware, this._send.bind(this)])
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

  public deregisterListener(id: string) {
    const listener = this._listenerDictionary[id];
    listener.linkNode.remove();
    delete this._listenerDictionary[id];
  }

  public deregisterEvent(key: string) {
    delete this._eventDictionary[key];
  }

  public broadcast(message: EventHubMessage) {
    this._middleware[0].handler(message);
  }

  private _setMiddleware(middleware: any[]) {
    const all = {};
    middleware.forEach((middlewareFn, idx) => {
      this._middleware.push(new Middleware({fn: middlewareFn, idx, all}))
    });
  }

  private _logPreMiddlewareMessage(next: Function, msg: EventHubMessage) {
    console.log('Pre-middleware message:', msg);
    next(msg);
  }

  private _send(_next: Function, msg: EventHubMessage) {
    console.log('Post-middleware message:', msg);
    const event = this._eventDictionary[msg.meta.key];
    event.listeners.forEach((linkNode) => {
      linkNode.val.callback(msg);
    });
  }
}

export default EventHub;
