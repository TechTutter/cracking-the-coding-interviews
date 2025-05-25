import { assertEquals, assertExists, assert, assertThrows } from "@std/assert";
import { BST } from "@data-structures/tree/BST.ts";

Deno.test("BST", async (t) => {
  await t.step("constructor and isEmpty", () => {
    const bst = new BST<number>();
    assert(bst.isEmpty());
    const bst2 = new BST<number>(10);
    assert(!bst2.isEmpty());
    assertEquals(bst2.root?.value, 10);
  });

  await t.step("insert and basic structure", () => {
    const bst = new BST<number>();
    bst.insert(10);
    bst.insert(5);
    bst.insert(15);
    bst.insert(3);
    bst.insert(7);
    bst.insert(12);
    bst.insert(17);

    assertExists(bst.root);
    assertEquals(bst.root.value, 10);

    assertEquals(bst.root.left?.value, 5);
    assertEquals(bst.root.left?.parent?.value, 10);

    assertEquals(bst.root.right?.value, 15);
    assertEquals(bst.root.right?.parent?.value, 10);

    assertEquals(bst.root.left?.left?.value, 3);
    assertEquals(bst.root.left?.left?.parent?.value, 5);

    assertEquals(bst.root.left?.right?.value, 7);
    assertEquals(bst.root.left?.right?.parent?.value, 5);

    assertEquals(bst.root.right?.left?.value, 12);
    assertEquals(bst.root.right?.left?.parent?.value, 15);

    assertEquals(bst.root.right?.right?.value, 17);
    assertEquals(bst.root.right?.right?.parent?.value, 15);
  });

  await t.step(
    "insert duplicate (should go to right or be ignored based on policy)",
    () => {
      const bst = new BST<number>();
      bst.insert(10);
      bst.insert(5);
      bst.insert(10); // Duplicate

      // Assuming duplicates go to the right of the existing node or its right subtree
      assertEquals(bst.root?.value, 10);
      assertEquals(bst.root?.left?.value, 5);
      assertEquals(bst.root?.right?.value, 10); // The duplicate
      assertEquals(bst.root?.right?.parent?.value, 10);
    }
  );

  await t.step("find", () => {
    const bst = new BST<number>();
    [10, 5, 15, 3, 7, 12, 17].forEach((v) => bst.insert(v));

    assertExists(bst.find(7));
    assertEquals(bst.find(7)?.value, 7);
    assertEquals(bst.find(100), null);
    assertExists(bst.find(10)); // Root
    assertEquals(bst.find(10)?.parent, null);
  });

  await t.step("dfsInOrder (should be sorted)", () => {
    const bst = new BST<number>();
    const values = [10, 5, 15, 3, 7, 12, 17, 1, 20, 6];
    values.forEach((v) => bst.insert(v));

    const sorted: number[] = [];
    bst.dfsInOrder((node) => sorted.push(node.value));
    assertEquals(sorted, [1, 3, 5, 6, 7, 10, 12, 15, 17, 20]);
  });

  await t.step("findMin and findMax", () => {
    const bst = new BST<number>();
    const values = [10, 5, 15, 3, 7, 12, 17, 1, 20, 6];
    values.forEach((v) => bst.insert(v));

    assertEquals(bst.findMin().value, 1);
    assertEquals(bst.findMax().value, 20);

    const subTreeRoot = bst.find(5); // Subtree rooted at 5: [5, 3, 7, 1, 6]
    assertExists(subTreeRoot);
    assertEquals(bst.findMin(subTreeRoot).value, 1);
    assertEquals(bst.findMax(subTreeRoot).value, 7);

    const bstEmpty = new BST<number>();
    assertThrows(
      () => bstEmpty.findMin(),
      Error,
      "Cannot find minimum in an empty tree or subtree."
    );
  });

  await t.step("remove - leaf node", () => {
    const bst = new BST<number>();
    [10, 5, 15, 3].forEach((v) => bst.insert(v)); // 3 is a leaf
    assert(bst.remove(3));
    assertEquals(bst.find(3), null);
    assertEquals(bst.root?.left?.left, null); // Parent of 3 (node 5) should have null left child

    const bstRootOnly = new BST<number>(10);
    assert(bstRootOnly.remove(10));
    assert(bstRootOnly.isEmpty());
  });

  await t.step("remove - node with one right child", () => {
    const bst = new BST<number>();
    [10, 5, 15, 17].forEach((v) => bst.insert(v)); // 15 has one right child 17
    assert(bst.remove(15));
    assertEquals(bst.find(15), null);
    assertEquals(bst.root?.right?.value, 17);
    assertEquals(bst.root?.right?.parent, bst.root);
  });

  await t.step("remove - node with one left child", () => {
    const bst = new BST<number>();
    [10, 5, 15, 3].forEach((v) => bst.insert(v)); // 5 has one left child 3
    assert(bst.remove(5));
    assertEquals(bst.find(5), null);
    assertEquals(bst.root?.left?.value, 3);
    assertEquals(bst.root?.left?.parent, bst.root);
  });

  await t.step("remove - node with two children (root)", () => {
    const bst = new BST<number>();
    //     10
    //    /  \
    //   5    20
    //  / \   / \
    // 3   7 15  25
    //       /
    //      12
    [10, 5, 20, 3, 7, 15, 25, 12].forEach((v) => bst.insert(v));
    // Successor of 10 is 12
    assert(bst.remove(10));
    assertEquals(bst.find(10), null);
    assertEquals(bst.root?.value, 12); // Root is now successor
    assertEquals(bst.root?.parent, null);
    // Check structure after removing 10 (successor was 12)
    //     12
    //    /  \
    //   5    20
    //  / \   / \
    // 3   7 15  25
    const sorted: number[] = [];
    bst.dfsInOrder((node) => sorted.push(node.value));
    assertEquals(sorted, [3, 5, 7, 12, 15, 20, 25]);
    assertEquals(bst.root?.right?.left?.value, 15); // 15 should still be left of 20
    assertEquals(bst.root?.right?.left?.parent?.value, 20);
  });

  await t.step("remove - node with two children (not root)", () => {
    const bst = new BST<number>();
    [50, 30, 70, 20, 40, 60, 80, 35, 45].forEach((v) => bst.insert(v));
    // Tree:
    //       50
    //      /  \
    //    30    70
    //   / \   / \
    // 20  40 60  80
    //     / \
    //    35 45
    // Remove 30. Successor is 35.
    assert(bst.remove(30));
    assertEquals(bst.find(30), null);
    assertEquals(bst.root?.left?.value, 35); // 35 replaces 30
    assertEquals(bst.root?.left?.parent, bst.root);
    assertEquals(bst.root?.left?.left?.value, 20);
    assertEquals(bst.root?.left?.right?.value, 40);
    assertEquals(bst.root?.left?.right?.left, null); // 35 was child of 40, now 40's left is null

    const sorted: number[] = [];
    bst.dfsInOrder((node) => sorted.push(node.value));
    assertEquals(sorted, [20, 35, 40, 45, 50, 60, 70, 80]);
  });

  await t.step("remove - non-existent value", () => {
    const bst = new BST<number>();
    bst.insert(10);
    assert(!bst.remove(100));
    assertEquals(bst.root?.value, 10);
  });
});
