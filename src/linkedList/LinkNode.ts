class LinkNode {
  private _next: LinkNode;
  private _previous: LinkNode;
  public val: any;
  public constructor(val: any, previous?: LinkNode, next?: LinkNode) {
    this.val = val;
    this._previous = previous || this;
    this._next = next || this;
  }

  public next(): LinkNode {
    return this._next;
  }

  public previous(): LinkNode {
    return this._previous;
  }

  public setNext(linkNode: LinkNode): LinkNode {
    this._next = linkNode;
    return this;
  }

  public setPrevious(linkNode: LinkNode): LinkNode {
    this._previous = linkNode;
    return this;
  }

  public remove(): LinkNode {
    this.next().setPrevious(this.previous());
    this.previous().setNext(this.next());
    this._next = this;
    this._previous = this;
    return this;
  }
}

export default LinkNode;
