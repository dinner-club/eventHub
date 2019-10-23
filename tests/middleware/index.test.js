import Middleware from '../../src/middleware';
import LinkedList from '../../src/linkedList';

describe('Middleware', () => {
  let middlewareFn1;
  let middlewareFn2;
  let middlewareFn3;
  let middleware;
  beforeEach(() => {
    middlewareFn1 = jest.fn((message) => {
      return message + 1;
    });
    middlewareFn2 = jest.fn((message) => {
      return message + 1;
    });
    middlewareFn3 = jest.fn((message) => {
      return message;
    });
    middleware = new Middleware([middlewareFn1, middlewareFn2, middlewareFn3]);
  });

  describe('instantiation', () => {
    const fn1 = jest.fn();
    const fn2 = jest.fn();
    const fn3 = jest.fn();
    const middleware = new Middleware([fn1, fn2, fn3]);

    test('smoke test', () => {
      expect(middleware).toBeInstanceOf(Middleware);
      expect(middleware._middlewareList).toBeInstanceOf(LinkedList);
    });
  });

  describe('chain()', () => {
    it('correctly passes the next function to the next middleware', () => {
      middleware.chain(0);

      expect(middlewareFn1.mock.calls[0][0]).toBe(0);
      expect(middlewareFn2.mock.calls[0][0]).toBe(1);
      expect(middlewareFn3.mock.calls[0][0]).toBe(2);
    });
  });

  describe('adding and removing', () => {
    describe('push()', () => {
      it('adds new middleware just before the last middleware', () => {
        const newMiddleware1 = jest.fn((message) => {
          return message + 2;
        });
  
        const newMiddleware2 = jest.fn((message) => {
          return message + 3;
        });
  
        middleware.push(newMiddleware1);
        middleware.push(newMiddleware2);
        middleware.chain(0);
  
        expect(newMiddleware1).toBeCalledWith(2);
        expect(newMiddleware2).toBeCalledWith(4);
        expect(middlewareFn3).toBeCalledWith(7);
      });
    });

    describe('unshift', () => {
      it('adds new middleware just after the first middleware', () => {
        const newMiddleware1 = jest.fn((message) => {
          return message + 2;
        });
  
        const newMiddleware2 = jest.fn((message) => {
          return message + 3;
        });
  
        middleware.unshift(newMiddleware1);
        middleware.unshift(newMiddleware2);
        const msg = middleware.chain(0);
  
        expect(newMiddleware1).toBeCalledWith(4);
        expect(newMiddleware2).toBeCalledWith(1);
        expect(msg).toBe(7);
      });
    });
  });
});
