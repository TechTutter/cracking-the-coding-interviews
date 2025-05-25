export class BinaryTreeNode<T> {
  public value: T;
  public left: BinaryTreeNode<T> | null;
  public right: BinaryTreeNode<T> | null;
  public parent: BinaryTreeNode<T> | null; // Optional, but can be useful

  constructor(value: T, parent: BinaryTreeNode<T> | null = null) {
    this.value = value;
    this.left = null;
    this.right = null;
    this.parent = parent;
  }
}

export class BinaryTree<T> {
  public root: BinaryTreeNode<T> | null;

  constructor(rootValue?: T) {
    this.root = rootValue !== undefined ? new BinaryTreeNode(rootValue) : null;
  }

  isEmpty(): boolean {
    return this.root === null;
  }

  // Breadth-First Search Traversal
  bfs(callback: (node: BinaryTreeNode<T>) => void): void {
    if (!this.root) return;

    const queue: BinaryTreeNode<T>[] = [this.root];
    while (queue.length > 0) {
      const node = queue.shift()!; // Non-null assertion as queue is checked
      callback(node);
      if (node.left) {
        queue.push(node.left);
      }
      if (node.right) {
        queue.push(node.right);
      }
    }
  }

  // Depth-First Search Traversal (In-Order: Left, Root, Right)
  dfsInOrder(
    callback: (node: BinaryTreeNode<T>) => void,
    node: BinaryTreeNode<T> | null = this.root
  ): void {
    if (!node) return;

    if (node.left) {
      this.dfsInOrder(callback, node.left);
    }
    callback(node);
    if (node.right) {
      this.dfsInOrder(callback, node.right);
    }
  }

  // Depth-First Search Traversal (Pre-Order: Root, Left, Right)
  dfsPreOrder(
    callback: (node: BinaryTreeNode<T>) => void,
    node: BinaryTreeNode<T> | null = this.root
  ): void {
    if (!node) return;

    callback(node);
    if (node.left) {
      this.dfsPreOrder(callback, node.left);
    }
    if (node.right) {
      this.dfsPreOrder(callback, node.right);
    }
  }

  // Depth-First Search Traversal (Post-Order: Left, Right, Root)
  dfsPostOrder(
    callback: (node: BinaryTreeNode<T>) => void,
    node: BinaryTreeNode<T> | null = this.root
  ): void {
    if (!node) return;

    if (node.left) {
      this.dfsPostOrder(callback, node.left);
    }
    if (node.right) {
      this.dfsPostOrder(callback, node.right);
    }
    callback(node);
  }

  // Helper to find a node (used by BST, but can be here for general BT)
  // This is a generic find, not optimized for BST properties.
  find(
    value: T,
    startNode: BinaryTreeNode<T> | null = this.root
  ): BinaryTreeNode<T> | null {
    if (!startNode) return null;

    let found: BinaryTreeNode<T> | null = null;
    // Using BFS for find in a generic binary tree
    const queue: BinaryTreeNode<T>[] = [startNode];
    while (queue.length > 0) {
      const current = queue.shift()!;
      if (current.value === value) {
        found = current;
        break;
      }
      if (current.left) queue.push(current.left);
      if (current.right) queue.push(current.right);
    }
    return found;
  }
}
