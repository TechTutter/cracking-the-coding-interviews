import { OutOfBoundsError } from "@models/Errors.ts";

const BITS_PER_WORD = 32;

/**
 * A BitSet is a data structure that efficiently stores bits.
 * It uses an array of numbers, where each number (word) holds multiple bits.
 */
export class BitSet {
  private data: number[];
  private _size: number;

  /**
   * Creates a new BitSet.
   * @param numBits The total number of bits that the BitSet can store.
   */
  constructor(numBits: number) {
    if (numBits <= 0) {
      throw new Error("Number of bits must be positive.");
    }
    this._size = numBits;
    const wordCount = Math.ceil(numBits / BITS_PER_WORD);
    this.data = new Array(wordCount).fill(0);
  }

  /**
   * Sets the bit at the specified index to 1.
   * @param bitIndex The index of the bit to set.
   */
  set(bitIndex: number): void {
    if (bitIndex < 0 || bitIndex >= this._size) {
      throw new OutOfBoundsError(
        `Bit index ${bitIndex} is out of bounds (0-${this._size - 1}).`
      );
    }
    const wordIndex = Math.floor(bitIndex / BITS_PER_WORD);
    const bitInWord = bitIndex % BITS_PER_WORD;
    this.data[wordIndex] |= 1 << bitInWord;
  }

  /**
   * Clears the bit at the specified index (sets to 0).
   * @param bitIndex The index of the bit to clear.
   */
  clear(bitIndex: number): void {
    if (bitIndex < 0 || bitIndex >= this._size) {
      throw new OutOfBoundsError(
        `Bit index ${bitIndex} is out of bounds (0-${this._size - 1}).`
      );
    }
    const wordIndex = Math.floor(bitIndex / BITS_PER_WORD);
    const bitInWord = bitIndex % BITS_PER_WORD;
    this.data[wordIndex] &= ~(1 << bitInWord);
  }

  /**
   * Gets the value of the bit at the specified index.
   * @param bitIndex The index of the bit to get.
   * @returns True if the bit is set (1), false otherwise (0).
   */
  get(bitIndex: number): boolean {
    if (bitIndex < 0 || bitIndex >= this._size) {
      throw new OutOfBoundsError(
        `Bit index ${bitIndex} is out of bounds (0-${this._size - 1}).`
      );
    }
    const wordIndex = Math.floor(bitIndex / BITS_PER_WORD);
    const bitInWord = bitIndex % BITS_PER_WORD;
    return (this.data[wordIndex] & (1 << bitInWord)) !== 0;
  }

  /**
   * Returns the total number of bits that this BitSet can hold.
   */
  public size(): number {
    return this._size;
  }
}
