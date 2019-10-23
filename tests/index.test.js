import EventHub, { Middleware } from '../src';

describe('FakeTest', () => {
  test('smoke test', () => {
    const hub = new EventHub();
    expect(hub).toBeInstanceOf(EventHub);
  });

  describe('events', () => {
    let hub;
    let event1 = {
      key: "super-awesome-event-key",
      description: "First test event",
      arguments: ["testArg"],
      registrant: "Jest Test",
    };

    beforeEach(() => {
      hub = new EventHub();
    });

    it('adds an event to the dictionary', () => {
      hub.registerEvent(event1);
      expect(hub._eventDictionary[event1.key]).not.toBeUndefined();
    });

    it('removes an event from the dictionary', () => {
      hub.registerEvent(event1);
      hub.deregisterEvent(event1.key);
      expect(hub._eventDictionary[event1.key]).toBeUndefined();
    });
  });

  describe('listeners', () => {
    let hub;
    let event1 = {
      key: 'super-awesome-event-key',
      description: 'First test event',
      arguments: ['testArg'],
      registrant: 'Jest Test',
    };
    let listener1 = {
      id: 'listener1',
      key: event1.key,
      registrant: 'Jest listener test',
    }
    let callback;

    beforeEach(() => {
      hub = new EventHub();
      hub.registerEvent(event1);

      callback = jest.fn();
      listener1.callback = callback;
    });

    it('registers a listener', () => {
      hub.registerListener(listener1);
      expect(hub._listenerDictionary[listener1.id]).not.toBeUndefined();
    });

    it('deregisters a listener', () => {
      hub.registerListener(listener1);
      hub.deregisterListener(listener1.id);
      expect(hub._listenerDictionary[listener1.id]).toBeUndefined();
    });
  });

  describe('broadcast', () => {
    let hub;
    const event1 = {
      key: 'super-awesome-event-key',
      description: 'First test event',
      arguments: ['testArg'],
      registrant: 'Jest Test',
    };
    const listener1 = {
      id: 'listener1',
      key: event1.key,
      registrant: 'Jest listener test',
    };
    const message = {
      payload: {
        testArg: "randomArg",
      },
      meta: {
        key: event1.key,
        sender: 'Jest listener callback test',
      }
    };
    const message2 = {
      payload: {
        testArg: "randomArg2",
      },
      meta: {
        key: event1.key,
        sender: 'Jest listener callback test',
      }
    };
    let callback;

    beforeEach(() => {
      hub = new EventHub();
      hub.registerEvent(event1);

      callback = jest.fn();
      listener1.callback = callback;
      hub.registerListener(listener1);
    });

    describe('without middleware', () => {
      it('calls the listeners callback', async () => {
        expect.assertions(1);
        hub.broadcast(message);
        const test = new Promise((resolve) => {
          setTimeout(() => {
            expect(callback).toBeCalledWith(message);
            resolve();
          }, 0);
        });
        await test;
      });
    });

    describe('setting middleware', () => {
      beforeEach(() => {
        hub = new EventHub();
        hub.registerEvent(event1);
  
        callback = jest.fn();
        listener1.callback = callback;
        hub.registerListener(listener1);
      });
  
      describe('push', () => {
        it('adds the middleware to the end of the _middleware', async () => {
          expect.assertions(1);
          const testFn = jest.fn(() => message2);
          hub.pushMiddleware(testFn);
          hub.broadcast(message);
          const test = new Promise((resolve) => {
            setTimeout(() => {
              expect(testFn).toBeCalledWith(message);
              resolve();
            }, 0);
          });
          await test;
        });
      });
  
      describe('unshift', () => {
        it('adds the middleware to the beginning of the _middleware', async () => {
          expect.assertions(1);
          const testFn = jest.fn(() => message2);
          hub.unshiftMiddleware(testFn);
          hub.broadcast(message);

          const test = new Promise((resolve) => {
            setTimeout(() => {
              expect(testFn).toBeCalledWith(message);
              resolve();
            }, 0);
          });
          await test;
        });
      });
    });
  });
});