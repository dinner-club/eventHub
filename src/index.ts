interface ListenerDictionary {
  [propName: string]: Function;
}

interface EventDictionary {
  [propName: string]: Function[];
}

export default class EventHub {
  private listeners: ListenerDictionary;
  private events: EventDictionary;

  public constructor() {
    this.listeners = {};
    this.events = {};
  }

  public registerListener(key: string, listener: Function) {

  }

  public deregisterListener(key: string) {

  }

  public subscribe(event: string, listener: Function, key: string) {

  }

  public unsubscribe(event: string, key: string) {

  }
}
