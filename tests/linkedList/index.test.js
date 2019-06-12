import LinkedList from '../../src/linkedList';
import LinkNode from '../../src/linkedList/LinkNode';
describe('LinkedList', () => {
  test('smoke test', () => {
    const list = new LinkedList();
    expect(list).toBeInstanceOf(LinkedList);
  });

  describe('Adding values', () => {
    let list;

    beforeEach(() => {
      list = new LinkedList();
    });

    it('creates a sentinal node on initilization', () => {
      const first = list.first();
      expect(first).toBeInstanceOf(LinkNode);
      expect(first.val).toBe(null);
    });

    describe('push()', () => {
      it('allows adding a new value', () => {
        list.push(0);
        expect(list.first().val).toBe(0);
        expect(list.last().val).toBe(0);
      });
  
      it('allows adding multiple values', () => {
        list.push(0);
        list.push(1);
        list.push(2);
        expect(list.first().val).toBe(0);
        expect(list.last().val).toBe(2);
        expect(list.first().next().val).toBe(1);
      });
    });

    describe('unshift()', () => {
      it('allows adding a new value', () => {
        list.unshift(0);
        expect(list.first().val).toBe(0);
        expect(list.last().val).toBe(0);
      });
  
      it('allows adding multiple values', () => {
        list.unshift(0);
        list.unshift(1);
        list.unshift(2);
        expect(list.first().val).toBe(2);
        expect(list.last().val).toBe(0);
        expect(list.first().next().val).toBe(1);
      });
    });

  });

  describe('When creating with inital values', () => {
    it('sets provided values when initialized', () => {
      const initialLinkValues = ["a", "b", "c"];
      const linkedList = new LinkedList(initialLinkValues);
      const first = linkedList.first();
      expect(first.val).toBe(initialLinkValues[0]);
      expect(first.next().val).toBe(initialLinkValues[1]);
      expect(linkedList.last().val).toBe(initialLinkValues[2]);
    });
  });

  describe('Removing values', () => {
    let list;

    beforeEach(() => {
      list = new LinkedList();
      list.push(0);
      list.push(1);
      list.push(2);
      list.push(3);
      list.push(4);
    });

    describe('pop()', () => {
      it('allows removing the last node', () => {
        const removedNode = list.pop();
        expect(removedNode).toBeInstanceOf(LinkNode);
        expect(removedNode.val).toBe(4);
      });
  
      it('allows removing multiple values', () => {
        list.pop();
        list.pop();
        list.pop();
        expect(list.last().val).toBe(1);
      });

      it('does not allow removing the sentinel', () => {
        list.pop();
        list.pop();
        list.pop();
        list.pop();
        list.pop();
        list.pop();
        expect(list.first()).toBeInstanceOf(LinkNode);
        expect(list.first().val).toBe(null);
      });
    });

    describe('shift()', () => {
      it('allows removing the first node', () => {
        const removedNode = list.shift();
        expect(removedNode).toBeInstanceOf(LinkNode);
        expect(removedNode.val).toBe(0);
      });
  
      it('allows removing multiple values', () => {
        list.shift();
        list.shift();
        list.shift();
        expect(list.first().val).toBe(3);
      });

      it('does not allow removing the sentinel', () => {
        list.shift();
        list.shift();
        list.shift();
        list.shift();
        list.shift();
        list.shift();
        expect(list.first()).toBeInstanceOf(LinkNode);
        expect(list.first().val).toBe(null);
      });
    });
  });

  describe('Iteration', () => {
    let list;
    beforeEach(() => {
      list = new LinkedList();
      list.push(0);
      list.push(1);
      list.push(2);
      list.push(3);
      list.push(4);
    });

    test('forEach()', () => {
      const testFn = jest.fn();
      const callback = ({ val }) => testFn(val);

      list.forEach(callback);

      expect(testFn).toHaveBeenCalledTimes(5);
      expect(testFn).toHaveBeenNthCalledWith(1, 0);
      expect(testFn).toHaveBeenNthCalledWith(2, 1);
      expect(testFn).toHaveBeenNthCalledWith(3, 2);
      expect(testFn).toHaveBeenNthCalledWith(4, 3);
      expect(testFn).toHaveBeenNthCalledWith(5, 4);
    });

    describe('forEachAsync()', () => {
      it('calls with valid callback', async () => {
        const testFn = jest.fn();
        const callback = ({ val }) => testFn(val);
  
        await list.forEachAsync(callback);
  
        expect(testFn).toHaveBeenCalledTimes(5);
        expect(testFn).toHaveBeenNthCalledWith(1, 0);
        expect(testFn).toHaveBeenNthCalledWith(2, 1);
        expect(testFn).toHaveBeenNthCalledWith(3, 2);
        expect(testFn).toHaveBeenNthCalledWith(4, 3);
        expect(testFn).toHaveBeenNthCalledWith(5, 4);
      });

      it('errors with invalid callback', async () => {
        const failBack = () => { throw 'Intentional Error'; };
        try {
          await list.forEachAsync(failBack);
          expect(true).toBe(false);
        } catch (error) {
          expect(error).toBe('Intentional Error');
        }
      });
    });
  });
});