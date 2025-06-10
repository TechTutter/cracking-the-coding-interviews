export class UnionFind {
  private parent: number[];
  private rank: number[];
  private _size: number;

  constructor(size: number) {
    this._size = size;
    this.parent = Array.from({ length: size }, (_, i) => i);
    this.rank = new Array(size).fill(0);
  }

  /**
   * Finds the root of the set containing element x
   * Uses path compression for optimization
   */
  find(x: number): number {
    if (this.parent[x] !== x) {
      this.parent[x] = this.find(this.parent[x]); // Path compression
    }
    return this.parent[x];
  }

  /**
   * Unions the sets containing elements x and y
   * Uses union by rank for optimization
   */
  union(x: number, y: number): void {
    const rootX = this.find(x);
    const rootY = this.find(y);

    if (rootX === rootY) return;

    // Union by rank
    if (this.rank[rootX] < this.rank[rootY]) {
      this.parent[rootX] = rootY;
    } else if (this.rank[rootX] > this.rank[rootY]) {
      this.parent[rootY] = rootX;
    } else {
      this.parent[rootY] = rootX;
      this.rank[rootX]++;
    }
    this._size--;
  }

  /**
   * Checks if elements x and y are in the same set
   */
  connected(x: number, y: number): boolean {
    return this.find(x) === this.find(y);
  }

  /**
   * Returns the number of elements in the data structure
   */
  size(): number {
    return this.parent.length;
  }

  /**
   * Returns the number of disjoint sets
   */
  count(): number {
    return this._size;
  }

  /**
   * Resets the data structure to its initial state
   */
  reset(): void {
    this._size = this.parent.length;
    this.parent = Array.from({ length: this._size }, (_, i) => i);
    this.rank = new Array(this._size).fill(0);
  }
} 