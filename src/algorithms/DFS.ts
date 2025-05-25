// N represents the type of the node

/**
 * Performs a Depth-First Search (DFS) PreOrder traversal on a graph-like structure.
 * The callback is invoked on the current node before visiting its children.
 *
 * @template N The type of the nodes in the graph.
 * @param {N} currentNode The current node being visited in the recursion.
 * @param {(node: N) => (N | null)[] | undefined | null} getChildren A function to get children of a node.
 * @param {(node: N) => boolean | void} callback Callback for each visited node. Return `true` to stop.
 * @param {Set<N>} visited A set to keep track of visited nodes to prevent cycles and redundant work.
 * @returns {boolean} `true` if traversal was stopped by the callback, `false` otherwise.
 */
function _dfsPreOrderRecursive<N>(
  currentNode: N,
  getChildren: (node: N) => (N | null)[] | undefined | null,
  callback: (node: N) => boolean | void,
  visited: Set<N>
): boolean {
  if (visited.has(currentNode)) {
    return false;
  }
  visited.add(currentNode);

  if (callback(currentNode) === true) {
    return true; // Stop signal
  }

  const children = getChildren(currentNode);
  if (children) {
    for (const child of children) {
      if (child) {
        if (_dfsPreOrderRecursive(child, getChildren, callback, visited)) {
          return true; // Propagate stop signal
        }
      }
    }
  }
  return false;
}

export function dfsPreOrder<N>(
  startNode: N | null,
  getChildren: (node: N) => (N | null)[] | undefined | null,
  callback: (node: N) => boolean | void
): void {
  if (!startNode) return;
  // To handle general graphs and prevent processing the same node multiple times,
  // especially if there are cycles or multiple paths to the same node.
  const visited = new Set<N>();
  _dfsPreOrderRecursive(startNode, getChildren, callback, visited);
}

function _dfsPostOrderRecursive<N>(
  currentNode: N,
  getChildren: (node: N) => (N | null)[] | undefined | null,
  callback: (node: N) => boolean | void,
  visited: Set<N>
): boolean {
  if (visited.has(currentNode)) {
    return false;
  }
  visited.add(currentNode);

  const children = getChildren(currentNode);
  if (children) {
    for (const child of children) {
      if (child) {
        if (_dfsPostOrderRecursive(child, getChildren, callback, visited)) {
          return true; // Propagate stop signal
        }
      }
    }
  }

  if (callback(currentNode) === true) {
    return true; // Stop signal
  }
  return false;
}

export function dfsPostOrder<N>(
  startNode: N | null,
  getChildren: (node: N) => (N | null)[] | undefined | null,
  callback: (node: N) => boolean | void
): void {
  if (!startNode) return;
  // To handle general graphs and prevent processing the same node multiple times,
  // especially if there are cycles or multiple paths to the same node.
  const visited = new Set<N>();
  _dfsPostOrderRecursive(startNode, getChildren, callback, visited);
}
