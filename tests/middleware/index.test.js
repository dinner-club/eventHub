import Middleware from '../../src/middleware';

describe('Middleware', () => {
  describe('instantiation', () => {
    const all = {};
    const idx = 0;
    const fn = jest.fn();
    const middleware = new Middleware({ all, idx, fn });
    test('smoke test', () => {
      expect(middleware).toBeInstanceOf(Middleware);
    });
  });

  describe('chaining', () => {
    let middlewareFn1;
    let middlewareFn2;
    let middlewareFn3;
    let all;
    let middleware1;
    beforeEach(() => {
      all = {}
      middlewareFn1 = jest.fn((next, message) => {
        next(message + 1);
      });
      middlewareFn2 = jest.fn((next, message) => {
        next(message + 1);
      });
      middlewareFn3 = jest.fn((next, message) => {
        next(message + 1);
      });
      middleware1 = new Middleware({ fn: middlewareFn1, all, idx: 0 });
      new Middleware({ fn: middlewareFn2, all, idx: 1 });
      new Middleware({ fn: middlewareFn3, all, idx: 2 });
    });

    it('correctly passes the next function to the next middleware', () => {
      middleware1.handler(0);
      expect(middlewareFn1.mock.calls[0][1]).toBe(0);
      expect(middlewareFn2.mock.calls[0][1]).toBe(1);
      expect(middlewareFn3.mock.calls[0][1]).toBe(2);
    });
  });
});
