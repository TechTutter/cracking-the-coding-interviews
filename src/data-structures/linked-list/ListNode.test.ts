import { assertEquals } from "@std/assert";
import { ListNode } from "@data-structures/linked-list/ListNode.ts";

Deno.test("ListNode", async (t) => {
  await t.step("constructor", () => {
    const node = new ListNode(1);
    assertEquals(node.value, 1);
    assertEquals(node.next, null);
  });
});
