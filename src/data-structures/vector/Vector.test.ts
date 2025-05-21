import { assertEquals, assertThrows } from "@std/assert";
import { Vector } from "@data-structures/vector/Vector.ts";
import { EmptyVectorError } from "@models/Errors.ts";
Deno.test("Vector", async (t) => {
  await t.step("size", () => {
    const vector = new Vector<number>(4);
    assertEquals(vector.length(), 0);
  });

  await t.step("capacity", () => {
    const vector = new Vector<number>(4);
    assertEquals(vector.capacity(), 4);
  });

  await t.step("set", () => {
    const vector = new Vector<number>(4);
    vector.push(1);
    vector.set(0, 2);
    assertEquals(vector.get(0), 2);
  });

  await t.step("get", () => {
    const vector = new Vector<number>(4);
    vector.push(1);
    assertEquals(vector.get(0), 1);
  });

  await t.step("push", () => {
    const vector = new Vector<number>(4);
    vector.push(1);
    assertEquals(vector.length(), 1);
  });

  await t.step("pop", () => {
    const vector = new Vector<number>(4);
    vector.push(1);
    assertEquals(vector.pop(), 1);
    assertEquals(vector.length(), 0);
  });

  await t.step("pop throws EmptyVectorError", () => {
    const vector = new Vector<number>(4);
    assertThrows(() => vector.pop(), EmptyVectorError);
  });

  await t.step("resize", () => {
    const vector = new Vector<number>(4);
    vector.push(1);
    vector.push(2);
    vector.push(3);
    vector.push(4);
    vector.push(5);
    assertEquals(vector.capacity(), 8);
  });
});
