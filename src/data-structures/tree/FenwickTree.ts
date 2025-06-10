export class FenwickTree {
  private tree: number[];
  private size: number;

  /**
   * Creates a new Fenwick Tree (Binary Indexed Tree)
   * @param size - The size of the tree
   */
  constructor(size: number) {
    this.size = size;
    this.tree = new Array(size + 1).fill(0);
  }

  /**
   * Updates the value at index by adding delta
   * Time Complexity: O(log n)
   */
  update(index: number, delta: number): void {
    if (index < 0 || index >= this.size) {
      throw new Error("Index out of bounds");
    }

    // Convert to 1-based indexing
    index++;

    while (index <= this.size) {
      this.tree[index] += delta;
      // Move to the next index by adding the least significant bit
      index += index & -index;
    }
  }

  /**
   * Queries the prefix sum from index 0 to index (inclusive)
   * Time Complexity: O(log n)
   */
  query(index: number): number {
    if (index < 0 || index >= this.size) {
      throw new Error("Index out of bounds");
    }

    // Convert to 1-based indexing
    index++;

    let sum = 0;
    while (index > 0) {
      sum += this.tree[index];
      // Move to the parent by removing the least significant bit
      index -= index & -index;
    }
    return sum;
  }

  /**
   * Queries the range sum from left to right (inclusive)
   * Time Complexity: O(log n)
   */
  rangeQuery(left: number, right: number): number {
    if (left < 0 || right >= this.size || left > right) {
      throw new Error("Invalid range");
    }

    return this.query(right) - (left > 0 ? this.query(left - 1) : 0);
  }

  /**
   * Returns the current size of the tree
   */
  getSize(): number {
    return this.size;
  }

  /**
   * Resets the tree to all zeros
   */
  reset(): void {
    this.tree = new Array(this.size + 1).fill(0);
  }
} 