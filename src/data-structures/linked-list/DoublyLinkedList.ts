export class DoublyListNode<T> {
  constructor(
    public value: T,
    public next: DoublyListNode<T> | null = null,
    public prev: DoublyListNode<T> | null = null
  ) { }
}

export class DoublyLinkedList<T> {
  private head: DoublyListNode<T> | null = null;
  private tail: DoublyListNode<T> | null = null;
  private size: number = 0;

  constructor(items?: T[]) {
    if (items && items.length) {
      for (const item of items) {
        this.append(item);
      }
    }
  }

  append(value: T): this {
    const node = new DoublyListNode(value);
    if (!this.tail) {
      this.head = this.tail = node;
    } else {
      node.prev = this.tail;
      this.tail.next = node;
      this.tail = node;
    }
    this.size++;
    return this;
  }

  prepend(value: T): this {
    const node = new DoublyListNode(value);
    if (!this.head) {
      this.head = this.tail = node;
    } else {
      node.next = this.head;
      this.head.prev = node;
      this.head = node;
    }
    this.size++;
    return this;
  }

  remove(value: T): boolean {
    let current = this.head;
    while (current) {
      if (current.value === value) {
        if (current.prev) current.prev.next = current.next;
        else this.head = current.next;

        if (current.next) current.next.prev = current.prev;
        else this.tail = current.prev;

        this.size--;
        return true;
      }
      current = current.next;
    }
    return false;
  }

  get(index: number): T | null {
    if (index < 0 || index >= this.size) return null;

    let current: DoublyListNode<T> | null;
    if (index < this.size / 2) {
      current = this.head;
      for (let i = 0; i < index; i++) current = current!.next;
    } else {
      current = this.tail;
      for (let i = this.size - 1; i > index; i--) current = current!.prev;
    }

    return current!.value;
  }

  toArray(): T[] {
    const result: T[] = [];
    let current = this.head;
    while (current) {
      result.push(current.value);
      current = current.next;
    }
    return result;
  }

  clear(): void {
    this.head = this.tail = null;
    this.size = 0;
  }

  get length(): number {
    return this.size;
  }

  isEmpty(): boolean {
    return this.size === 0;
  }

  reverse(): this {
    let current = this.head;
    this.tail = this.head;

    while (current) {
      const next = current.next;
      [current.next, current.prev] = [current.prev, current.next];
      if (!next) this.head = current;
      current = next;
    }

    return this;
  }

  [Symbol.iterator](): Iterator<T> {
    let current = this.head;
    return {
      next(): IteratorResult<T> {
        if (!current) return { done: true, value: undefined as any };
        const value = current.value;
        current = current.next;
        return { done: false, value };
      }
    };
  }
}
