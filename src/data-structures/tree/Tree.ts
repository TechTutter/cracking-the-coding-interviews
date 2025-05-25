export class TreeNode<T> {
  public value: T;
  public children: TreeNode<T>[];
  public parent: TreeNode<T> | null;

  constructor(value: T, parent: TreeNode<T> | null = null) {
    this.value = value;
    this.children = [];
    this.parent = parent;
  }

  addChild(value: T): TreeNode<T> {
    const newNode = new TreeNode(value, this);
    this.children.push(newNode);
    return newNode;
  }

  isRoot(): boolean {
    return this.parent === null;
  }

  isLeaf(): boolean {
    return this.children.length === 0;
  }
}

export class Tree<T> {
  public root: TreeNode<T> | null = null;

  constructor(rootValue?: T) {
    if (rootValue !== undefined) {
      this.root = new TreeNode(rootValue);
    }
  }

  isEmpty(): boolean {
    return this.root === null;
  }

  bfs(callback: (node: TreeNode<T>) => void): void {
    if (!this.root) return;

    const queue: TreeNode<T>[] = [this.root];
    while (queue.length > 0) {
      const node = queue.shift()!;
      callback(node);
      for (const child of node.children) {
        queue.push(child);
      }
    }
  }

  dfsPreOrder(
    callback: (node: TreeNode<T>) => void,
    node: TreeNode<T> | null = this.root
  ): void {
    if (!node) return;

    callback(node);
    for (const child of node.children) {
      this.dfsPreOrder(callback, child);
    }
  }

  dfsPostOrder(
    callback: (node: TreeNode<T>) => void,
    node: TreeNode<T> | null = this.root
  ): void {
    if (!node) return;

    for (const child of node.children) {
      this.dfsPostOrder(callback, child);
    }
    callback(node);
  }

  find(value: T): TreeNode<T> | null {
    if (!this.root) return null;

    let foundNode: TreeNode<T> | null = null;
    this.bfs((node) => {
      if (node.value === value) {
        foundNode = node;
        // Note: To stop BFS early, you'd need to modify the BFS or throw an exception.
        // For simplicity, this BFS will traverse all nodes even if found early.
      }
    });
    return foundNode;
  }

  // Add a node to a specific parent. Returns true if successful, false otherwise.
  add(value: T, parentValue: T): boolean {
    if (!this.root) {
      if (parentValue === undefined || parentValue === null) {
        // Adding as root
        this.root = new TreeNode(value);
        return true;
      }
      return false; // Cannot add to a non-existent parent if tree is empty
    }

    const parentNode = this.find(parentValue);
    if (parentNode) {
      parentNode.addChild(value);
      return true;
    }
    return false; // Parent not found
  }
}
