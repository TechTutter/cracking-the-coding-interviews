import { assertEquals, assertThrows } from "@std/assert";
import { LinkedList } from "@data-structures/linked-list/LinkedList.ts";
import { OutOfBoundsError } from "@models/Errors.ts";

Deno.test("LinkedList", async (t) => {
  await t.step("isEmpty", () => {
    const list = new LinkedList();
    assertEquals(list.isEmpty(), true);
  });

  await t.step("constructor", () => {
    const list = new LinkedList();
    assertEquals(list.length, 0);
    assertEquals(list.isEmpty(), true);
  });

  await t.step("append", () => {
    const list = new LinkedList();
    list.append(1);
    assertEquals(list.length, 1);
    assertEquals(list.isEmpty(), false);
  });

  await t.step("prepend", () => {
    const list = new LinkedList();
    list.prepend(1);
    assertEquals(list.length, 1);
    assertEquals(list.isEmpty(), false);
  });

  await t.step("remove", () => {
    const list = new LinkedList();
    list.append(1);
    list.remove(1);
    assertEquals(list.length, 0);
    assertEquals(list.isEmpty(), true);
  });

  await t.step("get", () => {
    const list = new LinkedList();
    list.append(1);
    assertEquals(list.get(0), 1);
  });

  await t.step("toArray", () => {
    const list = new LinkedList();
    list.append(1);
    assertEquals(list.toArray(), [1]);
  });

  await t.step("clear", () => {
    const list = new LinkedList();
    list.append(1);
    list.clear();
    assertEquals(list.length, 0);
    assertEquals(list.isEmpty(), true);
  });

  await t.step("reverse", () => {
    const list = new LinkedList();
    list.append(1);
    list.reverse();
    assertEquals(list.toArray(), [1]);
  });

  await t.step("iterator", () => {
    const list = new LinkedList();
    list.append(1);
    list.append(2);
    list.append(3);
    const iterator = list[Symbol.iterator]();
    assertEquals(iterator.next().value, 1);
    assertEquals(iterator.next().value, 2);
    assertEquals(iterator.next().value, 3);
    assertEquals(iterator.next().done, true);
  });

  await t.step("get throws boundary error", () => {
    const list = new LinkedList();
    list.append(1);
    assertThrows(() => list.get(-1), OutOfBoundsError);
    assertThrows(() => list.get(3), OutOfBoundsError);
  });

});
