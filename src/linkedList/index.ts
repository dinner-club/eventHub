export class LinkNode {
  public next: LinkNode;
  public previous: LinkNode;
  public val: any;

  public constructor (val: any, previous? : LinkNode, next? : LinkNode) {
    this.val = val;
    this.previous = previous || this;
    this.next = next || this;
  }

  public remove(): LinkNode {
    this.next.previous = this.previous;
    this.previous.next = this.next;
    return this;
  }
}

export class LinkedList {
  private sentinel: LinkNode;
  
  public constructor() {
    this.sentinel = new LinkNode(null);
  }

  public forEach(callback: (this: void, linkNode: LinkNode, idx: number) => void): LinkedList {
    let idx = 0;
    let current = this.sentinel.next;
    while (current !== this.sentinel) {
      callback(current, idx);
      idx += 1;
      current = current.next;
    }
    return this;
  }

  public forEachAsync(callback: (this: void, linkNode: LinkNode, idx: number) => void): Promise<{}> {
    let promises: Promise<{}>[] = [];
    this.forEach((linkNode, idx): void => {
      const promise = new Promise ((resolve, reject): void => {
        try {
          callback(linkNode, idx);
        } catch (error) {
          reject();
        }
        resolve();
      });
      promises.push(promise);
    });
    return Promise.all(promises);
  }
}