import { assertEquals } from "@std/assert";
import { StringBuilder } from "@data-structures/string-builder/StringBuilder.ts";

Deno.test("StringBuilder", async (t) => {
  await t.step("append", () => {
    const sb = new StringBuilder();
    sb.append("Hello");
    sb.append(" ");
    sb.append("World");
    assertEquals(sb.toString(), "Hello World");
  });

  await t.step("appendLine", () => {
    const sb = new StringBuilder();
    sb.appendLine("Hello");
    sb.appendLine("World");
    assertEquals(sb.toString(), "Hello\nWorld\n");
  });

  await t.step("clear", () => {
    const sb = new StringBuilder();
    sb.append("Hello");
    sb.clear();
    assertEquals(sb.toString(), "");
  });

  await t.step("toString", () => {
    const sb = new StringBuilder();
    sb.append("abc");
    sb.append("def");
    assertEquals(sb.toString(), "abcdef");
    assertEquals(sb.length, 6);
  });

  await t.step("length", () => {
    const sb = new StringBuilder();
    assertEquals(sb.length, 0);
    sb.append("Hello");
    assertEquals(sb.length, 5);
  });

  await t.step("isEmpty", () => {
    const sb = new StringBuilder();
    assertEquals(sb.isEmpty(), true);
    sb.append("Hello");
    assertEquals(sb.isEmpty(), false);
  });

});
