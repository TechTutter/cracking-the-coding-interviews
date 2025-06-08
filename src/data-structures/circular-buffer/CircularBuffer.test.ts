import { assertEquals, assertThrows } from "@std/assert";
import { CircularBuffer } from './CircularBuffer.ts';
import { BufferFullError, BufferEmptyError } from '../../models/Errors.ts';

Deno.test("CircularBuffer - constructor", async (t) => {
  await t.step("should create an empty buffer with given capacity", () => {
    const buffer = new CircularBuffer<number>(3);
    assertEquals(buffer.getSize(), 0);
    assertEquals(buffer.getCapacity(), 3);
    assertEquals(buffer.isEmpty(), true);
    assertEquals(buffer.isFull(), false);
  });

  await t.step("should throw error for non-positive capacity", () => {
    assertThrows(() => new CircularBuffer<number>(0), Error, "Capacity must be greater than 0");
    assertThrows(() => new CircularBuffer<number>(-1), Error, "Capacity must be greater than 0");
  });
});

Deno.test("CircularBuffer - enqueue", async (t) => {
  await t.step("should add elements to the buffer", () => {
    const buffer = new CircularBuffer<number>(3);
    buffer.enqueue(1);
    buffer.enqueue(2);
    assertEquals(buffer.getSize(), 2);
    assertEquals(buffer.toArray(), [1, 2]);
  });

  await t.step("should throw BufferFullError when buffer is full", () => {
    const buffer = new CircularBuffer<number>(2);
    buffer.enqueue(1);
    buffer.enqueue(2);
    assertThrows(() => buffer.enqueue(3), BufferFullError);
  });
});

Deno.test("CircularBuffer - dequeue", async (t) => {
  await t.step("should remove and return oldest element", () => {
    const buffer = new CircularBuffer<number>(3);
    buffer.enqueue(1);
    buffer.enqueue(2);
    assertEquals(buffer.dequeue(), 1);
    assertEquals(buffer.getSize(), 1);
    assertEquals(buffer.toArray(), [2]);
  });

  await t.step("should throw BufferEmptyError when buffer is empty", () => {
    const buffer = new CircularBuffer<number>(3);
    assertThrows(() => buffer.dequeue(), BufferEmptyError);
  });
});

Deno.test("CircularBuffer - peek", async (t) => {
  await t.step("should return oldest element without removing it", () => {
    const buffer = new CircularBuffer<number>(3);
    buffer.enqueue(1);
    buffer.enqueue(2);
    assertEquals(buffer.peek(), 1);
    assertEquals(buffer.getSize(), 2);
    assertEquals(buffer.toArray(), [1, 2]);
  });

  await t.step("should throw BufferEmptyError when buffer is empty", () => {
    const buffer = new CircularBuffer<number>(3);
    assertThrows(() => buffer.peek(), BufferEmptyError);
  });
});

Deno.test("CircularBuffer - circular behavior", async (t) => {
  await t.step("should wrap around when reaching capacity", () => {
    const buffer = new CircularBuffer<number>(3);
    buffer.enqueue(1);
    buffer.enqueue(2);
    buffer.enqueue(3);
    buffer.dequeue();
    buffer.enqueue(4);
    assertEquals(buffer.toArray(), [2, 3, 4]);
  });

  await t.step("should maintain order after multiple wrap-arounds", () => {
    const buffer = new CircularBuffer<number>(3);
    // Fill buffer
    buffer.enqueue(1);
    buffer.enqueue(2);
    buffer.enqueue(3);
    // Remove one, add one
    buffer.dequeue();
    buffer.enqueue(4);
    // Remove one, add one
    buffer.dequeue();
    buffer.enqueue(5);
    assertEquals(buffer.toArray(), [3, 4, 5]);
  });
});

Deno.test("CircularBuffer - clear", async (t) => {
  await t.step("should remove all elements", () => {
    const buffer = new CircularBuffer<number>(3);
    buffer.enqueue(1);
    buffer.enqueue(2);
    buffer.clear();
    assertEquals(buffer.getSize(), 0);
    assertEquals(buffer.isEmpty(), true);
    assertEquals(buffer.toArray(), []);
  });
});

Deno.test("CircularBuffer - toArray", async (t) => {
  await t.step("should return elements in correct order", () => {
    const buffer = new CircularBuffer<number>(3);
    buffer.enqueue(1);
    buffer.enqueue(2);
    buffer.enqueue(3);
    assertEquals(buffer.toArray(), [1, 2, 3]);
  });

  await t.step("should return empty array for empty buffer", () => {
    const buffer = new CircularBuffer<number>(3);
    assertEquals(buffer.toArray(), []);
  });
}); 