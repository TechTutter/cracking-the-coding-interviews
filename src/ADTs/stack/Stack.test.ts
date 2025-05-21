import { Stack } from "@data-structures/stack/Stack.ts";
import { assertEquals, assertThrows } from "@std/assert";
import { EmptyStackError } from "@models/Errors.ts";

Deno.test("Stack", async (t) => {
  await t.step("Stack.peek works", () => {
    const emptyStack = new Stack<number>();
    const stack = new Stack<number>([1]);
    assertEquals(emptyStack.peek(), null);
    assertEquals(stack.peek(), 1);
  });

  await t.step("Stack.isEmpty works", () => {
    const emptyStack = new Stack<number>();
    const stack = new Stack<number>([1]);
    assertEquals(emptyStack.isEmpty(), true);
    assertEquals(stack.isEmpty(), false);
  });

  await t.step("Stack.size works", () => {
    const emptyStack = new Stack<number>();
    const stack = new Stack<number>([1]);
    assertEquals(emptyStack.size(), 0);
    assertEquals(stack.size(), 1);
  });

  await t.step("Stack.push works", () => {
    const stack = new Stack<number>();
    stack.push(5);
    assertEquals(stack.size(), 1);
    assertEquals(stack.peek(), 5);
    stack.push(1);
    assertEquals(stack.size(), 2);
    assertEquals(stack.peek(), 1);
  });

  await t.step("Stack.pop works", () => {
    const stack = new Stack<number>([5, 1]);
    assertEquals(stack.pop(), 1);
    assertEquals(stack.size(), 1);
    assertEquals(stack.peek(), 5);
    assertEquals(stack.pop(), 5);
    assertEquals(stack.isEmpty(), true);
  });

  await t.step("Stack.pop throws an error when the stack is empty", () => {
    const stack = new Stack<number>();
    const emptyStackError = new EmptyStackError();
    assertThrows(
      () => {
        stack.pop();
      },
      EmptyStackError,
      emptyStackError.message
    );
  });

});

