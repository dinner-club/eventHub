import LinkNode from '../../src/linkedList/LinkNode';

describe('LinkNode', () => {
  const val = "Value";
  test('smoke test', () => {
    const linkNode = new LinkNode(val)
    expect(linkNode).toBeInstanceOf(LinkNode);
    expect(linkNode.val).toBe(val);
  });

  describe('When instantiated without a previous or next value', () => {
    let linkNode;

    beforeEach(() => {
      linkNode = new LinkNode(val);
    });

    it('sets itself as the previous value', () => {
      expect(linkNode.previous()).toBe(linkNode);
    });
    it('sets itself as the next value', () => {
      expect(linkNode.next()).toBe(linkNode);
    });
  });

  describe('remove()', () => {
    let link0;
    let link1;
    let link2;

    beforeEach(() => {
      link0 = new LinkNode(0);
      link1 = new LinkNode(1);
      link2 = new LinkNode(2, link0, link1);
    });

    it('sets sets it\'s next as itself.', () => {
      link2.remove();
      expect(link2.next()).toBe(link2);
    });
    it('sets sets it\'s previous as itself.', () => {
      link2.remove();
      expect(link2.previous()).toBe(link2);
    });
    it('calls setPrevious of it\'s next', () => {
      const setPrevious = jest.spyOn(link1, 'setPrevious');
      link2.remove();
      expect(setPrevious).toBeCalledWith(link0);
    });
    it('calls setNext of it\'s previous', () => {
      const setNext = jest.spyOn(link0, 'setNext');
      link2.remove();
      expect(setNext).toBeCalledWith(link1);
    });
  });
});
