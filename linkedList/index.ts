export class LinkNode {
  next: LinkNode;
  previous: LinkNode;
  val: any;

  constructor (val : any, previous? : LinkNode, next? : LinkNode) {
    this.val = val;
    this.previous = previous || this;
    this.next = next || this;
  }

  remove() {
    this.next.previous = this.previous;
    this.previous.next = this.next;
  }
}

export class LinkedList {
  sentinel: LinkNode;
  
  constructor() {
    this.sentinel = new LinkNode(null);
  }

  forEach(callback : (this: void, linkNode: LinkNode, idx: number) => void) {
    let idx = 0;
    let current = this.sentinel.next;
    while (current !== this.sentinel) {
      callback(current, idx);
      idx += 1;
      current = current.next;
    }
  }

  forEachAsync(callback : (this: void, linkNode: LinkNode, idx: number) => void) {
    let promises = [];
    this.forEach((linkNode, idx) => {
      const promise = new Promise (async (resolve, reject) => {
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