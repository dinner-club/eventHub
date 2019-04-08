interface ListenerDictionary {
  [propName: string]: Function;
}

interface EventDictionary {
  [propName: string]: Array<Function>;
}

class EventHub {
  listeners: ListenerDictionary;
  events: Object;
  constructor() {
    this.listeners = {};
    this.events = {};
  }

  registerListener(key : string, listener : Function) {

  }

  deregisterListener(key : string) {

  }

  subscribe(event : string, listener : Function, key: string) {

  }

  unsubscribe(event : string, key : string) {

  }
}
