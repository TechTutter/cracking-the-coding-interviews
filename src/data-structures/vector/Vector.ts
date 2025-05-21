import { EmptyVectorError } from "@models/Errors.ts";

/**
 * A vector is a dynamic array that can grow or shrink as needed.
 * In most programming languages, vectors are pre-built, in TS you can simply use the `Array` type.
 */
export class Vector<T> {
  private data: (T | undefined)[];
  private _size = 0;
  private _capacity;

  constructor(capacity: number) {
    this._capacity = capacity;
    this.data = new Array(this._capacity);
  }

  length(): number {
    return this._size;
  }

  capacity(): number {
    return this._capacity;
  }

  set(index: number, value: T): boolean {
    if (index < 0 || index >= this._size) return false;
    this.data[index] = value;
    return true;
  }

  get(index: number): T | undefined {
    if (index < 0 || index >= this._size) return undefined;
    return this.data[index];
  }

  push(value: T) {
    if (this._size >= this._capacity) this.resize();
    this.data[this._size++] = value;
  }

  pop(): T | undefined {
    if (this._size === 0) throw new EmptyVectorError();
    return this.data[--this._size];
  }

  private resize() {
    this._capacity *= 2;
    const newData = new Array(this._capacity);
    for (let i = 0; i < this._size; i++) newData[i] = this.data[i];
    this.data = newData;
  }
}
