import LinkNode from "./linkedList/LinkNode";
import LinkedList from "./linkedList";

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

export default class EventHub {
  private _eventDictionary: EventDictionary;
  private _listenerDictionary: ListenerDictionary;

  public constructor() {
    this._eventDictionary = {};
    this._listenerDictionary = {};
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

  public deRegisterListener(id: string) {
    // remove node
    // remove from listener dictionary
  }

  public deRegisterEvent(key: string) {
    // remove listeners from listener dictionary
    // remove from event dictionary
  }
}
