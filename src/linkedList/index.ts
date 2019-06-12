import LinkNode from "./LinkNode";

class LinkedList {
  private _sentinel: LinkNode;
  
  public constructor(initialLinkValues: any[] = []) {
    this._sentinel = new LinkNode(null);
    this.setLinks(initialLinkValues);
  }

  private setLinks(initialLinkValues: any[]) {
    initialLinkValues.forEach(value => this.push(value));
  }

  public push(val: any): LinkedList {
    const originalLast = this.last();
    const nextNode = new LinkNode(val, originalLast, this._sentinel);
    originalLast.setNext(nextNode);
    this._sentinel.setPrevious(nextNode);
    return this;
  }

  public unshift(val: any): LinkedList {
    const originalFirst = this.first();
    const prevNode = new LinkNode(val, this._sentinel, originalFirst);
    originalFirst.setPrevious(prevNode);
    this._sentinel.setNext(prevNode);
    return this;
  }

  public pop(): LinkNode {
    return this.last().remove();
  }

  public shift(): LinkNode {
    return this.first().remove();
  }

  public first(): LinkNode{
    return this._sentinel.next();
  }

  public last(): LinkNode{
    return this._sentinel.previous();
  }

  public forEach(callback: (this: void, linkNode: LinkNode, idx: number) => void): LinkedList {
    let idx = 0;
    let current = this._sentinel.next();
    while (current !== this._sentinel) {
      callback(current, idx);
      idx += 1;
      current = current.next();
    }
    return this;
  }

  public forEachAsync(callback: (this: void, linkNode: LinkNode, idx: number) => void): Promise<{}> {
    let promises: Promise<{}>[] = [];
    this.forEach((linkNode, idx): void => {
      const promise = new Promise ((resolve, reject): void => {
        const attemptCallback = (): void => {
          try {
            callback(linkNode, idx);
          } catch (error) {
            console.error(error);
            reject(error);
          }
          resolve();
        };
        setTimeout(attemptCallback, 0);
      });
      promises.push(promise);
    });
    return Promise.all(promises);
  }
}

export default LinkedList;