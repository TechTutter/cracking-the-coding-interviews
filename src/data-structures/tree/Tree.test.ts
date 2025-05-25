import { assertEquals, assertExists, assert } from "@std/assert";
import { TreeNode, Tree } from "@data-structures/tree/Tree.ts";

Deno.test("TreeNode", async (t) => {
  await t.step("constructor", () => {
    const node = new TreeNode(1);
    assertEquals(node.value, 1);
    assertEquals(node.children.length, 0);
    assertEquals(node.parent, null);
    assert(node.isRoot());
    assert(node.isLeaf());
  });

  await t.step("addChild", () => {
    const parentNode = new TreeNode("parent");
    const childNode = parentNode.addChild("child1");

    assertEquals(parentNode.children.length, 1);
    assertEquals(parentNode.children[0].value, "child1");
    assertEquals(childNode.value, "child1");
    assertEquals(childNode.parent, parentNode);
    assert(!parentNode.isLeaf());
    assert(childNode.isLeaf());
    assert(!childNode.isRoot());
  });
});

Deno.test("Tree", async (t) => {
  await t.step("constructor - no root", () => {
    const tree = new Tree<number>();
    assertEquals(tree.root, null);
    assert(tree.isEmpty());
  });

  await t.step("constructor - with root", () => {
    const tree = new Tree(10);
    assertExists(tree.root);
    assertEquals(tree.root?.value, 10);
    assert(!tree.isEmpty());
  });

  await t.step("add - to empty tree as root", () => {
    const tree = new Tree<string>();
    const result = tree.add("root", undefined as unknown as string);
    assert(result);
    assertExists(tree.root);
    assertEquals(tree.root?.value, "root");
  });

  await t.step("add - to existing parent", () => {
    const tree = new Tree("A");
    const addedB = tree.add("B", "A");
    const addedC = tree.add("C", "A");
    const addedD = tree.add("D", "B");

    assert(addedB);
    assert(addedC);
    assert(addedD);

    assertExists(tree.root);
    assertEquals(tree.root?.children.length, 2);
    assertEquals(tree.root?.children[0].value, "B");
    assertEquals(tree.root?.children[1].value, "C");
    assertEquals(tree.root?.children[0].children.length, 1);
    assertEquals(tree.root?.children[0].children[0].value, "D");
  });

  await t.step("add - to non-existent parent", () => {
    const tree = new Tree("A");
    const result = tree.add("B", "X"); // Parent "X" does not exist
    assert(!result);
    assertEquals(tree.root?.children.length, 0);
  });

  await t.step("find", () => {
    const tree = new Tree(1);
    tree.add(2, 1);
    tree.add(3, 1);
    tree.add(4, 2);

    const foundNode = tree.find(4);
    assertExists(foundNode);
    assertEquals(foundNode?.value, 4);
    assertEquals(foundNode?.parent?.value, 2);

    const notFoundNode = tree.find(5);
    assertEquals(notFoundNode, null);
  });

  await t.step("bfs traversal", () => {
    const tree = new Tree("F");
    tree.add("B", "F");
    tree.add("G", "F");
    tree.add("A", "B");
    tree.add("D", "B");
    tree.add("I", "G");
    tree.add("C", "D");
    tree.add("E", "D");
    tree.add("H", "I");

    const bfsOrder: string[] = [];
    tree.bfs((node) => bfsOrder.push(node.value));
    assertEquals(bfsOrder, ["F", "B", "G", "A", "D", "I", "C", "E", "H"]);
  });

  await t.step("dfsPreOrder traversal", () => {
    const tree = new Tree("F");
    tree.add("B", "F"); // F's first child
    tree.add("A", "B"); // B's first child
    tree.add("D", "B"); // B's second child
    tree.add("C", "D"); // D's first child
    tree.add("E", "D"); // D's second child
    tree.add("G", "F"); // F's second child
    tree.add("I", "G"); // G's first child
    tree.add("H", "I"); // I's first child

    const preOrder: string[] = [];
    tree.dfsPreOrder((node) => preOrder.push(node.value));
    assertEquals(preOrder, ["F", "B", "A", "D", "C", "E", "G", "I", "H"]);
  });

  await t.step("dfsPostOrder traversal", () => {
    const tree = new Tree("F");
    tree.add("B", "F");
    tree.add("A", "B");
    tree.add("D", "B");
    tree.add("C", "D");
    tree.add("E", "D");
    tree.add("G", "F");
    tree.add("I", "G");
    tree.add("H", "I");

    const postOrder: string[] = [];
    tree.dfsPostOrder((node) => postOrder.push(node.value));
    assertEquals(postOrder, ["A", "C", "E", "D", "B", "H", "I", "G", "F"]);
  });
});
