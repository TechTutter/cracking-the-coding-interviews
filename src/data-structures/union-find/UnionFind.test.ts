import { assertEquals, assert } from "@std/assert";
import { UnionFind } from "./UnionFind.ts";

Deno.test("UnionFind - Basic Operations", () => {
  const uf = new UnionFind(5);

  // Test initial state
  assertEquals(uf.size(), 5);
  assertEquals(uf.count(), 5);
  assert(!uf.connected(0, 1));

  // Test union
  uf.union(0, 1);
  assertEquals(uf.count(), 4);
  assert(uf.connected(0, 1));
  assert(uf.connected(1, 0));

  // Test multiple unions
  uf.union(1, 2);
  assertEquals(uf.count(), 3);
  assert(uf.connected(0, 2));
  assert(uf.connected(2, 0));

  // Test independent sets
  assert(!uf.connected(0, 3));
  assert(!uf.connected(0, 4));
});

Deno.test("UnionFind - Path Compression", () => {
  const uf = new UnionFind(10);

  // Create a chain: 0 -> 1 -> 2 -> 3 -> 4
  for (let i = 0; i < 4; i++) {
    uf.union(i, i + 1);
  }

  // Test path compression
  const root = uf.find(0);
  assertEquals(uf.find(4), root);
  assertEquals(uf.find(2), root);
  assertEquals(uf.find(1), root);
});

Deno.test("UnionFind - Union by Rank", () => {
  const uf = new UnionFind(6);

  // Create two trees of different heights
  uf.union(0, 1);
  uf.union(1, 2);
  uf.union(3, 4);

  // Union should attach smaller tree to larger one
  uf.union(0, 3);
  assert(uf.connected(0, 4));
  assert(uf.connected(2, 3));
});

Deno.test("UnionFind - Reset", () => {
  const uf = new UnionFind(5);

  // Perform some operations
  uf.union(0, 1);
  uf.union(2, 3);
  assertEquals(uf.count(), 3);

  // Reset
  uf.reset();
  assertEquals(uf.count(), 5);
  assert(!uf.connected(0, 1));
  assert(!uf.connected(2, 3));
});

Deno.test("UnionFind - Complex Operations", () => {
  const uf = new UnionFind(10);

  // Create multiple connected components
  uf.union(0, 1);
  uf.union(2, 3);
  uf.union(4, 5);
  uf.union(6, 7);
  uf.union(8, 9);

  assertEquals(uf.count(), 5);

  // Merge some components
  uf.union(1, 3);
  uf.union(5, 7);
  assertEquals(uf.count(), 3);

  // Verify connections
  assert(uf.connected(0, 2));
  assert(uf.connected(4, 6));
  assert(!uf.connected(0, 4));
  assert(!uf.connected(0, 8));
}); 