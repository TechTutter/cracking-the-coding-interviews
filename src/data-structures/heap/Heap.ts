export type Comparator<T> = (a: T, b: T) => number;

export class Heap<T> {
  private heap: T[] = [];
  private readonly compare: Comparator<T>;

  constructor(comparator: Comparator<T>, items?: T[]) {
    this.compare = comparator;
    if (items) {
      this.heap = [...items];
      this.heapify();
    }
  }

  private heapify(): void {
    for (let i = Math.floor(this.size / 2) - 1; i >= 0; i--) {
      this.siftDown(i);
    }
  }

  private siftUp(index: number): void {
    let current = index;
    let parent = this.getParentIndex(current);

    while (current > 0 && this.compare(this.heap[current], this.heap[parent]) < 0) {
      this.swap(current, parent);
      current = parent;
      parent = this.getParentIndex(current);
    }
  }

  private siftDown(index: number): void {
    const current = index;
    let smallest = current;
    const left = this.getLeftChildIndex(current);
    const right = this.getRightChildIndex(current);

    if (left < this.size && this.compare(this.heap[left], this.heap[smallest]) < 0) {
      smallest = left;
    }

    if (right < this.size && this.compare(this.heap[right], this.heap[smallest]) < 0) {
      smallest = right;
    }

    if (smallest !== current) {
      this.swap(current, smallest);
      this.siftDown(smallest);
    }
  }

  private getParentIndex(index: number): number {
    return Math.floor((index - 1) / 2);
  }

  private getLeftChildIndex(index: number): number {
    return 2 * index + 1;
  }

  private getRightChildIndex(index: number): number {
    return 2 * index + 2;
  }

  private swap(i: number, j: number): void {
    [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
  }

  push(value: T): this {
    this.heap.push(value);
    this.siftUp(this.size - 1);
    return this;
  }

  pop(): T | undefined {
    if (this.isEmpty()) return undefined;

    const result = this.heap[0];
    const last = this.heap.pop()!;

    if (!this.isEmpty()) {
      this.heap[0] = last;
      this.siftDown(0);
    }

    return result;
  }

  peek(): T | undefined {
    return this.heap[0];
  }

  clear(): void {
    this.heap = [];
  }

  get size(): number {
    return this.heap.length;
  }

  isEmpty(): boolean {
    return this.size === 0;
  }

  toArray(): T[] {
    return [...this.heap];
  }
} 