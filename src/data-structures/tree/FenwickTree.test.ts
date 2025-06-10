import { assertEquals, assertThrows } from "@std/assert";
import { FenwickTree } from "./FenwickTree.ts";

Deno.test("FenwickTree - Basic Operations", () => {
  const ft = new FenwickTree(6);

  // Test initial state
  assertEquals(ft.query(0), 0);
  assertEquals(ft.query(5), 0);

  // Test updates and queries
  ft.update(0, 1);
  ft.update(1, 3);
  ft.update(2, 5);
  ft.update(3, 7);
  ft.update(4, 9);
  ft.update(5, 11);

  assertEquals(ft.query(0), 1);
  assertEquals(ft.query(1), 4);
  assertEquals(ft.query(2), 9);
  assertEquals(ft.query(3), 16);
  assertEquals(ft.query(4), 25);
  assertEquals(ft.query(5), 36);
});

Deno.test("FenwickTree - Range Queries", () => {
  const ft = new FenwickTree(6);

  // Initialize with values
  ft.update(0, 1);
  ft.update(1, 3);
  ft.update(2, 5);
  ft.update(3, 7);
  ft.update(4, 9);
  ft.update(5, 11);

  // Test range queries
  assertEquals(ft.rangeQuery(0, 2), 9); // 1 + 3 + 5
  assertEquals(ft.rangeQuery(1, 4), 24); // 3 + 5 + 7 + 9
  assertEquals(ft.rangeQuery(0, 5), 36); // Sum of all elements
  assertEquals(ft.rangeQuery(2, 2), 5); // Single element
});

Deno.test("FenwickTree - Updates and Range Queries", () => {
  const ft = new FenwickTree(6);

  // Initialize with values
  ft.update(0, 1);
  ft.update(1, 3);
  ft.update(2, 5);
  ft.update(3, 7);
  ft.update(4, 9);
  ft.update(5, 11);

  // Test updates
  ft.update(2, 5); // Add 5 to index 2 (total: 10)
  assertEquals(ft.rangeQuery(0, 2), 14); // 1 + 3 + 10
  assertEquals(ft.rangeQuery(1, 4), 29); // 3 + 10 + 7 + 9

  // Test negative updates
  ft.update(3, -3); // Subtract 3 from index 3 (total: 4)
  assertEquals(ft.rangeQuery(2, 4), 23); // 10 + 4 + 9
});

Deno.test("FenwickTree - Edge Cases", () => {
  const ft = new FenwickTree(3);

  // Test invalid indices
  assertThrows(() => ft.update(-1, 5));
  assertThrows(() => ft.update(3, 5));
  assertThrows(() => ft.query(-1));
  assertThrows(() => ft.query(3));
  assertThrows(() => ft.rangeQuery(-1, 1));
  assertThrows(() => ft.rangeQuery(0, 3));
  assertThrows(() => ft.rangeQuery(2, 1));

  // Test reset
  ft.update(0, 1);
  ft.update(1, 2);
  ft.update(2, 3);
  assertEquals(ft.rangeQuery(0, 2), 6);
  ft.reset();
  assertEquals(ft.rangeQuery(0, 2), 0);
}); 