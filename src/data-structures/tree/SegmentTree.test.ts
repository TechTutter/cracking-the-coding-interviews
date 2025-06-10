import { assertEquals, assertThrows } from "@std/assert";
import { SegmentTree } from "./SegmentTree.ts";

Deno.test("SegmentTree - Sum Operations", () => {
  const arr = [1, 3, 5, 7, 9, 11];
  const st = new SegmentTree(arr, (a, b) => a + b, 0);

  // Test initial queries
  assertEquals(st.query(0, 2), 9); // 1 + 3 + 5
  assertEquals(st.query(1, 4), 24); // 3 + 5 + 7 + 9
  assertEquals(st.query(0, 5), 36); // Sum of all elements

  // Test updates
  st.update(2, 10); // Change 5 to 10
  assertEquals(st.query(0, 2), 14); // 1 + 3 + 10
  assertEquals(st.query(1, 4), 29); // 3 + 10 + 7 + 9
});

Deno.test("SegmentTree - Min Operations", () => {
  const arr = [5, 3, 7, 1, 9, 2];
  const st = new SegmentTree(arr, Math.min, Infinity);

  // Test initial queries
  assertEquals(st.query(0, 2), 3); // min(5, 3, 7)
  assertEquals(st.query(1, 4), 1); // min(3, 7, 1, 9)
  assertEquals(st.query(0, 5), 1); // min of all elements

  // Test updates
  st.update(3, 0); // Change 1 to 0
  assertEquals(st.query(1, 4), 0); // min(3, 7, 0, 9)
  assertEquals(st.query(0, 5), 0); // min of all elements
});

Deno.test("SegmentTree - Max Operations", () => {
  const arr = [5, 3, 7, 1, 9, 2];
  const st = new SegmentTree(arr, Math.max, -Infinity);

  // Test initial queries
  assertEquals(st.query(0, 2), 7); // max(5, 3, 7)
  assertEquals(st.query(1, 4), 9); // max(3, 7, 1, 9)
  assertEquals(st.query(0, 5), 9); // max of all elements

  // Test updates
  st.update(2, 10); // Change 7 to 10
  assertEquals(st.query(0, 2), 10); // max(5, 3, 10)
  assertEquals(st.query(0, 5), 10); // max of all elements
});

Deno.test("SegmentTree - Edge Cases", () => {
  const arr = [1, 2, 3];
  const st = new SegmentTree(arr, (a, b) => a + b, 0);

  // Test single element queries
  assertEquals(st.query(0, 0), 1);
  assertEquals(st.query(1, 1), 2);
  assertEquals(st.query(2, 2), 3);

  // Test invalid ranges
  assertThrows(() => st.query(-1, 1));
  assertThrows(() => st.query(0, 3));
  assertThrows(() => st.query(2, 1));

  // Test invalid updates
  assertThrows(() => st.update(-1, 5));
  assertThrows(() => st.update(3, 5));
}); 