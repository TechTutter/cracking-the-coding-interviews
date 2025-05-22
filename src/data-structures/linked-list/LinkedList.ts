import { ListNode } from "@data-structures/linked-list/ListNode.ts";

export class LinkedList<T> {
  private head: ListNode<T> | null = null;
  private tail: ListNode<T> | null = null;
  private size: number = 0;

  constructor(items?: T[]) {
    if (items && items.length) {
      for (const item of items) {
        this.append(item);
      }
    }
  }

  [Symbol.iterator](): Iterator<T> {
    let current = this.head;
    return {
      next(): IteratorResult<T> {
        if (!current) return { done: true, value: undefined as T };
        const value = current.value;
        current = current.next;
        return { done: false, value };
      }
    };
  }

  append(value: T): this {
    const node = new ListNode(value);
    if (!this.head) {
      this.head = this.tail = node;
    } else {
      this.tail!.next = node;
      this.tail = node;
    }
    this.size++;
    return this;
  }

  prepend(value: T): this {
    const node = new ListNode(value, this.head);
    this.head = node;
    if (!this.tail) this.tail = node;
    this.size++;
    return this;
  }

  remove(value: T): boolean {
    if (!this.head) return false;

    if (this.head.value === value) {
      this.head = this.head.next;
      if (!this.head) this.tail = null;
      this.size--;
      return true;
    }

    let current = this.head;
    while (current.next && current.next.value !== value) {
      current = current.next;
    }

    if (current.next) {
      if (current.next === this.tail) this.tail = current;
      current.next = current.next.next;
      this.size--;
      return true;
    }

    return false;
  }

  get(index: number): T | null {
    if (index < 0 || index >= this.size) return null;
    let current = this.head;
    let i = 0;
    while (i < index) {
      current = current!.next;
      i++;
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
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  get length(): number {
    return this.size;
  }

  isEmpty(): boolean {
    return this.size === 0;
  }

  reverse(): this {
    let prev: ListNode<T> | null = null;
    let current = this.head;
    this.tail = this.head;

    while (current) {
      const next = current.next;
      current.next = prev;
      prev = current;
      current = next;
    }

    this.head = prev;
    return this;
  }
}
