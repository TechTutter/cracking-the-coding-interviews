import { assertEquals } from "@std/assert";
import { DoublyListNode, DoublyLinkedList } from "@data-structures/linked-list/DoublyLinkedList.ts";

Deno.test("DoublyLinkedList", async (t) => {
  await t.step("listNode", () => {
    const node = new DoublyListNode(1);
    assertEquals(node.value, 1);
    assertEquals(node.next, null);
    assertEquals(node.prev, null);
  });

  await t.step("isEmpty", () => {
    const list = new DoublyLinkedList();
    assertEquals(list.isEmpty(), true);
  });

  await t.step("constructor", () => {
    const list = new DoublyLinkedList();
    assertEquals(list.length, 0);
    assertEquals(list.isEmpty(), true);
  });

  await t.step("append", () => {
    const list = new DoublyLinkedList();
    list.append(1);
    assertEquals(list.length, 1);
    assertEquals(list.isEmpty(), false);
  });

  await t.step("prepend", () => {
    const list = new DoublyLinkedList();
    list.prepend(1);
    assertEquals(list.length, 1);
    assertEquals(list.isEmpty(), false);
  });

  await t.step("remove", () => {
    const list = new DoublyLinkedList();
    list.append(1);
    list.remove(1);
    assertEquals(list.length, 0);
    assertEquals(list.isEmpty(), true);
  });

  await t.step("get", () => {
    const list = new DoublyLinkedList();
    list.append(1);
    assertEquals(list.get(0), 1);
  });

  await t.step("toArray", () => {
    const list = new DoublyLinkedList();
    list.append(1);
    assertEquals(list.toArray(), [1]);
  });

  await t.step("clear", () => {
    const list = new DoublyLinkedList();
    list.append(1);
    list.clear();
    assertEquals(list.length, 0);
    assertEquals(list.isEmpty(), true);
  });

  await t.step("reverse", () => {
    const list = new DoublyLinkedList();
    list.append(1);
    list.reverse();
    assertEquals(list.toArray(), [1]);
  });

  await t.step("iterator", () => {
    const list = new DoublyLinkedList();
    list.append(1);
    list.append(2);
    list.append(3);
    const iterator = list[Symbol.iterator]();
    assertEquals(iterator.next().value, 1);
    assertEquals(iterator.next().value, 2);
    assertEquals(iterator.next().value, 3);
    assertEquals(iterator.next().done, true);
  });

});
