import { EmptyStackError } from '@models/Errors.ts';

/**
 * Array-based Stack implementation
 * @example
 * const stack = new Stack<number>();
 * stack.push(1);
 * stack.push(2);
 * stack.pop(); // 2
 * stack.peek(); // 1
 * stack.isEmpty(); // false
 */
export class Stack<T extends number | string | boolean | null> {
  private items: T[];

  constructor(initialItems?: T[]) {
    this.items = initialItems ?? [];
  }

  push(item: T) {
    this.items.push(item);
  }

  /**
   * Return the top item from the stack, or throw an error if the stack is empty
   * Returning null is also a valid approach, but calling pop on an empty
   * stack generally indicates a logical error in the calling code
   * @throws {EMPTY_STACK_ERROR} if the stack is empty
   */
  pop() {
    if (this.isEmpty()) throw new EmptyStackError();

    // just for educational purposes, of course "items.pop()" can be used here
    const item = this.items[this.items.length - 1];
    this.items.length = this.items.length - 1;
    return item;
  }

  peek(): T | null {
    if (this.isEmpty()) return null;
    return this.items[this.items.length - 1];
  }

  isEmpty() {
    return this.items.length === 0;
  }

  size() {
    return this.items.length;
  }

  [Symbol.for("Deno.customInspect")]() {
    return this.items.join(" <- ");
  }
}
