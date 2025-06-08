import { BufferFullError, BufferEmptyError } from '../../models/Errors.ts';

export class CircularBuffer<T> {
  private buffer: (T | undefined)[];
  private head: number;
  private tail: number;
  private size: number;
  private capacity: number;

  constructor(capacity: number) {
    if (capacity <= 0) {
      throw new Error('Capacity must be greater than 0');
    }
    this.buffer = new Array(capacity);
    this.head = 0;
    this.tail = 0;
    this.size = 0;
    this.capacity = capacity;
  }

  /**
   * Adds an element to the buffer
   * @throws {BufferFullError} if buffer is full
   */
  enqueue(value: T): void {
    if (this.isFull()) {
      throw new BufferFullError();
    }

    this.buffer[this.tail] = value;
    this.tail = (this.tail + 1) % this.capacity;
    this.size++;
  }

  /**
   * Removes and returns the oldest element from the buffer
   * @throws {BufferEmptyError} if buffer is empty
   */
  dequeue(): T {
    if (this.isEmpty()) {
      throw new BufferEmptyError();
    }

    const value = this.buffer[this.head]!;
    this.buffer[this.head] = undefined;
    this.head = (this.head + 1) % this.capacity;
    this.size--;

    return value;
  }

  /**
   * Returns the oldest element without removing it
   * @throws {BufferEmptyError} if buffer is empty
   */
  peek(): T {
    if (this.isEmpty()) {
      throw new BufferEmptyError();
    }

    return this.buffer[this.head]!;
  }

  /**
   * Returns true if the buffer is empty
   */
  isEmpty(): boolean {
    return this.size === 0;
  }

  /**
   * Returns true if the buffer is full
   */
  isFull(): boolean {
    return this.size === this.capacity;
  }

  /**
   * Returns the number of elements in the buffer
   */
  getSize(): number {
    return this.size;
  }

  /**
   * Returns the capacity of the buffer
   */
  getCapacity(): number {
    return this.capacity;
  }

  /**
   * Clears all elements from the buffer
   */
  clear(): void {
    this.buffer = new Array(this.capacity);
    this.head = 0;
    this.tail = 0;
    this.size = 0;
  }

  /**
   * Returns an array containing all elements in the buffer
   * Elements are ordered from oldest to newest
   */
  toArray(): T[] {
    const result: T[] = [];
    let current = this.head;

    for (let i = 0; i < this.size; i++) {
      result.push(this.buffer[current]!);
      current = (current + 1) % this.capacity;
    }

    return result;
  }
} 