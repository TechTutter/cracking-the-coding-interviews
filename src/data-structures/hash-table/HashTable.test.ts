import { assertEquals } from "@std/assert";
import { HashTable } from "./HashTable.ts";

Deno.test("HashTable", async (t) => {
  await t.step("constructor", () => {
    const hashTable = new HashTable();
    assertEquals(hashTable.length, 0);
  });

  await t.step("length", () => {
    const hashTable = new HashTable();
    hashTable.set("key", "value");
    assertEquals(hashTable.length, 1);
  });

  await t.step("set", () => {
    const hashTable = new HashTable();
    hashTable.set("key", "value");
    assertEquals(hashTable.length, 1);
  });

  await t.step("get", () => {
    const hashTable = new HashTable();
    hashTable.set("key", "value");
    assertEquals(hashTable.get("key"), "value");
    assertEquals(hashTable.get("key2"), undefined);
  });

  await t.step("remove", () => {
    const hashTable = new HashTable();
    hashTable.set("key", "value");
    hashTable.remove("key");
    assertEquals(hashTable.length, 0);
  });

  await t.step("has", () => {
    const hashTable = new HashTable();
    hashTable.set("key", "value");
    assertEquals(hashTable.has("key"), true);
    assertEquals(hashTable.has("key2"), false);
  });

  await t.step("clear", () => {
    const hashTable = new HashTable();
    hashTable.set("key", "value");
    hashTable.clear();
    assertEquals(hashTable.length, 0);
  });
});
