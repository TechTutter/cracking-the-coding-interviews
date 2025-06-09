// AVLTree.ts

export class AVLNode<T> {
  constructor(
    public value: T,
    public count: number = 1,
    public left: AVLNode<T> | null = null,
    public right: AVLNode<T> | null = null,
    public height: number = 1
  ) { }
}

export class AVLTree<T> {
  private root: AVLNode<T> | null = null;
  private readonly compare: (a: T, b: T) => number;
  private _size = 0;

  constructor(compare: (a: T, b: T) => number) {
    this.compare = compare;
  }

  insert(value: T): this {
    this.root = this.insertNode(this.root, value);
    return this;
  }

  private insertNode(node: AVLNode<T> | null, value: T): AVLNode<T> {
    if (!node) {
      this._size++;
      return new AVLNode(value);
    }

    const cmp = this.compare(value, node.value);
    if (cmp < 0) {
      node.left = this.insertNode(node.left, value);
    } else if (cmp > 0) {
      node.right = this.insertNode(node.right, value);
    } else {
      node.count++;
      this._size++;
      return node;
    }

    return this.balanceNode(node);
  }

  remove(value: T): this {
    this.root = this.removeNode(this.root, value);
    return this;
  }

  private removeNode(node: AVLNode<T> | null, value: T): AVLNode<T> | null {
    if (!node) return null;

    const cmp = this.compare(value, node.value);
    if (cmp < 0) {
      node.left = this.removeNode(node.left, value);
    } else if (cmp > 0) {
      node.right = this.removeNode(node.right, value);
    } else {
      if (node.count > 1) {
        node.count--;
        this._size--;
        return node;
      }
      this._size--;
      if (!node.left) return node.right;
      if (!node.right) return node.left;

      const minLargerNode = this.getMinValueNode(node.right);
      node.value = minLargerNode.value;
      node.count = minLargerNode.count;
      minLargerNode.count = 1;
      node.right = this.removeNode(node.right, node.value);
    }

    return this.balanceNode(node);
  }

  find(value: T): AVLNode<T> | null {
    return this.findNode(this.root, value);
  }

  private findNode(node: AVLNode<T> | null, value: T): AVLNode<T> | null {
    if (!node) return null;

    const cmp = this.compare(value, node.value);
    if (cmp < 0) return this.findNode(node.left, value);
    if (cmp > 0) return this.findNode(node.right, value);
    return node;
  }

  private getMinValueNode(node: AVLNode<T>): AVLNode<T> {
    let current = node;
    while (current.left) current = current.left;
    return current;
  }

  private getMaxValueNode(node: AVLNode<T>): AVLNode<T> {
    let current = node;
    while (current.right) current = current.right;
    return current;
  }

  private getHeight(node: AVLNode<T> | null): number {
    return node ? node.height : 0;
  }

  private getBalance(node: AVLNode<T> | null): number {
    return node ? this.getHeight(node.left) - this.getHeight(node.right) : 0;
  }

  private balanceNode(node: AVLNode<T>): AVLNode<T> {
    const leftHeight = this.getHeight(node.left);
    const rightHeight = this.getHeight(node.right);
    node.height = 1 + Math.max(leftHeight, rightHeight);

    const balance = leftHeight - rightHeight;

    if (balance > 1) {
      if (this.getBalance(node.left) < 0) {
        node.left = this.leftRotate(node.left!);
      }
      return this.rightRotate(node);
    }

    if (balance < -1) {
      if (this.getBalance(node.right) > 0) {
        node.right = this.rightRotate(node.right!);
      }
      return this.leftRotate(node);
    }

    return node;
  }

  private leftRotate(x: AVLNode<T>): AVLNode<T> {
    const y = x.right!;
    const T2 = y.left;

    y.left = x;
    x.right = T2;

    x.height = 1 + Math.max(this.getHeight(x.left), this.getHeight(x.right));
    y.height = 1 + Math.max(this.getHeight(y.left), this.getHeight(y.right));

    return y;
  }

  private rightRotate(y: AVLNode<T>): AVLNode<T> {
    const x = y.left!;
    const T2 = x.right;

    x.right = y;
    y.left = T2;

    y.height = 1 + Math.max(this.getHeight(y.left), this.getHeight(y.right));
    x.height = 1 + Math.max(this.getHeight(x.left), this.getHeight(x.right));

    return x;
  }

  toArray(): T[] {
    const result: T[] = [];
    this.inOrderTraversal(this.root, (value, count) => {
      for (let i = 0; i < count; i++) result.push(value);
    });
    return result;
  }

  private inOrderTraversal(node: AVLNode<T> | null, callback: (value: T, count: number) => void): void {
    if (!node) return;
    this.inOrderTraversal(node.left, callback);
    callback(node.value, node.count);
    this.inOrderTraversal(node.right, callback);
  }

  min(): T | null {
    if (!this.root) return null;
    return this.getMinValueNode(this.root).value;
  }

  max(): T | null {
    if (!this.root) return null;
    return this.getMaxValueNode(this.root).value;
  }

  size(): number {
    return this._size;
  }

  isEmpty(): boolean {
    return this._size === 0;
  }

  clear(): void {
    this.root = null;
    this._size = 0;
  }
}
