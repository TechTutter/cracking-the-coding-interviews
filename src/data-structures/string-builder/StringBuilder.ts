/**
 * This pattern is most common on programming languages that don't have built-in support for string manipulation.
 * It's a way to build a string incrementally, which is more efficient than concatenating strings using the `+` operator.
 * If you concatenate on a for loop, you'll get O(n^2) time complexity as you're creating a new string on each iteration.
 * This pattern is a good compromise between readability and performance, as it gives O(n) time 
 * complexity (and can be cached to optimize even more), and only O(1) time for each append operation.
 * 
 * Why is join faster then a for loop? It is optimized natively, it knows in advance the length of resulting string 
 * and allocate the necessary space before proceeding with the concatenation.
*/
export class StringBuilder {
  private parts: string[] = [];
  private _cachedString: string | null = null;

  constructor(initial?: string) {
    if (initial !== undefined) {
      this.parts.push(initial);
    }
  }

  append(value: string): this {
    this.parts.push(value);
    this._cachedString = null;
    return this;
  }

  appendLine(value: string): this {
    this.parts.push(value + '\n');
    this._cachedString = null;
    return this;
  }

  clear(): this {
    this.parts = [];
    this._cachedString = null;
    return this;
  }

  toString(): string {
    if (this._cachedString === null) {
      this._cachedString = this.parts.join('');
    }
    return this._cachedString;
  }

  get length(): number {
    return this.toString().length;
  }

  isEmpty(): boolean {
    return this.parts.length === 0 || this.length === 0;
  }
}