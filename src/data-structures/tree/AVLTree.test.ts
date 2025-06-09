import { assertEquals } from "@std/assert";
import { AVLTree } from "./AVLTree.ts";

Deno.test("AVLTree", async (t) => {
  await t.step("insert and toArray", () => {
    const tree = new AVLTree<number>((a, b) => a - b);
    tree.insert(10).insert(5).insert(20).insert(10);
    assertEquals(tree.toArray(), [5, 10, 10, 20]);
  });

  await t.step("find", () => {
    const tree = new AVLTree<number>((a, b) => a - b);
    tree.insert(5).insert(10);
    assertEquals(tree.find(5)?.value, 5);
    assertEquals(tree.find(15), null);
  });

  await t.step("min and max", () => {
    const tree = new AVLTree<number>((a, b) => a - b);
    tree.insert(7).insert(3).insert(9);
    assertEquals(tree.min(), 3);
    assertEquals(tree.max(), 9);
  });

  await t.step("remove single and duplicate", () => {
    const tree = new AVLTree<number>((a, b) => a - b);
    tree.insert(8).insert(8).insert(3).insert(10);
    tree.remove(8);
    assertEquals(tree.toArray(), [3, 8, 10]);
    tree.remove(8);
    assertEquals(tree.toArray(), [3, 10]);
  });

  await t.step("clear and isEmpty", () => {
    const tree = new AVLTree<number>((a, b) => a - b);
    tree.insert(1).insert(2);
    tree.clear();
    assertEquals(tree.isEmpty(), true);
    assertEquals(tree.toArray(), []);
  });

  await t.step("size tracking", () => {
    const tree = new AVLTree<number>((a, b) => a - b);
    assertEquals(tree.size(), 0);
    tree.insert(1).insert(1).insert(2);
    assertEquals(tree.size(), 3);
    tree.remove(1);
    assertEquals(tree.size(), 2);
  });
});
