// N represents the type of the node
/**
 * Performs a Breadth-First Search (BFS) traversal on a graph-like structure.
 *
 * @template N The type of the nodes in the graph.
 * @param {N | null} startNode The node from which to start the traversal.
 * @param {(node: N) => (N | null)[] | undefined | null} getChildren A function that takes a node and returns an array of its children.
 * @param {(node: N) => boolean | void} callback A function to be called for each visited node. If the callback returns `true`, the traversal stops.
 */
export function bfs<N>(
  startNode: N | null,
  getChildren: (node: N) => (N | null)[] | undefined | null,
  callback: (node: N) => boolean | void
): void {
  if (!startNode) return;

  const queue: N[] = [startNode];
  // To handle general graphs and prevent processing the same node multiple times,
  // especially if there are cycles or multiple paths to the same node.
  const visited = new Set<N>();
  visited.add(startNode);

  while (queue.length > 0) {
    const currentNode = queue.shift()!;
    if (callback(currentNode) === true) {
      return; // Stop traversal if callback returns true
    }

    const children = getChildren(currentNode);
    if (children) {
      for (const child of children) {
        if (child && !visited.has(child)) {
          visited.add(child);
          queue.push(child);
        }
      }
    }
  }
}
