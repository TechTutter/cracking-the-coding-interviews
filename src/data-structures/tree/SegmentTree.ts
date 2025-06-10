export class SegmentTree {
  private tree: number[];
  private size: number;
  private readonly operation: (a: number, b: number) => number;
  private readonly identity: number;

  /**
   * Creates a new Segment Tree
   * @param arr - The input array
   * @param operation - The operation to perform (e.g., sum, min, max)
   * @param identity - The identity element for the operation (e.g., 0 for sum, Infinity for min)
   */
  constructor(
    arr: number[],
    operation: (a: number, b: number) => number,
    identity: number
  ) {
    this.size = arr.length;
    this.operation = operation;
    this.identity = identity;
    this.tree = new Array(2 * this.size).fill(identity);
    this.build(arr);
  }

  /**
   * Builds the segment tree from the input array
   * Time Complexity: O(n)
   */
  private build(arr: number[]): void {
    // Fill the leaves
    for (let i = 0; i < this.size; i++) {
      this.tree[this.size + i] = arr[i];
    }

    // Build the tree
    for (let i = this.size - 1; i > 0; i--) {
      this.tree[i] = this.operation(
        this.tree[2 * i],
        this.tree[2 * i + 1]
      );
    }
  }

  /**
   * Updates a value at a specific index
   * Time Complexity: O(log n)
   */
  update(index: number, value: number): void {
    if (index < 0 || index >= this.size) {
      throw new Error("Index out of bounds");
    }

    // Update the leaf node
    let pos = this.size + index;
    this.tree[pos] = value;

    // Update all parent nodes
    while (pos > 1) {
      pos = Math.floor(pos / 2);
      this.tree[pos] = this.operation(
        this.tree[2 * pos],
        this.tree[2 * pos + 1]
      );
    }
  }

  /**
   * Queries the range [left, right]
   * Time Complexity: O(log n)
   */
  query(left: number, right: number): number {
    if (left < 0 || right >= this.size || left > right) {
      throw new Error("Invalid range");
    }

    let result = this.identity;
    left += this.size;
    right += this.size;

    while (left <= right) {
      // If left is odd, it's the right child of its parent
      if (left % 2 === 1) {
        result = this.operation(result, this.tree[left]);
        left++;
      }
      // If right is even, it's the left child of its parent
      if (right % 2 === 0) {
        result = this.operation(result, this.tree[right]);
        right--;
      }
      left = Math.floor(left / 2);
      right = Math.floor(right / 2);
    }

    return result;
  }

  /**
   * Returns the current size of the segment tree
   */
  getSize(): number {
    return this.size;
  }
} 