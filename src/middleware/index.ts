class Middleware {
  public idx: number;
  public fn: Function;
  public all: {
    [key: number]: Middleware;
  };

  public constructor({fn, idx, all}: {fn: Function, idx: number, all: {}}) {
    this.fn = fn;
    this.all = all;
    this.idx = idx;
    this.next = this.next.bind(this);
    this.all[this.idx] = this;
  }

  public handler(message: any) {
    this.fn(this.next, message);
  }

  public next(message: any): void {
    const nextIdx = this.idx + 1;
    const nextMiddleware = this.all[nextIdx];
    if (nextMiddleware) {
      nextMiddleware.handler(message);
    }
  }
}

export default Middleware;
