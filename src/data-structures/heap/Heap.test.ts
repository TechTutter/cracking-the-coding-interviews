import { assertEquals } from "@std/assert";
import { Heap } from "./Heap.ts";

Deno.test("Heap - constructor", () => {
  const minHeap = new Heap<number>((a, b) => a - b);
  assertEquals(minHeap.size, 0);
  assertEquals(minHeap.isEmpty(), true);

  const maxHeap = new Heap<number>((a, b) => b - a);
  assertEquals(maxHeap.size, 0);
  assertEquals(maxHeap.isEmpty(), true);
});

Deno.test("Heap - constructor with items", () => {
  const items = [5, 3, 7, 1, 9];
  const minHeap = new Heap<number>((a, b) => a - b, items);
  assertEquals(minHeap.size, 5);
  assertEquals(minHeap.peek(), 1);
});

Deno.test("Heap - push and pop", () => {
  const heap = new Heap<number>((a, b) => a - b);

  heap.push(5).push(3).push(7);
  assertEquals(heap.size, 3);
  assertEquals(heap.pop(), 3);
  assertEquals(heap.pop(), 5);
  assertEquals(heap.pop(), 7);
  assertEquals(heap.pop(), undefined);
});

Deno.test("Heap - peek", () => {
  const heap = new Heap<number>((a, b) => a - b);
  assertEquals(heap.peek(), undefined);

  heap.push(5).push(3).push(7);
  assertEquals(heap.peek(), 3);
});

Deno.test("Heap - clear", () => {
  const heap = new Heap<number>((a, b) => a - b, [5, 3, 7]);
  assertEquals(heap.size, 3);

  heap.clear();
  assertEquals(heap.size, 0);
  assertEquals(heap.isEmpty(), true);
});

Deno.test("Heap - toArray", () => {
  const items = [5, 3, 7, 1, 9];
  const heap = new Heap<number>((a, b) => a - b, items);

  const array = heap.toArray();
  assertEquals(array.length, 5);
  assertEquals(array[0], 1); // Root should be the minimum
});

Deno.test("Heap - max heap behavior", () => {
  const heap = new Heap<number>((a, b) => b - a, [5, 3, 7, 1, 9]);

  assertEquals(heap.pop(), 9);
  assertEquals(heap.pop(), 7);
  assertEquals(heap.pop(), 5);
  assertEquals(heap.pop(), 3);
  assertEquals(heap.pop(), 1);
});

Deno.test("Heap - custom object comparison", () => {
  interface Task {
    priority: number;
    name: string;
  }

  const heap = new Heap<Task>((a, b) => a.priority - b.priority);

  heap.push({ priority: 3, name: "Low" });
  heap.push({ priority: 1, name: "High" });
  heap.push({ priority: 2, name: "Medium" });

  assertEquals(heap.pop()?.name, "High");
  assertEquals(heap.pop()?.name, "Medium");
  assertEquals(heap.pop()?.name, "Low");
}); 