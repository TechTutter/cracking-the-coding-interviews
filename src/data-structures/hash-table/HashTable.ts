type Entry<K, V> = { key: K; value: V };

export class HashTable<K extends string | number, V> {
  private buckets: Entry<K, V>[][] = [];
  private capacity: number;
  private size = 0;

  constructor(capacity: number = 32) {
    this.capacity = capacity;
    this.buckets = Array.from({ length: capacity }, () => []);
  }

  private hash(key: K): number {
    if (typeof key === "number") return key % this.capacity;

    let hash = 0;
    for (let i = 0; i < key.length; i++) {
      hash = (hash * 31 + key.charCodeAt(i)) >>> 0;
    }
    return hash % this.capacity;
  }

  set(key: K, value: V): void {
    const index = this.hash(key);
    const bucket = this.buckets[index];

    for (const entry of bucket) {
      if (entry.key === key) {
        entry.value = value;
        return;
      }
    }

    bucket.push({ key, value });
    this.size++;
  }

  get(key: K): V | undefined {
    const index = this.hash(key);
    const bucket = this.buckets[index];
    for (const entry of bucket) {
      if (entry.key === key) return entry.value;
    }
    return undefined;
  }

  remove(key: K): boolean {
    const index = this.hash(key);
    const bucket = this.buckets[index];

    const idx = bucket.findIndex((entry) => entry.key === key);
    if (idx !== -1) {
      bucket.splice(idx, 1);
      this.size--;
      return true;
    }

    return false;
  }

  has(key: K): boolean {
    return this.get(key) !== undefined;
  }

  clear(): void {
    this.buckets = Array.from({ length: this.capacity }, () => []);
    this.size = 0;
  }

  get length(): number {
    return this.size;
  }
}
