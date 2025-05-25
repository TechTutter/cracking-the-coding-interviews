import { assertEquals, assertExists, assert } from "@std/assert";
import {
  BinaryTreeNode,
  BinaryTree,
} from "@data-structures/tree/BinaryTree.ts";

Deno.test("BinaryTreeNode", () => {
  const node = new BinaryTreeNode(10);
  assertEquals(node.value, 10);
  assertEquals(node.left, null);
  assertEquals(node.right, null);
  assertEquals(node.parent, null);

  const parentNode = new BinaryTreeNode(5);
  const childNode = new BinaryTreeNode(3, parentNode);
  assertEquals(childNode.parent, parentNode);
});

Deno.test("BinaryTree", async (t) => {
  await t.step("constructor and isEmpty", () => {
    const tree1 = new BinaryTree<number>();
    assert(tree1.isEmpty());
    assertEquals(tree1.root, null);

    const tree2 = new BinaryTree(1);
    assert(!tree2.isEmpty());
    assertExists(tree2.root);
    assertEquals(tree2.root?.value, 1);
  });

  // Helper to build a sample tree for traversal tests
  //     1
  //    / \
  //   2   3
  //  / \   \
  // 4   5   6
  function createSampleTree(): BinaryTree<number> {
    const tree = new BinaryTree(1);
    tree.root!.left = new BinaryTreeNode(2, tree.root);
    tree.root!.right = new BinaryTreeNode(3, tree.root);
    tree.root!.left!.left = new BinaryTreeNode(4, tree.root!.left);
    tree.root!.left!.right = new BinaryTreeNode(5, tree.root!.left);
    tree.root!.right!.right = new BinaryTreeNode(6, tree.root!.right);
    return tree;
  }

  await t.step("BFS traversal", () => {
    const tree = createSampleTree();
    const visited: number[] = [];
    tree.bfs((node) => visited.push(node.value));
    assertEquals(visited, [1, 2, 3, 4, 5, 6]);

    const emptyTree = new BinaryTree<number>();
    const emptyVisited: number[] = [];
    emptyTree.bfs((node) => emptyVisited.push(node.value));
    assertEquals(emptyVisited, []);
  });

  await t.step("DFS InOrder traversal (LRoR)", () => {
    const tree = createSampleTree();
    const visited: number[] = [];
    tree.dfsInOrder((node) => visited.push(node.value));
    assertEquals(visited, [4, 2, 5, 1, 3, 6]); // Left, Root, Right
  });

  await t.step("DFS PreOrder traversal (RoLR)", () => {
    const tree = createSampleTree();
    const visited: number[] = [];
    tree.dfsPreOrder((node) => visited.push(node.value));
    assertEquals(visited, [1, 2, 4, 5, 3, 6]); // Root, Left, Right
  });

  await t.step("DFS PostOrder traversal (LRRo)", () => {
    const tree = createSampleTree();
    const visited: number[] = [];
    tree.dfsPostOrder((node) => visited.push(node.value));
    assertEquals(visited, [4, 5, 2, 6, 3, 1]); // Left, Right, Root
  });

  await t.step("find node", () => {
    const tree = createSampleTree();
    const foundNode = tree.find(5);
    assertExists(foundNode);
    assertEquals(foundNode?.value, 5);
    assertEquals(foundNode?.parent?.value, 2);

    const notFound = tree.find(100);
    assertEquals(notFound, null);

    const rootNode = tree.find(1);
    assertExists(rootNode);
    assertEquals(rootNode?.value, 1);
    assertEquals(rootNode?.parent, null);

    const emptyTree = new BinaryTree<number>();
    assertEquals(emptyTree.find(1), null);
  });

  await t.step("find node starting from a sub-tree", () => {
    const tree = createSampleTree();
    // tree.root is 1
    // tree.root.left is 2
    // tree.root.left.left is 4
    // tree.root.left.right is 5

    const subTreeRoot = tree.root?.left; // Starting search from node 2
    assertExists(subTreeRoot);

    const foundInSubtree = tree.find(5, subTreeRoot);
    assertExists(foundInSubtree);
    assertEquals(foundInSubtree?.value, 5);

    const notInSubtree = tree.find(1, subTreeRoot); // Node 1 is parent, not in subtree starting at 2
    assertEquals(notInSubtree, null);
  });
});
